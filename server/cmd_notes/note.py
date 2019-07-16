from flask import (
    Blueprint, flash, g, redirect, render_template, request, url_for, jsonify
)
from werkzeug.exceptions import abort
import mysql.connector
from mysql.connector import Error
from mysql.connector import errorcode

from cmd_notes.db import get_db

bp = Blueprint('note', __name__)

# TODO: methods option available?
def get_notes():
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
    return jsonify({'notes': notes})

def get_notes_paging():
    page = request.args.get('page')

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
    return jsonify({'notes': notes})

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
    except mysql.connector.Error as error :
        print("Failed to update record to database: {}".format(error))
        return jsonify({'result': 'error'})
    finally:
        # TODO: no error in other places if conn is closed here?
        #closing database connection.
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