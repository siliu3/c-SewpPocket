# from error import Error
# from errorCode import ErrorCode
#
#
# class AuthError(Error):
#     pass
#
#
# class TokenExpireError(AuthError):
#
#     def __init__(self, msg):
#         self.error_code = ErrorCode.AUTH_ACCESS_TOKEN_EXPIRE
#         self.msg = msg
#
#
# class UnauthorizedError(AuthError):
#
#     def __init__(self, msg):
#         self.error_code = ErrorCode.AUTH_UNAUTHORIZED
#         self.msg = msg
#
#
# class WrongPasswordError(AuthError):
#
#     def __init__(self, msg):
#         self.error_code = ErrorCode.AUTH_WRONG_PASSWORD
#         self.msg = msg
#
#
# class NotExistUsernameError(AuthError):
#
#     def __init__(self, msg):
#         self.error_code = ErrorCode.AUTH_USERNAME_NOT_EXIST
#         self.msg = msg
