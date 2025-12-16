import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  let isLoggedIn = false;
  try {
    const s = sessionStorage.getItem('isLoggedIn');
    isLoggedIn = s ? JSON.parse(s) : false;
  } catch {
    isLoggedIn = false;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
