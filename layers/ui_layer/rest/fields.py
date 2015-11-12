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
    'eid': fields.String,
    "is_consumer" : fields.Boolean,
    "is_contributor" : fields.Boolean,
    "is_regulator" : fields.Boolean
}

POST_RESOURCE_FIELDS ={
    'id': fields.Integer,
    'name': fields.String,
    'category': fields.String,
    'price': fields.Integer,
    'description': fields.String,
    'is_sold': fields.Boolean
}

THE_POST_RESOURCE_FIELDS = POST_RESOURCE_FIELDS.copy()
THE_POST_RESOURCE_FIELDS.update({
    "owner": fields.Nested(USER_RESOURCE_FIELDS)
})

COMMENT_RESOURCE_FIELDS = {
    'id': fields.Integer,
    'content': fields.String,
    'nickname': fields.String
}

REQUEST_RESOURCE_FIELDS = {
    'id': fields.Integer,
    'status': fields.String
}

CONSUMER_REQUEST_RESOURCE_FIELDS = REQUEST_RESOURCE_FIELDS.copy()
CONSUMER_REQUEST_RESOURCE_FIELDS.update({
    'post' : fields.Nested(POST_RESOURCE_FIELDS)
})


CONSUMER_REQUEST_COMMENT_RESOURCE_FIELDS = COMMENT_RESOURCE_FIELDS.copy()


CONTRIBUTOR_POST_REQUEST_RESOURCE_FIELDS = REQUEST_RESOURCE_FIELDS.copy()
CONTRIBUTOR_POST_REQUEST_RESOURCE_FIELDS.update({
    'make_by' : fields.Nested(USER_RESOURCE_FIELDS)
})

CONTRIBUTOR_POST_RESOURCE_FIELDS = POST_RESOURCE_FIELDS.copy()
CONTRIBUTOR_POST_RESOURCE_FIELDS.update({
    'requests': fields.Nested(CONTRIBUTOR_POST_REQUEST_RESOURCE_FIELDS)
})

CONTRIBUTOR_POST_REQUEST_RESOURCE_FIELDS = REQUEST_RESOURCE_FIELDS.copy()

CONTRIBUTOR_POST_REQUEST_COMMENT_RESOURCE_FIELDS = COMMENT_RESOURCE_FIELDS.copy()



