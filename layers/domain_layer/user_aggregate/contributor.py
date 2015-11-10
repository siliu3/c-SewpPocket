#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
contributor.py
 
Created by BigYuki on 15/11/10.
"""
from consumer import Consumer
from post import Post
from comment import Comment

class Contributor(Consumer):
    def __init__(self,nickname,email,phone,name,eid):
        Consumer.__init__(self,nickname,email,phone,name,eid)
        self.posts = []


    def new_post(self,name,category,price,description):
        post = Post(name,category,price,description)
        self.posts.append(post)
        return post

    def get_post_deal_req_comments(self,post_id):
        for post in self.posts:
            if post.id == post_id:
                return post.deal_request.comments

    def new_post_deal_req_comment(self,post_id,content):
        for post in self.posts:
            if post.id == post_id:
                comment = Comment(content, self.nickname)
                post.deal_request.add_comment(comment)
                return comment

    def agree_post_request(self,post_id,request_id):
        for post in self.posts:
            if post.id == post_id:
                request = post.get_request(request_id)
                request.set_agree()
                return request

    def refuse_post_request(self,post_id,request_id):
        for post in self.posts:
            if post.id == post_id:
                request = post.get_request(request_id)
                request.set_refuse()
                return request