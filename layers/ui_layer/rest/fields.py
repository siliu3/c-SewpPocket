from flask_restful import fields
import pytz
from dateutil import tz

class DateTimeCus(fields.Raw):
    def format(self, value):
        my_datetime = value.replace(tzinfo=pytz.utc)
        eastern = pytz.timezone('Asia/Shanghai')
        local_time = my_datetime.astimezone(eastern)
        return local_time.strftime('%Y-%m-%d %H:%M:%S')

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

USER_SIM_RESOURCE_FIELDS = {
    'nickname': fields.String,
    'email': fields.String,
    'phone': fields.String,
    'name': fields.String
}



POST_RESOURCE_FIELDS ={
    'id': fields.Integer,
    'name': fields.String,
    'category': fields.String,
    'price': fields.Integer,
    'description': fields.String,
    'time' : DateTimeCus,
    'is_sold': fields.Boolean,
    "owner": fields.Nested(USER_SIM_RESOURCE_FIELDS)
}

THE_POST_RESOURCE_FIELDS = POST_RESOURCE_FIELDS.copy()


COMMENT_RESOURCE_FIELDS = {
    'id': fields.Integer,
    'content': fields.String,
    'time' : DateTimeCus,
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
    'make_by' : fields.Nested(USER_SIM_RESOURCE_FIELDS)
})

CONTRIBUTOR_POST_RESOURCE_FIELDS = POST_RESOURCE_FIELDS.copy()
CONTRIBUTOR_POST_RESOURCE_FIELDS.update({
    'requests': fields.Nested(CONTRIBUTOR_POST_REQUEST_RESOURCE_FIELDS)
})

CONTRIBUTOR_POST_REQUEST_RESOURCE_FIELDS = REQUEST_RESOURCE_FIELDS.copy()

CONTRIBUTOR_POST_REQUEST_COMMENT_RESOURCE_FIELDS = COMMENT_RESOURCE_FIELDS.copy()



