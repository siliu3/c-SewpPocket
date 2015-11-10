from flask import jsonify
from error_type import *


def response(e): return {'error_code': e.error_code, 'message': e.msg}


def bad_request_handler(error):
    return jsonify(response(error)), 400


def unauthorized_handler(error):
    return jsonify(response(error)), 401


def forbidden_handler(error):
    return jsonify(response(error)), 403

ERROR_MAPPING = [
    (RequestError, bad_request_handler),
    (ForbiddenError, forbidden_handler),
    (UnauthorizedError, unauthorized_handler)
]
