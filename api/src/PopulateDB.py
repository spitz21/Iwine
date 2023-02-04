#!/usr/bin/env python3
print("Content-type: text/html\n\n")
import pandas as pd
from GetConnection import get_conn_sqlalchemy,table_size
engine = get_conn_sqlalchemy(host="localhost", user="root", pwd="", db="iwine", port="3306")


def append_df_to_table(table: str, dataframe: pd.DataFrame):
    """
     appending csv files to existing tables when they are empty.
    :param table: table that you want to add the dataframe to 
    :param dataframe: pandas df that you are adding 
    :return: true if change is made false if not. 
    """
    with engine.connect() as conn:
        if table_size(table, conn) == 0:
            dataframe.to_sql(
                name=table,
                con=conn,
                if_exists='append',
                index=False,
                chunksize=1000)
            return True
        else:
            return False


def populate_reviews_wines():
    """
    populate wines table using the encoded_wines_data.csv (meant only for the initial population)
    populate review table using the wine_reviews_wid.csv file
    :return: True when table is populated, False if table is already populated.
    """
    encoded_wine_data = pd.read_csv('../data/encoded_wine_data.csv')
    wine_review_table = pd.read_csv('../data/wine_reviews_wid.csv')
    # need to rename some files columns
    encoded_wine_data = pd.DataFrame(encoded_wine_data).rename(columns={'wid': 'id', 'encoded': "attributes",
                                                                        "designation": "name"})
    wine_review_table = pd.DataFrame(wine_review_table).rename(columns={'description': 'review_text',
                                                                        'taster_name': 'reviewer',
                                                                        'points': 'rating',
                                                                        'wid': 'wine_id'})[['rating', 'reviewer',
                                                                                            'review_text', 'title',
                                                                                            'wine_id']]

    return append_df_to_table("wines", encoded_wine_data), append_df_to_table('reviews', wine_review_table)


print(populate_reviews_wines())
