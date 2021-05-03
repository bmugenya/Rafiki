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

