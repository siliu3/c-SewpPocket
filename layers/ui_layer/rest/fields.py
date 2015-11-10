from flask_restful import fields


ACCOUNT_RESOURCE_FIELDS = {
    'username': fields.String
}

USER_RESOURCE_FIELDS = {
    'id': fields.Integer,
    'nickname': fields.String,
    'email': fields.String,
    'phone': fields.String,
    'name': fields.String,
    'eid': fields.String
}

CONSUMER_RESOURCE_FIELDS = USER_RESOURCE_FIELDS.copy()
CONSUMER_RESOURCE_FIELDS.update({})

CONSUMER_REQUEST_RESOURCE_FIELDS = {
    'id': fields.Integer,
    'status': fields.String
}

CONSUMER_REQUEST_COMMENT_RESOURCE_FIELDS = {
    'id': fields.Integer,
    'content': fields.String,
    'nickname': fields.String
}

POST_RESOURCE_FIELDS ={
    'id': fields.Integer,
    'name': fields.String,
    'category': fields.String,
    'price': fields.Integer,
    'description': fields.String
}


CONTRIBUTOR_POST_RESOURCE_FIELDS = POST_RESOURCE_FIELDS.copy()

CONTRIBUTOR_POST_REQUEST_RESOURCE_FIELDS = CONSUMER_REQUEST_RESOURCE_FIELDS.copy()

CONTRIBUTOR_POST_REQUEST_COMMENT_RESOURCE_FIELDS = CONSUMER_REQUEST_COMMENT_RESOURCE_FIELDS.copy()



