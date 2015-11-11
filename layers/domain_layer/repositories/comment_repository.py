#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
comment_repository.py
 
Created by BigYuki on 15/11/11.
"""
from repository import Repository
from layers.domain_layer.user_aggregate import Comment

class CommentRepository(Repository):

    def all(self):
        return self.session.query(Comment).all()

    def get(self,comment_id):
        return  self.session.query(Comment).get(comment_id)

    def add(self, comment):
        self.session.add(comment)
        self.session.flush()

    def save(self, comment):
        self.session.flush()

    def delete(self,comment):
        self.session.delete(comment)
