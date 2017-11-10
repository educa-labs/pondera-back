import psycopg2 as psql


class DataBase:

    def __init__(self):
        self.conn = psql.connect("""
            dbname=pondera_development
            user=pondera_admin
            password=123456
            host=localhost
            port=5432""")
        self.cur = self.conn.cursor()

    def create(self):
        self.cur.execute("DROP TABLE IF EXISTS Users, Session, Ponderation, Scores, Opt;")
        self.cur.execute("""CREATE TABLE 
                        Users(id serial primary key, name text, mail text UNIQUE, 
                        password_digest text, hash text, 
                        rut text UNIQUE, phone text, city text, token text);
                        """)
        self.cur.execute("""CREATE TABLE
                        Session(token text, user_id int primary key);
                        """)
        self.cur.execute("""CREATE TABLE
                        Scores(id serial, user_id int, mat int, leng int,
                        opt int, opt_id int)
                        """)
        self.cur.execute("""CREATE TABLE
                        Opt(id serial primary key, name text);
                        """)
        self.cur.execute("""CREATE TABLE
                        Ponderation(id serial primary key, value int,
                         university text, carreer int, user_id int,
                         university_id int, carreer_id int);
                        """)
        self.cur.execute("""CREATE TABLE
                        Cities(id int, name text, region_id int)
                        """)
        self.cur.execute("""CREATE TABLE
                        Region(id int, name text)
                        """)
        self.conn.commit()

    def seed(self):
        self.cur.execute('''INSERT INTO Opt(name) VALUES('Historia');''')
        self.cur.execute('''INSERT INTO Opt(name) VALUES('Ciencias');''')
        self.conn.commit()



if __name__ == "__main__":
    db = DataBase()
    db.create()
    db.seed()
    db.conn.close()