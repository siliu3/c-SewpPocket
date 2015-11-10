#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
request.py
 
Created by BigYuki on 15/11/10.
"""
class Request(object):
    WAITING = "waiting"
    AGREE = "agree"
    REFUSE = "refused"
    def __init__(self,post_id):
        self.id = None
        self.status = Request.WAITING
        self.post_id = post_id
        self.comments = []

    def add_comment(self,comment):
        self.comments.append(comment)

    def set_agree(self):
        self.status = Request.AGREE
        self.post.deal_request = self
        for request in self.post.requests:
            if request.id != self.id:
                request.set_refuse()

    def set_refuse(self):
        self.status = Request.REFUSE
