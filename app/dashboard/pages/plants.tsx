import React from 'react';
import PlantCard from '@/app/components/PlantCard';

const PlantsDashboard: React.FC = () => {
    const plants = [
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
    
  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center space-x-3 mb-4 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Plants</h1>
      </div>
      
      <div className="bg-white p-20 shadow-lg rounded-xl">
        <div className="grid grid-cols-5 gap-4">
            {plants.map((plant, index) => (
                <div key={index} >
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