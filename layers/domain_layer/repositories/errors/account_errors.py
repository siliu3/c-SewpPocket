from layers.infrastructure_layer.error.error_type import ForbiddenError
from layers.infrastructure_layer.error import error_code


class UsernameRepeatError(ForbiddenError):

    def __init__(self, msg):
        self.error_code = error_code.ACCOUNT_USERNAME_REPEAT
        self.msg = msg


class NotExistUsernameError(ForbiddenError):

    def __init__(self, msg):
        self.error_code = error_code.ACCOUNT_USERNAME_NOT_EXIST
        self.msg = msg


class WrongPasswordError(ForbiddenError):

    def __init__(self, msg):
        self.error_code = error_code.ACCOUNT_WRONG_PASSWORD
        self.msg = msg
