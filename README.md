# Blog Platform

A modern full-stack blog platform built with React, Flask, and PostgreSQL. Features user authentication, blog management, and a responsive UI.

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose

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

## 🛠 Tech Stack

- **Frontend**: React 18, Redux Toolkit, Tailwind CSS, Nginx
- **Backend**: Flask, JWT Auth, SQLAlchemy, PostgreSQL
- **DevOps**: Docker, Docker Compose

## ✨ Features

- **User Management**: Registration, login, JWT authentication
- **Blog Management**: Create, edit, delete, view blogs
- **Security**: Password hashing, input validation, CORS
- **Modern UI**: Responsive design, loading states, form validation

## 📁 Project Structure

```
Blog-Platform/
├── frontend/          # React app with Nginx
├── backend/           # Flask API
├── docker-compose.yml # Multi-container setup
└── .env              # Environment configuration
```

## 🔌 API Endpoints

- **Auth**: `/api/signup`, `/api/login`, `/api/profile`
- **Blogs**: `/api/blogs`, `/api/my-blogs`
- **Docs**: http://localhost:5000/api/docs (Swagger UI)

## 🧪 Testing

```bash
cd backend
pip install -r requirements.txt
pytest tests/ -v
```

**16 test cases** covering authentication and blog management.

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

## 🔧 Development

### Environment Variables
Create `.env` file in the project root from `env.example` template. All services (PostgreSQL, Flask, React) use this single file.

### Docker Commands
```bash
docker-compose up -d          # Start in background
docker-compose logs -f        # View logs
docker-compose down           # Stop services
docker-compose down -v        # Stop and remove volumes
```

## 🚀 Production

- Update environment variables
- Use production secrets management
- Configure SSL certificates
- Set up monitoring and logging

---

**Happy Blogging! 🎉**