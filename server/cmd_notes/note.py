from flask import (
    Blueprint, flash, g, redirect, render_template, request, url_for, jsonify
)
from werkzeug.exceptions import abort
import mysql.connector
from mysql.connector import Error
from mysql.connector import errorcode

from cmd_notes.db import get_db
from . import constants
from . import auth

bp = Blueprint('note', __name__)

# TODO: methods option available?

"""
TODO: not used
"""
def notes():
    db = get_db()
    cur = db.cursor()
    cur.execute(
        'SELECT n.id, title, url, cmd, created FROM note n ORDER BY created DESC'
    )
    notes_res = cur.fetchall()
    notes = []
    for note in notes_res:
        notes.append({
            "id": note[0],
            "title": note[1],
            "url": note[2],
            "cmd": note[3]
        })

    sql = 'SELECT COUNT(*) FROM note'
    cur.execute(sql)
    total = cur.fetchone()[0]

    return jsonify({'notes': notes, 'total': total, 'currentPage': 1})


def get_notes_paging():
    data = request.json
    # page = int(request.args.get('page'))
    # page_size = int(request.args.get('pageSize') or constants.PAGE_SIZE)
    print(data)
    page = int(data['page'])
    page_size = int(data['pageSize']
                    if 'pageSize' in data else constants.PAGE_SIZE)

    # print(page_size)
    # token = request.args.get('token')
    # print(token)
    # print('userid=', auth.decode_auth_token(token))
    auth_res = auth.check_auth_token(request)
    if auth_res['result'] != 'ok':
        return jsonify({'result': 'error', 'reason': auth_res['result']})
    user_id = auth_res['sub']

    db = get_db()
    cur = db.cursor()

    sql = 'SELECT n.id, title, url, cmd, created FROM note n ORDER BY created DESC LIMIT %s,%s'
    val = (page_size*(page-1), page_size)
    cur.execute(sql, val)
    notes_res = cur.fetchall()
    notes = []
    for note in notes_res:
        notes.append({
            "id": note[0],
            "title": note[1],
            "url": note[2],
            "cmd": note[3]
        })

    sql = 'SELECT COUNT(*) FROM note'
    cur.execute(sql)
    total = cur.fetchone()[0]

    # TODO: should return current page?
    return jsonify({'result': 'ok', 'notes': notes, 'total': total, 'currentPage': page})


def get_note():
    id = request.args.get('id')

    db = get_db()
    cur = db.cursor()
    sql = "SELECT n.id, title, url, cmd, created FROM note n where n.id=%s"
    val = (id,)
    cur.execute(sql, val)
    note = cur.fetchone()
    return jsonify({'note': {
        "id": note[0],
        "title": note[1],
        "url": note[2],
        "cmd": note[3]
    }})


def create_note():
    data = request.json
    print(data)

    db = get_db()
    cur = db.cursor()
    sql = "INSERT INTO note (title, url, cmd) VALUES (%s, %s, %s)"
    val = (data['title'], data['url'], data['cmd'])
    cur.execute(sql, val)
    db.commit()

    return jsonify({'result': 'ok'})


def update_note():
    note = request.json

    print(note)

    try:
        db = get_db()
        cur = db.cursor()
        sql = "UPDATE note SET title=%s,url=%s,cmd=%s where id=%s"
        val = (note['title'], note['url'], note['cmd'], note['id'])
        cur.execute(sql, val)
        db.commit()

        return jsonify({'result': 'ok'})
    except mysql.connector.Error as error:
        print("Failed to update record to database: {}".format(error))
        return jsonify({'result': 'error'})
    finally:
        # TODO: no error in other places if conn is closed here?
        # closing database connection.
        # if(db.is_connected()):
        #     db.close()
        #     print("connection is closed")
        pass

    return jsonify({'result': 'ok'})


def delete_note():
    data = request.json
    print(data)

    db = get_db()
    cur = db.cursor()
    sql = "DELETE FROM note where id=%s"
    val = (data['id'],)
    cur.execute(sql, val)
    db.commit()

    return jsonify({'result': 'ok'})
