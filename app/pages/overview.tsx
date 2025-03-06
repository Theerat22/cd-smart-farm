import React from 'react';
import { IoWater, IoLeaf } from "react-icons/io5";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const FarmDashboard: React.FC = () => {

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

  // const yieldData = {
  //   current: 68,
  //   unit: '%',
  //   status: 'Normal',
  //   lastChecked: '2 hours ago',
  //   change: '+4% from last month',
  //   forecast: '89% expected at harvest'
  // };

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

  // const yieldStatusColor = 
  //   yieldData.status.toLowerCase() === 'good' || 
  //   yieldData.status.toLowerCase() === 'optimal' || 
  //   yieldData.status.toLowerCase() === 'normal' 
  //     ? 'text-green-600' 
  //     : yieldData.status.toLowerCase() === 'warning' 
  //       ? 'text-yellow-600' 
  //       : yieldData.status.toLowerCase() === 'critical' 
  //         ? 'text-red-600' 
  //         : 'text-blue-600';

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center space-x-3 mb-4 sm:mb-8">
        <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
          <IoLeaf className="text-white text-xl" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Overview</h1>
      </div>
      
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
                  <p className="text-xs sm:text-sm text-gray-500">Last checked: {soilData.lastChecked}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl sm:text-4xl font-bold text-gray-800">{soilData.percentage}<span className="text-lg sm:text-xl">%</span></div>
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
                  <p className="text-xs sm:text-sm text-gray-500">Last updated: {cropData.lastChecked}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl sm:text-4xl font-bold text-gray-800">{cropData.current}<span className="text-lg sm:text-xl">{cropData.unit}</span></div>
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
      
      {/* Bottom Card */}
      {/* <div className="mt-4 sm:mt-6 bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg">
        <div className="p-4 sm:p-6 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="bg-yellow-50 p-2 sm:p-3 rounded-lg">
                <IoBarChart className="text-2xl sm:text-3xl text-yellow-600" />
              </div>
              <div>
                <h2 className="font-bold text-lg sm:text-xl text-gray-800">Projected Yield</h2>
                <p className="text-xs sm:text-sm text-gray-500">Last updated: {yieldData.lastChecked}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl sm:text-4xl font-bold text-gray-800">{yieldData.current}<span className="text-lg sm:text-xl">{yieldData.unit}</span></div>
              <p className={`font-medium ${yieldStatusColor}`}>{yieldData.status}</p>
            </div>
          </div>
        </div>
        <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <h3 className="text-xs sm:text-sm font-medium text-gray-500 mb-3">YIELD PROJECTION</h3>
            <div className="relative h-28 sm:h-32 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-28 sm:w-32 h-28 sm:h-32 rounded-full border-6 sm:border-8 border-gray-200"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div 
                  className="w-28 sm:w-32 h-28 sm:h-32 rounded-full border-6 sm:border-8 border-transparent border-t-yellow-600"
                  style={{ transform: `rotate(${(yieldData.current / 100) * 270}deg)` }}
                ></div>
              </div>
              <div className="z-10 text-xl sm:text-2xl font-bold text-gray-800">{yieldData.current}%</div>
            </div>
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-medium text-gray-500 mb-3">FORECAST</h3>
            <div className="space-y-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="flex items-start space-x-2">
                  <IoSunny className="text-yellow-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-sm text-gray-800">Harvest Forecast</h4>
                    <p className="text-xs sm:text-sm text-gray-600">{yieldData.forecast}</p>
                  </div>
                </div>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="flex items-start space-x-2">
                  <IoLeaf className="text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-sm text-gray-800">Growth Trend</h4>
                    <p className="text-xs sm:text-sm text-gray-600">{yieldData.change}</p>
                  </div>
                </div>
              </div>
              <div className="pt-2">
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-gray-500">Low</span>
                  <span className="text-gray-500">Target</span>
                  <span className="text-gray-500">High</span>
                </div>
                <div className="mt-1 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-red-500 via-green-500 to-yellow-500" style={{ width: '100%' }}></div>
                </div>
                <div className="mt-1 h-2 sm:h-3 w-1 bg-black mx-auto" style={{ marginLeft: `${yieldData.current}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default FarmDashboard;