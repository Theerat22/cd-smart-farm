"use client";

import React, { useState } from 'react';
import Navbar from '@/app/components/Navbar';
import OverviewPage from '@/app/dashboard/pages/overview';
import PlantsDashboard from './pages/plants';
import PlantGrowthDashboard from './pages/tracking';
// import Sensor from '@/app/dashboard/pages/realtimedata';
const Dashboard: React.FC = () => {
  const [activePage, setActivePage] = useState('overview');

  const plantData = {
    id: "plant-01",
    data: {
      Plants: [0, 1, 2, 3, 1, 2, 3, 0, 1, 2],
      TDS: 650,
      TimeStamp: "2025-03-18T14:30:00"
    }
  };

  const renderPage = () => {
    switch(activePage) {
      case 'overview': return <OverviewPage />;
      case 'plants': return <PlantsDashboard />;
      case 'analytics': return <PlantGrowthDashboard plantData={plantData}/>;
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