from layers.domain_layer.token_aggregate import Token
from errors.token_errors import TokenExpireError, NotExistAccessTokenError

from repository import Repository


class TokenRepository(Repository):

    def add(self, token):
        self.session.add(token)
        self.session.flush()

    def save(self, token):
        self.session.flush()

    def get(self, access_token):
        token = self.session.query(Token).get(access_token)
        if token is None:
            raise NotExistAccessTokenError("invalid access token")
        if token.expired():
            raise TokenExpireError("access token has expired")
        return token
