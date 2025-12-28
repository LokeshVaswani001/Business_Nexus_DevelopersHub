import React, { useState, useEffect } from 'react';
import Joyride, { Step, CallBackProps, STATUS } from 'react-joyride';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import MeetingWidget from './MeetingWidget';

export const DashboardLayout: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const [runTour, setRunTour] = useState(false);

  // Run tour only once
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      const tourCompleted = localStorage.getItem('dashboardTourCompleted');
      if (!tourCompleted) {
        setRunTour(true);
      }
    }
  }, [isAuthenticated, isLoading]);

  const handleTourCallback = (data: CallBackProps) => {
    if (data.status === STATUS.FINISHED || data.status === STATUS.SKIPPED) {
      localStorage.setItem('dashboardTourCompleted', 'true');
      setRunTour(false);
    }
  };

  const steps: Step[] = [
    {
      target: 'body',
      content: 'Welcome to Business Nexus Dashboard!',
      placement: 'center',
    },
    {
      target: '.sidebar',
      content: 'Use this sidebar to navigate.',
    },
    {
      target: '.meeting-widget',
      content: 'Your upcoming meetings appear here.',
    },
    {
      target: '.dashboard-content',
      content: 'This is your main workspace.',
    },
  ];

  // Loading
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  // Auth guard
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Guided Tour */}
      <Joyride
        steps={steps}
        run={runTour}
        continuous
        showSkipButton
        showProgress
        callback={handleTourCallback}
        styles={{
          options: {
            primaryColor: '#2563eb',
            zIndex: 10000,
          },
        }}
      />

      <Navbar />

      <div className="flex-1 flex overflow-hidden">
        <div className="sidebar">
          <Sidebar />
        </div>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6 dashboard-content bg-white rounded-xl p-6 shadow-sm">
            <div className="meeting-widget">
              <MeetingWidget />
            </div>

            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
