import os
import json
import logging
import firebase_admin
from firebase_admin import credentials, firestore
from config.settings import Config

logger = logging.getLogger(__name__)

_db = None

def initialize_firebase():
    global _db
    
    try:
        if not firebase_admin._apps:
            firebase_json = os.environ.get("GOOGLE_APPLICATION_CREDENTIALS_JSON")
            
            if firebase_json:
                # Fix PEM newlines
                cred_dict = json.loads(firebase_json)
                if 'private_key' in cred_dict:
                    cred_dict['private_key'] = cred_dict['private_key'].replace('\\n', '\n')
                cred = credentials.Certificate(cred_dict)
            else:
                # Fallback to local file
                cred_path = Config.FIREBASE_CREDENTIALS_PATH
                if not os.path.exists(cred_path):
                    raise FileNotFoundError(f"Firebase credentials file not found: {cred_path}")
                cred = credentials.Certificate(cred_path)
            
            firebase_admin.initialize_app(cred)
        
        _db = firestore.client()
        return _db
    
    except Exception as e:
        logger.error(f"Failed to initialize Firebase: {str(e)}")
        raise

def get_db():
    global _db
    
    if _db is None:
        _db = initialize_firebase()
    
    return _db
