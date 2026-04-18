export const step5 = `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import os

# ==========================================
# 1. LOAD AND FILTER DATA
# ==========================================
CSV_FILE = "Output/2026-04-13/birds_70.csv"  # Update this to the name of your CSV
OUTPUT_DIR = "Visualizations/2026-04-13"

# Create a folder to store all the images
if not os.path.exists(OUTPUT_DIR):
    os.makedirs(OUTPUT_DIR)

print(f"Loading data from {CSV_FILE}...")
df = pd.read_csv(CSV_FILE)

# Convert the Timestamp column to actual datetime objects
# utc=True safely parses the timezone offsets (like +0530)
df['Timestamp'] = pd.to_datetime(df['Timestamp'])

# Extract just the hour of the day (0 to 23) into a new column
# This makes plotting the heatmap and clocks much easier
df['Hour'] = df['Timestamp'].dt.hour

# FILTER: Keep only birds heard at least 3 times
species_counts = df['Common_Name'].value_counts()
valid_birds = species_counts[species_counts >= 3].index

# Apply the filter to our dataframe
df_clean = df[df['Common_Name'].isin(valid_birds)]

print(f"Filtered out rare birds. Analyzing {len(valid_birds)} species...")

# ==========================================
# 2. GENERATE THE HEATMAP (Species vs. Time of Day)
# ==========================================
print("Generating Heatmap...")

# Create a pivot table: Rows = Species, Columns = Hour, Values = Count
heatmap_data = pd.crosstab(df_clean['Common_Name'], df_clean['Hour'])

# Ensure all 24 hours are represented as columns, even if no birds sang then
heatmap_data = heatmap_data.reindex(columns=range(24), fill_value=0)

plt.figure(figsize=(12, 8))
# cmap="YlGnBu" creates a nice Yellow-Green-Blue gradient
sns.heatmap(heatmap_data, cmap="YlGnBu", linewidths=.5, cbar_kws={'label': 'Number of Detections'})

plt.title('Daily Bird Activity Heatmap', fontsize=16, pad=20)
plt.xlabel('Hour of the Day (Local Time)', fontsize=12)
plt.ylabel('Species', fontsize=12)
plt.tight_layout()

heatmap_path = os.path.join(OUTPUT_DIR, "master_heatmap.png")
plt.savefig(heatmap_path, dpi=300)
plt.close()
print(f"✅ Heatmap saved to {heatmap_path}")

# ==========================================
# 3. GENERATE 24-HOUR CLOCK PLOTS
# ==========================================
print("Generating Clock Plots for each species...")

# The math to map 24 hours to a 360-degree circle
angles = np.linspace(0, 2 * np.pi, 24, endpoint=False)

for bird in valid_birds:
    # Isolate the data for just this one bird
    bird_data = df_clean[df_clean['Common_Name'] == bird]
    
    # Count how many times it sang in each hour
    hourly_counts = bird_data['Hour'].value_counts()
    
    # Fill in the silent hours with 0
    hourly_counts = hourly_counts.reindex(range(24), fill_value=0).sort_index()
    
    # Optional: Convert to a percentage rate so the graph scales nicely
    # If you prefer raw counts, delete this line and use 'hourly_counts' in ax.bar below
    hourly_rate = hourly_counts / hourly_counts.sum()
    
    # Setup the polar plot
    fig = plt.figure(figsize=(6, 6))
    ax = fig.add_subplot(111, projection='polar')
    
    # Draw the bars
    ax.bar(angles, hourly_rate, width=(2 * np.pi / 24), bottom=0.0, 
           color='skyblue', edgecolor='black', alpha=0.8)
    
    # Format to look like a clock
    ax.set_theta_direction(-1)        # Make it go clockwise
    ax.set_theta_offset(np.pi / 2.0)  # Put 0:00 (Midnight) at the top
    ax.set_xticks(angles)
    ax.set_xticklabels([f"{i}:00" for i in range(24)])
    
    # Remove the radial y-axis labels (the decimal percentages) to keep it clean
    ax.set_yticklabels([]) 
    
    plt.title(f"Activity Cycle: {bird}", pad=20, fontsize=14, fontweight='bold')
    
    # Save the plot
    safe_filename = bird.replace(" ", "_").replace("/", "_").lower() + "_clock.png"
    filepath = os.path.join(OUTPUT_DIR, safe_filename)
    plt.savefig(filepath, dpi=300, bbox_inches='tight')
    plt.close(fig)

print(f"✅ Created {len(valid_birds)} Clock Plots in the '{OUTPUT_DIR}' folder.")
print("All visualization processing complete!")`