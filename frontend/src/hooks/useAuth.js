import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout, selectCurrentUser, selectIsAuthenticated, selectToken } from '../store/authSlice';
import { isTokenExpired } from '../utils/auth';

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectToken);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  // Check if token is expired
  const isTokenValid = token && !isTokenExpired(token);

  // Auto logout if token is expired
  if (isAuthenticated && !isTokenValid) {
    handleLogout();
  }

  return {
    user,
    token,
    isAuthenticated: isAuthenticated && isTokenValid,
    logout: handleLogout,
  };
};
