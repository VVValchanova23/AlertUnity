import google.generativeai as genai
import os
from datetime import datetime
from services.fire_report_analyzer import FireReportAnalyzer

class GeminiService:
    def __init__(self):
        """Initialize Google Gemini client"""
        api_key = os.getenv('GEMINI_API_KEY')
        if api_key:
            genai.configure(api_key=api_key)
            self.model = genai.GenerativeModel('gemini-2.5-flash')
        else:
            self.model = None
        self.analyzer = FireReportAnalyzer()
    
    def analyze_fire_reports(self, reports):
        """Analyze fire reports using Google Gemini"""
        try:
            analyzed_data = self.analyzer.prepare_fire_data(reports)
            
            if analyzed_data['total_reports'] == 0:
                return {
                    'success': False,
                    'error': 'No fire reports available for analysis'
                }
            
            recent_reports_text = '\n'.join([
                f"- {r['date']}: {r['location']} ({r['severity']} severity) - {r['description'][:100]}"
                for r in analyzed_data['recent_reports']
            ])
            
            prompt = f"""As a fire prediction and safety expert, analyze this fire report data and provide actionable insights for future fire prevention and prediction:

Total Reports: {analyzed_data['total_reports']}
Severity Distribution: {analyzed_data['severity_counts']}
Status Distribution: {analyzed_data['status_counts']}
Top Locations: {analyzed_data['top_locations']}
Monthly Distribution: {analyzed_data['month_counts']}

Recent Reports Sample:
{recent_reports_text}

Please provide:
1. **Fire Pattern Analysis**: Identify trends in timing, locations, and severity
2. **Risk Predictions**: Predict high-risk periods, locations, or conditions
3. **Prevention Recommendations**: Specific actions to prevent future fires
4. **Resource Allocation**: Suggestions for optimal firefighting resource deployment
5. **Early Warning Indicators**: Key signs that might predict future fire incidents

Keep the response concise but actionable, focusing on practical insights for fire prevention and emergency response planning.
Use this format:

🔥 Fire Pattern Analysis
[Concise analysis with 1-2 emojis per line]

🔮 Risk Predictions
[Predictions with relevant emojis]

💡 Prevention Tips
[Actionable tips with emojis]

🚒 Resource Planning
[Resource suggestions with emojis]

⚠️ Early Warnings
[Warning signs with emojis]


Response like you are a real professional not like an AI. Response casually and human-like 
"""
            
            try:
                if not self.model:
                    raise Exception("Gemini API key not configured")
                
                response = self.model.generate_content(prompt)
                feedback = response.text
                
                return {
                    'success': True,
                    'feedback': feedback,
                    'provider': 'gemini',
                    'statistics': {
                        'total_reports': analyzed_data['total_reports'],
                        'severity_counts': analyzed_data['severity_counts'],
                        'status_counts': analyzed_data['status_counts']
                    }
                }
                
            except Exception as gemini_error:
                print(f"Gemini API Error: {gemini_error}")
                
                fallback = self.analyzer.generate_fallback_feedback(analyzed_data)
                
                return {
                    'success': True,
                    'feedback': fallback,
                    'fallback': True,
                    'provider': 'fallback',
                    'statistics': {
                        'total_reports': analyzed_data['total_reports'],
                        'severity_counts': analyzed_data['severity_counts'],
                        'status_counts': analyzed_data['status_counts']
                    }
                }
        
        except Exception as e:
            print(f"Error in analyze_fire_reports: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    def chat(self, messages, temperature=0.7):
        """General purpose chat with Gemini"""
        try:
            if not self.model:
                raise Exception("Gemini API key not configured")
            
            conversation_text = ""
            for msg in messages:
                role = msg.get('role', 'user')
                content = msg.get('content', '')
                if role == 'system':
                    conversation_text += f"Instructions: {content}\n\n"
                elif role == 'user':
                    conversation_text += f"User: {content}\n\n"
                elif role == 'assistant':
                    conversation_text += f"Assistant: {content}\n\n"
            
            response = self.model.generate_content(
                conversation_text,
                generation_config=genai.types.GenerationConfig(
                    temperature=temperature,
                )
            )
            
            return {
                'success': True,
                'response': response.text,
                'provider': 'gemini'
            }
            
        except Exception as e:
            print(f"Error in chat: {e}")
            return {
                'success': False,
                'error': str(e)
            }