from flask import Flask
from flask_cors import CORS
import logging
import sys
from dotenv import load_dotenv

load_dotenv()

from config.firebase import initialize_firebase
from routes import register_routes

def create_app():
    app = Flask(__name__)

    logging.getLogger('werkzeug').setLevel(logging.ERROR)
    
    app.config.from_object('config.settings.Config')
    
    CORS(app)
    
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    )
    
    initialize_firebase()
    
    register_routes(app)
    
    return app

if __name__ == '__main__':
    app = create_app()

    
    host = app.config['HOST']
    port = app.config['PORT']
    
    print("Flask app running on:")
    print(f" - Local:   http://{host}:{port}")

    app.run(
        debug=app.config['DEBUG'],
        host=host,
        port=port
    )
    