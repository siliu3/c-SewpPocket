# =*= encoding:utf-8 =*=
from sqlalchemy.exc import SQLAlchemyError
#
from db.orm_db import OrmDb


class Context(object):

    def __init__(self):
        self.__session = OrmDb().get_session()

    def get_session(self):
        return self.__session

    def rollback(self):
        self.__session.rollback()

    def commit(self):
        try:
            self.__session.commit()
        except:
            self.__session.rollback()
            raise

    # def __del__(self):
    #     self.__session = None
    #     ORM_DB.remove_session()


def Transaction_(func):
    def handle(*args, **kwargs):
        new_context = Context()
        try:
            result = func(*args, **kwargs)
        except:
            new_context.rollback()
            raise
        new_context.commit()
        return result
    return handle
