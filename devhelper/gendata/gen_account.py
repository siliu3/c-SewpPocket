from layers.domain_layer.account_aggregate import Account
from layers.domain_layer.repositories import AccountRepository


def Generate_Account(regulator_id):

    account = Account("admin@admin.com", "admin", regulator_id)
    AccountRepository().add(account)
    return account.username
