import React, { useState } from 'react';
import SwitchCard from './SwitchCard';
import type { HCP } from '../data/mockGraph';

interface ProfileHeaderProps {
  selectedNode?: HCP | null;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ selectedNode }) => {
  const [connections, setConnections] = useState(true);
  const [showMap, setShowMap] = useState(false);
  const hcp = selectedNode || {
    id: '1',
    name: 'Dr. Emily Carter',
    avatarUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
    education: ['Harvard Medical School', 'Cardiology Residency'],
    experience: ['HMO Hospital', 'Cardiology Clinic'],
    publications: ['Heart Health 2020', 'Cardio Advances 2022'],
  };
  return (
    <div className="flex flex-col md:flex-row items-start gap-2 md:gap-4">
      {/* Main Card */}
      <div className="flex flex-1 bg-white rounded-xl md:rounded-2xl shadow-base p-3 md:p-4 justify-between items-center h-20 md:h-24 w-full">
        {/* Left: Avatar, Name, Specialty */}
        <div className="flex items-center justify-center gap-2 md:gap-4">
          <img 
            src={hcp.avatarUrl} 
            alt={`${hcp.name} avatar`} 
            className="w-10 h-10 md:w-14 md:h-14 rounded-full object-cover"
            onError={(e) => {
              e.currentTarget.src = 'https://randomuser.me/api/portraits/lego/1.jpg'; // Fallback avatar
            }}
          />
          <div className="flex-col items-start justify-center hidden lg:flex">
            <span className="font-bold text-base md:text-lg text-gray-700 leading-tight">{hcp.name || 'Unknown HCP'}</span>
            <span className="text-xs md:text-sm text-gray-500 font-medium leading-tight">
              {hcp.experience && hcp.experience.length > 0 ? `${hcp.experience[0]}` : 'Healthcare Professional'}
            </span>
          </div>
        </div>
        {/* Right: Stats above, Button below */}
        <div className="flex flex-col items-center justify-center gap-1 md:gap-2">
          <div className="flex items-center gap-1 md:gap-2 min-w-[120px] md:min-w-[180px]">
            <span className="text-xs md:text-sm text-gray-400 font-medium">
              Peers: <span className="text-gray-700 font-semibold">{(hcp.publications?.length || 0) + 220}</span>
            </span>
            <span className="w-px h-3 md:h-4 bg-gray-300 inline-block" />
            <span className="text-xs md:text-sm text-gray-400 font-medium">
              Following: <span className="text-gray-700 font-semibold">{(hcp.experience?.length || 0) + 123}</span>
            </span>
          </div>
          <button className="px-2 md:px-4 py-1 rounded-lg md:rounded-xl bg-blue-600 text-white font-semibold text-xs md:text-sm shadow hover:bg-blue-700 transition self-end w-full">
            Create web
          </button>
        </div>
      </div>
      {/* SwitchCard Card */}
      <div className="bg-white rounded-xl md:rounded-2xl px-3 md:px-6 py-3 md:py-4 flex flex-col gap-2 items-start min-w-[140px] md:min-w-[170px] shadow-base h-20 md:h-24">
        <SwitchCard 
          switches={[
            { checked: connections, label: 'Show connections', onChange: setConnections },
            { checked: showMap, label: 'Show my connections on map', onChange: setShowMap }
          ]}
        />
      </div>
    </div>
  );
};

export default ProfileHeader; 