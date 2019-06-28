from flask import (
    Blueprint, flash, g, redirect, render_template, request, url_for, jsonify
)
from werkzeug.exceptions import abort

# from cmd_notes.auth import login_required
from cmd_notes.db import get_db

bp = Blueprint('note', __name__)

# @bp.route('/')
# def index():
#     db = get_db()
#     notes = db.execute(
#         'SELECT n.id, title, url, cmd, created'
#         ' FROM note n'
#         ' ORDER BY created DESC'
#     ).fetchall()

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
    data =request.json
    print(data)

    db = get_db()
    cur = db.cursor()
    sql = "INSERT INTO note (title, url, cmd) VALUES (%s, %s, %s)"
    val = (data['title'], data['url'], data['cmd'])
    cur.execute(sql, val)
    db.commit()

    return jsonify({'result': 'ok'})

def edit_note():
    id = request.args.get('id')

    print(id)

    # db = get_db()
    # cur = db.cursor()
    # sql = "INSERT INTO note (title, url, cmd) VALUES (%s, %s, %s)"
    # val = (data['title'], data['url'], data['cmd'])
    # cur.execute(sql, val)
    # db.commit()

    return jsonify({'result': 'ok'})