#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
comments_resource.py.py
 
Created by BigYuki on 15/11/14.
"""
from flask_restful import Resource, reqparse, marshal_with
import re
from layers.use_case_layer.actors import RegulatorActor
from layers.ui_layer.rest import arguments
from layers.ui_layer.rest import fields

from libs.cutoms import ex_reqparse

class CommentsResource(Resource):
    def __init__(self):
        self._regulator_actor = None

    @marshal_with(fields.COMMENT_RESOURCE_FIELDS)
    def get(self):
        request_parser = ex_reqparse.ExRequestParser()
        request_parser.add_argument(arguments.ACCESS_TOKEN_HEADER)

        request_args = request_parser.parse_args()
        access_token = re.sub('^Bearer ', '', request_args['Authorization'])

        self._regulator_actor = RegulatorActor(access_token)
        comments = self._regulator_actor.get_all_comments()
        return comments, 200


