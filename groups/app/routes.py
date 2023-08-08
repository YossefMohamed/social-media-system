from flask import Blueprint, request , jsonify ,Response
from db import mysql

routes = Blueprint("routes", __name__,url_prefix='/api/groups')

@routes.route('/', methods=["POST"])
def create_group():
    # Code to create a new group goes here
    pass

@routes.route('/<int:group_id>')
def get_group(group_id):
    # Code to get information about a group goes here
    pass

@routes.route('/<int:group_id>/users/<int:user_id>', methods=["POST"])
def add_user_to_group(group_id, user_id):
    # Code to add a user to a group goes here
    pass

@routes.route('/<int:group_id>/users/<int:user_id>', methods=["DELETE"])
def remove_user_from_group(group_id, user_id):
    # Code to remove a user from a group goes here
    pass

@routes.route('/<int:user_id>/groups')
def get_user_groups(user_id):
    # Code to get a list of all groups a user is a part of goes here
    pass