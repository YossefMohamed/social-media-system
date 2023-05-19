from db import mysql
import jwt
from flask import Blueprint, request , jsonify ,Response





def check_token():
    try:
        token = request.headers["Authorization"]
        token = token.split(" ")[1]
        data = jwt.decode(token , "secret", algorithms=["HS256"])
        return data
    except Exception as e:
        raise Exception("please login again")






def is_current_user_author(post_id):
    current_user = check_token()
    cur = mysql.connection.cursor()
    cur.execute('SELECT author_id FROM posts WHERE id = %s', (str(post_id),))
    data = cur.fetchall()
    author_id = data[0]["author_id"]
    cur.close()
    return author_id == current_user["id"]


