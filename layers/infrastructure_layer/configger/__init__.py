
from constants.enums import AppMode
from libs.cutoms.singleton import Singleton
from config import DevelopmentConfig, ProductionConfig, TestingConfig, ProductionTestConfig


class Configger(object):
    __metaclass__ = Singleton

    def __init__(self, config):
        self._config = config

    def get_config(self):
        return self._config

    @classmethod
    def Set_Mode(cls, mode):
        if AppMode.Dev == mode:
            Configger(DevelopmentConfig)
        elif AppMode.Pro == mode:
            Configger(ProductionConfig)
        elif AppMode.Test == mode:
            Configger(TestingConfig)
        elif AppMode.ProTest == mode:
            Configger(ProductionTestConfig)
