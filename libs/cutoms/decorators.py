from decorator import decorator
import unittest
import logging

def before(before_funciton):
    def inside(f, *args, **kw):
        before_funciton()
        return f(*args, **kw)
    return decorator(inside)


def method_info(func):
    def _method_before(fun_name):
        logging.getLogger('root.method').info("<<<   RUN: %s ..." % fun_name)

    def _method_after(fun_name):
        logging.getLogger('root.method').info(">>>")

    def __deco(*args, **kwargs):
        _method_before(func.__name__)
        ret = func(*args, **kwargs)
        _method_after(func.__name__)
        return ret
    return __deco


class DecoratorTestCase(unittest.TestCase):

    def setUp(self):
        pass

    def tearDown(self):
        pass

    def test_before(self):
        global a
        a = 0

        def before_f():
            global a
            a = 1

        @before(before_f)
        def main_function():
            global a
            a = a + 1

        main_function()
        self.assertTrue(a == 2)


if __name__ == '__main__':
    unittest.main()
