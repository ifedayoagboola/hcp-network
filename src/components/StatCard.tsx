import React from 'react';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  subtext: string;
  iconColorClass?: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, subtext }) => (
  <div className="bg-gray-50 rounded-xl p-4 flex flex-col items-start">
    <div className="flex items-center gap-2 mb-2">
      {icon}
      <span className="text-xs text-gray-400 font-medium">{label}</span>
    </div>
    <span className="font-bold text-2xl text-gray-700">{value}</span>
    <span className="text-xs text-green-500 font-semibold mt-1">{subtext}</span>
  </div>
);

export default StatCard; 