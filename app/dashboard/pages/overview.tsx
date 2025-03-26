import React, { useState, useEffect } from 'react';
import { IoWater, IoLeaf } from "react-icons/io5";
import { db } from "@/app/api/firebaseConfig";
import { get, query, ref, orderByKey, limitToLast } from "firebase/database";
import PlantCard from '@/app/components/ui/PlantCard';

// Firebase type
interface TDSData {
  id: string;
  data: TDSInfo;
}

// Data type
interface TDSInfo {
  Plants: number;
  TDS: number;
  TimeStamp: string;
}

interface Plant {
  name: string;
  growth: number
}

const FarmDashboard: React.FC = () => {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  // Convert new Time 
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
      const UpdateDate = days[dateWithTime.getDay()] + " " + dateWithTime.getDate() + " " + months[dateWithTime.getMonth()] + " " + dateWithTime.getFullYear() + " " + dateWithTime.getHours() + ":" + (dateWithTime.getMinutes() < 10 ? '0' : '') + dateWithTime.getMinutes();

      return UpdateDate;
    } catch  {
      return null;
    }
  }

  function updatePlantData(plantData: Plant[], plants: number): Plant[] {
    const updatedData: Plant[] = [...plantData];
    
    updatedData.forEach(plant => {
      plant.growth = 1;
    });
    
    for (let i = 0; i < Math.min(plants, updatedData.length); i++) {
      updatedData[i].growth = 3;
    }
    
    return updatedData;
  }


  const [TDSData, setTDS] = useState<TDSData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);


  // Fetching Data from Firebase
  useEffect(() => {
    const fetchLatestTDSData = async () => {
      setIsLoading(true);
      try {
        const TDSRef = query(ref(db, "pre-final"), orderByKey(), limitToLast(1));
        const snapshot = await get(TDSRef);
  
        if (snapshot.exists()) {
          const latestEntry = Object.entries(snapshot.val()).map(([id, data]) => ({
            id,
            data: data as TDSInfo,
          }));
  
          setTDS(latestEntry);
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchLatestTDSData();

    const intervalId = setInterval(() => {
      fetchLatestTDSData();
    }, 5000);
  
    return () => clearInterval(intervalId);
  }, []);


  // Variable Meter 
  const latestData = TDSData[0]?.data; 
  const tds = latestData?.TDS || 0;
  const plants = latestData?.Plants || 0;
  // const tds = 1200;
  // const plants = 3;
  const timeStamp = latestData?.TimeStamp;
  const newTime = convertThaiDate(timeStamp) || 'ไม่มีข้อมูล';


  // Set Firebase
  const firebase = {
    TDS: tds,
    Plants: plants,
    TimeStamp: String(newTime)
  };

  // TDS status 
  const getTdsStatus = (tds: number) => {
    if (tds >= 1700) return { status: 'คุณภาพดี', color: 'text-green-600' };
    if (tds >= 900) return { status: 'คุณภาพปานกลาง', color: 'text-green-600' };
    return { status: 'ควรปรับปรุง', color: 'text-red-600' };
  };

  const tdsStatus = getTdsStatus(tds);

  const plantData = [
    { name: 'green oak1', growth: 1 },
    { name: 'green oak2', growth: 1 },
    { name: 'green oak3', growth: 1 },
    { name: 'green oak4', growth: 1 },
    { name: 'green oak5', growth: 1 },
    { name: 'green oak6', growth: 1 },
    { name: 'green oak7', growth: 1 },
    { name: 'green oak8', growth: 1 },
    { name: 'green oak9', growth: 1 },
    { name: 'green oak10', growth: 1 },
  ];

  const newPlantData = updatePlantData(plantData, plants);

  const plantsByGrowth = plantData.reduce((acc, plant) => {
    acc[plant.growth] = (acc[plant.growth] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  const readyToHarvest = plantsByGrowth[3] || 0;
  // const growing = plantsByGrowth[2] || 0;
  // const seedlings = plantsByGrowth[1] || 0;

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">

          <div className="flex flex-row">
            <div className="bg-green-50 p-3 rounded-lg">
              <IoLeaf className="text-2xl text-green-600" />
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <IoWater className="text-2xl text-blue-600" />
            </div>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">AI Plant Tracking</h1>
            <p className="text-sm text-gray-500">อัปเดตล่าสุด: {firebase.TimeStamp}</p>
          </div>
        </div>
        {isLoading ? (
          <div className="bg-green-100 py-1 px-3 rounded-full text-green-700 text-sm font-medium">
          ออนไลน์
        </div>
        ) : (
          <div className="bg-green-100 py-1 px-3 rounded-full text-green-700 text-sm font-medium">
            ออนไลน์
          </div>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

        {/* TDS Card */}
        <div className="bg-white rounded-xl shadow-md p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 p-3 rounded-full">
              <IoWater className="text-xl text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">ระดับคุณภาพสารอาหาร</p>
              <p className={`text-lg font-bold ${tdsStatus.color}`}>
                {tdsStatus.status}
                </p>
            </div>
          </div>
        </div>
        
        {/* Plants Card */}
        <div className="bg-white rounded-xl shadow-md p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-green-100 p-3 rounded-full">
              <IoLeaf className="text-xl text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">พร้อมเก็บเกี่ยว</p>
              <p className="text-xl font-bold">{readyToHarvest} ต้น</p>
            </div>
          </div>
          {/* <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
            {growing} ต้นกำลังเติบโต
          </span> */}
        </div>
        
        
        {/* <div className="bg-white rounded-xl shadow-md p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-yellow-100 p-3 rounded-full">
              <IoAlarm className="text-xl text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">เวลาที่เหลือ</p>
              <p className="text-xl font-bold">7 วัน</p>
            </div>
          </div>
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
            รอบถัดไป
          </span>
        </div> */}

      </div>

      {/* Plants Section */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
        <div className="p-4 sm:p-6 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="bg-green-50 p-3 rounded-lg">
                <IoLeaf className="text-2xl text-green-600" />
              </div>
              <h2 className="font-bold text-xl text-gray-800">Green Oak</h2>
            </div>
            <div className="flex space-x-2">
              <div className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                พร้อมเก็บเกี่ยว: {readyToHarvest}
              </div>
              {/* <div className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                กำลังเติบโต: {growing}
              </div>
              <div className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                เริ่มต้น: {seedlings}
              </div> */}
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {newPlantData.map((plant, index) => (
              <div key={index} className={plant.growth < 3 ? "opacity-50" : ""}>
                <PlantCard 
                  name={plant.name}
                  growth={plant.growth}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Alerts Section */}
      {/* <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="bg-yellow-50 p-3 rounded-lg">
              <IoWarning className="text-2xl text-yellow-600" />
            </div>
            <h2 className="font-bold text-xl text-gray-800">การแจ้งเตือน</h2>
          </div>
        </div>
        
        <div className="p-4 sm:p-6">
          <div className="space-y-3">
            <div className="flex items-center p-3 bg-yellow-50 rounded-lg border border-yellow-100">
              <div className="bg-yellow-100 p-2 rounded-full mr-3">
                <IoWater className="text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">ความเข้มข้นของสารอาหารต่ำ</p>
                <p className="text-xs text-gray-500">แนะนำให้เพิ่มสารอาหารภายใน 24 ชั่วโมง</p>
              </div>
              <div className="ml-auto">
                <p className="text-xs text-gray-500">1 ชั่วโมงที่แล้ว</p>
              </div>
            </div>
            
            <div className="flex items-center p-3 bg-blue-50 rounded-lg border border-blue-100">
              <div className="bg-blue-100 p-2 rounded-full mr-3">
                <IoLeaf className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">ต้นไม้พร้อมเก็บเกี่ยว</p>
                <p className="text-xs text-gray-500">มีต้นไม้ 2 ต้นที่พร้อมเก็บเกี่ยว</p>
              </div>
              <div className="ml-auto">
                <p className="text-xs text-gray-500">3 ชั่วโมงที่แล้ว</p>
              </div>
            </div>
          </div>
        </div> */}
      {/* </div> */}

    </div>
  );
};

export default FarmDashboard;