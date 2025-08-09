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
- **CORS Support**: Proper cross-origin resource sharing configuration

### Modern UI/UX
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Loading States**: Smooth loading indicators throughout the app
- **Error Handling**: User-friendly error messages and validation
- **Clean Interface**: Modern, professional design with excellent UX

## 🛠 Tech Stack

### Frontend
- **React 18**: Modern React with hooks and functional components
- **Redux Toolkit**: State management with RTK Query for API calls
- **React Router**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework
- **Nginx**: Production web server

### Backend
- **Flask**: Python web framework
- **Flask-JWT-Extended**: JWT authentication
- **Flask-SQLAlchemy**: ORM for database operations
- **Flask-CORS**: Cross-origin resource sharing
- **Marshmallow**: Data serialization and validation
- **bcrypt**: Password hashing

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
│   ├── app.py             # Flask application factory
│   ├── config.py          # Application configuration
│   ├── requirements.txt   # Python dependencies
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

## 🔌 API Endpoints

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

### Authentication Flow
- Clean, modern login and signup forms
- Automatic redirect after authentication
- Persistent sessions with JWT tokens
- Secure logout functionality

### Blog Management
- Intuitive blog creation interface
- Rich text editing capabilities
- Real-time preview and editing
- Personal blog dashboard

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
- Backend: Add tests using pytest
- Frontend: Add tests using Jest and React Testing Library

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