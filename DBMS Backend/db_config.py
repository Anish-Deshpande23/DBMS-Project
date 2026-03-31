import mysql.connector

def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="Anish@@23",
        database="ecommerce_system "
    )