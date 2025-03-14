import React, { useState, useEffect } from 'react';
import { IoWater, IoLeaf } from "react-icons/io5";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { db } from "@/app/api/firebaseConfig";
import { get, query, ref, orderByKey, limitToLast } from "firebase/database";

interface TDSData {
  id: string;
  data: any;
}

const FarmDashboard: React.FC = () => {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  function convertThaiDate(timeStamp: string): string | null {
    try {
      const [datePart, timePart] = timeStamp.split('---');
  
      if (!datePart || !timePart) {
        return null;
      }
  
      const [day, month, year] = datePart.split('/').map(Number);
  
      if (isNaN(day) || isNaN(month) || isNaN(year)) {
        return null;
      }
      const [hours, minutes] = timePart.split(':').map(Number);
  
      if (isNaN(hours) || isNaN(minutes)) {
        return null;
      }
      const dateWithTime = new Date(year, month, day, hours, minutes);
      const UpdateDate = days[dateWithTime.getDay()] + " " + dateWithTime.getDate() + " " + months[dateWithTime.getMonth()] + " " + dateWithTime.getFullYear() + " " + dateWithTime.getHours() + ":" + dateWithTime.getMinutes();

      return UpdateDate;
    } catch (error) {
      return null;
    }
  }

  const [TDSData, setTDS] = useState<TDSData[]>([]);
  
  useEffect(() => {
    
    const fetchLatestTDSData = async () => {
      try {
        const TDSRef = query(ref(db, "pre-final"), orderByKey(), limitToLast(1));
        const snapshot = await get(TDSRef);
  
        if (snapshot.exists()) {
          const latestEntry = Object.entries(snapshot.val()).map(([id, data]) => ({
            id,
            data,
          }));
  
          setTDS(latestEntry);
          // console.log("Fetched latest data:", latestEntry);
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchLatestTDSData();

    const intervalId = setInterval(() => {
      fetchLatestTDSData();
    }, 1000); 
  
    return () => clearInterval(intervalId);
  
  }, []);

  const latestData = TDSData[0]?.data; 
  const growthStatus = latestData?.Growth_Status;
  const tds = latestData?.TDS;
  const timeStamp = latestData?.TimeStamp;
  const newTime = convertThaiDate(timeStamp);
  console.log(newTime)

  const firebase = {
    TDS: tds,
    Growth_Status: growthStatus,
    TimeStamp: String(newTime)
  }


  const soilData = {
    percentage: 78,
    status: 'Good',
    lastChecked: '3 hours ago',
    metrics: [
      { name: 'Moisture', value: '62%', ideal: '60-80%' },
      { name: 'pH Level', value: '6.8', ideal: '6.0-7.0' },
      { name: 'Nutrients', value: '72%', ideal: '65-85%' }
    ]
  };

  const cropData = {
    current: 86,
    unit: '%',
    status: 'Optimal',
    lastChecked: '1 hour ago',
    history: [75, 79, 82, 84, 86]
  };

  const growthData = [
    { date: 'Jan 5', percentage: 15 },
    { date: 'Jan 12', percentage: 28 },
    { date: 'Jan 19', percentage: 42 },
    { date: 'Jan 26', percentage: 55 },
    { date: 'Feb 2', percentage: 63 },
    { date: 'Feb 9', percentage: 78 },
    { date: 'Feb 16', percentage: 90 },
    { date: 'Feb 23', percentage: 95 }
  ];

  const soilStatusColor = 
    soilData.status.toLowerCase() === 'good' || 
    soilData.status.toLowerCase() === 'optimal' || 
    soilData.status.toLowerCase() === 'normal' 
      ? 'text-green-600' 
      : soilData.status.toLowerCase() === 'warning' 
        ? 'text-yellow-600' 
        : soilData.status.toLowerCase() === 'critical' 
          ? 'text-red-600' 
          : 'text-blue-600';

  const cropStatusColor = 
    cropData.status.toLowerCase() === 'good' || 
    cropData.status.toLowerCase() === 'optimal' || 
    cropData.status.toLowerCase() === 'normal' 
      ? 'text-green-600' 
      : cropData.status.toLowerCase() === 'warning' 
        ? 'text-yellow-600' 
        : cropData.status.toLowerCase() === 'critical' 
          ? 'text-red-600' 
          : 'text-blue-600';



  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center space-x-3 mb-4 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Overview</h1>
      </div>

      {/* TDS */}
      
      
      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Soil Health Card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg">
          <div className="p-4 sm:p-6 border-b border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="bg-blue-50 p-2 sm:p-3 rounded-lg">
                  <IoWater className="text-2xl sm:text-3xl text-blue-600" />
                </div>
                <div>
                  <h2 className="font-bold text-lg sm:text-xl text-gray-800">คุณภาพน้ำ</h2>
                  <p className="text-xs sm:text-sm text-gray-500">Last checked: <b>{firebase.TimeStamp}</b> </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl sm:text-4xl font-bold text-gray-800">{firebase.TDS}</div>
                <p className={`font-medium ${soilStatusColor}`}>{soilData.status}</p>
              </div>
            </div>
          </div>
          <div className="p-4 sm:p-6">
            <h3 className="text-xs sm:text-sm font-medium text-gray-500 mb-3">ค่าวัดคุณภาพน้ำ</h3>
            <div className="space-y-3 sm:space-y-4">
              {soilData.metrics.map((metric, index) => (
                <div key={index} className="flex justify-between">
                  <span className="text-sm sm:text-base text-gray-600">{metric.name}</span>
                  <div className="text-right">
                    <span className="text-sm sm:text-base font-medium text-gray-800">{metric.value}</span>
                    <span className="text-xs text-gray-500 ml-2">({metric.ideal})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Crop Health Card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg">
          <div className="p-4 sm:p-6 border-b border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="bg-green-50 p-2 sm:p-3 rounded-lg">
                  <IoLeaf className="text-2xl sm:text-3xl text-green-600" />
                </div>
                <div>
                  <h2 className="font-bold text-lg sm:text-xl text-gray-800">การเจริญเติบโตของพืช</h2>
                  <p className="text-xs sm:text-sm text-gray-500">Last updated: <b>{firebase.TimeStamp}</b> </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl sm:text-4xl font-bold text-gray-800">{firebase.Growth_Status}</div>
                <p className={`font-medium ${cropStatusColor}`}>{cropData.status}</p>
              </div>
            </div>
          </div>
          <div className="p-4 sm:p-6">
            <h3 className="text-xs sm:text-sm font-medium text-gray-500 mb-3">อัตราการเติบโต</h3>
            <div className="flex items-end h-32 sm:h-32 space-x-1 sm:space-x-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={growthData}
                  margin={{
                    top: 5,
                    right: 10,
                    left: 10,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 12 }}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis 
                    domain={[0, 100]}
                    unit="%"
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip formatter={(value) => [`${value}%`, 'Growth']} />
                  <Line 
                    type="monotone" 
                    dataKey="percentage" 
                    stroke="#4ade80" 
                    strokeWidth={2}
                    dot={{ stroke: '#16a34a', strokeWidth: 2, r: 4, fill: '#4ade80' }}
                    activeDot={{ r: 6, stroke: '#16a34a', strokeWidth: 2, fill: '#4ade80' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default FarmDashboard;