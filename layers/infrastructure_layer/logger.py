# =*= encoding:utf-8 =*=
import logging
from datetime import datetime
# infrastructure
from configger import Configger
from constants.dirs import LOG_FILE_DIR
from libs.cutoms.singleton import Singleton


class Logger(object):
    __metaclass__ = Singleton

    _DEFAULT_FORMATTER = logging.Formatter('%(asctime)s - %(levelname)-7s -\
                                %(filename)20s [line:%(lineno)3d] -\
                                 %(name)16s : %(message)s', '[%H:%M:%S]')

    def __init__(self):
        self._root_logger = logging.getLogger('root')
        self._sqlalchemy_logger = logging.getLogger('sqlalchemy.engine')
        self._config = Configger().get_config()
        self._flask_logger = logging.getLogger(
            self._config.FLASK_CONFIG['LOGGER_NAME'])

    @classmethod
    def Init(cls):
        logger = Logger()
        logger.config_loggers()

    def config_loggers(self):
        file_path = LOG_FILE_DIR
        time_zone = self._config.TIME_ZONE

        # root logger
        FileHandler = self._create_file_handler
        StreamHandler = self._create_stream_handler

        root_file_handler = FileHandler(file_path, time_zone)
        sqlalchemy_file_handler = FileHandler(file_path, time_zone)

        root_stream_handler = StreamHandler()
        sqlalchemy_stream_handler = StreamHandler()

        sqlalchemy_formatter = logging.Formatter(' --- | %(message)s')

        root_file_handler.setFormatter(Logger._DEFAULT_FORMATTER)
        root_stream_handler.setFormatter(Logger._DEFAULT_FORMATTER)

        sqlalchemy_stream_handler.setFormatter(sqlalchemy_formatter)
        sqlalchemy_file_handler.setFormatter(sqlalchemy_formatter)

        if self._config.DEBUG:
            self._root_logger.setLevel(logging.INFO)
            self._sqlalchemy_logger.setLevel(logging.INFO)
        self._flask_logger.setLevel(logging.WARNING)

        self._root_logger.addHandler(root_file_handler)
        self._root_logger.addHandler(root_stream_handler)

        self._sqlalchemy_logger.addHandler(sqlalchemy_file_handler)
        self._sqlalchemy_logger.addHandler(sqlalchemy_stream_handler)
        self._flask_logger.addHandler(root_file_handler)

        logging.getLogger('root.log').info("Logging init success.")

    def _create_file_handler(self, file_path, time_zone):
        file_handler = logging.FileHandler(
            file_path + "/%s.log"
            % datetime.now(time_zone).strftime('%Y-%m-%d'))
        file_handler.setLevel(logging.WARNING)
        return file_handler

    def _create_stream_handler(self):
        stream_handler = logging.StreamHandler()
        stream_handler.setLevel(logging.DEBUG)
        return stream_handler
