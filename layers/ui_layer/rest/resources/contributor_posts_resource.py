#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
contributor_posts_resource.py.py
 
Created by BigYuki on 15/11/10.
"""
from flask_restful import Resource, reqparse, marshal_with
import re
from layers.use_case_layer.actors import ContributorActor,ConsumerActor
from layers.ui_layer.rest import arguments
from layers.ui_layer.rest import fields

from libs.cutoms import ex_reqparse


class ContributorPostsResource(Resource):

    def __init__(self):
        self._contributor_actor = None

    @marshal_with(fields.CONTRIBUTOR_POST_RESOURCE_FIELDS)
    def get(self):
        request_parser = ex_reqparse.ExRequestParser()
        request_parser.add_argument(arguments.ACCESS_TOKEN_HEADER)

        request_args = request_parser.parse_args()
        access_token = re.sub('^Bearer ', '', request_args['Authorization'])

        self._contributor_actor = ContributorActor(access_token)
        posts = self._contributor_actor.get_contributor_posts()
        return posts, 200

    @marshal_with(fields.CONTRIBUTOR_POST_RESOURCE_FIELDS)
    def post(self):
        request_parser = ex_reqparse.ExRequestParser()
        request_parser.add_argument(arguments.ACCESS_TOKEN_HEADER)
        request_args = request_parser.parse_args()
        access_token = re.sub('^Bearer ', '', request_args['Authorization'])
        self._contributor_actor = ContributorActor(access_token)

        post_parser = ex_reqparse.ExRequestParser()
        post_parser.add_argument('name', required=True)
        post_parser.add_argument('category', required=True)
        post_parser.add_argument('price', type=int,required=True)
        post_parser.add_argument('description', required=True)

        post_args = post_parser.parse_args()
        name = post_args['name']
        category = post_args['category']
        price = post_args['price']
        description = post_args['description']

        return self._contributor_actor.create_new_post(name,category,price,description), 201
