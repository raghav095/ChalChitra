import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import api from '../api/axios';
import { login } from '../features/userSlice';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  const dispatch = useDispatch();
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    // If not authenticated, try server session once
    if (!isAuthenticated) {
      let mounted = true;
      setChecking(true);
      api.get('/users/me').then(res => {
        if (!mounted) return;
        if (res?.data?.user) {
          dispatch(login(res.data.user));
        }
      }).catch(() => {
        // ignore
      }).finally(() => { if (mounted) setChecking(false); });
      return () => { mounted = false; };
    }
  }, [isAuthenticated, dispatch]);

  if (checking) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
