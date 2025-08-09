import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetMyBlogsQuery, useDeleteBlogMutation } from '../store/apiSlice';
import { formatDate } from '../utils/auth';
import LoadingSpinner from '../components/LoadingSpinner';

const MyBlogs = () => {
  const [page, setPage] = useState(1);
  const { data, error, isLoading } = useGetMyBlogsQuery({ page, per_page: 10 });
  const [deleteBlog] = useDeleteBlogMutation();

  const handleDelete = async (blogId, blogTitle) => {
    if (window.confirm(`Are you sure you want to delete "${blogTitle}"?`)) {
      try {
        await deleteBlog(blogId).unwrap();
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
          Failed to load your blogs. Please try again later.
        </div>
      </div>
    );
  }

  const blogs = data?.blogs || [];
  const pagination = data?.pagination || {};

  return (
    <div className="px-4 sm:px-0">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Blog Posts</h1>
        <Link
          to="/create"
          className="bg-primary-600 text-white px-6 py-2 rounded-md font-medium hover:bg-primary-700 transition-colors"
        >
          Create New Blog
        </Link>
      </div>

      {blogs.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <p className="text-gray-500 text-lg mb-4">You haven't written any blog posts yet.</p>
          <Link
            to="/create"
            className="bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
          >
            Write Your First Blog
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {blogs.map((blog) => (
            <article
              key={blog.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    <Link
                      to={`/blog/${blog.id}`}
                      className="hover:text-primary-600 transition-colors"
                    >
                      {blog.title}
                    </Link>
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {blog.content.substring(0, 150)}
                    {blog.content.length > 150 && '...'}
                  </p>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>Created {formatDate(blog.created_at)}</span>
                    {blog.updated_at !== blog.created_at && (
                      <span>• Updated {formatDate(blog.updated_at)}</span>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 ml-6">
                  <Link
                    to={`/edit/${blog.id}`}
                    className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(blog.id, blog.title)}
                    className="text-red-600 hover:text-red-700 font-medium text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="flex justify-center items-center space-x-4 mt-8">
          <button
            onClick={() => setPage(page - 1)}
            disabled={!pagination.has_prev}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
          <span className="text-sm text-gray-700">
            Page {pagination.page} of {pagination.pages}
          </span>
          
          <button
            onClick={() => setPage(page + 1)}
            disabled={!pagination.has_next}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default MyBlogs;
