import os

RELATIVE_PROJECT_DIR = os.path.join(os.path.dirname(__file__), "..")
PROJECT_DIR = os.path.abspath(RELATIVE_PROJECT_DIR)
DATABASE_DIR = PROJECT_DIR + '/data/db'
LOG_FILE_DIR = PROJECT_DIR + '/data/log'
