import psycopg2


url = "dbname='d4m0uig5ickgc9' user='kbmwtuzaknbwnh' host='ec2-18-215-111-67.compute-1.amazonaws.com' port=5432 password='3291eed2d0eee5981d45a60a08cdf67e4ed0cf3d1f7de29145abad97ad2266ae'"



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


        self.cursor.execute("""CREATE TABLE IF NOT EXISTS groups (
            groups_id SERIAL NOT NULL,
            name VARCHAR(255) NOT NULL,
            timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_DATE,
            PRIMARY KEY (groups_id)
            );""")

        self.cursor.execute("""CREATE TABLE IF NOT EXISTS chat (
            chat_id SERIAL NOT NULL,
            message VARCHAR(255) NOT NULL,
            groups_id INT REFERENCES groups(groups_id),
            email VARCHAR(50) REFERENCES rafiki(email),
            timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_DATE,
            PRIMARY KEY (chat_id)
            );""")


    
        self.cursor.execute("""CREATE TABLE IF NOT EXISTS Client (
            client_id SERIAL NOT NULL,
            name VARCHAR(50) NOT NULL,
            gender VARCHAR(50) NOT NULL,
            age VARCHAR(50) NOT NULL,
            nationality VARCHAR(50) NOT NULL,
            email VARCHAR(50) UNIQUE NOT NULL,
            phone  VARCHAR(50) NOT NULL,
            registration_date TIMESTAMP DEFAULT CURRENT_DATE,
            PRIMARY KEY (client_id)
            );""")


        self.cursor.execute("""CREATE TABLE IF NOT EXISTS Consent (
            consent_id SERIAL NOT NULL,
            reason TEXT NOT NULL,
            expectation TEXT NOT NULL,
            coping TEXT NOT NULL,
            addictions TEXT NOT NULL,
            harm TEXT NOT NULL,
            other TEXT NOT NULL,
            registration_date TIMESTAMP NOT NULL DEFAULT CURRENT_DATE,
            email VARCHAR(50) REFERENCES Client(email) NOT NULL,
            PRIMARY KEY (consent_id)
            );""")






