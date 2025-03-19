import React, { useMemo } from 'react';

interface TDSInfo {
  Plants: number[];
  TDS: number;
  TimeStamp: string;
}

interface TDSData {
  id: string;
  data: TDSInfo;
}

interface PlantGrowthDashboardProps {
  plantData: TDSData;
}

const getPlantStatusColor = (status: number) => {
  switch (status) {
    case 1:
      return 'bg-green-100 text-green-800 border-green-300';
    case 2:
      return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    case 3:
      return 'bg-blue-100 text-blue-800 border-blue-300';
    default:
      return 'bg-gray-100 text-gray-500 border-gray-300';
  }
};

const getPlantStatusText = (status: number) => {
  switch (status) {
    case 1:
      return 'เพิ่งโต';
    case 2:
      return 'กำลังโต';
    case 3:
      return 'โตเต็มวัย';
    default:
      return 'ไม่มีต้น';
  }
};

const PlantGrowthDashboard: React.FC<PlantGrowthDashboardProps> = ({ plantData }) => {
  const { Plants, TDS, TimeStamp } = plantData.data;
  
  const formattedDate = useMemo(() => {
    const date = new Date(TimeStamp);
    return date.toLocaleString('th-TH', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }, [TimeStamp]);

  // Calculate summary statistics
  const plantStats = useMemo(() => {
    const total = Plants.length;
    const empty = Plants.filter(p => p === 0).length;
    const sprouting = Plants.filter(p => p === 1).length;
    const growing = Plants.filter(p => p === 2).length;
    const mature = Plants.filter(p => p === 3).length;
    
    return { total, empty, sprouting, growing, mature };
  }, [Plants]);

  return (
    <div className="space-y-6">
      {/* Main Card */}
      <div className="w-full bg-white rounded-lg shadow-md border border-gray-200">
        {/* Card Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">สถานะการเติบโตของพืช</h2>
          <div className="flex flex-col md:flex-row gap-2 mt-2 md:mt-0">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              TDS: {TDS} ppm
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              อัพเดทล่าสุด: {formattedDate}
            </span>
          </div>
        </div>
        
        {/* Card Content */}
        <div className="p-4">
          {/* Summary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-sm text-gray-500">เพิ่งโต</p>
              <p className="text-2xl font-bold text-green-800">{plantStats.sprouting}</p>
              <p className="text-sm text-gray-500">ต้น</p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-sm text-gray-500">กำลังโต</p>
              <p className="text-2xl font-bold text-yellow-800">{plantStats.growing}</p>
              <p className="text-sm text-gray-500">ต้น</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-gray-500">โตเต็มวัย</p>
              <p className="text-2xl font-bold text-blue-800">{plantStats.mature}</p>
              <p className="text-sm text-gray-500">ต้น</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-500">ช่องว่าง</p>
              <p className="text-2xl font-bold text-gray-800">{plantStats.empty}</p>
              <p className="text-sm text-gray-500">ช่อง</p>
            </div>
          </div>

          {/* Plants Grid */}
          <div className="grid grid-cols-5 gap-2 md:grid-cols-10">
            {Plants.map((plant, index) => (
              <div key={index} className="relative">
                <div className={`aspect-square rounded-md border ${getPlantStatusColor(plant)} flex items-center justify-center flex-col`}>
                  <div className="text-xs font-semibold">{index + 1}</div>
                  {plant > 0 ? (
                    <>
                      {/* Plant Icons */}
                      {plant === 1 && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 22c4.97 0 9-4.03 9-9-4.97 0-9 4.03-9 9z" />
                          <path d="M12 13c-4.97 0-9-4.03-9-9 0 4.97 4.03 9 9 9z" />
                          <path d="M12 12v10" />
                        </svg>
                      )}
                      {plant === 2 && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 22c4.97 0 9-4.03 9-9-4.97 0-9 4.03-9 9z" />
                          <path d="M12 13c-4.97 0-9-4.03-9-9 0 4.97 4.03 9 9 9z" />
                          <path d="M12 12v10" />
                          <path d="M8 14h8" />
                        </svg>
                      )}
                      {plant === 3 && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 22c4.97 0 9-4.03 9-9-4.97 0-9 4.03-9 9z" />
                          <path d="M12 13c-4.97 0-9-4.03-9-9 0 4.97 4.03 9 9 9z" />
                          <path d="M12 12v10" />
                          <path d="M7 15h10" />
                          <path d="M8 18h8" />
                        </svg>
                      )}
                      <div className="text-xs mt-1">{getPlantStatusText(plant)}</div>
                    </>
                  ) : (
                    <div className="text-xs text-gray-400">ว่าง</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantGrowthDashboard;