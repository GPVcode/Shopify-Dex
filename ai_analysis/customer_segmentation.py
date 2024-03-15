from google.cloud import bigquery
import pandas as pd
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
import sys

def fetch_data_from_bigquery():
    client = bigquery.Client()
    query = """SELECT customerID, totalRevenue, numberOfOrders FROM `yourProject.yourDataset.yourTable`"""
    return client.query(query).to_dataframe()

def segment_customers(dataframe):
    scaler = StandardScaler()
    features = ['totalRevenue', 'numberOfOrders']
    scaled_features = scaler.fit_transform(dataframe[features])
    kmeans = KMeans(n_clusters=4, random_state=42)
    kmeans.fit(scaled_features)
    dataframe['Segment'] = kmeans.labels_
    return dataframe

def main():
    df = fetch_data_from_bigquery()
    segmented_df = segment_customers(df)
    # For simplicity, printing the segmented DataFrame. You might want to save it or send it back to your app.
    print(segmented_df.to_json())

if __name__ == "__main__":
    main()
