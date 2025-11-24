import os
from pathlib import Path

class Config:
    DEBUG = os.getenv('DEBUG', 'True') == 'True'
    HOST = os.getenv('HOST', '0.0.0.0')
    PORT = int(os.getenv('PORT', 5000))
    
    
    FIREBASE_CREDENTIALS_PATH = os.getenv("GOOGLE_APPLICATION_CREDENTIALS_JSON")
    
    CACHE_ENABLED = True
    
    DEFAULT_MONTHS = 12
    DEFAULT_WEEKS = 7
    DEFAULT_AREA_MONTHS = 6
    
    REGIONS = [
        'Northern',
        'Southwestern',
        'Southern',
        'Southeastern',
        'Northwestern',
        'Northeastern'
    ]

class DevelopmentConfig(Config):
    DEBUG = True

class ProductionConfig(Config):
    DEBUG = False

config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}