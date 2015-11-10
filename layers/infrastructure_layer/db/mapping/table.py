from sqlalchemy import Table, Column, ForeignKey, Integer, String, REAL, Float
from sqlalchemy import DateTime, Float, PickleType, Numeric
from sqlalchemy import Boolean, Text
from sqlalchemy import MetaData

META_DATA = MetaData()
###############################################################################
# Account
ACCOUNT_TABLE = Table(
    'TB_Account', META_DATA,
    Column('username', String(50), primary_key=True),
    Column('password', String(50)),
    Column('user_id', None, ForeignKey("TB_User.id")),
)

###############################################################################

# User
USER_TABLE = Table(
    'TB_User', META_DATA,
    Column('id', Integer, primary_key=True, autoincrement=True),

    Column('nickname', String(20)),
    Column('email', String(40)),
    Column('phone', String(20)),
    Column('name', String(20)),
    Column('eid', String(20)),

    Column('user_type', String(20))
)

CONSUMER_TABLE = Table(
    'TB_Consumer', META_DATA,
    Column('id', None, ForeignKey('TB_User.id'), primary_key=True)
)

CONSUMER_MAKE_REQUEST = Table(
    'RS_Consumer_Make_Request', META_DATA,
    Column('consumer_id', None, ForeignKey('TB_Consumer.id'), primary_key=True),
    Column('request_id', None, ForeignKey('TB_Request.id'), primary_key=True)
)

CONTRIBUTOR_TABLE = Table(
    'TB_Contributor', META_DATA,
    Column('id', None, ForeignKey('TB_Consumer.id'), primary_key=True)
)

CONTRIBUTOR_OWN_POST = Table(
    'RS_Contributor_Own_Post', META_DATA,
    Column('contributor_id', None, ForeignKey('TB_Contributor.id'), primary_key=True),
    Column('post_id', None, ForeignKey('TB_Post.id'), primary_key=True)
)

REGULATOR_TABLE = Table(
    'TB_Regulator', META_DATA,
    Column('id', None, ForeignKey('TB_Contributor.id'), primary_key=True)
)

###############################################################################
POST_TABLE = Table(
    'TB_Post', META_DATA,
    Column('id', Integer, primary_key=True, autoincrement=True),
    Column('name', String(20)),
    Column('category', String(20)),
    Column('price', Integer),
    Column('description', String(100)),
    Column('deal_request_id', None, ForeignKey('TB_Request.id'))
)


REQUEST_TABLE = Table(
    'TB_Request', META_DATA,
    Column('id', Integer, primary_key=True, autoincrement=True),
    Column('status', String(20)),
    Column('post_id', None, ForeignKey('TB_Post.id'))
)

REQUEST_OWN_COMMENT = Table(
    'RS_Request_Own_Comment', META_DATA,
    Column('request_id', None, ForeignKey('TB_Request.id'), primary_key=True),
    Column('comment_id', None, ForeignKey('TB_Comment.id'), primary_key=True)
)


COMMENT_TABLE = Table(
    'TB_Comment', META_DATA,
    Column('id', Integer, primary_key=True, autoincrement=True),
    Column('content', String(100)),
    Column('nickname', String(20))
)

###############################################################################
TOKEN_TABLE = Table(
    'TB_Token', META_DATA,
    Column('access_token', String(50), primary_key=True),
    Column('refresh_token', String(50)),
    Column('token_type', String(20)),
    Column('create_time', DateTime),
    Column('account_username', None, ForeignKey("TB_Account.username"))
)
###############################################################################


#########################################################
