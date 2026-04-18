export const step4 = `import os
import glob
import pandas as pd
from datetime import datetime, timedelta
from birdnetlib import Recording
from birdnetlib.analyzer import Analyzer

# 1. Configuration
FOLDER_PATH = "Data/Recordings/2026-04-13" 
BIRD_CSV = "Output/2026-04-13/birds_70.csv"
NOISE_CSV = "Output/2026-04-13/background_noise_low.csv"
MIN_CONFIDENCE = 0.7
LATITUDE = 12.9695
LONGITUDE = 77.6198

# 2. BirdNET's Non-Bird / Noise Labels
# The AI uses these exact phrases for non-bird sounds. 
NON_BIRD_LABELS = {
    "Human vocal", "Human non-vocal", "Human whistle", "Human footstep", 
    "Engine", "Siren", "Power tool", "Gun", "Fireworks", "Power tools",
    "Dog", "Cat", "Cattle", "Pig", "Sheep", "Horse",
    "Frog", "Insects", "Wind", "Rain", "Water", "Thunder", "Noise", "Crackle"
}

print("Loading AI Model...")
analyzer = Analyzer()

def process_directory(folder_path):
    bird_results = []
    noise_results = []
    
    search_pattern = os.path.join(folder_path, "*.wav")
    wav_files = glob.glob(search_pattern)

    # For recursive
    # search_pattern = os.path.join(folder_path, "**", "*.wav")
    # wav_files = glob.glob(search_pattern, recursive=True)
    
    if not wav_files:
        print(f"No .wav files found in {folder_path}")
        return

    print(f"Found {len(wav_files)} files. Starting split analysis...\n")

    for file_path in wav_files:
        filename = os.path.basename(file_path)
        print(f"Processing: {filename}")
        
        name_without_ext = filename.replace('.wav', '')
        
        try:
            file_start_time = datetime.strptime(name_without_ext, "%Y-%m-%d_%H-%M-%S%z")
        except ValueError:
            print(f"⚠️ Skipping {filename}: Invalid timestamp format.")
            continue

        recording = Recording(
                analyzer, 
                file_path, 
                lat=LATITUDE,
                lon=LONGITUDE,
                date=file_start_time,
                min_conf=MIN_CONFIDENCE,
            )
        try:
            recording.analyze()
        except Exception as e:
            print(f"⚠️ Error analyzing {filename}: {e}")
            continue

        # 3. Sort the detections
        for detection in recording.detections:
            absolute_time = file_start_time + timedelta(seconds=detection['start_time'])
            common_name = detection['common_name']
            
            # Format the data row
            row_data = {
                "Timestamp": absolute_time.strftime("%Y-%m-%d %H:%M:%S %z"),
                "Common_Name": common_name,
                "Scientific_Name": detection['scientific_name'],
                "Confidence (%)": round(detection['confidence'] * 100, 2),
                "Latitide": LATITUDE,
                "Longitude": LONGITUDE,
                "File_Name": filename,
            }

            # Check if the name is in our noise list
            if common_name in NON_BIRD_LABELS:
                noise_results.append(row_data)
            else:
                bird_results.append(row_data)

    # 4. Save to two separate CSV files
    if bird_results:
        df_birds = pd.DataFrame(bird_results).sort_values(by="Timestamp")
        df_birds.to_csv(BIRD_CSV, index=False)
        print(f"✅ Saved {len(bird_results)} BIRD detections to {BIRD_CSV}")
    else:
        print("No birds detected.")

    if noise_results:
        df_noise = pd.DataFrame(noise_results).sort_values(by="Timestamp")
        df_noise.to_csv(NOISE_CSV, index=False)
        print(f"✅ Saved {len(noise_results)} NOISE/HUMAN detections to {NOISE_CSV}")
    else:
        print("No background noise/human activity detected.")

# Run the processor
process_directory(FOLDER_PATH)`