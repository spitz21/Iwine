#!/usr/bin/env python3
print("Content-type: text/html\n\n")
from sqlalchemy import create_engine, MetaData, select, func


def get_conn_sqlalchemy(host: str, user: str, pwd: str, db: str, port: str):
    """
    building the sqlalchemy connection. Sqlalchemy has two
    :param host: should be localhost when running xampp locally
    :param user: root by default
    :param pwd: no password if not changed when setting up xampp
    :param db: iwine if created correctly
    :param port: can be seen in the mysql configure button.
    :return:
    """
    my_db_url = "mysql+mysqlconnector://{user}:{pwd}@{host}:{port}/{db}".format(host=host, user=user,
                                                                                pwd=pwd, db=db, port=port)
    return create_engine(my_db_url)


def table_size(table: str, conn):
    metadata = MetaData(conn)
    MetaData.reflect(metadata)
    table = metadata.tables[table]
    return select([func.count()]).select_from(table).scalar()
