import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetBlogQuery, useUpdateBlogMutation } from '../store/apiSlice';
import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from '../components/LoadingSpinner';

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: blog, error: fetchError, isLoading: fetchLoading } = useGetBlogQuery(id);
  const [updateBlog, { isLoading: updateLoading, error: updateError }] = useUpdateBlogMutation();
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });

  useEffect(() => {
    if (blog?.blog) {
      const blogData = blog.blog;
      
      // Check if user owns this blog
      if (user?.id !== blogData.user_id) {
        navigate('/');
        return;
      }
      
      setFormData({
        title: blogData.title,
        content: blogData.content,
      });
    }
  }, [blog, user, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await updateBlog({ id, ...formData }).unwrap();
      navigate(`/blog/${id}`);
    } catch (err) {
      console.error('Failed to update blog:', err);
    }
  };

  if (fetchLoading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md inline-block">
          {fetchError.status === 404 ? 'Blog post not found' : 'Failed to load blog post'}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-0">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Blog Post</h1>
          <p className="text-gray-600">Make changes to your blog post</p>
        </div>

        {updateError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
            {updateError?.data?.error || 'Failed to update blog post. Please try again.'}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Enter your blog title..."
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              Content
            </label>
            <textarea
              id="content"
              name="content"
              required
              rows={15}
              value={formData.content}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Write your blog content here..."
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => navigate(`/blog/${id}`)}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={updateLoading || !formData.title.trim() || !formData.content.trim()}
              className="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {updateLoading ? <LoadingSpinner size="sm" /> : 'Update Blog'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBlog;
