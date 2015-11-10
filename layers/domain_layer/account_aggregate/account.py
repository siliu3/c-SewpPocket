import hashlib


class Account(object):

    def __init__(self, username, password, user_id):
        self.username = username
        self.password = self._encrypt(password)
        self.user_id = user_id

    def _encrypt(self, password):
        m = hashlib.md5()
        m.update(password)
        return m.hexdigest()

    def valid_password(self, password):
        return self.password == self._encrypt(password)

    def change_password(self,password):
        self.password = self._encrypt(password)