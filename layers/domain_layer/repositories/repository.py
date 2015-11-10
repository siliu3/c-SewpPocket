from layers.infrastructure_layer.db.orm_db import OrmDb
from libs.cutoms.singleton import Singleton


class Repository(object):
    __metaclass__ = Singleton

    def __init__(self):
        self.session = OrmDb().get_session()
