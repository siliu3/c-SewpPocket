#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
converter.py
 
Created by BigYuki on 15/11/11.
"""
from werkzeug.routing import BaseConverter
class RegexConverter(BaseConverter):
    def __init__(self, map, *args):
        BaseConverter.__init__(self,map)
        self.map = map
        self.regex = args[0]