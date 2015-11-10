#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
player_errors.py.py
 
Created by BigYuki on 15/11/2.
"""

from layers.infrastructure_layer.error.error_type import ForbiddenError
from layers.infrastructure_layer.error import error_code


class PlayerIDError(ForbiddenError):

    def __init__(self, msg):
        self.error_code = error_code.ACCOUNT_USERNAME_REPEAT
        self.msg = msg