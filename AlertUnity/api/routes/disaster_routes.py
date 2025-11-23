from flask import Blueprint, jsonify
from services.disaster_service import disaster_service
import logging

logger = logging.getLogger(__name__)

disaster_bp = Blueprint('disaster', __name__)

@disaster_bp.route('/fire', methods=['GET'])
def get_fire_data():
    try:
        data = disaster_service.process_disaster_data('fires')
        return jsonify(data), 200
    except Exception as e:
        logger.error(f"Error in get_fire_data: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@disaster_bp.route('/flood', methods=['GET'])
def get_flood_data():
    try:
        data = disaster_service.process_disaster_data('floods')
        return jsonify(data), 200
    except Exception as e:
        logger.error(f"Error in get_flood_data: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@disaster_bp.route('/hurricane', methods=['GET'])
def get_hurricane_data():
    try:
        data = disaster_service.process_disaster_data('hurricanes')
        return jsonify(data), 200
    except Exception as e:
        logger.error(f"Error in get_hurricane_data: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@disaster_bp.route('/earthquake', methods=['GET'])
def get_earthquake_data():
    try:
        data = disaster_service.process_disaster_data('earthquakes')
        return jsonify(data), 200
    except Exception as e:
        logger.error(f"Error in get_earthquake_data: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@disaster_bp.route('/all', methods=['GET'])
def get_all_data():
    try:
        data = disaster_service.get_all_disasters_data()
        return jsonify(data), 200
    except Exception as e:
        logger.error(f"Error in get_all_data: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@disaster_bp.route('/stats', methods=['GET'])
def get_stats():
    try:
        data = disaster_service.get_overall_stats()
        return jsonify(data), 200
    except Exception as e:
        logger.error(f"Error in get_stats: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500