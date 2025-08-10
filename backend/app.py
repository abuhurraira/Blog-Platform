from flask import Flask, jsonify
from flask_cors import CORS
from flask_swagger_ui import get_swaggerui_blueprint
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

from config import Config
from extensions import db, jwt

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    # Initialize extensions
    db.init_app(app)
    jwt.init_app(app)
    CORS(app)
    
    # Swagger configuration
    SWAGGER_URL = '/api/docs'
    API_URL = '/static/swagger.json'
    
    swaggerui_blueprint = get_swaggerui_blueprint(
        SWAGGER_URL,
        API_URL,
        config={
            'app_name': "Blog Platform API"
        }
    )
    
    app.register_blueprint(swaggerui_blueprint, url_prefix=SWAGGER_URL)
    
    # Register blueprints
    from routes.auth import auth_bp
    from routes.blogs import blogs_bp
    
    app.register_blueprint(auth_bp, url_prefix='/api')
    app.register_blueprint(blogs_bp, url_prefix='/api')
    
    # Health check endpoint
    @app.route('/api/health')
    def health_check():
        """
        Health check endpoint
        ---
        tags:
          - System
        responses:
          200:
            description: API is healthy
            schema:
              type: object
              properties:
                status:
                  type: string
                  example: "healthy"
                message:
                  type: string
                  example: "Blog API is running"
        """
        return jsonify({'status': 'healthy', 'message': 'Blog API is running'}), 200
    
    # Create tables
    with app.app_context():
        # Import models to ensure they are registered
        from models.user import User
        from models.blog import Blog
        db.create_all()
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(host=app.config['HOST'], port=app.config['PORT'], debug=app.config['FLASK_DEBUG'])
