from layers.domain_layer.repositories import AccountRepository
from layers.domain_layer.repositories import TokenRepository
from libs.cutoms.singleton import Singleton


class AuthSystem(object):
    __metaclass__ = Singleton

    def token_to_user_id(self, access_token):
        account_id = self.token_to_account_username(access_token)
        return AccountRepository().get(account_id).user_id

    def token_to_account_username(self, access_token):
        return TokenRepository().get(access_token).account_username
