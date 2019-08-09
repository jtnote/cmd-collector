import os
import flask as f
from flask_bcrypt import Bcrypt

def create_app(test_config=None):
    # create and configure the app
    app = f.Flask(__name__, instance_relative_config=True, static_url_path='',
                  static_folder='../../web', template_folder="./templates")

    # app.debug = False
    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=False)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    with app.app_context():
        bcrypt = Bcrypt(app)
        f.g.bcrypt_log_rounds = app.config.get('BCRYPT_LOG_ROUNDS')

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    # init db
    from . import db
    db.init_app(app)

    # add note bp
    from . import note
    app.register_blueprint(note.bp)
    # app.add_url_rule('/cmdnotes/api/notes', 'notes', note.notes)
    app.add_url_rule('/cmdnotes/api/notes_paging', 'notes_paging',
                     note.get_notes_paging, methods=['POST'])
    app.add_url_rule('/cmdnotes/api/create_note', 'create_note',
                     note.create_note, methods=['POST'])
    app.add_url_rule('/cmdnotes/api/update_note', 'update_note',
                     note.update_note, methods=['POST'])
    app.add_url_rule('/cmdnotes/api/note', 'note',
                     note.get_note, methods=['GET'])
    app.add_url_rule('/cmdnotes/api/delete_note', 'delete_note',
                     note.delete_note, methods=['POST'])
    # app.add_url_rule('/cmdnotes/api/notes', endpoint='get_notes')

    from . import user
    app.register_blueprint(user.bp)
    app.add_url_rule('/cmdnotes/api/register', 'register',
                     user.register, methods=['POST'])
    app.add_url_rule('/cmdnotes/api/login', 'login',
                     user.login, methods=['POST'])

    return app
