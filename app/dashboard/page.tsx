"use client";

import React, { useState } from 'react';
import Navbar from '@/app/components/Navbar';
import OverviewPage from '@/app/dashboard/pages/overview';
import PlantsDashboard from './pages/plants';

const Dashboard: React.FC = () => {
  const [activePage, setActivePage] = useState('overview');

  const renderPage = () => {
    switch(activePage) {
      case 'overview': return <OverviewPage />;
      case 'plants': return <PlantsDashboard />;
      default: return <OverviewPage />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar 
        activePage={activePage} 
        setActivePage={setActivePage} 
      />

      <main className="pt-16 flex-grow">
        {renderPage()}
      </main>
    </div>
  );
};

export default Dashboard;