#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
user.py
 
Created by BigYuki on 15/11/10.
"""
class User(object):
    USER_IDENTITY = "USER"
    CONSUMER_IDENTITY = "CONSUMER"
    CONTRIBUTOR_IDENTITY = "CONTRIBUTOR"
    REGULATOR_IDENTITY = "REGULATOR"

    def __init__(self,nickname,email,phone,name,eid):
        self.id = None
        self.nickname = nickname
        self.email = email
        self.phone = phone
        self.name = name
        self.eid = eid

    @property
    def is_user(self):
        return True

    @property
    def is_consumer(self):
        return self.user_type == User.CONSUMER_IDENTITY or\
               self.user_type == User.CONTRIBUTOR_IDENTITY or\
                self.user_type == User.REGULATOR_IDENTITY
    @property
    def is_contributor(self):
        return self.user_type == User.CONTRIBUTOR_IDENTITY or\
                self.user_type == User.REGULATOR_IDENTITY
    @property
    def is_regulator(self):
        return self.user_type == User.REGULATOR_IDENTITY








