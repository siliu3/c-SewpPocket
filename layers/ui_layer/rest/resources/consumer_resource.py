from flask_restful import Resource, reqparse, marshal_with
import re
from layers.use_case_layer.actors import ContributorActor,ConsumerActor
from layers.ui_layer.rest import arguments
from layers.ui_layer.rest import fields

from libs.cutoms import ex_reqparse


class ConsumerResource(Resource):

    def __init__(self):
        self._consumer_actor = None

    @marshal_with(fields.CONSUMER_RESOURCE_FIELDS)
    def get(self):
        request_parser = ex_reqparse.ExRequestParser()
        request_parser.add_argument(arguments.ACCESS_TOKEN_HEADER)

        request_args = request_parser.parse_args()
        access_token = re.sub('^Bearer ', '', request_args['Authorization'])

        self._consumer_actor = ConsumerActor(access_token)
        consumer = self._consumer_actor.get_consumer()
        return consumer, 200

    def put(self):
        pass
