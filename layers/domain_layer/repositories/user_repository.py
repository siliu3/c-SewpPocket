#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
user_repository.py
 
Created by BigYuki on 15/11/10.
"""
from repository import Repository
from layers.domain_layer.user_aggregate import User,Contributor,Consumer

class UserRepository(Repository):


    def add(self, user):
        self.session.add(user)
        self.session.flush()

    def save(self, user):
        self.session.flush()

    def get(self, user_id):
        return self.session.query(User).get(user_id)

    def get_contributor(self,user_id):
        return self.session.query(Contributor).get(user_id)

    def get_consumer(self,user_id):
        return self.session.query(Consumer).get(user_id)

    def get_user(self,user_id):
        return self.session.query(User).get(user_id)