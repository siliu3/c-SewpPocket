from layers.domain_layer.account_aggregate import Account
from errors.account_errors import UsernameRepeatError, NotExistUsernameError
from errors.account_errors import WrongPasswordError
from repository import Repository


class AccountRepository(Repository):

    def add(self, account):
        exist_account = self.session.query(Account).get(account.username)
        if exist_account is not None:
            raise UsernameRepeatError("exiat the same account name")
        self.session.add(account)
        self.session.flush()

    def save(self,account):
        exist_account = self.session.query(Account).get(account.username)
        if exist_account is not None:
            raise UsernameRepeatError("exiat the same account name")
        self.session.flush()

    def get(self, username):
        account = self.session.query(Account).get(username)
        if account is None:
            raise NotExistUsernameError("Username not exist.")
        return account

    def get_by_username_password(self, username, password):
        account = self.get(username)

        if not account.valid_password(password):
            raise WrongPasswordError("Passwrod error.")
        return account

    def get_by_username(self, username):
        account = self.session.query(Account).get(username)
        return account
