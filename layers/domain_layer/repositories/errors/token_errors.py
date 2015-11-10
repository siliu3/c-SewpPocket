from layers.infrastructure_layer.error.error_type import UnauthorizedError
from layers.infrastructure_layer.error import error_code


class TokenExpireError(UnauthorizedError):

    def __init__(self, msg):
        self.error_code = error_code.TOKEN_EXPIRE
        self.msg = msg


class NotExistAccessTokenError(UnauthorizedError):

    def __init__(self, msg):
        self.error_code = error_code.TOKEN_NOT_EXIST
        self.msg = msg
