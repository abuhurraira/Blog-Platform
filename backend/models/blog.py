from extensions import db
from datetime import datetime

class Blog(db.Model):
    __tablename__ = 'blogs'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Foreign key to user
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    
    def to_dict(self):
        """Convert blog to dictionary"""
        created_at_str = self.created_at.isoformat() if hasattr(self.created_at, 'isoformat') else str(self.created_at)
        updated_at_str = self.updated_at.isoformat() if hasattr(self.updated_at, 'isoformat') else str(self.updated_at)
        return {
            'id': self.id,
            'title': self.title,
            'content': self.content,
            'created_at': created_at_str,
            'updated_at': updated_at_str,
            'user_id': self.user_id,
            'author': self.author.username if self.author else None
        }
