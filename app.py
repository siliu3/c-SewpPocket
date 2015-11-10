# lib
import unittest
import socket
import thread
import time
from flask import Flask
from flask_script import Manager
from flask_restful import Api

from libs.cutoms.singleton import Singleton
from constants.enums import AppMode
from layers.infrastructure_layer.configger import Configger
from layers.infrastructure_layer.logger import Logger
from layers.infrastructure_layer.db.orm_db import OrmDb
from layers.ui_layer.rest.urls import URLS
from layers.infrastructure_layer.error.error_mapping import ERROR_MAPPING
from devhelper.command import Command_Regist


class App(object):
    __metaclass__ = Singleton

    def __init__(self, mode):
        self._mode = mode
        self._flask = Flask(__name__)
        self._inited = False

    def _set_configger(self):
        Configger.Set_Mode(self._mode)

    def _init_module(self):
        OrmDb.Init()
        Logger.Init()

    def _config(self):
        self._config_flask()

    def init(self):
        if self._inited:
            return
        self._set_configger()

        self._config()
        self._init_module()

        self._url_mapping()
        self._error_mapping()
        self._inited = True

    def run_command(self):
        self.init()

        self._cmd_manager = None
        self._init_cmd_manager()
        self._cmd_manager.run()

    def run_server(self, ip="0.0.0.0", port=8081):
        self.init()
        self._flask.run(ip, port)

    def _init_cmd_manager(self):
        self._cmd_manager = Manager(self._flask)
        Command_Regist(self._cmd_manager)

    def _url_mapping(self):
        restful = Api(self._flask)
        for key, value in URLS.items():
            restful.add_resource(value, key)

    def _error_mapping(self):
        for error_map in ERROR_MAPPING:
            self._flask.errorhandler(error_map[0])(error_map[1])

    def _config_flask(self):
        self._flask.config.update(Configger().get_config().FLASK_CONFIG)
        self._flask.config.from_object(Configger().get_config())
        self._flask.app_context().push()
        logger = self._flask.logger


class AppTestCase(unittest.TestCase):

    def test_run(self):
        ip, port = ("127.0.0.1", 8079)
        thread.start_new_thread(App(AppMode.Test).run_server, (ip, port))
        time.sleep(0.1)
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        result = sock.connect_ex((ip, port))
        self.assertTrue(result == 0, "port is not open")


if __name__ == '__main__':
    unittest.main()
