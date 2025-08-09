import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useGetBlogQuery, useDeleteBlogMutation } from '../store/apiSlice';
import { useAuth } from '../hooks/useAuth';
import { formatDate } from '../utils/auth';
import LoadingSpinner from '../components/LoadingSpinner';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { data: blog, error, isLoading } = useGetBlogQuery(id);
  const [deleteBlog, { isLoading: deleteLoading }] = useDeleteBlogMutation();

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        await deleteBlog(id).unwrap();
        navigate('/my-blogs');
      } catch (err) {
        console.error('Failed to delete blog:', err);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md inline-block">
          {error.status === 404 ? 'Blog post not found' : 'Failed to load blog post'}
        </div>
      </div>
    );
  }

  const blogData = blog?.blog;
  const isOwner = isAuthenticated && user?.id === blogData?.user_id;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-0">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <Link
              to="/"
              className="text-primary-600 hover:text-primary-700 font-medium text-sm"
            >
              ← Back to Home
            </Link>
            
            {isOwner && (
              <div className="flex items-center space-x-3">
                <Link
                  to={`/edit/${blogData.id}`}
                  className="bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-700 transition-colors"
                >
                  Edit
                </Link>
                <button
                  onClick={handleDelete}
                  disabled={deleteLoading}
                  className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  {deleteLoading ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            )}
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {blogData?.title}
          </h1>

          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <div className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full font-medium">
                {blogData?.author}
              </div>
            </div>
            <span>•</span>
            <span>{formatDate(blogData?.created_at)}</span>
            {blogData?.updated_at !== blogData?.created_at && (
              <>
                <span>•</span>
                <span>Updated {formatDate(blogData?.updated_at)}</span>
              </>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
            {blogData?.content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
