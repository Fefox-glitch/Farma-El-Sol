import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

export const RequireAdmin = ({ children }: { children: ReactNode }) => {
  const authed = typeof window !== 'undefined' && localStorage.getItem('admin_auth') === 'true';
  if (!authed) return <Navigate to="/admin/login" replace />;
  return <>{children}</>;
};