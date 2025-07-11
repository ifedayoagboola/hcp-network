import React from 'react';
import { UserGroupIcon, CheckBadgeIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import StatCard from './StatCard';
import TagBadge from './TagBadge';
import Button from './Button';

const InfoPanel: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Profile Card */}
      <div className='bg-white rounded-xl p-2'>
      <div className="bg-white rounded-2xl shadow-base p-6 flex flex-col items-center relative overflow-hidden">
        {/* Map background placeholder with border */}
        <div className="absolute inset-0 top-0 left-0 h-32 w-full bg-blue-50 rounded-t-2xl border border-gray-200 flex items-center justify-center z-0">
          {/* Replace with map/avatars as needed */}
          <span className="text-blue-200 text-6xl">🗺️</span>
        </div>
        {/* Profile avatar */}
        <div className="relative z-10 mt-15 mb-2">
          <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Dr. Emily Carter" className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover" />
        </div>
        {/* Name and tags */}
        <div className="relative z-10 flex flex-col items-center mt-2">
          <span className="font-bold text-lg text-gray-700">Dr. Emily Carter</span>
          <div className="flex gap-2 mt-1">
            <TagBadge colorClass="text-blue-600">Cardiologist</TagBadge>
            <TagBadge colorClass="text-gray-400">SD, Spain</TagBadge>
          </div>
        </div>
        {/* Description */}
        <p className="text-center text-gray-500 text-base mt-2 mb-4">Experienced and compassionate doctor specializing in cardiology</p>
        {/* Stats */}
        <div className="flex justify-center gap-8 mb-4">
          <div className="flex flex-col items-center">
            <span className="text-sm text-gray-700 font-semibold">Peers</span>
            <span className="font-bold text-base text-gray-700">222</span>
          </div>
          <div className="w-px h-6 bg-gray-200 mx-2" />
          <div className="flex flex-col items-center">
            <span className="text-sm text-gray-700 font-semibold">Following</span>
            <span className="font-bold text-base text-gray-700">124</span>
          </div>
        </div>
        {/* Buttons */}
        <div className="flex-col sm:flex-row flex gap-2 space-y-2 sm:space-y-0 justify-center items-center">
          <Button variant="primary" className="text-xs lg:text-sm sm:w-auto">View Profile</Button>
          <Button variant="secondary" className="text-xs lg:text-sm sm:w-auto">Resume</Button>
          <Button variant="icon" aria-label="More options">
            <EllipsisHorizontalIcon className="w-full h-full" />
          </Button>
        </div>
      </div>
      </div>
      {/* Stats Card */}
      <div className='bg-white rounded-xl py-2 px-3 space-y-4'>
      <div className="grid grid-cols-2 gap-4">
        <StatCard
          icon={<UserGroupIcon className="w-6 h-6 text-blue-500" />}
          label="Patient Served"
          value="1000"
          subtext="▲ +30"
        />
        <StatCard
          icon={<CheckBadgeIcon className="w-6 h-6 text-green-500" />}
          label="Success rate"
          value="95%"
          subtext="▲ +1%"
        />
      </div>
      {/* About Section */}
      <div className='my-8'>
        <h3 className="font-semibold text-gray-700 mb-1 text-lg">About</h3>
        <p className="text-base text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam lectus risus.</p>
        <p className="text-base text-gray-400 mt-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam lectus risus, finibus ornare vestibulum at, feugiat qui dui. Vivamus sit amet dolor risus.</p>
      </div>

      {/* Education Section */}
      <div className='my-8'>
        <h3 className="font-semibold text-gray-700 mb-1 text-lg">Education</h3>
        <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-4">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <span className="text-blue-500 text-2xl">🎓</span>
          </div>
          <div>
            <div className="font-semibold text-gray-700 text-base">Harvard medical University</div>
            <div className="text-sm text-gray-500">Cardiology Degree</div>
            <div className="text-sm text-gray-400">Specialization in Heart Health</div>
            <div className="text-sm text-gray-300 mt-1">Sep2015–Jun 2020</div>
          </div>
        </div>
      </div>
      </div>
      </div>
  );
};

export default InfoPanel; 