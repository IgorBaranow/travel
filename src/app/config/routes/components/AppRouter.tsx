import { Suspense, lazy } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import Loader from '@features/ui/Loader';
import AccountLayout from '@features/ui/layout/AccountLayout/AccountLayout';
import AuthLayout from '@features/ui/layout/AuthLayout';
import AddTripPage from '@pages/account/add-trip';
import DashboardPage from '@pages/account/dashboard';
import TripDetailsPage from '@pages/account/trips/trip-details';
import TripsPage from '@pages/account/trips/trips';
import NotFoundPage from '@pages/not-found';

import { AppRoutes } from '../AppRoutes';
import ProtectedRoute from './ProtectedRoute';

const LoginPage = lazy(() => import('@pages/login'));
const SignUpPage = lazy(() => import('@pages/sign-up'));

export default function AppRouter() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route 
          path={AppRoutes.home} 
          element={<Navigate to={AppRoutes.dashboard} replace />} 
        />

        {/* Public Pages */}
        <Route element={<AuthLayout />}>
          <Route path={AppRoutes.signUp} element={<SignUpPage />} />
          <Route path={AppRoutes.login} element={<LoginPage />} />
        </Route>

        {/* Account Pages */}
        <Route
          element={
            <ProtectedRoute>
              <AccountLayout />
            </ProtectedRoute>
          }
        >
          <Route path={AppRoutes.dashboard} element={<DashboardPage />} />
          <Route path={AppRoutes.trips} element={<TripsPage />} />
          <Route
            path={`${AppRoutes.trips}/:tripId`}
            element={<TripDetailsPage />}
          />
          <Route path={AppRoutes.addTrip} element={<AddTripPage />} />
        </Route>

        {/* Not Found Page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}