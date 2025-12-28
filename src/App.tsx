import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Layout
import { DashboardLayout } from './components/layout/DashboardLayout';

// Auth Pages
import LoginPage from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import TwoFactor from './pages/auth/TwoFactor';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';

// Dashboard Pages
import { EntrepreneurDashboard } from './pages/dashboard/EntrepreneurDashboard';
import { InvestorDashboard } from './pages/dashboard/InvestorDashboard';

// Profile Pages
import { EntrepreneurProfile } from './pages/profile/EntrepreneurProfile';
import { InvestorProfile } from './pages/profile/InvestorProfile';

// Feature Pages
import { InvestorsPage } from './pages/investors/InvestorsPage';
import { EntrepreneursPage } from './pages/entrepreneurs/EntrepreneursPage';
import { MessagesPage } from './pages/messages/MessagesPage';
import { NotificationsPage } from './pages/notifications/NotificationsPage';
import VideoCall from './pages/video/videocall';
import DocumentChamber from './pages/documents/DocumentsChamber';
import SettingsPage from './pages/settings/SettingsPage';
import { HelpPage } from './pages/help/HelpPage';
import { DealsPage } from './pages/deals/DealsPage';
import WalletPage from './pages/payments/walletpage';
import { ChatPage } from './pages/chat/ChatPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>

          {/* Auth (NO layout) */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/2fa" element={<TwoFactor />} />

          {/* Protected App */}
          <Route path="/" element={<DashboardLayout />}>

            {/* Dashboards */}
            <Route path="dashboard/entrepreneur" element={<EntrepreneurDashboard />} />
            <Route path="dashboard/investor" element={<InvestorDashboard />} />

            {/* Profiles */}
            <Route path="profile/entrepreneur/:id" element={<EntrepreneurProfile />} />
            <Route path="profile/investor/:id" element={<InvestorProfile />} />

            {/* Core Features */}
            <Route path="investors" element={<InvestorsPage />} />
            <Route path="entrepreneurs" element={<EntrepreneursPage />} />
            <Route path="messages" element={<MessagesPage />} />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="documents" element={<DocumentChamber />} />
            <Route path="video-call" element={<VideoCall />} />
            <Route path="deals" element={<DealsPage />} />
            <Route path="wallet" element={<WalletPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="help" element={<HelpPage />} />

            {/* Chat */}
            <Route path="chat" element={<ChatPage />} />
            <Route path="chat/:userId" element={<ChatPage />} />

          </Route>

          {/* Redirects */}
          <Route path="*" element={<Navigate to="/login" replace />} />

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
