import pytest
from flask import Flask, jsonify
from flask_cors import CORS
from extensions import db, jwt
from models.user import User
from models.blog import Blog

@pytest.fixture
def app():
    """Create and configure a new app instance for each test."""
    app = Flask(__name__)
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
    app.config['JWT_SECRET_KEY'] = 'test-secret-key'
    
    # Initialize extensions
    db.init_app(app)
    jwt.init_app(app)
    CORS(app)
    
    # Register blueprints
    from routes.auth import auth_bp
    from routes.blogs import blogs_bp
    
    app.register_blueprint(auth_bp, url_prefix='/api')
    app.register_blueprint(blogs_bp, url_prefix='/api')
    
    # Health check endpoint
    @app.route('/api/health')
    def health_check():
        return jsonify({'status': 'healthy', 'message': 'Blog API is running'}), 200
    
    with app.app_context():
        # Import models to ensure they are registered
        from models.user import User
        from models.blog import Blog
        db.create_all()
        yield app
        db.drop_all()

@pytest.fixture
def client(app):
    """A test client for the app."""
    return app.test_client()

@pytest.fixture
def auth_token(client):
    """Create a user and return authentication token."""
    # Register user
    client.post('/api/signup', json={
        'username': 'testuser',
        'email': 'test@example.com',
        'password': 'password123'
    })
    
    # Login to get token
    response = client.post('/api/login', json={
        'email': 'test@example.com',
        'password': 'password123'
    })
    
    return response.get_json()['access_token']

class TestBlogManagement:
    """Test blog management endpoints."""
    
    def test_create_blog_success(self, client, auth_token):
        """Test successful blog creation."""
        response = client.post('/api/blogs', json={
            'title': 'Test Blog Post',
            'content': 'This is a test blog post content.'
        }, headers={
            'Authorization': f'Bearer {auth_token}'
        })
        
        assert response.status_code == 201
        data = response.get_json()
        assert 'message' in data
        assert 'blog' in data
        assert data['blog']['title'] == 'Test Blog Post'
        assert data['blog']['content'] == 'This is a test blog post content.'
    
    def test_create_blog_without_auth(self, client):
        """Test blog creation without authentication."""
        response = client.post('/api/blogs', json={
            'title': 'Test Blog Post',
            'content': 'This is a test blog post content.'
        })
        
        assert response.status_code == 401
    
    def test_create_blog_invalid_data(self, client, auth_token):
        """Test blog creation with invalid data."""
        response = client.post('/api/blogs', json={
            'title': '',  # Empty title
            'content': 'This is a test blog post content.'
        }, headers={
            'Authorization': f'Bearer {auth_token}'
        })
        
        assert response.status_code == 400
    
    def test_get_all_blogs(self, client, auth_token):
        """Test getting all blogs."""
        # Create a blog first
        client.post('/api/blogs', json={
            'title': 'Test Blog Post',
            'content': 'This is a test blog post content.'
        }, headers={
            'Authorization': f'Bearer {auth_token}'
        })
        
        # Get all blogs
        response = client.get('/api/blogs')
        
        assert response.status_code == 200
        data = response.get_json()
        assert 'blogs' in data
        assert len(data['blogs']) > 0
    
    def test_get_blog_by_id(self, client, auth_token):
        """Test getting a specific blog by ID."""
        # Create a blog first
        create_response = client.post('/api/blogs', json={
            'title': 'Test Blog Post',
            'content': 'This is a test blog post content.'
        }, headers={
            'Authorization': f'Bearer {auth_token}'
        })
        
        blog_id = create_response.get_json()['blog']['id']
        
        # Get the blog by ID
        response = client.get(f'/api/blogs/{blog_id}')
        
        assert response.status_code == 200
        data = response.get_json()
        assert 'blog' in data
        assert data['blog']['id'] == blog_id
        assert data['blog']['title'] == 'Test Blog Post'
    
    def test_get_nonexistent_blog(self, client):
        """Test getting a blog that doesn't exist."""
        response = client.get('/api/blogs/999')
        
        assert response.status_code == 404
    
    def test_update_blog_success(self, client, auth_token):
        """Test successful blog update."""
        # Create a blog first
        create_response = client.post('/api/blogs', json={
            'title': 'Original Title',
            'content': 'Original content.'
        }, headers={
            'Authorization': f'Bearer {auth_token}'
        })
        
        blog_id = create_response.get_json()['blog']['id']
        
        # Update the blog
        response = client.put(f'/api/blogs/{blog_id}', json={
            'title': 'Updated Title',
            'content': 'Updated content.'
        }, headers={
            'Authorization': f'Bearer {auth_token}'
        })
        
        assert response.status_code == 200
        data = response.get_json()
        assert data['blog']['title'] == 'Updated Title'
        assert data['blog']['content'] == 'Updated content.'
    
    def test_update_blog_unauthorized(self, client, auth_token):
        """Test updating a blog without proper authorization."""
        # Create a blog first
        create_response = client.post('/api/blogs', json={
            'title': 'Original Title',
            'content': 'Original content.'
        }, headers={
            'Authorization': f'Bearer {auth_token}'
        })
        
        blog_id = create_response.get_json()['blog']['id']
        
        # Try to update without auth
        response = client.put(f'/api/blogs/{blog_id}', json={
            'title': 'Updated Title',
            'content': 'Updated content.'
        })
        
        assert response.status_code == 401
    
    def test_delete_blog_success(self, client, auth_token):
        """Test successful blog deletion."""
        # Create a blog first
        create_response = client.post('/api/blogs', json={
            'title': 'Test Blog Post',
            'content': 'This is a test blog post content.'
        }, headers={
            'Authorization': f'Bearer {auth_token}'
        })
        
        blog_id = create_response.get_json()['blog']['id']
        
        # Delete the blog
        response = client.delete(f'/api/blogs/{blog_id}', headers={
            'Authorization': f'Bearer {auth_token}'
        })
        
        assert response.status_code == 200
        
        # Verify blog is deleted
        get_response = client.get(f'/api/blogs/{blog_id}')
        assert get_response.status_code == 404
    
    def test_get_user_blogs(self, client, auth_token):
        """Test getting user's own blogs."""
        # Create a blog first
        client.post('/api/blogs', json={
            'title': 'Test Blog Post',
            'content': 'This is a test blog post content.'
        }, headers={
            'Authorization': f'Bearer {auth_token}'
        })
        
        # Get user's blogs
        response = client.get('/api/my-blogs', headers={
            'Authorization': f'Bearer {auth_token}'
        })
        
        assert response.status_code == 200
        data = response.get_json()
        assert 'blogs' in data
        assert len(data['blogs']) > 0
