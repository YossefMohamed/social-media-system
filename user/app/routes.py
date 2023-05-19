from flask import Blueprint, request , jsonify ,Response
import jwt
from db import mysql
import bcrypt

routes = Blueprint("routes", __name__,url_prefix='/api/users')

def check_token():
    try:
        token = request.headers["Authorization"]
        token = token.split(" ")[1]
        data = jwt.decode(token , "secret", algorithms=["HS256"])
        return data
    except Exception as e:
        raise Exception("please login again")



@routes.route('/<int:user_id>')
def get_user_by_id(user_id):
    try:
        current_user = check_token()
        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM users WHERE id = %s', (str(user_id)))
        data = cur.fetchall()
        cur.close()
        print(data)
        if not len(data) :
            return Response(
                "user not found",
                status=404,
            )
        user = data[0]
        return jsonify({ "data" : user})
    except Exception as e :
        return Response(
           {"error" :  str(e)},
            status=404,
        )




@routes.route('/')
def get_current_user():
    try:
        current_user = check_token()
        return jsonify({ "data" : current_user})
    except Exception as e :
        return Response(
           {"error" :  str(e)},
                status=404,
            )







@routes.route('/login', methods=["POST"])
def login():
    username = request.json["username"]
    password = request.json["password"]

    if not username and not password:
        return Response(
               "Invalid username or password",
                status=404,
            )
    # Check if the user exists and the password is correct
    print(username)
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT * FROM users WHERE username = %s", (username,))
    data =cursor.fetchall()
    if not len(data) :
       return Response(
                    {"error" : "Invalid username or password"},
                status=404,
            )
    user = data[0]
    cursor.close()
    if not bcrypt.checkpw(password.encode("utf-8"), user["password"].encode("utf-8")):
        return Response(
                    {"error" : "Invalid username or password"},
                        status=404,
                    )
    token = jwt.encode({"id": user["id"],"username" : user["username"]}, "secret", algorithm="HS256")
    return {"data" :{"id": user["id"],"username" : user["username"],"token": token}}





@routes.route("/register", methods=["POST"])
def register():
    username = request.json["username"]
    password = request.json["password"]
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT * FROM users WHERE username = %s", (username,))
    data = cursor.fetchall()
    cursor.close()    
    if len(data):
        return Response(
                    {"error" : "username already exists"},
                        status=404,
                    )
    hashed_password = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())
    cursor = mysql.connection.cursor()
    cursor.execute("INSERT INTO users (username, password) VALUES (%s,%s)", (username , hashed_password))
    data = mysql.connection.commit()
    cursor.execute("SELECT * FROM users WHERE username = %s", (username,))
    data = cursor.fetchall()
    cursor.close()
    user = (data[0])
    token = jwt.encode({"id": user["id"],"username" : user["username"]}, "secret", algorithm="HS256")
    # Return the token to the user
    return {"data" : {"id": user["id"],"username" : user["username"],"token": token}}





@routes.route("/all")
def get_all_users():
    try:
        current_user = check_token()
        print(current_user)
        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM users')
        data = cur.fetchall()
        cur.close()
        print(data)
        if not len(data) :
            return Response(
                "users not found",
                status=404,
            )
        users = []
        for user in data:
            users.append({
                "id": user["id"],
                "username": user["username"],
            })
        return jsonify({ "data" : users})
    except Exception as e :
        return Response(
           {"error" :  str(e)},
            status=404,
        )
    



@routes.route("/follow/<int:user_id>", methods=["POST"])
def follow_user(user_id):
    try:
        current_user = check_token()
        cur = mysql.connection.cursor()
        cur.execute('INSERT INTO followers (user_id, follower_id) VALUES (%s,%s)', (current_user["id"], user_id))
        mysql.connection.commit()
        cur.close()
        return  {"message": "user followed"}
    except Exception as e :
        return Response(
            {"error" :  str(e)},
                status=404,
            )




@routes.route("/following")
def get_following():
    try:
        current_user = check_token()
        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM followers WHERE user_id = %s', (current_user["id"],))
        data = cur.fetchall()
        cur.close()
        users = []
        for user in data:
            users.append({
                "user_id": user["user_id"],
                "follower_id": user["follower_id"],
            })
        return jsonify({ "data" : users})
    except Exception as e :
        return Response(
            {"error" :  str(e)},
                status=404,
            )
    





@routes.route("/followers")
def get_followers():
    try:
        current_user = check_token()
        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM followers WHERE follower_id = %s', (current_user["id"],))
        data = cur.fetchall()
        cur.close()
        users = []
        for user in data:
            users.append({
                "user_id": user["user_id"],
                "follower_id": user["follower_id"],
            })
        return jsonify({ "data" : users})
    except Exception as e :
        return Response(
            {"error" :  str(e)},
                status=404,
            )


@routes.route("/unfollow/<int:user_id>", methods=["POST"])
def unfollow_user(user_id):
    try:
        current_user = check_token()
        cur = mysql.connection.cursor()
        cur.execute('DELETE FROM followers WHERE user_id = %s AND follower_id = %s', (current_user["id"], user_id))
        mysql.connection.commit()
        cur.close()
        return  {"message": "user unfollowed"}
    except Exception as e :
        return Response(
            {"error" :  str(e)},
                status=404,
            )