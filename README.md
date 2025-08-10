# Blog Platform

A modern full-stack blog platform built with React, Flask, and PostgreSQL. Features user authentication, blog management, and a responsive UI with comprehensive testing.

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose
- Git

### Run the App
```bash
git clone <repository-url>
cd Blog-Platform
docker-compose up --build
```

**Access:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- API Docs: http://localhost:5000/api/docs
- Database: PostgreSQL on localhost:5432

## 🛠 Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **Redux Toolkit** - State management with RTK Query for API calls
- **Tailwind CSS** - Utility-first CSS framework for responsive design
- **Nginx** - Production web server and reverse proxy

### Backend
- **Flask** - Python web framework
- **Flask-JWT-Extended** - JWT authentication system
- **Flask-SQLAlchemy** - ORM for database operations
- **Flask-CORS** - Cross-origin resource sharing
- **Flask-Swagger-UI** - Interactive API documentation

### Database
- **PostgreSQL 15** - Robust, production-ready relational database
- **psycopg** - PostgreSQL adapter for Python

### DevOps
- **Docker** - Containerization for consistent environments
- **Docker Compose** - Multi-container orchestration

## ✨ Features

### User Management
- **Registration & Login** - Secure user authentication with JWT tokens
- **Profile Management** - User profile access and management
- **Protected Routes** - Secure access to authenticated features

### Blog Management
- **CRUD Operations** - Create, read, update, and delete blog posts
- **Personal Dashboard** - Manage your own blog posts
- **Public Blog Viewing** - Browse all published blogs

### Security & Validation
- **Password Hashing** - Secure password storage with bcrypt
- **Input Validation** - Server-side validation with Marshmallow
- **Form Validation** - Client-side validation with Formik and Yup
- **CORS Support** - Proper cross-origin resource sharing

### Modern UI/UX
- **Responsive Design** - Mobile-first design approach
- **Loading States** - Smooth loading indicators throughout
- **Error Handling** - User-friendly error messages
- **Form Validation** - Real-time validation with visual feedback

## 📁 Project Structure

```
Blog-Platform/
├── frontend/                 # React application
│   ├── src/                 # Source code
│   │   ├── components/      # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── store/          # Redux store and slices
│   │   └── hooks/          # Custom React hooks
│   ├── Dockerfile          # Frontend container
│   └── nginx.conf          # Nginx configuration
├── backend/                 # Flask API
│   ├── models/             # Database models
│   ├── routes/             # API endpoints
│   ├── schemas/            # Data validation
│   ├── tests/              # Test suite (16 test cases)
│   └── Dockerfile          # Backend container
├── docker-compose.yml       # Multi-container setup
├── .env                     # Environment configuration
└── init.sql                # Database initialization
```

## 🔌 API Endpoints

### Authentication
- `POST /api/signup` - User registration
- `POST /api/login` - User login
- `GET /api/profile` - Get user profile (authenticated)

### Blog Management
- `GET /api/blogs` - Get all blogs (public)
- `GET /api/blogs/<id>` - Get specific blog
- `POST /api/blogs` - Create new blog (authenticated)
- `PUT /api/blogs/<id>` - Update blog (owner only)
- `DELETE /api/blogs/<id>` - Delete blog (owner only)
- `GET /api/my-blogs` - Get user's blogs (authenticated)

### System
- `GET /api/health` - Health check endpoint
- **Interactive Docs**: http://localhost:5000/api/docs (Swagger UI)

## 🧪 Testing

Comprehensive test suite with **16 test cases** covering:

```bash
cd backend
pip install -r requirements.txt
pytest tests/ -v
```

**Test Coverage:**
- ✅ **Authentication**: Registration, login, JWT validation
- ✅ **Blog Management**: CRUD operations, authorization
- ✅ **API Endpoints**: All major functionality tested
- ✅ **Error Handling**: Invalid data, unauthorized access

## 🔧 Development

### Environment Setup
Create `.env` file in the project root from `env.example` template. All services (PostgreSQL, Flask, React) use this unified configuration.

#### Environment Variables
The project includes a comprehensive `env.example` file with all necessary configuration:

- **Database**: PostgreSQL connection settings and credentials
- **Backend**: Flask server configuration, JWT secrets, and security keys
- **Frontend**: React app settings and API endpoints
- **Security**: CORS origins and cross-origin settings

**Important**: Copy `env.example` to `.env` and update the values according to your environment. Never commit the actual `.env` file to version control.

### Docker Commands
```bash
docker-compose up --build    # Build and start all services
docker-compose up -d         # Start in background
docker-compose logs -f       # View logs
docker-compose down          # Stop services
docker-compose down -v       # Stop and remove volumes
```

### Local Development (Optional)
```bash
# Backend
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
python app.py

# Frontend
cd frontend
npm install
npm start
```

## 🚀 Production Deployment

### Environment Configuration
- Update environment variables for production
- Use production secrets management
- Configure proper database credentials

### Security & Performance
- Enable HTTPS with SSL certificates
- Set up reverse proxy (Nginx/Traefik)
- Configure monitoring and logging
- Implement rate limiting
- Use production-grade PostgreSQL

### Database Considerations
- **PostgreSQL**: Configure for production workloads
- **Backup Strategy**: Regular database backups
- **Connection Pooling**: Optimize database connections
- **Monitoring**: Track database performance metrics

## 📸 Swagger API Endpoints

### Interactive API Documentation

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

---

**Happy Blogging! 🎉**