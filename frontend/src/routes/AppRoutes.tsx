import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Landing } from '../pages/Landing';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { Dashboard } from '../pages/Dashboard';
import { Explore } from '../pages/Explore';
import { QuizAttempt } from '../pages/QuizAttempt';
import { Result } from '../pages/Result';
import { MyAttempts } from '../pages/MyAttempts';
import { Profile } from '../pages/Profile';
import { CreateQuiz } from '../pages/CreateQuiz';
import { ProtectedRoute } from './ProtectedRoute';
import { ProtectedLayout } from '../components/layout/ProtectedLayout';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Authenticated Protected Pages */}
      <Route
        element={
          <ProtectedRoute>
            <ProtectedLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/quiz/:quizId" element={<QuizAttempt />} />
        <Route path="/result/:attemptId" element={<Result />} />
        <Route path="/my-attempts" element={<MyAttempts />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create-quiz" element={<CreateQuiz />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
