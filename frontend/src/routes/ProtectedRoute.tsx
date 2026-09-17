import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Skeleton } from '../components/ui/Skeleton';

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="h-screen w-screen bg-[#FDF7ED] flex items-center justify-center p-8">
        <div className="max-w-md w-full space-y-4 text-center">
          <Skeleton className="h-12 w-12 rounded-2xl mx-auto" />
          <Skeleton className="h-6 w-3/4 mx-auto" />
          <Skeleton className="h-4 w-1/2 mx-auto" />
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
