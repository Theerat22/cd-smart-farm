import React, { useState, useEffect } from 'react';
import PlantCard from '@/app/components/ui/PlantCard';
import { db } from "@/app/api/firebaseConfig";
import { get, query, ref, orderByKey, limitToLast } from "firebase/database";

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

const PlantsDashboard: React.FC = () => {

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

  useEffect(() => {
    const fetchLatestTDSData = async () => {
      // setIsLoading(true);
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
        // setIsLoading(false);
      }
    };
  
    fetchLatestTDSData();

    const intervalId = setInterval(() => {
      fetchLatestTDSData();
    }, 5000);
  
    return () => clearInterval(intervalId);
  }, []);

  const latestData = TDSData[0]?.data; 
  // const tds = latestData?.TDS || 0;
  const plants = latestData?.Plants || 0;

  const plantData = [
    { name: 'green oak1', growth: 1},
    { name: 'green oak2', growth: 1},
    { name: 'green oak3', growth: 1},
    { name: 'green oak4', growth: 1},
    { name: 'green oak5', growth: 1},
    { name: 'green oak6', growth: 1},
    { name: 'green oak7', growth: 1},
    { name: 'green oak8', growth: 1},
    { name: 'green oak9', growth: 1},
    { name: 'green oak10', growth: 1},
  ]
  const newPlantData = updatePlantData(plantData, plants);

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center space-x-3 mb-4 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Plants</h1>
      </div>
      
      <div className="bg-white p-20 shadow-lg rounded-xl">
        <div className="grid grid-cols-5 gap-4">
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
  );
};

export default PlantsDashboard;