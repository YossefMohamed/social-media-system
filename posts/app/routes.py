from flask import Blueprint, request , jsonify ,Response
from db import mysql
from helpers import check_token , is_current_user_author

routes = Blueprint("routes", __name__,url_prefix='/api/posts')

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
           str(e),
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
                        "posts not found",
                            status=404,
                        )
        print(data)
        return jsonify({ "data" : data})
    except Exception as e :
        print(str(e))
        return Response(
           str(e),
                status=404,
            )

@routes.route("/<int:post_id>", methods=["DELETE"])
def delete_post(post_id):
    try:

        if not is_current_user_author(post_id):
            return Response(
            {"error" :  "Post not found"},
                status=404,
            )
        cur = mysql.connection.cursor()
        cur.execute('DELETE FROM posts WHERE id = %s', (post_id,))
        mysql.connection.commit()
        cur.close()
        return  {"message": "post deleted"}
    except Exception as e :
        return Response(
             str(e),
                status=404,
            )

@routes.route("/<int:post_id>", methods=["PATCH"])
def edit_post(post_id):
    try:
        current_user = check_token()
        if not is_current_user_author(post_id):
            return Response(
            "Post not found",
                status=404,
            )
        content = request.json["content"]
        cur = mysql.connection.cursor()
        cur.execute('UPDATE posts SET content = %s WHERE id = %s', (content, post_id))
        mysql.connection.commit()
        cur.close()
        return jsonify({ "data" : {
            "content" : content , "author_id" : current_user["id"]
        }})
    except Exception as e :
        return Response(
             str(e),
                status=404,
            )
    
@routes.route("/feed")
def get_feed():
    try:
        current_user = check_token()
        cur = mysql.connection.cursor()
        cur.execute('SELECT posts.id, posts.content, posts.author_id, users.username FROM posts INNER JOIN users ON posts.author_id = users.id WHERE posts.author_id IN (SELECT follower_id FROM followers WHERE user_id = %s)', (current_user["id"],))
        data = cur.fetchall()
        cur.close()
        posts = []
        for post in data:
            posts.append({
                "id": post["id"],
                "content": post["content"],
                "author_id": post["author_id"],
                "username": post["username"],
            })
        return jsonify({ "data" : posts})
    except Exception as e :
        return Response(
             str(e),
                status=404,
            )

@routes.route("/<int:user_id>")
def get_user_posts(user_id):
    try:
        current_user = check_token()
        cursor = mysql.connection.cursor()
        cursor.execute("SELECT posts.id, posts.content, posts.author_id, users.username FROM posts INNER JOIN users ON posts.author_id = users.id WHERE posts.author_id = %s", (user_id,))
        data = cursor.fetchall()
        cursor.close()
        if not len(data):
            return Response(
            "posts not found",
            status=404,
            )
        return jsonify({ "data" : data})
    except Exception as e :
        return Response(
        str(e),
        status=404,
        )