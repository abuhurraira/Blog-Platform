import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_URL || '/api',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: ['User', 'Blog'],
  endpoints: (builder) => ({
    // Auth endpoints
    signup: builder.mutation({
      query: (userData) => ({
        url: '/signup',
        method: 'POST',
        body: userData,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    getProfile: builder.query({
      query: () => '/profile',
      providesTags: ['User'],
    }),

    // Blog endpoints
    getBlogs: builder.query({
      query: ({ page = 1, per_page = 10 } = {}) => 
        `/blogs?page=${page}&per_page=${per_page}`,
      providesTags: ['Blog'],
    }),
    getBlog: builder.query({
      query: (id) => `/blogs/${id}`,
      providesTags: (result, error, id) => [{ type: 'Blog', id }],
    }),
    createBlog: builder.mutation({
      query: (blogData) => ({
        url: '/blogs',
        method: 'POST',
        body: blogData,
      }),
      invalidatesTags: ['Blog'],
    }),
    updateBlog: builder.mutation({
      query: ({ id, ...blogData }) => ({
        url: `/blogs/${id}`,
        method: 'PUT',
        body: blogData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Blog', id }, 'Blog'],
    }),
    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/blogs/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Blog'],
    }),
    getMyBlogs: builder.query({
      query: ({ page = 1, per_page = 10 } = {}) => 
        `/my-blogs?page=${page}&per_page=${per_page}`,
      providesTags: ['Blog'],
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useGetProfileQuery,
  useGetBlogsQuery,
  useGetBlogQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
  useGetMyBlogsQuery,
} = apiSlice;
