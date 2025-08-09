import os
# Set SQLite database URL for local development
os.environ['DATABASE_URL'] = 'sqlite:///blog.db'

# Import and run the Flask app
from app import create_app

if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0', port=5000, debug=True)

