import os
from pytz import timezone
from constants.dirs import DATABASE_DIR


class BasicConfig(object):
    DEBUG = False
    TESTING = False

    DATABASE_URI = 'sqlite:///: memory:'
    TIME_ZONE = timezone('Asia/Shanghai')



    FLASK_CONFIG = {
        'LOGGER_NAME': 'flask.mvc',
        'PROPAGATE_EXCEPTIONS': True
    }


class DevelopmentConfig(BasicConfig):
    DEBUG = True
    DATABASE_URI = "sqlite:///" + DATABASE_DIR + "/sqlite-dev.db"


class ProductionConfig(BasicConfig):
    DATABASE_URI = "sqlite:///" + DATABASE_DIR + "/sqlite-pro.db"

class ProductionTestConfig(BasicConfig):
    DEBUG = True
    DATABASE_URI = "sqlite:///" + DATABASE_DIR + "/sqlite-pro-test.db"

class TestingConfig(BasicConfig):
    DEBUG = False
    TESTING = True
    DATABASE_URI = "sqlite:///" + DATABASE_DIR + "/sqlite-test.db"
