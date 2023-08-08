from flask import Blueprint, request , jsonify ,Response
from db import mysql

routes = Blueprint("routes", __name__,url_prefix='/api/groups')

@routes.route('/', methods=["POST"])
def create_group():
    group_name = request.json['group_name']
    group_description = request.json['group_description']
    # Code to create a new group in the database goes here
    return jsonify({'message': 'Group created successfully'}), 201

@routes.route('/<int:group_id>')
def get_group(group_id):
    # Code to fetch information about a specific group from the database goes here
    return jsonify({'group': group}), 200

@routes.route('/<int:group_id>/users/<int:user_id>', methods=["POST"])
def add_user_to_group(group_id, user_id):
    # Code to add a user to a specific group in the database goes here
    return jsonify({'message': 'User added to group successfully'}), 200

@routes.route('/<int:group_id>/users/<int:user_id>', methods=["DELETE"])
def remove_user_from_group(group_id, user_id):
    # Code to remove a user from a specific group in the database goes here
    return jsonify({'message': 'User removed from group successfully'}), 200

@routes.route('/<int:user_id>/groups')
def get_user_groups(user_id):
    # Code to fetch a list of all groups a user is a part of from the database goes here
    return jsonify({'groups': groups}), 200