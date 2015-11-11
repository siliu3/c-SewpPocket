#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
post_repository.py.py
 
Created by BigYuki on 15/11/10.
"""
from repository import Repository
from layers.domain_layer.user_aggregate import Post

class PostRepository(Repository):

    def all(self):
        return self.session.query(Post).all()

    def get(self,post_id):
        return  self.session.query(Post).get(post_id)

    def add(self, post):
        self.session.add(post)
        self.session.flush()

    def save(self, post):
        self.session.flush()

    def delete(self,post):
        self.session.delete(post)
