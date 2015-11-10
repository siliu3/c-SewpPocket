import error_code


class ForbiddenError(Exception):
    pass


class UnauthorizedError(Exception):
    pass


class RequestError(Exception):

    def __init__(self, msg):
        self.msg = msg
        self.error_code = error_code.REQUEST_ARGS_ERROR


class WrongSecretKeyError(ForbiddenError):

    def __init__(self, msg):
        self.error_code = error_code.ERROR_SECRET_KEY
        self.msg = msg