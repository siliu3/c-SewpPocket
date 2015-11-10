from layers.domain_layer.account_aggregate import Account
from layers.domain_layer.token_aggregate import Token
from layers.domain_layer.user_aggregate import Contributor
from layers.domain_layer.repositories import TokenRepository, AccountRepository,UserRepository
from layers.infrastructure_layer.context import Transaction_
from layers.infrastructure_layer.error.error_type import WrongSecretKeyError
import random
import string

class SomeoneActor(object):
    SECRET ="IAMNOTABADGUY"

    def __init__(self):
        pass
    def _string_generator(self,size=6, chars=string.ascii_uppercase + string.digits):
        return ''.join(random.choice(chars) for _ in range(size))



    @Transaction_
    def create_account(self,username, password,nickname,email,phone,name,eid ,secret):
        if secret != SomeoneActor.SECRET:
            raise WrongSecretKeyError("Your secret key is error!")

        user = Contributor(nickname,email,phone,name,eid)
        UserRepository().add(user)

        account = Account(username, password, user.id)
        AccountRepository().add(account)
        return account

    @Transaction_
    def create_token(self, username, password):

        account = AccountRepository().get_by_username_password(
            username, password)
        token = Token(account.username)
        TokenRepository().add(token)
        return token





