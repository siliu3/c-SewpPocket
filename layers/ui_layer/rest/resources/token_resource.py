from flask_restful import Resource, marshal_with, fields
from flask import current_app, request
import base64
import re
import unittest
import random
#
from libs.cutoms import testtools
from layers.use_case_layer.actors import SomeoneActor
from libs.cutoms import ex_reqparse
from layers.ui_layer.rest import arguments


token_resource_fields = {
    'access_token': fields.String,
    'refresh_token': fields.String,
    'token_type': fields.String,
    'expire': fields.Integer
}


class TokenResource(Resource):

    def __init__(self):
        self._someone_actor = SomeoneActor()

    @marshal_with(token_resource_fields)
    def post(self):

        request_parser = ex_reqparse.ExRequestParser()
        request_parser.add_argument(arguments.BASIC_AUTH_HEADER)

        request_args = request_parser.parse_args()
        b64client = re.sub('^Basic ', '', request_args['Authorization'])

        try:
            username, password = base64.b64decode(b64client).split(':')
        except:
            username, password = ('', '')

        token = self._someone_actor.create_token(username, password)

        return token, 201


class TokenResourceTestCase(unittest.TestCase):

    def setUp(self):
        self._test_client = current_app.test_client()

    def test_post(self):
        username = "test_username_%d" % random.randint(99, 1000)
        password = 'admin'
        testtools.regist(self._test_client, username, password)

        auth_string = base64.b64encode("%s:%s" % (username, password))
        headers = {
            'Authorization': "Basic %s" % auth_string
        }
        data = {
            'type': "NORMAL"
        }
        rv = self._test_client.post('/api/token', headers=headers,data=data)

        self.assertTrue(
            rv.status_code == 201,
            msg="http code is %d not 201" % rv.status_code)


if __name__ == "__main__":
    from app import App
    from constants.enums import AppMode

    app = App(AppMode.Test)
    app.init()

    unittest.main()
