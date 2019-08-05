from flask import (
    Blueprint, flash, g, session, redirect, render_template, request, url_for, jsonify
)
from flask import current_app as app
from werkzeug.exceptions import abort
import mysql.connector
from mysql.connector import Error
from mysql.connector import errorcode
import jwt
import datetime

from cmd_notes.db import get_db
from . import constants

bp = Blueprint('user', __name__)


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
    try:
        payload = jwt.decode(auth_token, app.config.get('SECRET_KEY'))
        # is_blacklisted_token = BlacklistToken.check_blacklist(auth_token)
        # if is_blacklisted_token:
        #     return 'Token blacklisted. Please log in again.'
        # else:
        #     return payload['sub']
        return payload['sub']
    except jwt.ExpiredSignatureError:
        return 'Signature expired. Please log in again.'
    except jwt.InvalidTokenError:
        return 'Invalid token. Please log in again.'


def login():
    # if request.method == 'POST':
    print(request.form)
    # print('in login, un='+request.form['username'])
    # session['username'] = request.form['username']
    # print('sid='+session['id'])
    tok = encode_auth_token('3')
    tok_dec = tok.decode()
    return jsonify({"token": tok_dec})
    # return redirect(url_for('index'))
