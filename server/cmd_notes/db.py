# import sqlite3
from flask_mysqldb import MySQL

import click
from flask import current_app, g
from flask.cli import with_appcontext


def get_db():
    if 'db' not in g:
        # g.db = sqlite3.connect(
        #     current_app.config['DATABASE'],
        #     detect_types=sqlite3.PARSE_DECLTYPES
        # )
        # g.db.row_factory = sqlite3.Row
        # print('current_app')
        # print(current_app.config)
        g.db = MySQL(current_app)

    return g.db

def init_db():
    db = get_db()

    # TODO: error
    # possible no simple solution:
    # https://www.quora.com/How-can-I-import-tables-on-MySQL-using-python
    # https://stackoverflow.com/questions/28668467/how-can-i-execute-source-filename-sql-in-a-python-script
    # with current_app.open_resource('schema.sql','r') as f:
    #     cur = db.connection.cursor()

    #     sql_full = f.read()

    #     cur.execute(sql_full)
    #     print(sql_full)

    # from subprocess import call 
    # call(["mysql", "-u"+current_app.config['MYSQL_USER'], "-p"+current_app.config['MYSQL_PASSWORD'], -e", "source schema.sql])

@click.command('init-db')
@with_appcontext
def init_db_command():
    """Clear the existing data and create new tables."""
    init_db()
    click.echo('Initialized the database.')


def close_db(e=None):
    db = g.pop('db', None)
    
    # TODO: error if close is performed(maybe the CRUD statement is executed asynchronously)
    # if db is not None:
    #   db.connection.close()

def init_app(app):
    app.teardown_appcontext(close_db)
    app.cli.add_command(init_db_command)