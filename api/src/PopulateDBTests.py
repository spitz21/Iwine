from unittest import TestCase
from GetConnection import get_conn_sqlalchemy,table_size


class PopulateDB(TestCase):

    def test_get_conn_sqlalchemy(self):
        engine = get_conn_sqlalchemy(host="localhost", user="root", pwd="", db="iwine", port="3306")
        print(engine.connect())

    def test_table_size(self):
        engine = get_conn_sqlalchemy(host="localhost", user="root", pwd="", db="iwine", port="3306")
        with engine.connect() as conn:
            return table_size('reviews', conn) == 0



