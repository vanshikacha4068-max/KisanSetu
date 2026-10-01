import React from 'react';
import { Outlet } from 'react-router-dom';
import { DemoControlBar } from '../components/DemoControlBar';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { MobileBottomNav } from '../components/MobileBottomNav';
import { Toast } from '../components/Toast';

export const FarmerLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f8faf6] flex flex-col font-sans">
      <DemoControlBar />
      <Navbar />

      <div className="flex-1 max-w-7xl w-full mx-auto flex">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-24 lg:pb-12 max-w-full overflow-x-hidden">
          <Outlet />
        </main>
      </div>

      <MobileBottomNav />
      <Toast />
    </div>
  );
};
