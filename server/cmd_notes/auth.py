import jwt
from flask import current_app as app
from flask_bcrypt import Bcrypt
import datetime


def check_auth_token(req):
    token = req.args.get('token')
    # TODO if unable to decode
    auth_res = decode_auth_token(token)
    if auth_res['result'] != 'ok':
        print('auth failed: ', auth_res['result'])
    return auth_res


def encode_auth_token(user_id):
    """
    Generates the Auth Token
    :return: string
    """
    # print(app.config.get('SECRET_KEY'))
    try:
        payload = {
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=0, seconds=5),
            'iat': datetime.datetime.utcnow(),
            'sub': user_id
        }
        return jwt.encode(
            payload,
            app.config.get('SECRET_KEY'),
            algorithm='HS256'
        )
    except Exception as e:
        print(e)
        return e


def decode_auth_token(auth_token):
    """
    Validates the auth token
    :param auth_token:
    :return: integer|string
    """
    result = {}
    try:
        payload = jwt.decode(auth_token, app.config.get('SECRET_KEY'))
        # is_blacklisted_token = BlacklistToken.check_blacklist(auth_token)
        # if is_blacklisted_token:
        #     return 'Token blacklisted. Please log in again.'
        # else:
        #     return payload['sub']
        result['sub'] = payload['sub']
        result['result'] = 'ok'
    except jwt.ExpiredSignatureError:
        # return 'Signature expired. Please log in again.'
        result['result'] = 'expired'
    except jwt.InvalidTokenError:
        # return 'Invalid token. Please log in again.'
        result['result'] = 'invalid'
    return result
