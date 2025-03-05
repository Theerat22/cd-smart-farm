import React from 'react';
import { IoWater } from "react-icons/io5";


const OverviewPage: React.FC = () => (
  <div className="p-6 bg-gray-100 min-h-screen">
    <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>

    {/* Top Cards */}
    <div className="grid grid-cols-2 gap-20">

      <div className="bg-white p-17 rounded-xl shadow-lg grid grid-cols-2">
        <IoWater className='text-9xl text-center text-blue-600' />
        <div className="grid grid-rows-2 text-black">
            <h1 className='font-bold text-3xl mb-7'>Water Quality</h1>
            <h1 className='font-bold text-6xl'>20 <span>%</span></h1>
        </div>
      </div>

      <div className="bg-white p-17 rounded-xl shadow-lg grid grid-cols-2">
        <IoWater className='text-9xl text-center text-blue-600' />
        <div className="grid grid-rows-2 text-black">
            <h1 className='font-bold text-3xl mb-7'>Water Quality</h1>
            <h1 className='font-bold text-6xl'>20 <span>%</span></h1>
        </div>
      </div>

    </div>
    
    {/* Bottom Card */}
    <div className="bg-white p-17 rounded-xl shadow-lg grid grid-cols-2 mt-17">
        <IoWater className='text-9xl text-center text-blue-600' />
        <div className="grid grid-rows-2 text-black">
            <h1 className='font-bold text-3xl mb-7'>Water Quality</h1>
            <h1 className='font-bold text-6xl'>20 <span>%</span></h1>
        </div>
      </div>

  </div>
);

export default OverviewPage;