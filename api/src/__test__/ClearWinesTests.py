"""
Tests the clear wines function from ClearWines.py. 
If the database is already empty the test fails.
Does not repopulate db.

@author John Spitz (spitz3)
@version 2022.12.12

@Changelog
12/12/22 Removed debugging code and added commenting
12/09/22 Debugging
12/07/22 File and test created
"""

import pandas as pd
from GetConnection import get_conn_sqlalchemy,table_size
from ClearWines import clear_wines

def test_clear_wines():
        Pass = False
        engine = get_conn_sqlalchemy(host="localhost", user="root", pwd="", db="iwine", port="3306")
        with engine.connect() as conn:
                print(table_size('wines', conn) == 0)
        with engine.connect() as conn:
             if table_size('wines', conn) == 0:
                return "Fail: db is already empty"
        clear_wines()
        with engine.connect() as conn:
             if table_size('wines', conn) != 0:
                return "Fail: did not clear db"
        return("Pass: db cleared")


print(test_clear_wines())
