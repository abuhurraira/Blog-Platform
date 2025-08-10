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
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl inline-block shadow-soft">
          <svg className="w-6 h-6 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Failed to load blogs. Please try again later.
        </div>
      </div>
    );
  }

  const blogs = data?.blogs || [];
  const pagination = data?.pagination || {};

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center py-16 bg-gradient-to-br from-white via-blue-50 to-indigo-50 rounded-2xl shadow-soft border border-gray-100/50">
        <div className="max-w-3xl mx-auto px-6">
          <div className="w-20 h-20 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-elegant">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
              BlogPlatform
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Discover amazing stories, share your thoughts, and connect with writers from around the world
          </p>
          <Link
            to={isAuthenticated ? "/create" : "/signup"}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl text-lg font-semibold hover:from-primary-600 hover:to-primary-700 transition-all duration-300 shadow-soft hover:shadow-elegant transform hover:-translate-y-1"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Start Writing Today
          </Link>
        </div>
      </div>

      {/* Blog Posts Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-900">
            Latest Blog Posts
          </h2>
          <div className="text-sm text-gray-500 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200/50">
            {blogs.length} {blogs.length === 1 ? 'post' : 'posts'}
          </div>
        </div>
        
        {blogs.length === 0 ? (
          <div className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-2xl shadow-soft border border-gray-100/50">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-gray-500 text-lg mb-4">No blog posts yet</p>
            <p className="text-gray-400">Be the first to share your story with the world!</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog, index) => (
              <article
                key={blog.id}
                className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-soft border border-gray-100/50 p-6 hover:shadow-elegant transition-all duration-300 transform hover:-translate-y-1 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-semibold">
                        {blog.author?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{blog.author}</div>
                      <div className="text-xs text-gray-500">{formatDate(blog.created_at)}</div>
                    </div>
                  </div>
                  <div className="w-2 h-2 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors duration-200">
                  <Link to={`/blog/${blog.id}`}>
                    {blog.title}
                  </Link>
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                  {blog.content.substring(0, 150)}
                  {blog.content.length > 150 && '...'}
                </p>
                
                <div className="flex items-center justify-between">
                  <Link
                    to={`/blog/${blog.id}`}
                    className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium text-sm group-hover:translate-x-1 transition-all duration-200"
                  >
                    Read More
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                  <div className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-full">
                    {blog.content.length > 150 ? 'Long read' : 'Quick read'}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="flex justify-center items-center space-x-4 mt-12">
            <button
              onClick={() => setPage(page - 1)}
              disabled={!pagination.has_prev}
              className="px-6 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 bg-white/80 backdrop-blur-sm hover:bg-white hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-soft hover:shadow-elegant"
            >
              <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </button>
            
            <div className="flex items-center space-x-2">
              {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={`w-10 h-10 rounded-lg text-sm font-medium transition-all duration-200 ${
                    pageNum === page
                      ? 'bg-primary-500 text-white shadow-elegant'
                      : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white hover:text-primary-600 border border-gray-200'
                  }`}
                >
                  {pageNum}
                </button>
              ))}
            </div>
            
            <button
              onClick={() => setPage(page + 1)}
              disabled={!pagination.has_next}
              className="px-6 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 bg-white/80 backdrop-blur-sm hover:bg-white hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-soft hover:shadow-elegant"
            >
              Next
              <svg className="w-4 h-4 inline ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
