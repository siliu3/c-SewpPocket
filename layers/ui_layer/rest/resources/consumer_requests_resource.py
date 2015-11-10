#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
consumer_requests_resource.py
 
Created by BigYuki on 15/11/10.
"""
from flask_restful import Resource, reqparse, marshal_with
import re
from layers.use_case_layer.actors import ContributorActor,ConsumerActor
from layers.ui_layer.rest import arguments
from layers.ui_layer.rest import fields

from libs.cutoms import ex_reqparse


class ConsumerRequestsResource(Resource):

    def __init__(self):
        self._consumer_actor = None

    @marshal_with(fields.CONSUMER_REQUEST_RESOURCE_FIELDS)
    def get(self):
        request_parser = ex_reqparse.ExRequestParser()
        request_parser.add_argument(arguments.ACCESS_TOKEN_HEADER)

        request_args = request_parser.parse_args()
        access_token = re.sub('^Bearer ', '', request_args['Authorization'])

        self._consumer_actor = ConsumerActor(access_token)
        requests = self._consumer_actor.get_consumer_requests()
        return requests, 200

    @marshal_with(fields.CONSUMER_REQUEST_RESOURCE_FIELDS)
    def post(self):
        request_parser = ex_reqparse.ExRequestParser()
        request_parser.add_argument(arguments.ACCESS_TOKEN_HEADER)
        request_args = request_parser.parse_args()
        access_token = re.sub('^Bearer ', '', request_args['Authorization'])
        self._consumer_actor = ConsumerActor(access_token)

        post_parser = ex_reqparse.ExRequestParser()
        post_parser.add_argument('post_id', type=int,required=True)

        post_args = post_parser.parse_args()
        post_id = post_args['post_id']

        return self._consumer_actor.make_post_request(post_id), 201