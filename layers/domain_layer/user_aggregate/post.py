#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
post.py
 
Created by BigYuki on 15/11/10.
"""
class Post(object):
    def __init__(self,name,category,price,description):
        self.id = None
        self.name = name
        self.category = category
        self.price = price
        self.description = description

        self.requests = []
        self.deal_request = None

    def is_sold(self):
        return self.deal_request != None

    def get_request(self,request_id):
        for request in self.requests:
            if request.id == request_id:
                return request
        # for request in self.requests:
        #     if request.id == request_id:
        #         request.set_agree()
        #         self.deal_request = request
        #     else:
        #         request.set_refuse()
    #
    # def refuse_request(self,request_id):
    #     for request in self.requests:
    #         if request.id == request_id:
    #             request.set_refuse()
