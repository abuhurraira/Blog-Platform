from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from marshmallow import ValidationError
from extensions import db
from models.user import User
from models.blog import Blog
from schemas.blog_schemas import BlogCreateSchema, BlogUpdateSchema, BlogResponseSchema

blogs_bp = Blueprint('blogs', __name__)

@blogs_bp.route('/blogs', methods=['POST'])
def create_blog():
    """Create a new blog post (authenticated users only)"""
    try:
        print("DEBUG: Received blog creation request")
        print("DEBUG: Headers:", dict(request.headers))
        
        # Verify JWT manually to catch errors
        try:
            verify_jwt_in_request()
            current_user_id = get_jwt_identity()
            print("DEBUG: JWT verification successful, user ID:", current_user_id)
            # Convert string user ID to integer for database query
            current_user_id = int(current_user_id)
        except Exception as jwt_error:
            print("DEBUG: JWT verification failed:", str(jwt_error))
            return jsonify({'error': 'JWT validation failed', 'details': str(jwt_error)}), 401
        
        print("DEBUG: Request JSON:", request.get_json())
        
        # Validate request data
        schema = BlogCreateSchema()
        data = schema.load(request.get_json())
        print("DEBUG: Validated data:", data)
        
        user = User.query.get(current_user_id)
        
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        # Create new blog
        blog = Blog(
            title=data['title'],
            content=data['content'],
            user_id=current_user_id
        )
        
        db.session.add(blog)
        db.session.commit()
        
        # Return blog data
        blog_schema = BlogResponseSchema()
        return jsonify({
            'message': 'Blog created successfully',
            'blog': blog_schema.dump(blog.to_dict())
        }), 201
        
    except ValidationError as err:
        print("DEBUG: Validation error:", err.messages)
        return jsonify({'error': 'Validation error', 'details': err.messages}), 400
    except Exception as e:
        print("DEBUG: Exception:", str(e))
        db.session.rollback()
        return jsonify({'error': 'Failed to create blog', 'details': str(e)}), 500

@blogs_bp.route('/blogs', methods=['GET'])
def get_blogs():
    """Get all blog posts (public endpoint)"""
    try:
        # Get pagination parameters
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)
        
        # Query blogs with pagination
        blogs_query = Blog.query.order_by(Blog.created_at.desc())
        blogs_pagination = blogs_query.paginate(
            page=page, 
            per_page=per_page, 
            error_out=False
        )
        
        # Serialize blogs
        blog_schema = BlogResponseSchema()
        blogs_data = [blog_schema.dump(blog.to_dict()) for blog in blogs_pagination.items]
        
        return jsonify({
            'blogs': blogs_data,
            'pagination': {
                'page': page,
                'pages': blogs_pagination.pages,
                'per_page': per_page,
                'total': blogs_pagination.total,
                'has_next': blogs_pagination.has_next,
                'has_prev': blogs_pagination.has_prev
            }
        }), 200
        
    except Exception as e:
        return jsonify({'error': 'Failed to fetch blogs', 'details': str(e)}), 500

@blogs_bp.route('/blogs/<int:blog_id>', methods=['GET'])
def get_blog(blog_id):
    """Get a specific blog post"""
    try:
        blog = Blog.query.get(blog_id)
        
        if not blog:
            return jsonify({'error': 'Blog not found'}), 404
        
        blog_schema = BlogResponseSchema()
        return jsonify({
            'blog': blog_schema.dump(blog.to_dict())
        }), 200
        
    except Exception as e:
        return jsonify({'error': 'Failed to fetch blog', 'details': str(e)}), 500

@blogs_bp.route('/blogs/<int:blog_id>', methods=['PUT'])
@jwt_required()
def update_blog(blog_id):
    """Update a blog post (only by author)"""
    try:
        # Validate request data
        schema = BlogUpdateSchema()
        data = schema.load(request.get_json())
        
        # Get current user
        current_user_id = int(get_jwt_identity())
        
        # Find blog
        blog = Blog.query.get(blog_id)
        
        if not blog:
            return jsonify({'error': 'Blog not found'}), 404
        
        # Check if user is the author
        if blog.user_id != current_user_id:
            return jsonify({'error': 'You can only edit your own blogs'}), 403
        
        # Update blog
        if 'title' in data:
            blog.title = data['title']
        if 'content' in data:
            blog.content = data['content']
        
        db.session.commit()
        
        # Return updated blog
        blog_schema = BlogResponseSchema()
        return jsonify({
            'message': 'Blog updated successfully',
            'blog': blog_schema.dump(blog.to_dict())
        }), 200
        
    except ValidationError as err:
        return jsonify({'error': 'Validation error', 'details': err.messages}), 400
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to update blog', 'details': str(e)}), 500

@blogs_bp.route('/blogs/<int:blog_id>', methods=['DELETE'])
@jwt_required()
def delete_blog(blog_id):
    """Delete a blog post (only by author)"""
    try:
        # Get current user
        current_user_id = int(get_jwt_identity())
        
        # Find blog
        blog = Blog.query.get(blog_id)
        
        if not blog:
            return jsonify({'error': 'Blog not found'}), 404
        
        # Check if user is the author
        if blog.user_id != current_user_id:
            return jsonify({'error': 'You can only delete your own blogs'}), 403
        
        # Delete blog
        db.session.delete(blog)
        db.session.commit()
        
        return jsonify({
            'message': 'Blog deleted successfully'
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to delete blog', 'details': str(e)}), 500

@blogs_bp.route('/my-blogs', methods=['GET'])
@jwt_required()
def get_my_blogs():
    """Get current user's blog posts"""
    try:
        # Get current user
        current_user_id = int(get_jwt_identity())
        
        # Get pagination parameters
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)
        
        # Query user's blogs with pagination
        blogs_query = Blog.query.filter_by(user_id=current_user_id).order_by(Blog.created_at.desc())
        blogs_pagination = blogs_query.paginate(
            page=page, 
            per_page=per_page, 
            error_out=False
        )
        
        # Serialize blogs
        blog_schema = BlogResponseSchema()
        blogs_data = [blog_schema.dump(blog.to_dict()) for blog in blogs_pagination.items]
        
        return jsonify({
            'blogs': blogs_data,
            'pagination': {
                'page': page,
                'pages': blogs_pagination.pages,
                'per_page': per_page,
                'total': blogs_pagination.total,
                'has_next': blogs_pagination.has_next,
                'has_prev': blogs_pagination.has_prev
            }
        }), 200
        
    except Exception as e:
        return jsonify({'error': 'Failed to fetch your blogs', 'details': str(e)}), 500
