# Blog Platform

A modern, full-stack blog platform built with React, Flask, and PostgreSQL. This application provides a complete blogging experience with user authentication, blog creation, editing, and a beautiful, responsive UI.

## 🚀 Features

### User Management
- **User Registration**: Secure signup with email and username validation
- **User Authentication**: JWT-based login system with persistent sessions
- **Protected Routes**: Secure access to authenticated-only features

### Blog Management
- **Create Blogs**: Rich text editor for creating new blog posts
- **Edit Blogs**: Update your existing blog posts
- **Delete Blogs**: Remove unwanted blog posts
- **View Blogs**: Public blog listing and detailed blog view
- **My Blogs**: Personal dashboard to manage your blog posts

### Security & Validation
- **Password Hashing**: Secure password storage using bcrypt
- **JWT Authentication**: Stateless authentication with access tokens
- **Input Validation**: Server-side validation using Marshmallow
- **Form Validation**: Client-side validation using Formik and Yup
- **CORS Support**: Proper cross-origin resource sharing configuration

### Modern UI/UX
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Loading States**: Smooth loading indicators throughout the app
- **Error Handling**: User-friendly error messages and validation
- **Form Validation**: Real-time validation with visual feedback
- **Clean Interface**: Modern, professional design with excellent UX

## 🛠 Tech Stack

### Frontend
- **React 18**: Modern React with hooks and functional components
- **Redux Toolkit**: State management with RTK Query for API calls
- **React Router**: Client-side routing
- **Formik**: Form management and validation
- **Yup**: Schema validation for forms
- **Tailwind CSS**: Utility-first CSS framework
- **Nginx**: Production web server

### Backend
- **Flask**: Python web framework
- **Flask-JWT-Extended**: JWT authentication
- **Flask-SQLAlchemy**: ORM for database operations
- **Flask-CORS**: Cross-origin resource sharing
- **Flask-Swagger-UI**: Interactive API documentation
- **Marshmallow**: Data serialization and validation
- **bcrypt**: Password hashing
- **pytest**: Testing framework with comprehensive test suite

### Database
- **PostgreSQL**: Robust relational database

### DevOps
- **Docker**: Containerization
- **Docker Compose**: Multi-container orchestration

## 📁 Project Structure

```
Blog-Platform/
├── frontend/                 # React frontend application
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   ├── pages/          # Page components
│   │   ├── store/          # Redux store and slices
│   │   ├── hooks/          # Custom React hooks
│   │   └── utils/          # Utility functions
│   ├── Dockerfile          # Frontend container configuration
│   └── nginx.conf          # Nginx configuration
├── backend/                 # Flask backend application
│   ├── models/             # Database models
│   ├── routes/             # API route handlers
│   ├── schemas/            # Data validation schemas
│   ├── tests/              # Comprehensive test suite
│   │   ├── test_auth.py   # Authentication tests
│   │   └── test_blogs.py  # Blog management tests
│   ├── app.py             # Flask application factory
│   ├── config.py          # Application configuration
│   ├── requirements.txt   # Python dependencies
│   ├── pytest.ini         # Test configuration
│   └── Dockerfile         # Backend container configuration
├── docker-compose.yml      # Multi-container orchestration
├── init.sql               # Database initialization
└── README.md              # This file
```

## 🚦 Getting Started

### Prerequisites

- Docker and Docker Compose installed on your system
- Git for cloning the repository

### Quick Start with Docker (Recommended)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Blog-Platform
   ```

2. **Start all services**
   ```bash
   docker-compose up --build
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - Database: localhost:5432

### Manual Setup (Development)

#### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**
   ```bash
   cp ../env.example .env
   # Edit .env file with your configuration
   ```

5. **Start PostgreSQL database**
   ```bash
   # Using Docker
   docker run --name blog_postgres -e POSTGRES_DB=blogdb -e POSTGRES_USER=bloguser -e POSTGRES_PASSWORD=blogpass -p 5432:5432 -d postgres:15-alpine
   ```

6. **Run the Flask application**
   ```bash
   python app.py
   ```

#### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

## 📸 Screenshots

### Swagger UI - Interactive API Documentation

#### **1. API Overview**
![Swagger UI Overview](screenshots/1.jpg)
*Main Swagger UI interface showing all API endpoint categories: Authentication, Blogs, and System*

#### **2. Authentication Endpoints**
![Swagger Authentication](screenshots/2.jpg)
*Authentication endpoints with JWT Bearer token support - User registration, login, and profile management*

#### **3. Blog Management Endpoints**
![Swagger Blog Management](screenshots/3.jpg)
*Complete blog management endpoints with CRUD operations - Create, read, update, and delete blog posts*


#### **4. API Response Example**
![Swagger Response](screenshots/6.jpg)
*Real API response showing successful user creation with proper HTTP status codes and headers*

## 🔌 API Endpoints

### Interactive API Documentation
- **Swagger UI**: http://localhost:5000/api/docs - Interactive API documentation with testing capabilities

### Authentication
- `POST /api/signup` - User registration
- `POST /api/login` - User login
- `GET /api/profile` - Get user profile (authenticated)

### Blog Management
- `GET /api/blogs` - Get all blogs (public)
- `GET /api/blogs/<id>` - Get specific blog (public)
- `POST /api/blogs` - Create new blog (authenticated)
- `PUT /api/blogs/<id>` - Update blog (authenticated, owner only)
- `DELETE /api/blogs/<id>` - Delete blog (authenticated, owner only)
- `GET /api/my-blogs` - Get user's blogs (authenticated)

### System
- `GET /api/health` - Health check endpoint

## 🧪 Testing Framework

The blog platform includes a comprehensive testing framework to ensure code quality and reliability.

### Test Structure

```
backend/tests/
├── __init__.py           # Test package initialization
├── test_auth.py         # Authentication endpoint tests
└── test_blogs.py        # Blog management endpoint tests
```

### Test Coverage

#### 🔐 Authentication Tests (`test_auth.py`)
- ✅ **User Registration**: Success and duplicate email handling
- ✅ **User Login**: Success and invalid credentials
- ✅ **Protected Routes**: With and without JWT tokens
- ✅ **JWT Token Validation**: Token-based authentication

#### 📝 Blog Management Tests (`test_blogs.py`)
- ✅ **Blog Creation**: Success, unauthorized, and invalid data
- ✅ **Blog Retrieval**: All blogs, specific blog, and nonexistent blog
- ✅ **Blog Updates**: Success and unauthorized access
- ✅ **Blog Deletion**: Success and verification
- ✅ **User's Own Blogs**: Personal blog management

### Running Tests

#### Prerequisites
```bash
cd backend
pip install -r requirements.txt
```

#### Basic Test Commands
```bash
# Run all tests with verbose output
pytest tests/ -v

# Run all tests with short traceback
pytest tests/ -v --tb=short

# Run specific test file
pytest tests/test_auth.py -v

# Run specific test class
pytest tests/test_auth.py::TestAuthentication -v

# Run specific test method
pytest tests/test_auth.py::TestAuthentication::test_user_registration_success -v
```

#### Test Coverage (Optional)
```bash
# Run with coverage report
pytest tests/ --cov=app --cov-report=term-missing

# Generate HTML coverage report
pytest tests/ --cov=app --cov-report=html
```

#### Test Discovery
```bash
# List all available tests
pytest tests/ --collect-only

# Run tests and show what was collected
pytest tests/ -v --tb=no
```

### Test Features

#### ✅ Isolated Testing Environment
- **In-memory SQLite database** for each test
- **Clean state** between tests
- **No external dependencies** required
- **Fast execution** - tests run in seconds

#### ✅ Professional Test Structure
- **Test fixtures** for common setup
- **Descriptive test names** and docstrings
- **Comprehensive assertions** and validations
- **Error case coverage** and edge cases

#### ✅ Real-World Scenarios
- **Happy path** testing (successful operations)
- **Error handling** (invalid data, unauthorized access)
- **Authentication flows** (login, token validation)
- **Data validation** (required fields, format checking)

### Example Test Output

```bash
$ pytest tests/ -v
============================= test session starts ==============================
platform win32 -- Python 3.13.2, pytest-7.4.3, pluggy-1.6.0
collected 16 tests

tests/test_auth.py::TestAuthentication::test_user_registration_success PASSED
tests/test_auth.py::TestAuthentication::test_user_registration_duplicate_email PASSED
tests/test_auth.py::TestAuthentication::test_user_login_success PASSED
tests/test_auth.py::TestAuthentication::test_user_login_invalid_credentials PASSED
tests/test_auth.py::TestAuthentication::test_protected_route_without_token PASSED
tests/test_auth.py::TestAuthentication::test_protected_route_with_token PASSED
tests/test_blogs.py::TestBlogManagement::test_create_blog_success PASSED
tests/test_blogs.py::TestBlogManagement::test_create_blog_without_auth PASSED
tests/test_blogs.py::TestBlogManagement::test_create_blog_invalid_data PASSED
tests/test_blogs.py::TestBlogManagement::test_get_all_blogs PASSED
tests/test_blogs.py::TestBlogManagement::test_get_blog_by_id PASSED
tests/test_blogs.py::TestBlogManagement::test_get_nonexistent_blog PASSED
tests/test_blogs.py::TestBlogManagement::test_update_blog_success PASSED
tests/test_blogs.py::TestBlogManagement::test_update_blog_unauthorized PASSED
tests/test_blogs.py::TestBlogManagement::test_delete_blog_success PASSED
tests/test_blogs.py::TestBlogManagement::test_get_user_blogs PASSED

============================== 16 passed in 6.32s ==============================
```

### Why SQLite for Testing?

While the production environment uses PostgreSQL, tests use **in-memory SQLite** for:

- **🚀 Speed**: Tests run much faster with in-memory database
- **🧹 Isolation**: Each test gets a completely fresh database
- **🛠️ Simplicity**: No external database setup required
- **🎯 Focus**: Tests focus on application logic, not database connectivity
- **📦 Portability**: Tests work on any machine without database installation

### Test Configuration

The testing framework is configured via `backend/pytest.ini`:

```ini
[tool:pytest]
testpaths = tests
python_files = test_*.py
python_classes = Test*
python_functions = test_*
addopts = 
    -v
    --cov=app
    --cov-report=term-missing
    --cov-report=html
    --cov-report=xml
    --tb=short
```

### Benefits

#### ✅ Code Quality Assurance
- **Catch bugs early** before they reach production
- **Ensure functionality** works as expected
- **Prevent regressions** when making changes

#### ✅ Development Confidence
- **Safe refactoring** with test safety net
- **Fearless code changes** knowing tests will catch issues
- **Better code design** through testability

#### ✅ Professional Development
- **Industry-standard testing** practices
- **Comprehensive coverage** of your API endpoints
- **Documentation through tests** showing how code should work

## 🔒 Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env
# Database Configuration
DATABASE_URL=postgresql://bloguser:blogpass@localhost:5432/blogdb

# JWT Configuration
JWT_SECRET_KEY=your-super-secret-jwt-key-change-this-in-production

# Flask Configuration
FLASK_ENV=development
FLASK_DEBUG=true
```

## 🐳 Docker Configuration

The application uses Docker Compose for easy deployment:

- **Database**: PostgreSQL 15 with persistent volume
- **Backend**: Flask application with health checks
- **Frontend**: React app served by Nginx with API proxy

### Docker Commands

```bash
# Build and start all services
docker-compose up --build

# Start services in background
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Remove volumes (reset database)
docker-compose down -v
```



## 🧪 Usage Examples

### Interactive API Testing
**Visit**: http://localhost:5000/api/docs to test all API endpoints interactively with Swagger UI.

### User Registration
```bash
curl -X POST http://localhost:5000/api/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "email": "john@example.com",
    "password": "securepassword"
  }'
```

### User Login
```bash
curl -X POST http://localhost:5000/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "securepassword"
  }'
```

### Create Blog Post
```bash
curl -X POST http://localhost:5000/api/blogs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-jwt-token>" \
  -d '{
    "title": "My First Blog Post",
    "content": "This is the content of my first blog post..."
  }'
```

## 🎨 Features Showcase

### Form Validation with Formik
- **Real-time Validation**: Instant feedback as users type
- **Schema Validation**: Yup schemas for consistent validation rules
- **Visual Feedback**: Red borders and error messages for invalid fields
- **Form State Management**: Automatic form state handling
- **Error Handling**: Comprehensive error display and recovery
- **Accessibility**: Proper ARIA labels and screen reader support

### Authentication Flow
- Clean, modern login and signup forms with Formik validation
- Real-time form validation with visual feedback
- Automatic redirect after authentication
- Persistent sessions with JWT tokens
- Secure logout functionality

### Blog Management
- Intuitive blog creation interface with Formik validation
- Rich text editing capabilities
- Real-time form validation and error handling
- Real-time preview and editing
- Personal blog dashboard

### Comprehensive Testing Framework
- **16 comprehensive test cases** covering all major functionality
- **Authentication testing** - registration, login, and JWT validation
- **Blog management testing** - CRUD operations and authorization
- **Isolated test environment** with in-memory SQLite database
- **Fast test execution** - complete test suite runs in under 10 seconds
- **Professional test structure** with fixtures and comprehensive assertions

### Responsive Design
- Mobile-first responsive layout
- Beautiful typography with Inter font
- Smooth animations and transitions
- Professional color scheme

## 🔧 Development

### Adding New Features
1. Backend: Add routes in `backend/routes/`
2. Frontend: Add components in `frontend/src/components/`
3. State: Update Redux slices in `frontend/src/store/`

### Database Migrations
The application automatically creates database tables on startup. For production, consider using Flask-Migrate for proper database versioning.

### Testing
- **Backend**: Comprehensive test suite using pytest with 16 test cases
- **Frontend**: Add tests using Jest and React Testing Library
- **Test Coverage**: Authentication, blog management, and API endpoints
- **Test Database**: In-memory SQLite for fast, isolated testing

## 🚀 Production Deployment

### Docker Production
1. Update environment variables for production
2. Use production-ready secrets management
3. Configure proper reverse proxy (nginx/traefik)
4. Set up SSL certificates
5. Configure monitoring and logging

### Security Considerations
- Change default JWT secret key
- Use environment variables for sensitive data
- Enable HTTPS in production
- Implement rate limiting
- Add input sanitization
- Use production-grade database

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- React team for the amazing framework
- Flask community for the excellent web framework
- Tailwind CSS for the utility-first CSS framework
- PostgreSQL for the robust database system

---

**Happy Blogging! 🎉**