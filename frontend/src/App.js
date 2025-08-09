import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';

// Components
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import BlogDetail from './pages/BlogDetail';
import CreateBlog from './pages/CreateBlog';
import EditBlog from './pages/EditBlog';
import MyBlogs from './pages/MyBlogs';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Routes with layout */}
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/blog/:id" element={<Layout><BlogDetail /></Layout>} />
            
            {/* Protected routes */}
            <Route 
              path="/create" 
              element={
                <Layout>
                  <ProtectedRoute>
                    <CreateBlog />
                  </ProtectedRoute>
                </Layout>
              } 
            />
            <Route 
              path="/edit/:id" 
              element={
                <Layout>
                  <ProtectedRoute>
                    <EditBlog />
                  </ProtectedRoute>
                </Layout>
              } 
            />
            <Route 
              path="/my-blogs" 
              element={
                <Layout>
                  <ProtectedRoute>
                    <MyBlogs />
                  </ProtectedRoute>
                </Layout>
              } 
            />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
