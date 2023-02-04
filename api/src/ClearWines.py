#!/usr/bin/env python3
print("Content-type: text/html\n\n")
from GetConnection import get_conn_sqlalchemy, table_size


def clear_wines():
    """
    Clear wines table for testing purposes,
    :return: True when table is cleared false when table is already clear.
    """
    engine = get_conn_sqlalchemy(host="localhost", user="root", pwd="", db="iwine", port="3306")
    with engine.connect() as conn:
        if (table_size('wines', conn)) != 0:
            conn.execute('DELETE FROM wines;')
            return True
        return False


clear_wines()