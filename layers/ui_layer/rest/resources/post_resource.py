#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
post_resource.py
 
Created by BigYuki on 15/11/11.
"""
from flask_restful import Resource, reqparse, marshal_with
import re
from layers.use_case_layer.actors import RegulatorActor
from layers.ui_layer.rest import arguments
from layers.ui_layer.rest import fields

from libs.cutoms import ex_reqparse

class PostResource(Resource):
    def __init__(self):
        self._regulator_actor = None

    @marshal_with(fields.POST_RESOURCE_FIELDS)
    def delete(self,post_id):
        request_parser = ex_reqparse.ExRequestParser()
        request_parser.add_argument(arguments.ACCESS_TOKEN_HEADER)

        request_args = request_parser.parse_args()
        access_token = re.sub('^Bearer ', '', request_args['Authorization'])

        self._regulator_actor = RegulatorActor(access_token)
        post = self._regulator_actor.delete_post(post_id)
        return post, 200
