from flask import Blueprint, request , jsonify ,Response
import jwt
from db import mysql

routes = Blueprint("routes", __name__,url_prefix='/api/posts')

def check_token():
    try:
        token = request.headers["Authorization"]
        token = token.split(" ")[1]
        data = jwt.decode(token , "secret", algorithms=["HS256"])
        return data
    except Exception as e:
        raise Exception("please login again")



@routes.route('/', methods=["POST"])
def create_post():
    try:
        current_user = check_token()
        content = request.json["content"]
        cursor = mysql.connection.cursor()
        cursor.execute("INSERT INTO posts (content ,author_id) VALUES (%s,%s)", (content , current_user["id"]))
        data = mysql.connection.commit()
        return jsonify({ "data" : {
            "content" : content , "author_id" : current_user["id"]
        }})
    except Exception as e :
        return Response(
           {"error" :  str(e)},
                status=404,
            )





@routes.route('/my')
def get_current_user_posts():
    try:
        current_user = check_token()
        cursor = mysql.connection.cursor()
        cursor.execute("SELECT posts.id, posts.content, posts.author_id, users.username FROM posts INNER JOIN users ON posts.author_id = users.id WHERE posts.author_id = %s", (current_user["id"],))
        data = cursor.fetchall()
        print(len(data))

        cursor.close()    
        if not len(data):
            return Response(
                        {"error" : "posts not found"},
                            status=404,
                        )
        print(data)
        return jsonify({ "data" : data})
    except Exception as e :
        print(str(e))
        return Response(
           {"error" :  str(e)},
                status=404,
            )
