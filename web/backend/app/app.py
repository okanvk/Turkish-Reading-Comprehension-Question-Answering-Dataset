from flask import Flask
from flask_cors import CORS
def create_app() -> Flask:
    flask_app = Flask('qa_api')
    from app.controller.qa_controller import qa_app
    flask_app.register_blueprint(qa_app)

    CORS(flask_app)

    return flask_app