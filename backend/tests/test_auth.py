import pytest
from app import create_app
from extensions import db
from models.user import User

@pytest.fixture
def app():
    """Create and configure a new app instance for each test."""
    app = create_app()
    app.config['TESTING'] = True
    app.config['DATABASE_URL'] = 'sqlite:///:memory:'
    
    with app.app_context():
        db.create_all()
        yield app
        db.drop_all()

@pytest.fixture
def client(app):
    """A test client for the app."""
    return app.test_client()

@pytest.fixture
def runner(app):
    """A test runner for the app's Click commands."""
    return app.test_cli_runner()

class TestAuthentication:
    """Test authentication endpoints."""
    
    def test_user_registration_success(self, client):
        """Test successful user registration."""
        response = client.post('/api/signup', json={
            'username': 'testuser',
            'email': 'test@example.com',
            'password': 'password123'
        })
        
        assert response.status_code == 201
        data = response.get_json()
        assert 'message' in data
        assert 'user' in data
        assert data['user']['username'] == 'testuser'
        assert data['user']['email'] == 'test@example.com'
        assert 'password' not in data['user']
    
    def test_user_registration_duplicate_email(self, client):
        """Test registration with duplicate email."""
        # First registration
        client.post('/api/signup', json={
            'username': 'testuser1',
            'email': 'test@example.com',
            'password': 'password123'
        })
        
        # Second registration with same email
        response = client.post('/api/signup', json={
            'username': 'testuser2',
            'email': 'test@example.com',
            'password': 'password123'
        })
        
        assert response.status_code == 400
        data = response.get_json()
        assert 'error' in data
    
    def test_user_login_success(self, client):
        """Test successful user login."""
        # Register user first
        client.post('/api/signup', json={
            'username': 'testuser',
            'email': 'test@example.com',
            'password': 'password123'
        })
        
        # Login
        response = client.post('/api/login', json={
            'email': 'test@example.com',
            'password': 'password123'
        })
        
        assert response.status_code == 200
        data = response.get_json()
        assert 'access_token' in data
        assert 'user' in data
        assert data['user']['email'] == 'test@example.com'
    
    def test_user_login_invalid_credentials(self, client):
        """Test login with invalid credentials."""
        response = client.post('/api/login', json={
            'email': 'nonexistent@example.com',
            'password': 'wrongpassword'
        })
        
        assert response.status_code == 401
        data = response.get_json()
        assert 'error' in data
    
    def test_protected_route_without_token(self, client):
        """Test accessing protected route without token."""
        response = client.get('/api/profile')
        
        assert response.status_code == 401
    
    def test_protected_route_with_token(self, client):
        """Test accessing protected route with valid token."""
        # Register and login to get token
        client.post('/api/signup', json={
            'username': 'testuser',
            'email': 'test@example.com',
            'password': 'password123'
        })
        
        login_response = client.post('/api/login', json={
            'email': 'test@example.com',
            'password': 'password123'
        })
        
        token = login_response.get_json()['access_token']
        
        # Access protected route
        response = client.get('/api/profile', headers={
            'Authorization': f'Bearer {token}'
        })
        
        assert response.status_code == 200
        data = response.get_json()
        assert 'user' in data
