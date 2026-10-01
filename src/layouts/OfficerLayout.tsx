import React from 'react';
import { Outlet } from 'react-router-dom';
import { DemoControlBar } from '../components/DemoControlBar';
import { Navbar } from '../components/Navbar';
import { OfficerSidebar } from '../components/OfficerSidebar';
import { Toast } from '../components/Toast';

export const OfficerLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      <DemoControlBar />
      <Navbar />

      <div className="flex-1 max-w-7xl w-full mx-auto flex">
        <OfficerSidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-12 max-w-full overflow-x-hidden">
          <Outlet />
        </main>
      </div>

      <Toast />
    </div>
  );
};
