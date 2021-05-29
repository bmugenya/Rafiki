from ....db_con import database_setup
from passlib.apps import custom_app_context as pwd_context

class Model():

    def __init__(self):
        self.database = database_setup()
        self.cursor = self.database.cursor


    
    def add_user(self, name, email,password, photo):
        isRafiki = False

        user = {

            "name": name,
            "email": email,
            "password":pwd_context.encrypt(password),
            "photo": photo,
            "isRafiki":isRafiki
        }

        query = """INSERT INTO rafiki (name,email,password,photo,isRafiki)
            VALUES(%(name)s,%(email)s, %(password)s,%(photo)s,%(isRafiki)s);"""
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

        query = """INSERT INTO groups (name) VALUES(%(room)s);"""
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
        query = "SELECT post.post_id,post.image,post.message,post.timestamp,rafiki.name,rafiki.photo,rafiki.isRafiki FROM post left join rafiki on post.email = rafiki.email ORDER BY post_id DESC;"
        self.cursor.execute(query)
        post= self.cursor.fetchall()

        return post


    def getRooms(self):
        query = "SELECT groups_id,name,timestamp,(SELECT chat.message from chat where chat.groups_id=groups.groups_id ORDER BY chat.chat_id DESC LIMIT 1) FROM groups;"
        self.cursor.execute(query)
        post= self.cursor.fetchall()
        feed = []
        for resp in post:
            row = {
            "room_id" :resp[0],
            "name" :resp[1],
            "created" :resp[2],
            'message':resp[3]
            }
            feed.append(row)

        return feed


    def get_name(self,room_id):
        query = "SELECT name FROM groups where groups_id = '%s';" % (room_id)
        self.cursor.execute(query)
        post= self.cursor.fetchone()
        return post




    def get_chat(self,chat_id):
        query = "SELECT chat.chat_id,chat.message,chat.groups_id,chat.email,chat.timestamp,groups.name FROM chat left join groups on chat.groups_id = groups.groups_id where groups.groups_id = '%s';" % (chat_id)
        self.cursor.execute(query)
        post= self.cursor.fetchall()

        data = []
        for resp in post:
            row = {
                "chat_id" :resp[0],
                "message" :resp[1],
                "room_id" :resp[2],
                "email":resp[3],
                'timestamp':resp[4],
                'name':resp[5]
            }
            data.append(row)

        return data


    def post_chat(self,message,room_id,email):
        if not email:
            email = 'rafiki@gmail.com'
        post = {
            "message": message,
            "room_id": room_id,
            "email":email  
        }

        query = """INSERT INTO chat (message,groups_id,email)
            VALUES(%(message)s,%(room_id)s, %(email)s);"""
        self.cursor.execute(query, post)
        self.database.conn.commit()

        return post


    def add_comment(self,post_id,comment,email):
        post = {
            "comment": comment,
            "post_id": post_id,
            "email":email  
        }

        query = """INSERT INTO respond (respond,email,post_id)
            VALUES(%(comment)s,%(email)s, %(post_id)s);"""
        self.cursor.execute(query, post)
        self.database.conn.commit()

        return post


    def get_comments(self,post_id):
        query = "SELECT respond.respond,respond.respond_id,respond.email,respond.post_id,respond.timestamp,rafiki.name,rafiki.photo,rafiki.israfiki FROM respond left join rafiki on respond.email = rafiki.email where respond.post_id = '%s';" % (post_id)
        self.cursor.execute(query)
        post= self.cursor.fetchall()
        data = []
        for resp in post:
            row = {
                "comment_id" :resp[1],
                "comment" :resp[0],
                "timestamp" :resp[4],
                "email":resp[2],
                'post_id':resp[3],
                'photo':resp[6],
                'name':resp[5],
                'isRafiki':resp[7]
            }
            data.append(row)

        return data


    def search_post(self, search):
        self.cursor.execute("SELECT * FROM post WHERE message LIKE '%s';" % ("%" + search + "%"))
        query = self.cursor.fetchall()
        data = []
        for resp in query:
            row = {
                "post_id" :resp[0],
                "photo" :resp[1],
                "timestamp" :resp[2],
                "email":resp[3]
            }
            data.append(row)

        return data



    def add_client(self,name,gender,age,nationality,email,phone):
        post = {
            "email": email,
            "name": name,
            "gender":gender,
            "age": age,
            "nationality": nationality,
            "email": email,
            "phone": phone
        }

        query = """INSERT INTO Client (name,gender,age,nationality,email,phone)
            VALUES(%(name)s,%(gender)s,%(age)s,%(nationality)s,%(email)s,%(phone)s);"""

        self.cursor.execute(query, post)
        self.database.conn.commit()
        return post

    def add_consent(self,reason,expectation,addictions,coping,harm,other,email):
        post = {
            "email": email,
            "reason": reason,
            "expectation":expectation,
            "addictions": addictions,
            "harm": harm,
            "other": other,
            "coping": coping,
          

        }

        query = """INSERT INTO Consent(reason,expectation,addictions,coping,harm,other,email)
            VALUES(%(reason)s,%(expectation)s,%(addictions)s,%(coping)s,%(harm)s,%(other)s,%(email)s);"""

        self.cursor.execute(query, post)
        self.database.conn.commit()

        return post


    def get_client(self,email):
        query = "SELECT * FROM client WHERE email= '%s';" % (email)
        self.cursor.execute(query)
        story = self.cursor.fetchone()

        return story

