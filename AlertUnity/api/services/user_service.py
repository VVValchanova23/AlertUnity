from config.firebase import get_db
import logging

logger = logging.getLogger(__name__)

class UserService:
    
    def __init__(self):
        self.db = get_db()
        self.cache = {}
    
    def get_user_region(self, user_id):
        if not user_id:
            return None
        
        if user_id in self.cache:
            return self.cache[user_id].get('region')
        
        try:
            user_doc = self.db.collection('users').document(user_id).get()
            
            if user_doc.exists:
                user_data = user_doc.to_dict()
                self.cache[user_id] = user_data
                return user_data.get('region')
        
        except Exception as e:
            logger.error(f"Error fetching user {user_id}: {str(e)}")
        
        return None
    
    def get_all_users(self):
        try:
            docs = self.db.collection('users').stream()
            users = []
            
            for doc in docs:
                data = doc.to_dict()
                data['id'] = doc.id
                users.append(data)
            
            return users
        
        except Exception as e:
            logger.error(f"Error fetching users: {str(e)}")
            raise
    
    def refresh_cache(self):
        self.cache = {}
        logger.info("User cache refreshed")

user_service = UserService()