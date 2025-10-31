import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import api from '../api/axios';
import { login } from '../features/userSlice';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  const dispatch = useDispatch();
  // Start in a checking state so we don't immediately redirect on first render
  // before the server-side session check has run. Always probe the server for
  // an active session on mount so reloads with a valid cookie are recognized.
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let mounted = true;

    const probe = async () => {
      setChecking(true);
      try {
        const res = await api.get('/users/me');
        if (!mounted) return;
        if (res?.data?.user) {
          dispatch(login(res.data.user));
        }
      } catch (err) {
        // ignore network/auth errors — we'll redirect if not authenticated
      } finally {
        if (mounted) setChecking(false);
      }
    };

    probe();
    return () => { mounted = false; };
  }, [dispatch]);

  if (checking) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
