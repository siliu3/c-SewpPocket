# =*= encoding:utf-8 =*=
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
#
from mapping import Map_Domain_To_Table
from layers.infrastructure_layer.configger import Configger
from libs.cutoms.singleton import Singleton


class OrmDbDll(object):
    __metaclass__ = Singleton

    def __init__(self, db):
        self._db = db

    def create_all(self):
        self._db.get_meta_data().create_all(bind=self._db.get_engine())

    def drop_all(self):
        self._db.get_meta_data().drop_all(bind=self._db.get_engine())


class OrmDb(object):
    __metaclass__ = Singleton

    @classmethod
    def Init(cls):
        url = Configger().get_config().DATABASE_URI
        orm_db = OrmDb(url)

    def __init__(self, url):
        self.__connection = None
        self.__session = None

        self.__engine = create_engine(url, convert_unicode=True)

        self.__meta_data = self.__mapping()
        self.__ddl = OrmDbDll(self)

    def __mapping(self):
        return Map_Domain_To_Table()

    def get_meta_data(self):
        return self.__meta_data

    def get_connection(self):
        if self.__connection is None:
            self.__connection = self.__engine.connect()
        return self.__connection

    def remove_connection(self):
        if self.__connection is not None:
            self.__connection.close()
            self.__connection = None

    def get_session(self):
        if self.__session is None:
            self.__session = scoped_session(sessionmaker(bind=self.__engine,autoflush=False,autocommit=False))
        return self.__session

    def remove_session(self):
        if self.__session is not None:
            self.__session.remove()
            self.__session = None

    def get_ddl(self):
        return self.__ddl

    def get_engine(self):
        return self.__engine
