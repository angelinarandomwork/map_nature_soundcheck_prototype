export const step6 = `import os
import glob
import re
import pandas as pd
from datetime import datetime, timedelta
from maad import sound
import numpy as np
import librosa

# ==========================================
# 1. CONFIGURATION
# ==========================================
FOLDER_PATH = "Data/Recordings/2026-04-09" 
OUTPUT_CSV = "Output/2026-04-09/ndsi_scores.csv"

LATITUDE = 12.9695
LONGITUDE = 77.6198

# Define the frequency bands for NDSI
ANTHRO_BAND = (1000, 2000)
BIO_BAND = (2000, 8000)

# Regex pattern to find the timestamp anywhere in the filename
# Matches: YYYY-MM-DD_HH-MM-SS+TZ
TIME_PATTERN = re.compile(r'\d{4}-\d{2}-\d{2}_\d{2}-\d{2}-\d{2}[+-]\d{4}')

def process_ndsi_folder(folder_path):
    results = []
    
    search_pattern = os.path.join(folder_path, "*.wav")
    wav_files = glob.glob(search_pattern)
    
    if not wav_files:
        print(f"No .wav files found in {folder_path}")
        return

    print(f"Found {len(wav_files)} files. Starting batch NDSI analysis...\n")

    for file_path in wav_files:
        filename = os.path.basename(file_path)
        print(f"Processing: {filename}")
        
        # 1. Extract the start time from the filename using Regex
        match = TIME_PATTERN.search(filename)
        if not match:
            print(f"  ⚠️ Skipping: Could not find a valid timestamp in the name.")
            continue
            
        try:
            start_time = datetime.strptime(match.group(), "%Y-%m-%d_%H-%M-%S%z")
        except ValueError:
            print(f"  ⚠️ Skipping: Invalid timestamp format.")
            continue
            
        # 2. Bulletproof Audio Loading
        # Check if the file is literally 0 bytes before even trying to open it
        if os.path.getsize(file_path) == 0:
            print(f"  ⚠️ Skipping: File is empty (0 bytes). Likely a recorder error.")
            continue
            
        try:
            # We switch back to librosa here because it is much better at 
            # handling slightly corrupted or non-standard WAV headers than maad.
            s, fs = librosa.load(file_path, sr=None, mono=True)
            
            # If a file is corrupted, librosa might return an empty array
            if len(s) == 0:
                print(f"  ⚠️ Skipping: File loaded but contains no audio data.")
                continue
                
        except Exception as e:
            print(f"  ⚠️ Error reading audio file: {e}")
            continue
            
        # 3. Calculate file length (duration) in seconds natively
        duration = len(s) / fs
        
        # 4. Add the length to the start time to get the end timestamp
        timestamp_with_length = start_time + timedelta(seconds=duration)
        
        # 5. Compute the Power Spectrogram and Custom NDSI
        try:
            # Generate the Power Spectrogram
            Sxx_power, tn, fn, ext = sound.spectrogram(s, fs, mode='psd')
            
            # --- CUSTOM NDSI CALCULATION ---
            # 1. Find which frequency rows belong to which band
            bio_mask = (fn >= BIO_BAND[0]) & (fn <= BIO_BAND[1])
            anthro_mask = (fn >= ANTHRO_BAND[0]) & (fn <= ANTHRO_BAND[1])
            
            # 2. Sum up all the acoustic energy in those specific bands
            bio_energy = np.sum(Sxx_power[bio_mask, :])
            anthro_energy = np.sum(Sxx_power[anthro_mask, :])
            
            # 3. Calculate the NDSI ratio safely
            total_energy = bio_energy + anthro_energy
            if total_energy == 0:
                ndsi_score = 0.0 # Fallback if the file is 100% pure silence
            else:
                ndsi_score = (bio_energy - anthro_energy) / total_energy
                
        except Exception as e:
             print(f"  ⚠️ Error calculating NDSI: {e}")
             continue
             
        # 6. Store the results in the requested format
        results.append({
            "Timestamp": timestamp_with_length.strftime("%Y-%m-%d %H:%M:%S %z"),
            "NDSI_Score": round(float(ndsi_score), 3),
            "Latitude": LATITUDE,
            "Longitude": LONGITUDE,
            "File_Name": filename
        })

    # ==========================================
    # 7. DATA EXPORT
    # ==========================================
    if results:
        # Create DataFrame and sort chronologically
        df = pd.DataFrame(results)
        df = df.sort_values(by="Timestamp")
        
        # Write to CSV
        df.to_csv(OUTPUT_CSV, index=False)
        print(f"\n✅ Finished! Processed {len(results)} files.")
        print(f"📊 NDSI metrics saved to {OUTPUT_CSV}")
    else:
        print("\nFinished processing, but no valid data to save.")

# Run the script
if __name__ == "__main__":
    process_ndsi_folder(FOLDER_PATH)
`