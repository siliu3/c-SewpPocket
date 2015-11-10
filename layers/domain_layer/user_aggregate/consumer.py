#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
consumer.py
 
Created by BigYuki on 15/11/10.
"""
from user import  User
from comment import Comment
from request import Request

class Consumer(User):
    def __init__(self,nickname,email,phone,name,eid):
        User.__init__(self,nickname,email,phone,name,eid)
        self.requests = []

    def get_requests(self):
        return self.requests

    def make_request(self,post_id):
        request = Request(post_id)
        self.requests.append(request)
        return request

    def get_request_comments(self,request_id):
        for request in self.requests:
            if request.id == request_id:
                return request.comments

    def new_request_comment(self,request_id,content):
        for request in self.requests:
            if request.id == request_id:
                comment = Comment(content, self.nickname)
                request.add_comment(comment)
                return comment