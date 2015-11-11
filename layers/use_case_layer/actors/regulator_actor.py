#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
regulator_actor.py.py
 
Created by BigYuki on 15/11/10.
"""
from contributor_actor import ContributorActor
from layers.domain_layer.repositories import PostRepository,UserRepository,CommentRepository
from layers.infrastructure_layer.error.error_type import NotARegulatorError
class RegulatorActor(ContributorActor):

    def __init__(self, access_token):
        ContributorActor.__init__(self,access_token)

        user = UserRepository.get(self._user_id)
        if not user.is_regulator:
            raise NotARegulatorError("You are not a regulator!")


    def delete_post(self,post_id):
        post = PostRepository().get(post_id)
        PostRepository().delete(post)
        return post


    def delete_comment(self,comment_id):
        comment = CommentRepository().get(comment_id)
        CommentRepository().delete(comment)
        return comment