from layers.domain_layer.user_aggregate import Regulator
from layers.domain_layer.repositories import UserRepository


def Generate_Regulator():


    regulator = Regulator("admin","admin@admin.com","88888888","Mr Regulator","123456")
    UserRepository().add(regulator)

    return regulator.id
