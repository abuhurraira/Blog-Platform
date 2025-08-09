import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useCreateBlogMutation } from '../store/apiSlice';
import LoadingSpinner from '../components/LoadingSpinner';

const CreateBlogSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Title must be at least 3 characters')
    .max(200, 'Title must be less than 200 characters')
    .required('Title is required'),
  content: Yup.string()
    .min(10, 'Content must be at least 10 characters')
    .required('Content is required'),
});

const CreateBlog = () => {
  const [createBlog, { isLoading, error }] = useCreateBlogMutation();
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const result = await createBlog(values).unwrap();
      navigate(`/blog/${result.blog.id}`);
    } catch (err) {
      console.error('Failed to create blog:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-0">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Blog Post</h1>
          <p className="text-gray-600">Share your thoughts with the world</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
            {error?.data?.error || 'Failed to create blog post. Please try again.'}
          </div>
        )}

        <Formik
          initialValues={{ title: '', content: '' }}
          validationSchema={CreateBlogSchema}
          onSubmit={handleSubmit}
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
                  onClick={() => navigate(-1)}
                  className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || isLoading}
                  className="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? <LoadingSpinner size="sm" /> : 'Publish Blog'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreateBlog;
