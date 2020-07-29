from flask import Flask

def create_app() -> Flask:
    flask_app = Flask('qa_api')
    from app.controller.qa_controller import qa_app
    flask_app.register_blueprint(qa_app)
    return flask_app