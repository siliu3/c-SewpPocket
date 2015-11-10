from flask_script import Shell
from flask import current_app
from coverage import coverage
import unittest
# from libs.cutoms import testtools
from layers.infrastructure_layer.db.orm_db import OrmDb
from layers.domain_layer import repositories
from layers.infrastructure_layer.configger import Configger
from libs.cutoms import testtools
from gendata import Generate_Data


def _make_context():
    return dict(
        db=OrmDb(),
        repos=repositories,
        tt=testtools,
        client=current_app.test_client()
    )


def _run_test_cov():
    cov = coverage(omit=["/Library/*", "/System/Library/*"])
    all_tests = unittest.TestLoader().discover('.', pattern='*.py')
    cov.start()

    OrmDb().get_ddl().drop_all()
    OrmDb().get_ddl().create_all()
    Generate_Data()

    test_result = unittest.TextTestRunner(failfast=True).run(all_tests)
    cov.stop()
    if len(test_result.failures) == 0 and len(test_result.errors) == 0:
        # cov.report(omit=["test.py"])
        cov.html_report(omit=["test.py"])


def Command_Regist(manager):
    manager.add_command("shell", Shell(make_context=_make_context))

    @manager.command
    def create_table():
        OrmDb().get_ddl().create_all()

    @manager.command
    def drop_table():
        OrmDb().get_ddl().drop_all()

    @manager.command
    def gen_data():
        Generate_Data()

    if Configger().get_config().TESTING:
        @manager.command
        def run_all():
            _run_test_cov()
