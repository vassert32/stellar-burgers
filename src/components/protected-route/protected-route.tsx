// src/components/protected-route/protected-route.tsx
import React, { FC, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { RootState, useDispatch, useSelector } from '../../services/store';
import { getProfile } from '../../services/slices/slice-user';

type RouteProps = {
  children: React.ReactNode;
};

// Доступ только для авторизованных
export const ProtectedRoute: FC<RouteProps> = ({ children }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { data, isLoading } = useSelector((state: RootState) => state.user);

  const isAuthenticated = document.cookie
    .split('; ')
    .some((entry) => entry.startsWith('accessToken='));

  useEffect(() => {
    if (isAuthenticated && !data && !isLoading) {
      dispatch(getProfile());
    }
  }, [dispatch, isAuthenticated, data, isLoading]);

  if (isLoading || (isAuthenticated && !data)) return null;

  if (!data) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

// Доступ только для гостей
export const PublicRoute: FC<RouteProps> = ({ children }) => {
  const dispatch = useDispatch();
  const { data, isLoading } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const tokenExists = document.cookie
      .split('; ')
      .some((entry) => entry.startsWith('accessToken='));

    if (tokenExists && !data && !isLoading) {
      dispatch(getProfile());
    }
  }, [dispatch, data, isLoading]);

  if (isLoading) return null;

  if (data) {
    return <Navigate to='/' replace />;
  }

  return <>{children}</>;
};