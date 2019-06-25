import os

from flask import Flask, render_template

def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True, static_url_path='',  static_folder = '../../web', template_folder="./templates")

    # app.config.from_mapping(
    #     SECRET_KEY='dev',
    #     DATABASE=os.path.join(app.instance_path, 'flaskr.sqlite'),
    # )
    print(test_config)

    # app.config.from_mapping(
    #     MYSQL_HOST = '127.0.0.1',
    #     MYSQL_USER = 'root',
    #     MYSQL_PASSWORD = '000133',
    #     MYSQL_DB = 'cmdnotes'
    # )

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=False)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    # a simple page that says hello
    @app.route('/hello')
    def hello():
        return 'Hello, World!'

    @app.route('/api/list')
    def api_list():
        return 'list api'

    # @app.route('/')
    # def index():
    #     print('index')
    #     return app.send_static_file('index.html')

    # init db
    from . import db
    db.init_app(app)

    return app