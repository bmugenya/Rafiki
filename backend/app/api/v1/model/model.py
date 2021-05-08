from ....db_con import database_setup
from passlib.apps import custom_app_context as pwd_context

class Model():

    def __init__(self):
        self.database = database_setup()
        self.cursor = self.database.cursor


    
    def add_user(self, name, email,password, photo):

        user = {

            "name": name,
            "email": email,
            "password":pwd_context.encrypt(password),
            "photo": photo
        }

        query = """INSERT INTO rafiki (name,email,password,photo)
            VALUES(%(name)s,%(email)s, %(password)s,%(photo)s);"""
        self.cursor.execute(query, user)
        self.database.conn.commit()

    def login(self, email, password):

        query = "SELECT password FROM rafiki WHERE email = '%s';" % (email)
        self.cursor.execute(query)
        pwd = self.cursor.fetchone()

        if pwd:
            if pwd_context.verify(password, pwd[0]):
                query = "SELECT name,email,photo FROM rafiki WHERE email = '%s';" % (email)
                self.cursor.execute(query)
                user = self.cursor.fetchone()
                post = {
                    "image": user[2],
                    "name": user[0],
                    "email":user[1]  
                }

                return post



    def addRoom(self,room):
        post = {
            "room": room
        }

        query = """INSERT INTO room (name) VALUES(%(room)s);"""
        self.cursor.execute(query, post)
        self.database.conn.commit()

        return post                      


    def post(self,image,message,email):
        post = {
            "image": image,
            "message": message,
            "email":email  
        }

        query = """INSERT INTO post (image,message,email)
            VALUES(%(image)s,%(message)s, %(email)s);"""
        self.cursor.execute(query, post)
        self.database.conn.commit()

        return post


    def getPosts(self):
        query = "SELECT post.post_id,post.image,post.message,post.timestamp,rafiki.name,rafiki.photo FROM post left join rafiki on post.email = rafiki.email ORDER BY post_id DESC;"
        self.cursor.execute(query)
        post= self.cursor.fetchall()

        return post


    def getRooms(self):
        query = "SELECT * FROM room;"
        self.cursor.execute(query)
        post= self.cursor.fetchall()
        feed = []
        for resp in post:
            row = {
            "room_id" :resp[0],
            "name" :resp[1],
            "created" :resp[2]
            }
            feed.append(row)

        return feed




    def get_chat(self,chat_id):
        query = "SELECT * FROM chat where room_id = '%s';" % (chat_id)
        self.cursor.execute(query)
        post= self.cursor.fetchall()
        data = []
        for resp in post:
            row = {
                "chat_id" :resp[0],
                "message" :resp[1],
                "room_id" :resp[2],
                "email":resp[3],
                'timestamp':resp[4]
            }
            data.append(row)

        return data


    def post_chat(self,message,room_id,email):
        post = {
            "message": message,
            "room_id": room_id,
            "email":email  
        }

        query = """INSERT INTO chat (message,room_id,email)
            VALUES(%(message)s,%(room_id)s, %(email)s);"""
        self.cursor.execute(query, post)
        self.database.conn.commit()

        return post
