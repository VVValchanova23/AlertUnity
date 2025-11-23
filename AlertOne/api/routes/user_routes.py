from flask import Blueprint, jsonify
from services.user_service import user_service
import logging

logger = logging.getLogger(__name__)

user_bp = Blueprint('user', __name__)

@user_bp.route('/users', methods=['GET'])
def get_users():
    try:
        users = user_service.get_all_users()
        return jsonify({
            'total': len(users),
            'users': users
        }), 200
    
    except Exception as e:
        logger.error(f"Error in get_users: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@user_bp.route('/refresh-cache', methods=['POST'])
def refresh_cache():
    try:
        user_service.refresh_cache()
        return jsonify({'message': 'Cache refreshed successfully'}), 200
    
    except Exception as e:
        logger.error(f"Error in refresh_cache: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500