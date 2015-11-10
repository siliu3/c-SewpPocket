from flask_restful import reqparse, inputs
from libs.cutoms import ex_reqparse


# def Basic_Auth_Header():
#     return ex_reqparse.ExArgument(
#         'Authorization',
#         type=inputs.regex('^Basic [A-Za-z0-9+/=]|=[^=]|={3,}$'),
#         location="headers", required=True)
#
#
# def Access_Token_Header():
#     return ex_reqparse.ExArgument(
#         'Authorization',
#         type=inputs.regex("^Bearer [a-fA-F0-9]{8}-[a-fA-F0-9]{4}-" +
#                           "[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$"),
#         location="headers", required=True)
BASIC_AUTH_HEADER = ex_reqparse.ExArgument(
    'Authorization',
    type=inputs.regex('^Basic [A-Za-z0-9+/=]|=[^=]|={3,}$'),
    location="headers", required=True)

ACCESS_TOKEN_HEADER = ex_reqparse.ExArgument(
    'Authorization',
    type=inputs.regex("^Bearer [a-fA-F0-9]{8}-[a-fA-F0-9]{4}-" +
                      "[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$"),
    location="headers", required=True)

LOGIN_TYPE = ex_reqparse.ExArgument(
    'type',
    type=inputs.regex("^[A-Z]+$"),
    required=True
)

FACEBOOK_NAME = ex_reqparse.ExArgument(
    'name',
    required=True
)

FACEBOOK_ID = ex_reqparse.ExArgument(
    'id',
    type=inputs.regex("^[0-9]+$"),
    required=True
)


FEEDBACK_TYPE = ex_reqparse.ExArgument(
    'type',
    type=inputs.regex("^[A-Z]+$"),
    required=True
)

FEEDBACK_CONTENT = ex_reqparse.ExArgument(
    'content',
    required=True
)

