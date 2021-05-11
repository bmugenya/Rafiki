import psycopg2

url = "dbname='friend' user='postgres' host='localhost' port=5432 password='Qw12Er34'"



class database_setup(object):

    def __init__(self):
        self.conn = psycopg2.connect(url)
        self.cursor = self.conn.cursor()

    def destroy_tables(self):
        self.cursor.execute("""DROP TABLE IF EXISTS user CASCADE;""")
        self.conn.commit()


    def create_tables(self):
        self.cursor.execute("""CREATE TABLE IF NOT EXISTS rafiki (
            user_id SERIAL NOT NULL,
            name VARCHAR(50) NOT NULL,
            timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_DATE,
            email VARCHAR(50)  UNIQUE NOT NULL,
            password VARCHAR(256) NOT NULL,
            photo VARCHAR(255) NOT NULL,
            isRafiki BOOLEAN NOT NULL,
            PRIMARY KEY (email)
            );""")


    def create_tables(self):
        self.cursor.execute("""CREATE TABLE IF NOT EXISTS post (
            post_id SERIAL NOT NULL,
            image VARCHAR(255),
            message TEXT NOT NULL,
            timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_DATE,
            email VARCHAR(50) REFERENCES rafiki(email),
            PRIMARY KEY (post_id)
            );""")

        self.cursor.execute("""CREATE TABLE IF NOT EXISTS comment (
            comment_id SERIAL NOT NULL,
            comment TEXT NOT NULL,
            timestamp TIMESTAMP  NOT NULL DEFAULT CURRENT_DATE,
            email VARCHAR(50) REFERENCES rafiki(email),
            post_id INT REFERENCES post(post_id),
            PRIMARY KEY (comment_id)
            );""")



    def create_tables(self):
        self.cursor.execute("""CREATE TABLE IF NOT EXISTS room (
            room_id SERIAL NOT NULL,
            name VARCHAR(255) NOT NULL,
            timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_DATE,
            PRIMARY KEY (room_id)
            );""")

    def create_tables(self):
        self.cursor.execute("""CREATE TABLE IF NOT EXISTS chat (
            chat_id SERIAL NOT NULL,
            message VARCHAR(255) NOT NULL,
            room_id INT REFERENCES room(room_id),
            email VARCHAR(50) REFERENCES rafiki(email),
            timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_DATE,
            PRIMARY KEY (chat_id)
            );""")





