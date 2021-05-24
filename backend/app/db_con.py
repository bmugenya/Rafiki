import psycopg2

url = "dbname='dbrf3g146qdh1v' user='hddjrxmoxfmgmo' host='ec2-3-234-22-132.compute-1.amazonaws.com' port=5432 password='285534ea094f54ce19c086af10dc6908878fc84cd2c3cf731d2554803f69a07b'"



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
            photo VARCHAR(255),
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

        self.cursor.execute("""CREATE TABLE IF NOT EXISTS respond (
            respond_id SERIAL NOT NULL,
            respond TEXT NOT NULL,
            timestamp TIMESTAMP  NOT NULL DEFAULT CURRENT_DATE,
            email VARCHAR(50) REFERENCES rafiki(email),
            post_id INT REFERENCES post(post_id),
            PRIMARY KEY (respond_id)
            );""")



    def create_tables(self):
        self.cursor.execute("""CREATE TABLE IF NOT EXISTS groups (
            groups_id SERIAL NOT NULL,
            name VARCHAR(255) NOT NULL,
            timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_DATE,
            PRIMARY KEY (groups_id)
            );""")

    def create_tables(self):
        self.cursor.execute("""CREATE TABLE IF NOT EXISTS chat (
            chat_id SERIAL NOT NULL,
            message VARCHAR(255) NOT NULL,
            groups_id INT REFERENCES groups(groups_id),
            email VARCHAR(50) REFERENCES rafiki(email),
            timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_DATE,
            PRIMARY KEY (chat_id)
            );""")





