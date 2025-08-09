import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useGetBlogQuery, useUpdateBlogMutation } from '../store/apiSlice';
import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from '../components/LoadingSpinner';

const EditBlogSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Title must be at least 3 characters')
    .max(200, 'Title must be less than 200 characters')
    .required('Title is required'),
  content: Yup.string()
    .min(10, 'Content must be at least 10 characters')
    .required('Content is required'),
});

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: blog, error: fetchError, isLoading: fetchLoading } = useGetBlogQuery(id);
  const [updateBlog, { isLoading: updateLoading, error: updateError }] = useUpdateBlogMutation();

  useEffect(() => {
    if (blog?.blog) {
      const blogData = blog.blog;
      
      // Check if user owns this blog
      if (user?.id !== blogData.user_id) {
        navigate('/');
        return;
      }
    }
  }, [blog, user, navigate]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await updateBlog({ id, ...values }).unwrap();
      navigate(`/blog/${id}`);
    } catch (err) {
      console.error('Failed to update blog:', err);
    } finally {
      setSubmitting(false);
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

  if (!blog?.blog) {
    return null;
  }

  const initialValues = {
    title: blog.blog.title,
    content: blog.blog.content,
  };

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

        <Formik
          initialValues={initialValues}
          validationSchema={EditBlogSchema}
          onSubmit={handleSubmit}
          enableReinitialize
          validateOnBlur={true}
          validateOnChange={true}
        >
          {({ isSubmitting, touched, errors, handleBlur }) => (
            <Form className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <Field
                  type="text"
                  id="title"
                  name="title"
                  onBlur={handleBlur}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                    touched.title && errors.title 
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                      : 'border-gray-300'
                  }`}
                  placeholder="Enter your blog title..."
                />
                {touched.title && errors.title && (
                  <div className="text-red-600 text-xs mt-1">
                    {errors.title}
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                  Content
                </label>
                <Field
                  as="textarea"
                  id="content"
                  name="content"
                  rows={15}
                  onBlur={handleBlur}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                    touched.content && errors.content 
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                      : 'border-gray-300'
                  }`}
                  placeholder="Write your blog content here..."
                />
                {touched.content && errors.content && (
                  <div className="text-red-600 text-xs mt-1">
                    {errors.content}
                  </div>
                )}
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
                  disabled={isSubmitting || updateLoading}
                  className="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {updateLoading ? <LoadingSpinner size="sm" /> : 'Update Blog'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditBlog;
