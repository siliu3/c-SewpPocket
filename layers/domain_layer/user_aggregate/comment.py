#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
comment.py
 
Created by BigYuki on 15/11/10.
"""
from datetime import datetime
class Comment(object):
    def __init__(self,content,nickname):
        self.id = None
        self.content = content
        self.nickname = nickname
        self.time = datetime.utcnow()
