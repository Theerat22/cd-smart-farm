import React from "react";
import Image from "next/image";
import GreenOak from "@/app/dashboard/pages/img/green-oakz-z6804221624-1.jpg";

interface ProfileCardProps {
  name: string;
  growth: number;
}

const PlantCard: React.FC<ProfileCardProps> = ({ name, growth }) => {
  // Growth status labels
  let growthLabel = '';
  let statusColor = '';
  let statusBg = '';
  let progressWidth = '0%';

  if (growth === 0) {
    growthLabel = 'ไม่มีเมล็ด';
    statusColor = 'text-gray-500';
    statusBg = 'bg-gray-100';
    progressWidth = '0%';
  } else if (growth === 1) {
    growthLabel = 'เริ่มต้น';
    statusColor = 'text-blue-600';
    statusBg = 'bg-blue-100';
    progressWidth = '25%';
  } else if (growth === 2) {
    growthLabel = 'กำลังเติบโต';
    statusColor = 'text-yellow-600';
    statusBg = 'bg-yellow-100';
    progressWidth = '60%';
  } else if (growth === 3) {
    growthLabel = 'พร้อมเก็บเกี่ยว';
    statusColor = 'text-green-600';
    statusBg = 'bg-green-100';
    progressWidth = '100%';
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="relative">
        <Image
          className="w-full object-cover"
          src={GreenOak}
          alt={name}
          width={200}
          height={200}
          layout="responsive"
        />
        <div className="absolute top-2 right-2">
          <span className={`${statusBg} ${statusColor} text-xs font-medium px-2 py-1 rounded-full`}>
            {growthLabel}
          </span>
        </div>
      </div>
      
      <div className="p-3">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-medium text-gray-800">{name}</h3>
        </div>
        
        <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden mb-2">
          <div 
            className={`h-full ${growth === 3 ? 'bg-green-500' : growth === 2 ? 'bg-yellow-500' : 'bg-blue-500'}`} 
            style={{ width: progressWidth }}
          ></div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">การเติบโต</span>
          <span className="text-xs font-medium text-gray-700">{growth === 3 ? '100%' : growth === 2 ? '60%' : growth === 1 ? '25%' : '0%'}</span>
        </div>
      </div>
    </div>
  );
};

export default PlantCard;