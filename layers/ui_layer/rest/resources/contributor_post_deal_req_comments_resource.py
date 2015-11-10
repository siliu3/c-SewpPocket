#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
contributor_post_deal_req_comments_resource.py
 
Created by BigYuki on 15/11/10.
"""

from flask_restful import Resource, reqparse, marshal_with
import re
from layers.use_case_layer.actors import ContributorActor,ConsumerActor
from layers.ui_layer.rest import arguments
from layers.ui_layer.rest import fields

from libs.cutoms import ex_reqparse

class ContributorPostDealReqCommentsResource(Resource):

    def __init__(self):
        self._contributor_actor = None

    @marshal_with(fields.CONTRIBUTOR_POST_REQUEST_COMMENT_RESOURCE_FIELDS)
    def get(self,post_id):
        request_parser = ex_reqparse.ExRequestParser()
        request_parser.add_argument(arguments.ACCESS_TOKEN_HEADER)
        request_args = request_parser.parse_args()
        access_token = re.sub('^Bearer ', '', request_args['Authorization'])
        self._contributor_actor = ContributorActor(access_token)

        return self._contributor_actor.get_post_deal_req_comments(post_id)


    @marshal_with(fields.CONTRIBUTOR_POST_REQUEST_COMMENT_RESOURCE_FIELDS)
    def post(self,post_id):
        request_parser = ex_reqparse.ExRequestParser()
        request_parser.add_argument(arguments.ACCESS_TOKEN_HEADER)
        request_args = request_parser.parse_args()
        access_token = re.sub('^Bearer ', '', request_args['Authorization'])
        self._contributor_actor = ContributorActor(access_token)

        post_parser = ex_reqparse.ExRequestParser()
        post_parser.add_argument('content', required=True)

        post_args = post_parser.parse_args()
        content = post_args['content']


        return self._contributor_actor.new_post_deal_req_comment(post_id,content),201