from flask import Blueprint, request, jsonify
from services.gemini_service import GeminiService
import google.generativeai as genai
import os

gemini_bp = Blueprint('gemini', __name__)

@gemini_bp.route('/api/ai/analyze-fires', methods=['POST'])
def analyze_fires():
    """Analyze fire reports using Google Gemini AI"""
    try:
        gemini_service = GeminiService()
        
        data = request.get_json()
        reports = data.get('reports', [])
        
        if not reports:
            return jsonify({
                'success': False,
                'error': 'No fire reports provided for analysis'
            }), 400
        
        result = gemini_service.analyze_fire_reports(reports)
        return jsonify(result), 200 if result['success'] else 500
            
    except Exception as e:
        print(f"Error in analyze_fires: {e}")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@gemini_bp.route('/api/ai/chat', methods=['POST'])
def chat():
    """General chat endpoint for Google Gemini AI"""
    try:
        gemini_service = GeminiService()
        
        data = request.get_json()
        messages = data.get('messages', [])
        temperature = data.get('temperature', 0.7)
        
        if not messages:
            return jsonify({
                'success': False,
                'error': 'No messages provided'
            }), 400
        
        result = gemini_service.chat(messages, temperature)
        return jsonify(result), 200 if result['success'] else 500
        
    except Exception as e:
        print(f"Error in chat: {e}")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@gemini_bp.route('/api/ai/list-models', methods=['GET'])
def list_models():
    """List all available Gemini models"""
    try:
        api_key = os.getenv('GEMINI_API_KEY')
        if not api_key:
            return jsonify({
                'success': False,
                'error': 'GEMINI_API_KEY not configured'
            }), 400
        
        genai.configure(api_key=api_key)
        
        models = []
        for model in genai.list_models():
            models.append({
                'name': model.name,
                'display_name': model.display_name,
                'description': model.description,
                'supported_methods': model.supported_generation_methods
            })
        
        return jsonify({
            'success': True,
            'models': models,
            'count': len(models)
        }), 200
            
    except Exception as e:
        print(f"Error listing models: {e}")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@gemini_bp.route('/api/ai/health', methods=['GET'])
def ai_health():
    """Check if Gemini AI service is available"""
    try:
        gemini_service = GeminiService()
        
        if gemini_service.model:
            return jsonify({
                'success': True,
                'provider': 'gemini',
                'status': 'available',
                'message': 'Google Gemini AI is ready'
            }), 200
        else:
            return jsonify({
                'success': False,
                'provider': 'fallback',
                'status': 'unavailable',
                'message': 'Gemini API key not configured. Using fallback analysis.'
            }), 200
            
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e),
            'message': 'AI service check failed'
        }), 500