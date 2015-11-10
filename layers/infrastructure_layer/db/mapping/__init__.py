from mapping import *
from table import META_DATA


def Map_Domain_To_Table():
    Map_Token_Aggregation_Table()
    Map_User_Aggregation_Table()
    Map_Account_Aggregation_Table()

    return META_DATA
