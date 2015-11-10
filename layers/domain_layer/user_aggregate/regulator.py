#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
regulator.py
 
Created by BigYuki on 15/11/10.
"""
from contributor import Contributor

class Regulator(Contributor):
    def __init__(self,nickname,email,phone,name,eid):
        Contributor.__init__(self,nickname,email,phone,name,eid)