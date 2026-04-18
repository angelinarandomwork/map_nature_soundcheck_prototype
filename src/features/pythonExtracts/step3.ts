export const step3 = `#include <WiFi.h>
#include <time.h>
#include <SPI.h>
#include <SD.h>
#include <driver/i2s.h>

// ==========================================
// --- USER SETTINGS ---
// ==========================================

struct WiFiNetwork {
  const char* ssid;
  const char* password;
};

WiFiNetwork networks[] = {
  {"Ark2", "hamletsgo"},
  {"TP-Link_1BE8", "15400505"},
  {"SSBHOUSE", "SSBHOUSE@123"}
};
const int numNetworks = sizeof(networks) / sizeof(networks[0]); 

const int THRESHOLD    = 2000;  // Adjust this (lower = more sensitive)
const int TAIL_TIME_MS = 5000;  // 5 second tail
const int VOLUME_BOOST = 6;     // Digital gain

// Time Settings (India Standard Time = GMT + 5:30)
const char* ntpServer = "pool.ntp.org";
const long  gmtOffset_sec = 19800; 
const int   daylightOffset_sec = 0;

// ==========================================
// --- HARDWARE PINS & GLOBALS ---
// ==========================================

const int SPI_SCK = SCK;
const int SPI_MISO = MISO;
const int SPI_MOSI = MOSI;
const int SD_CS = 43;
const int STATUS_LED = 13; 

const int I2S_SCK = 18;
const int I2S_WS = 17;
const int I2S_SD = 16;
#define I2S_PORT I2S_NUM_0

const int SAMPLE_RATE = 16000;

enum State { LISTENING, RECORDING };
State currentState = LISTENING;

File audioFile;
uint32_t bytesWritten = 0;
unsigned long lastSoundTime = 0;
unsigned long systemStartTime = 0;
unsigned long blinkStartTime = 0;
bool isBlinking = false;
char fileName[64]; 

// Audio Filters
int32_t dc_offset = 0;
float low_freq_audio = 0; 
const float FILTER_ALPHA = 0.37; // Blocks human voices (~1500 Hz cutoff)

// ==========================================
// --- SETUP ---
// ==========================================

void setup() {
  Serial.begin(115200);
  delay(2000);
  
  pinMode(STATUS_LED, OUTPUT);
  Serial.println("\n--- Bioacoustics Monitor Booting ---");

  // 1. Sync Time and Kill Wi-Fi 
  syncTime();

  // 2. Start SD Card (1MHz speed limit for stable power)
  SPI.begin(SPI_SCK, SPI_MISO, SPI_MOSI, SD_CS);
  if (!SD.begin(SD_CS, SPI, 1000000)) {
    Serial.println("ERROR: SD Card mount failed!");
    // Fast blink forever on critical SD failure
    while(1) {
      digitalWrite(STATUS_LED, HIGH); delay(100);
      digitalWrite(STATUS_LED, LOW); delay(100);
    } 
  }
  Serial.println("SD Card ready.");

  // 3. Start Microphone (Large DMA buffers)
  i2s_config_t i2s_config = {
    .mode = (i2s_mode_t)(I2S_MODE_MASTER | I2S_MODE_RX),
    .sample_rate = SAMPLE_RATE,
    .bits_per_sample = I2S_BITS_PER_SAMPLE_32BIT,
    .channel_format = I2S_CHANNEL_FMT_ONLY_LEFT,
    .communication_format = i2s_comm_format_t(I2S_COMM_FORMAT_STAND_I2S),
    .intr_alloc_flags = ESP_INTR_FLAG_LEVEL1,
    .dma_buf_count = 16,
    .dma_buf_len = 1024,
    .use_apll = false,
    .tx_desc_auto_clear = false,
    .fixed_mclk = 0
  };
  i2s_pin_config_t pin_config = {
    .bck_io_num = I2S_SCK,
    .ws_io_num = I2S_WS,
    .data_out_num = I2S_PIN_NO_CHANGE,
    .data_in_num = I2S_SD
  };
  i2s_driver_install(I2S_PORT, &i2s_config, 0, NULL);
  i2s_set_pin(I2S_PORT, &pin_config);
  
  Serial.println("\n--- System Armed and Waiting for Birds ---");
  systemStartTime = millis(); // Start the 2-second grace period clock
}

// ==========================================
// --- MAIN LOOP ---
// ==========================================

void loop() {
  int32_t sample32 = 0;
  size_t bytesRead = 0;

  // Read data from mic
  i2s_read(I2S_PORT, &sample32, sizeof(int32_t), &bytesRead, portMAX_DELAY);

  // --- Audio Cleanup Math ---
  int32_t raw_value = sample32 >> 14;

  // Remove DC Offset
  dc_offset = (dc_offset * 63 + raw_value) / 64; 
  raw_value = raw_value - dc_offset; 

  // Human Voice Blocker
  low_freq_audio = (FILTER_ALPHA * raw_value) + ((1.0 - FILTER_ALPHA) * low_freq_audio);
  int32_t bird_audio = raw_value - (int32_t)low_freq_audio;

  // Digital Gain & Limit
  int32_t boosted_value = bird_audio * VOLUME_BOOST;
  if (boosted_value > 32767) boosted_value = 32767;
  if (boosted_value < -32768) boosted_value = -32768;
  int16_t final_sample = (int16_t)boosted_value;

  // --- STATE MACHINE ---
  
  if (currentState == LISTENING) {
    // Wait exactly 2000ms for hardware pops to stop
    if (millis() - systemStartTime > 2000) {
      if (abs(final_sample) > THRESHOLD) {
        startRecording();
      }
    }
  } 
  else if (currentState == RECORDING) {
    // Save the audio chunk
    audioFile.write((const uint8_t*)&final_sample, 2);
    bytesWritten += 2;

    // Reset silence timer if loud sound is heard
    if (abs(final_sample) > THRESHOLD) {
      lastSoundTime = millis(); 
    }

    // Stop if 5 seconds of silence passed
    if (millis() - lastSoundTime > TAIL_TIME_MS) {
      stopRecording();
    }
  }

  // --- Non-Blocking LED Off-Switch ---
  if (isBlinking && (millis() - blinkStartTime > 100)) {
    digitalWrite(STATUS_LED, LOW);
    isBlinking = false;
  }
} // <-- End of Loop()

// ==========================================
// --- HELPER FUNCTIONS ---
// ==========================================

void syncTime() {
  Serial.println("\n--- Starting Network & Time Sync ---");
  
  WiFi.disconnect(true);
  delay(1000);
  WiFi.mode(WIFI_STA); 

  bool connected = false;

  for (int i = 0; i < numNetworks; i++) {
    Serial.print("Trying Network [");
    Serial.print(i + 1);
    Serial.print("]: ");
    Serial.println(networks[i].ssid);

    WiFi.begin(networks[i].ssid, networks[i].password);
    
    int attempts = 0;
    while (WiFi.status() != WL_CONNECTED && attempts < 10) {
      digitalWrite(STATUS_LED, HIGH); delay(250);
      digitalWrite(STATUS_LED, LOW); delay(250);
      Serial.print(".");
      attempts++;
    }

    if (WiFi.status() == WL_CONNECTED) {
      connected = true;
      Serial.println("\n✅ Wi-Fi Connected!");
      break; 
    } else {
      Serial.println("\n❌ Failed. Moving to next network...");
    }
  }

  if (connected) {
    Serial.print("Asking internet for the time");
    configTime(gmtOffset_sec, daylightOffset_sec, ntpServer);
    
    struct tm timeinfo;
    int ntpAttempts = 0;
    
    while (!getLocalTime(&timeinfo) && ntpAttempts < 10) {
      Serial.print("*");
      delay(500);
      ntpAttempts++;
    }

    if (ntpAttempts < 10) {
      Serial.println("\n✅ Time Synced successfully!");
      digitalWrite(STATUS_LED, HIGH); delay(3000); 
      digitalWrite(STATUS_LED, LOW); 
    } else {
      Serial.println("\n⚠️ Connected, but time server did not respond.");
    }
  } else {
    Serial.println("\n⚠️ All Wi-Fi attempts failed. Using default 1970 clock.");
    for(int j = 0; j < 10; j++) {
      digitalWrite(STATUS_LED, HIGH); delay(100);
      digitalWrite(STATUS_LED, LOW); delay(100);
    }
  }

  WiFi.disconnect(true);
  WiFi.mode(WIFI_OFF);
  Serial.println("Wi-Fi killed (Radio OFF). Audio is safe.\n");
}

void startRecording() {
  currentState = RECORDING;
  bytesWritten = 0;
  lastSoundTime = millis();

  // Quick flash LED
  digitalWrite(STATUS_LED, HIGH);
  blinkStartTime = millis();
  isBlinking = true;

  struct tm timeinfo;
  if(getLocalTime(&timeinfo)) {
    // Python/Data Science friendly format: +0530
    strftime(fileName, sizeof(fileName), "/%Y-%m-%d_%H-%M-%S+0530.wav", &timeinfo);
  } else {
    sprintf(fileName, "/record_%lu.wav", millis()); 
  }

  Serial.print("🐦 BIRD DETECTED! Recording to: ");
  Serial.println(fileName);

  audioFile = SD.open(fileName, FILE_WRITE);
  writeWavHeader(audioFile, 0); 
}

void stopRecording() {
  currentState = LISTENING;
  Serial.print("Silence detected. Saving file... ");

  audioFile.seek(0);
  writeWavHeader(audioFile, bytesWritten);
  audioFile.close(); 

  Serial.println("Done! Back to listening.");
}

void writeWavHeader(File file, uint32_t dataSize) {
  uint32_t sampleRate = SAMPLE_RATE;
  uint16_t numChannels = 1;
  uint16_t bitsPerSample = 16;
  uint32_t byteRate = sampleRate * numChannels * (bitsPerSample / 8);
  uint16_t blockAlign = numChannels * (bitsPerSample / 8);
  
  uint32_t fileSize = dataSize == 0 ? 0 : dataSize + 36; 

  file.write((const uint8_t*)"RIFF", 4);
  file.write((const uint8_t*)&fileSize, 4);
  file.write((const uint8_t*)"WAVE", 4);
  file.write((const uint8_t*)"fmt ", 4);
  uint32_t fmtSize = 16;
  file.write((const uint8_t*)&fmtSize, 4);
  uint16_t audioFormat = 1;
  file.write((const uint8_t*)&audioFormat, 2);
  file.write((const uint8_t*)&numChannels, 2);
  file.write((const uint8_t*)&sampleRate, 4);
  file.write((const uint8_t*)&byteRate, 4);
  file.write((const uint8_t*)&blockAlign, 2);
  file.write((const uint8_t*)&bitsPerSample, 2);
  file.write((const uint8_t*)"data", 4);
  file.write((const uint8_t*)&dataSize, 4);
}`