import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { KisanProvider } from './context/KisanContext';
import { FarmerLayout } from './layouts/FarmerLayout';
import { OfficerLayout } from './layouts/OfficerLayout';

// Public & Auth Pages
import { LandingPage } from './pages/LandingPage';
import { FarmerLoginPage } from './pages/FarmerLoginPage';
import { OfficerLoginPage } from './pages/OfficerLoginPage';
import { BookingConfirmationPage } from './pages/BookingConfirmationPage';

// Farmer Pages
import { FarmerDashboard } from './pages/FarmerDashboard';
import { CentreSelectionPage } from './pages/CentreSelectionPage';
import { SlotBookingPage } from './pages/SlotBookingPage';
import { LiveQueuePage } from './pages/LiveQueuePage';
import { ProcurementStatusPage } from './pages/ProcurementStatusPage';
import { NotificationCentrePage } from './pages/NotificationCentrePage';
import { FarmerProfilePage } from './pages/FarmerProfilePage';

// Officer Pages
import { OfficerDashboardPage } from './pages/OfficerDashboardPage';
import { OfficerQueuePage } from './pages/OfficerQueuePage';
import { OfficerAppointmentsPage } from './pages/OfficerAppointmentsPage';
import { OfficerProcurementPage } from './pages/OfficerProcurementPage';
import { OfficerStatusPage } from './pages/OfficerStatusPage';
import { OfficerSettingsPage } from './pages/OfficerSettingsPage';

export function App() {
  return (
    <KisanProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Landing & Authentication */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/farmer-login" element={<FarmerLoginPage />} />
          <Route path="/officer-login" element={<OfficerLoginPage />} />

          {/* Farmer Portal Routes */}
          <Route element={<FarmerLayout />}>
            <Route path="/dashboard" element={<FarmerDashboard />} />
            <Route path="/centres" element={<CentreSelectionPage />} />
            <Route path="/book" element={<SlotBookingPage />} />
            <Route path="/booking-confirmation" element={<BookingConfirmationPage />} />
            <Route path="/queue" element={<LiveQueuePage />} />
            <Route path="/procurement" element={<ProcurementStatusPage />} />
            <Route path="/notifications" element={<NotificationCentrePage />} />
            <Route path="/profile" element={<FarmerProfilePage />} />
          </Route>

          {/* Officer Portal Routes */}
          <Route element={<OfficerLayout />}>
            <Route path="/officer" element={<OfficerDashboardPage />} />
            <Route path="/officer/queue" element={<OfficerQueuePage />} />
            <Route path="/officer/appointments" element={<OfficerAppointmentsPage />} />
            <Route path="/officer/procurement" element={<OfficerProcurementPage />} />
            <Route path="/officer/centre-status" element={<OfficerStatusPage />} />
            <Route path="/officer/settings" element={<OfficerSettingsPage />} />
          </Route>

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </KisanProvider>
  );
}

export default App;
