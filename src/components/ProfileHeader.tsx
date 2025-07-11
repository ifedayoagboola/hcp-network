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
    name: 'Emily Carter',
    avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
    education: ['Harvard Medical School', 'Cardiology Residency'],
    experience: ['HMO Hospital', 'Cardiology Clinic'],
    publications: ['Heart Health 2020', 'Cardio Advances 2022'],
  };
  return (
    <div className="flex flex-col md:flex-row items-start gap-4">
      {/* Main Card */}
      <div className="flex flex-1 bg-white rounded-2xl shadow-base p-4 justify-between items-center h-24 w-full">
        {/* Left: Avatar, Name, Specialty */}
        <div className="flex items-center justify-center gap-4">
          <img src={hcp.avatarUrl} alt="avatar" className="w-14 h-14 rounded-full" />
          <div className="flex-col items-start justify-center hidden lg:flex">
            <span className="font-bold text-lg text-gray-700 leading-tight">{hcp.name}</span>
            <span className="text-sm text-gray-500 font-medium leading-tight">Cardiologist at HMO</span>
          </div>
        </div>
        {/* Right: Stats above, Button below */}
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="flex items-center gap-2 min-w-[180px]">
            <span className="text-sm text-gray-700 font-medium">
              My Peers: <span className="text-blue-600 font-semibold">{hcp.publications.length + 220}</span>
            </span>
            <span className="w-px h-4 bg-gray-300 inline-block" />
            <span className="text-sm text-gray-700 font-medium">
              Following: <span className="text-blue-600 font-semibold">{hcp.experience.length + 123}</span>
            </span>
          </div>
          <button className="px-4 py-1 rounded-xl bg-blue-600 text-white font-semibold text-sm shadow hover:bg-blue-700 transition self-end w-full">
            Create web
          </button>
        </div>
      </div>
      {/* SwitchCard Card */}
      <div className="bg-white rounded-2xl px-6 py-4 flex flex-col gap-2 items-start min-w-[170px] shadow-base h-24">
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