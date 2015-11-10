import base64
import json
import unittest


def login(test_client, username, password):
    auth_string = base64.b64encode("%s:%s" % (username, password))
    headers = {
        'Authorization': "Basic %s" % auth_string
    }
    data = {
            'type': "NORMAL"
        }
    rv = test_client.post('/api/token', headers=headers, data=data)
    if rv.status_code == 201:
        rv_json = json.loads(rv.data)
        print rv.data
        return rv_json['access_token']


def regist(test_client, username, password):
    data = {
        'username': username,
        'password': password
    }
    rv = test_client.post('/api/account', data=data)
    if rv.status_code == 201:
        print rv.data
        return username
    else:
        raise Exception(rv.data)
