import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetBlogsQuery } from '../store/apiSlice';
import { formatDate } from '../utils/auth';
import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from '../components/LoadingSpinner';

const Home = () => {
  const [page, setPage] = useState(1);
  const { data, error, isLoading } = useGetBlogsQuery({ page, per_page: 10 });
  const { isAuthenticated } = useAuth();

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
          Failed to load blogs. Please try again later.
        </div>
      </div>
    );
  }

  const blogs = data?.blogs || [];
  const pagination = data?.pagination || {};

  return (
    <div className="px-4 sm:px-0">
      <div className="text-center py-12 bg-white rounded-lg shadow-sm mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to BlogPlatform
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Discover amazing stories and share your own thoughts
        </p>
        <Link
          to={isAuthenticated ? "/create" : "/signup"}
          className="bg-primary-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-primary-700 transition-colors"
        >
          Start Writing
        </Link>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Blog Posts</h2>
        
        {blogs.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <p className="text-gray-500 text-lg">No blog posts yet. Be the first to write one!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {blogs.map((blog) => (
              <article
                key={blog.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium">
                      {blog.author}
                    </div>
                    <span className="text-gray-500 text-sm">
                      {formatDate(blog.created_at)}
                    </span>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  <Link
                    to={`/blog/${blog.id}`}
                    className="hover:text-primary-600 transition-colors"
                  >
                    {blog.title}
                  </Link>
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {blog.content.substring(0, 200)}
                  {blog.content.length > 200 && '...'}
                </p>
                
                <Link
                  to={`/blog/${blog.id}`}
                  className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                >
                  Read More →
                </Link>
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
    </div>
  );
};

export default Home;
