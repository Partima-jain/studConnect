import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { UniversitiesPage } from './pages/UniversitiesPage';
import { ContactPage } from './pages/ContactPage';
import { StudentDashboard } from './pages/StudentDashboard';
import { CounsellorDashboard } from './pages/CounsellorDashboard';
import { SiteNav } from './components/SiteNav';
import { AuthProvider, useAuth } from './context/AuthContext';
import PeerCounsellingPage from './pages/PeerCounsellingPage';
import AuthRegisterPage from './pages/AuthRegisterPage';
import AuthVerifyPage from './pages/AuthVerifyPage';
import AuthLoginPage from './pages/AuthLoginPage';
import AuthForgotPasswordPage from './pages/AuthForgotPasswordPage';
import { FinancialServicesPage } from './pages/FinancialServicesPage';
import UniversityDetailPage from './pages/UniversityDetailPage';
import StudyApplication from './pages/StudyApplication';
import ProgramDetailsPage from './pages/ProgramDetailsPage';
import AccommodationPage from './pages/AccommodationPage';
import UniversityRepresentativeCounsellingPage from './pages/UniversityRepresentativeCounsellingPage';
import AirportPickupPage from './pages/AirportPickupPage';

// RequireAuth component to protect routes
const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }
  return <>{children}</>;
};

export const App: React.FC = () => (
  <AuthProvider>
    <Router>
      <SiteNav />
      <Routes>
        <Route path="/" element={<LandingPage />
        } />
        <Route path="/about" element={
          <RequireAuth>
            <AboutPage />
          </RequireAuth>
        } />
        <Route path="/services" element={
          <RequireAuth>
            <ServicesPage />
          </RequireAuth>
        } />
        <Route path="/services/peer-counselling" element={
          <RequireAuth>
            <PeerCounsellingPage />
          </RequireAuth>
        } />
        <Route path="/universities" element={
          <RequireAuth>
            <UniversitiesPage />
          </RequireAuth>
        } />
        <Route path="/universities/:id" element={
          <UniversityDetailPage />
        } />
        <Route path="/program-details/:id" element={
           <ProgramDetailsPage />
        } />
        <Route path="/contact" element={
          <RequireAuth>
            <ContactPage />
          </RequireAuth>
        } />
        <Route path="/student" element={
          <RequireAuth>
            <StudentDashboard />
          </RequireAuth>
        } />
        <Route path="/counsellor" element={
          <RequireAuth>
            <CounsellorDashboard />
          </RequireAuth>
        } />
        {/* Auth pages are public */}
        <Route path="/auth/register" element={<AuthRegisterPage />} />
        <Route path="/auth/verify" element={<AuthVerifyPage />} />
        <Route path="/auth/login" element={<AuthLoginPage />} />
        <Route path="/auth/forgot-password" element={<AuthForgotPasswordPage />} />
        <Route path="/financial-services" element={
          <RequireAuth>
            <FinancialServicesPage />
          </RequireAuth>
        } />
        <Route path="/services/international-application-process" element={
          <RequireAuth>
            <StudyApplication />
          </RequireAuth>
        } />
        <Route path="/accommodation" element={
          <RequireAuth>
            <AccommodationPage />
          </RequireAuth>
        } />
        <Route path="/services/university-representative-counselling" element={
          <RequireAuth>
            <UniversityRepresentativeCounsellingPage />
          </RequireAuth>
        } />
        <Route path="/services/airport-pickup" element={
          <RequireAuth>
            <AirportPickupPage />
          </RequireAuth>
        } />
        <Route path="*" element={<div style={{padding:'4rem',textAlign:'center'}}>Page Not Found</div>} />
      </Routes>
    </Router>
  </AuthProvider>
);
