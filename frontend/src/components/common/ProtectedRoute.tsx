import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'user' | 'partner' | 'admin';
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole, 
  redirectTo = '/login' 
}) => {
  const { isAuthenticated, user } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login page with the current location as state
    // This allows us to send the user back to their intended destination after login
    return <Navigate 
      to={redirectTo} 
      state={{ 
        from: location, 
        intent: 'proceed_to_payment' 
      }} 
      replace 
    />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    // User doesn't have the required role
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Access Denied</h1>
        <p className="text-gray-600">You don't have permission to access this page.</p>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute; 