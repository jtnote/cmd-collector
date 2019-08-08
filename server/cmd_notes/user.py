from flask import (
    Blueprint, flash, g, session, redirect, render_template, request, url_for, jsonify
)
from flask import current_app as app
from flask_bcrypt import Bcrypt
from werkzeug.exceptions import abort
import mysql.connector
from mysql.connector import Error
from mysql.connector import errorcode
import datetime

from cmd_notes.db import get_db
from . import constants
from . import auth

bp = Blueprint('user', __name__)


def login():
    data = request.json

    db = get_db()
    cur = db.cursor()
    sql = "SELECT id,password FROM user where username=%s"
    val = (data['username'],)
    cur.execute(sql, val)
    user = cur.fetchone()

    # TODO should be singleton?  ref: https://github.com/realpython/flask-jwt-auth
    bcrypt = Bcrypt(app)
    if bcrypt.check_password_hash(user[1], data['password']):
        tok = auth.encode_auth_token(user[0])
        tok_dec = tok.decode()
        return jsonify({'result': 'ok', 'token': tok_dec})
    else:
        return jsonify({'result': 'error', 'reason': ''})


def register():
    data = request.json
    #TODO: rem
    print(data)

    with app.app_context():
        # TODO should be singleton?  ref: https://github.com/realpython/flask-jwt-auth
        bcrypt = Bcrypt(app)
        psw_hashed = bcrypt.generate_password_hash(
            data['password'], app.config.get('BCRYPT_LOG_ROUNDS')
        ).decode()

        db = get_db()
        cur = db.cursor()
        sql = "INSERT INTO user (username, password) VALUES (%s, %s)"
        val = (data['username'], psw_hashed)
        cur.execute(sql, val)
        db.commit()

        return jsonify({'result': 'ok'})
