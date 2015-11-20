#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
consumer_actor.py.py
 
Created by BigYuki on 15/11/10.
"""
from layers.use_case_layer.systems import AuthSystem
from layers.domain_layer.repositories import UserRepository,TokenRepository
from layers.domain_layer.repositories import AccountRepository,PostRepository

from layers.infrastructure_layer.context import Transaction_
from layers.infrastructure_layer.error.error_type import RequestSelfPostError
from user_actor import  UserActor
class ConsumerActor(UserActor):

    def get_account(self):
        account_username = AuthSystem().token_to_account_username(
            self._access_token)
        return AccountRepository().get(account_username)

    def get_consumer(self):
        return UserRepository().get_consumer(self._user_id)

    def get_consumer_requests(self):
        consumer = self.get_consumer()
        return consumer.get_requests()


    def get_consumer_request_comments(self,request_id):
        consumer = self.get_consumer()
        return consumer.get_request_comments(request_id)

    def get_all_posts(self):
        return PostRepository().all()

    @Transaction_
    def new_consumer_request_comment(self,request_id,content):
        consumer = self.get_consumer()
        return consumer.new_request_comment(request_id,content)

    @Transaction_
    def make_post_request(self,post_id):
        if self.get_consumer().is_contributor:
            if UserRepository().get_contributor(self._user_id).get_post(post_id)!=None:
                raise RequestSelfPostError("You cannot make a request to your own post!")
        consumer = self.get_consumer()
        return consumer.make_request(post_id)

    @Transaction_
    def update_account(self,username,password):
        the_account = self.get_account()
        the_account.username = username
        the_account.change_password(password)

        AccountRepository().save(the_account)

        token = TokenRepository().get(self._access_token)
        token.account_username = username
        TokenRepository().save(token)
        return the_account
