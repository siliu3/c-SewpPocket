import copy
import re
import unittest
import random
from flask_restful import Resource, marshal_with, reqparse
from flask import current_app
#
from libs.cutoms import ex_reqparse
from layers.ui_layer.rest import arguments
from layers.ui_layer.rest import fields
from layers.use_case_layer.actors import SomeoneActor, ContributorActor
from libs.cutoms import testtools


class AccountResource(Resource):

    def __init__(self):

        self._someone_actor = SomeoneActor()
        self._contributor_actor = None

    @marshal_with(fields.ACCOUNT_RESOURCE_FIELDS)
    def get(self):
        request_parser = ex_reqparse.ExRequestParser()
        request_parser.add_argument(arguments.ACCESS_TOKEN_HEADER)

        request_args = request_parser.parse_args()
        access_token = re.sub('^Bearer ', '', request_args['Authorization'])

        self._contributor_actor = ContributorActor(access_token)

        account = self._contributor_actor.get_account()
        return account, 200

    @marshal_with(fields.ACCOUNT_RESOURCE_FIELDS)
    def post(self):

        new_account_parser = reqparse.RequestParser()
        new_account_parser.add_argument('username',required=True)
        new_account_parser.add_argument('password',required=True)
        new_account_parser.add_argument('nickname',required=True)
        new_account_parser.add_argument('email',required=True)
        new_account_parser.add_argument('phone',required=True)
        new_account_parser.add_argument('name',required=True)
        new_account_parser.add_argument('eid',required=True)
        new_account_parser.add_argument('secret',required=True)


        args = new_account_parser.parse_args()
        username    = args['username']
        password    = args['password']
        nickname    = args['nickname']
        email       = args['email']
        phone   = args['phone']
        name    = args['name']
        eid     = args['eid']
        secret  = args['secret']

        account = self._someone_actor.create_account(username, password,nickname,email,phone,name,eid,secret)
        return account, 201



