#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
admin_actor.py.py
 
Created by BigYuki on 15/11/10.
"""
from contributor_actor import ContributorActor

class AdminActor(ContributorActor):

    def __init__(self, access_token):
        ContributorActor.__init__(self,access_token)