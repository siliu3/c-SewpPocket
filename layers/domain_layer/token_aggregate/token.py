import uuid
from datetime import datetime


class Token(object):
    EXPIRE_TIME = 3600

    def __init__(self, account_username):
        self.access_token = str(uuid.uuid4())
        self.refresh_token = str(uuid.uuid4())
        self.expire = Token.EXPIRE_TIME
        self.token_type = "Bearer"
        self.create_time = datetime.now()

        self.account_username = account_username

    def expired(self):
        return False
        # if (datetime.now() - self.create_time).seconds > Token.EXPIRE_TIME:
        #     return True
        # else:
        #     return False
