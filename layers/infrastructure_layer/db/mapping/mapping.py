from sqlalchemy.orm import mapper, relationship, backref, clear_mappers

from layers.domain_layer.account_aggregate import *
from layers.domain_layer.user_aggregate import *

from layers.domain_layer.token_aggregate import *


from table import *


def Map_Account_Aggregation_Table():
    mapper(Account, ACCOUNT_TABLE)


def Map_User_Aggregation_Table():
    mapper(User, USER_TABLE,
            polymorphic_on=USER_TABLE.c.user_type,
            polymorphic_identity=User.USER_IDENTITY
    )
    mapper(
        Consumer, CONSUMER_TABLE,
        inherits=User,
        polymorphic_identity=User.CONSUMER_IDENTITY,
        properties={
            'requests': relationship(
                Request,
                secondary=CONSUMER_MAKE_REQUEST,
                uselist=True,
                backref=backref("make_by", uselist=False),
                lazy='select'
            )
        }
    )
    mapper(
        Contributor, CONTRIBUTOR_TABLE,
        inherits=Consumer,
        polymorphic_identity=User.CONTRIBUTOR_IDENTITY,
        properties={
            'posts': relationship(
                Post,
                secondary=CONTRIBUTOR_OWN_POST,
                uselist=True,
                backref=backref("owner", uselist=False),
                lazy='select'
            )
        }
    )
    mapper(
        Regulator, REGULATOR_TABLE,
        inherits=Contributor,
        polymorphic_identity=User.REGULATOR_IDENTITY
    )

    mapper(
        Post,POST_TABLE,
        properties={
            'deal_request': relationship(
                Request,
                uselist=False,
                foreign_keys=POST_TABLE.c.deal_request_id,
                backref=backref("buy", uselist=False),
                lazy='select',
                cascade="save-update, merge, delete"
            )
        }
    )

    mapper(
        Request,REQUEST_TABLE,
        properties={
            'post': relationship(
                Post,
                uselist=False,
                foreign_keys=REQUEST_TABLE.c.post_id,
                backref=backref("requests",
                                uselist=True,
                                cascade="save-update, merge, delete"),
                lazy='select',
            ),
            'comments': relationship(
                Comment,
                secondary=REQUEST_OWN_COMMENT,
                uselist=True,
                backref=backref("owner", uselist=False),
                lazy='select',
                cascade="save-update, merge, delete"
            )
        }
    )

    mapper(
        Comment,COMMENT_TABLE
    )

def Map_Token_Aggregation_Table():
    mapper(Token, TOKEN_TABLE)
