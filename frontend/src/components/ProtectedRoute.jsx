import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import api from '../api/axios';
import { login } from '../features/userSlice';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  const dispatch = useDispatch();
  // Start in a checking state so we don't immediately redirect on first render
  // before the server-side session check has run. This prevents a flash-redirect
  // when users have a valid server session cookie but Redux is not yet populated.
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let mounted = true;
    // If already authenticated in Redux, we're done.
    if (isAuthenticated) {
      setChecking(false);
      return () => { mounted = false; };
    }

    // Try server session once
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
  }, [isAuthenticated, dispatch]);

  if (checking) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
