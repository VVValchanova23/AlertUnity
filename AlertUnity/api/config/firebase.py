import firebase_admin
from firebase_admin import credentials, firestore
from config.settings import Config
import logging

logger = logging.getLogger(__name__)

_db = None

def initialize_firebase():
    global _db
    
    try:
        if not firebase_admin._apps:
            cred = credentials.Certificate(Config.FIREBASE_CREDENTIALS_PATH)
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