import kagglehub
import pandas as pd
import os

def main():
    path = kagglehub.dataset_download("naqibahmedkadri/famous-indian-tourist-places")
    files = os.listdir(path)
    
    city_file = [f for f in files if f == 'City.csv'][0]
    df = pd.read_csv(os.path.join(path, city_file))
    print(df.head())
    print("Columns:", df.columns)
    print("Total Rows:", len(df))

if __name__ == "__main__":
    main()
