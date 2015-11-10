#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
contributor_post_request_resource.py
 
Created by BigYuki on 15/11/10.
"""
from flask_restful import Resource, reqparse, marshal_with
import re
from layers.use_case_layer.actors import ContributorActor,ConsumerActor
from layers.ui_layer.rest import arguments
from layers.ui_layer.rest import fields

from libs.cutoms import ex_reqparse


class ContributorPostRequestResource(Resource):

    def __init__(self):
        self._consumer_actor = None
        self._contributor_actor = None

    @marshal_with(fields.CONTRIBUTOR_POST_REQUEST_RESOURCE_FIELDS)
    def put(self,post_id,request_id):
        request_parser = ex_reqparse.ExRequestParser()
        request_parser.add_argument(arguments.ACCESS_TOKEN_HEADER)
        request_args = request_parser.parse_args()
        access_token = re.sub('^Bearer ', '', request_args['Authorization'])
        self._contributor_actor = ContributorActor(access_token)

        post_parser = ex_reqparse.ExRequestParser()
        post_parser.add_argument('agree', type=bool,required=True)

        post_args = post_parser.parse_args()
        agree = post_args['agree']

        if agree:
            return self._contributor_actor.agree_post_request(post_id,request_id), 200
        else:
            return self._contributor_actor.refuse_post_request(post_id,request_id), 200