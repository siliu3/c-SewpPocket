#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
user_actor.py
 
Created by BigYuki on 15/11/11.
"""
from layers.use_case_layer.systems import AuthSystem
from layers.domain_layer.repositories import UserRepository

from layers.infrastructure_layer.context import Transaction_


class UserActor(object):

    def __init__(self, access_token):
        self._access_token = access_token
        self._user_id = AuthSystem().token_to_user_id(access_token)

    def get_user(self):
        return UserRepository().get_user(self._user_id)