export const step3 = ` import pandas as pd
import soundfile as sf
import os

# Configuration
CSV_FILE = "birds.csv"
AUDIO_DIR = "Data/"
OUTPUT_DIR = "iNaturalist_Uploads/"

os.makedirs(OUTPUT_DIR, exist_ok=True)

# Load your high-confidence detections
df = pd.read_csv(CSV_FILE)
df_clean = df[df['Confidence (%)'] > 80.0].copy()

print(f"Extracting {len(df_clean)} audio snippets...")

for index, row in df_clean.iterrows():
    original_file = os.path.join(AUDIO_DIR, row['File_Name'])
    
    if not os.path.exists(original_file):
        continue

    try:
        # Get the sample rate
        info = sf.info(original_file)
        fs = info.samplerate
        
        # We need to figure out exactly when this bird sang in the raw file.
        # Since your CSV has the absolute Timestamp and you know the file's start time,
        # you might need to rely on the raw BirdNET output if you saved it. 
        # For simplicity, assuming you added a 'Start_Time_Seconds' to your CSV earlier:
        # (If not, you can easily add detection['start_time'] to your master script!)
        start_sec = row.get('Start_Time_Seconds', 0) 
        
        # Extract a 10-second window (5 seconds before, 5 seconds after)
        start_frame = max(0, int((start_sec - 5) * fs))
        frames_to_read = int(10 * fs)
        
        # Read just that tiny slice of audio
        s, _ = sf.read(original_file, frames=frames_to_read, start=start_frame)
        
        # Save the snippet with a descriptive name
        safe_name = row['Common_Name'].replace(" ", "_")
        snippet_name = f"{safe_name}_{row['Timestamp'].replace(':', '-')}.wav"
        output_path = os.path.join(OUTPUT_DIR, snippet_name)
        
        sf.write(output_path, s, fs)
        
    except Exception as e:
        print(f"Error slicing {original_file}: {e}")

print("Done! Your snippets are ready for upload.")`