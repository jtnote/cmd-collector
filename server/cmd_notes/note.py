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
    cur = db.connection.cursor()
    cur.execute(
        'SELECT n.id, title, url, cmd, created FROM note n ORDER BY created DESC'
    )
    notes = cur.fetchall()
    return jsonify({'notes': notes})