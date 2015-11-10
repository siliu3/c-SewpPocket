from gen_account import Generate_Account
from gen_regulator import Generate_Regulator
from layers.infrastructure_layer.context import Transaction_


@Transaction_
def Generate_Data():

    regulator_id = Generate_Regulator()
    account_username = Generate_Account(regulator_id)

