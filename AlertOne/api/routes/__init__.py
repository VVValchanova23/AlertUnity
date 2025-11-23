from routes.disaster_routes import disaster_bp
from routes.user_routes import user_bp
from routes.health_routes import health_bp

def register_routes(app):
    app.register_blueprint(disaster_bp, url_prefix='/api')
    app.register_blueprint(user_bp, url_prefix='/api')
    app.register_blueprint(health_bp, url_prefix='/api')