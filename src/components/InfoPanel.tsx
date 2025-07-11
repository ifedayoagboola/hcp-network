import React from 'react';
import { UserGroupIcon, CheckBadgeIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import StatCard from './StatCard';
import TagBadge from './TagBadge';
import Button from './Button';
import type { HCP } from '../data/mockGraph';

interface InfoPanelProps {
  selectedNode?: HCP | null;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ selectedNode }) => {
  // Default to first node if none selected
  const hcp = selectedNode || {
    id: '1',
    name: 'Dr. Emily Carter',
    avatarUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
    education: ['Harvard Medical School', 'Cardiology Residency'],
    experience: ['HMO Hospital', 'Cardiology Clinic'],
    publications: ['Heart Health 2020', 'Cardio Advances 2022'],
  };

  return (
    <div className="flex flex-col gap-6 w-full" role="dialog" aria-label={`Details for ${hcp.name}`}>
      {/* Profile Card */}
      <div className='bg-white rounded-xl p-2'>
      <div className="bg-white rounded-2xl shadow-base p-6 flex flex-col items-center relative overflow-hidden">
        {/* Map background placeholder with border */}
        <div className="absolute inset-0 top-0 left-0 h-32 w-full bg-blue-50 rounded-t-2xl border border-gray-200 flex items-center justify-center z-0">
          {/* Replace with map/avatars as needed */}
          {/* <span className="text-blue-200 text-6xl" aria-hidden="true">🗺️</span> */}
        </div>
        {/* Profile avatar */}
        <div className="relative z-10 mt-15 mb-2">
          <img 
            src={hcp.avatarUrl} 
            alt={`${hcp.name} profile photo`} 
            className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
            onError={(e) => {
              e.currentTarget.src = 'https://randomuser.me/api/portraits/lego/1.jpg'; // Fallback avatar
            }}
          />
        </div>
        {/* Name and tags */}
        <div className="relative z-10 flex flex-col items-center mt-2">
          <h2 className="font-bold text-lg text-gray-700">{hcp.name || 'Unknown HCP'}</h2>
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
          label="Publications"
          value={(hcp.publications?.length || 0).toString()}
          subtext="Research papers"
        />
        <StatCard
          icon={<CheckBadgeIcon className="w-6 h-6 text-green-500" />}
          label="Experience"
          value={(hcp.experience?.length || 0).toString()}
          subtext="Workplaces"
        />
      </div>
      {/* About Section */}
      <section className='my-8'>
        <h3 className="font-semibold text-gray-700 mb-1 text-lg">About</h3>
        <p className="text-base text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam lectus risus.</p>
        <p className="text-base text-gray-400 mt-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam lectus risus, finibus ornare vestibulum at, feugiat qui dui. Vivamus sit amet dolor risus.</p>
      </section>

              {/* Education Section */}
      <section className='my-8'>
        <h3 className="font-semibold text-gray-700 mb-1 text-lg">Education</h3>
        {hcp.education && hcp.education.length > 0 ? (
          hcp.education.map((edu, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-4 flex items-center gap-4 mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-500 text-2xl" aria-hidden="true">🎓</span>
              </div>
              <div>
                <div className="font-semibold text-gray-700 text-base">{edu}</div>
                <div className="text-sm text-gray-500">Medical Degree</div>
                <div className="text-sm text-gray-400">Specialization in Heart Health</div>
                <div className="text-sm text-gray-300 mt-1">Sep2015–Jun 2020</div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-gray-50 rounded-xl p-4 text-center text-gray-500">
            No education information available
          </div>
        )}
      </section>

      {/* Experience Section */}
      <section className='my-8'>
        <h3 className="font-semibold text-gray-700 mb-1 text-lg">Experience</h3>
        {hcp.experience && hcp.experience.length > 0 ? (
          hcp.experience.map((exp, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-4 flex items-center gap-4 mb-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-500 text-2xl" aria-hidden="true">🏥</span>
              </div>
              <div>
                <div className="font-semibold text-gray-700 text-base">{exp}</div>
                <div className="text-sm text-gray-500">Medical Practice</div>
                <div className="text-sm text-gray-400">Healthcare Professional</div>
                <div className="text-sm text-gray-300 mt-1">2020–Present</div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-gray-50 rounded-xl p-4 text-center text-gray-500">
            No experience information available
          </div>
        )}
      </section>

      {/* Publications Section */}
      <section className='my-8'>
        <h3 className="font-semibold text-gray-700 mb-1 text-lg">Publications</h3>
        {hcp.publications && hcp.publications.length > 0 ? (
          hcp.publications.map((pub, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-4 flex items-center gap-4 mb-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-purple-500 text-2xl" aria-hidden="true">📄</span>
              </div>
              <div>
                <div className="font-semibold text-gray-700 text-base">{pub}</div>
                <div className="text-sm text-gray-500">Research Publication</div>
                <div className="text-sm text-gray-400">Peer-reviewed Journal</div>
                <div className="text-sm text-gray-300 mt-1">2020–2022</div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-gray-50 rounded-xl p-4 text-center text-gray-500">
            No publications available
          </div>
        )}
      </section>
      </div>
      </div>
  );
};

export default InfoPanel; 