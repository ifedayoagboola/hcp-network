import React from 'react';
import {
  MagnifyingGlassIcon,
  UserIcon,
  PencilSquareIcon,
  BellIcon,
  CameraIcon,
  ComputerDesktopIcon,
  UserGroupIcon,
  LinkIcon,
  ChartBarIcon,
  CreditCardIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline';

const icons = [
  MagnifyingGlassIcon,
  UserIcon,
  PencilSquareIcon,
  BellIcon,
  CameraIcon,
  ComputerDesktopIcon,
  UserGroupIcon,
  LinkIcon,
  ChartBarIcon,
  CreditCardIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
];

const Sidebar: React.FC = () => (
  <aside className="hidden md:flex w-20 min-w-[80px] max-w-[80px] bg-white rounded-3xl shadow-base flex-col items-center py-6 gap-0">
    {/* Logo SVG at top */}
    <div className="mb-8">
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="12" fill="#2563eb" />
        <text x="20" y="26" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#fff">G</text>
      </svg>
    </div>
    {/* Nav icons */}
    <div className="flex flex-col items-center gap-5 flex-1">
      {icons.map((Icon, idx) => (
        <button
          key={idx}
          className={`flex items-center justify-center transition-all duration-200
            border border-transparent p-1 rounded-xl
            ${idx === 0 ? 'text-blue-600' : 'text-gray-400 hover:text-blue-500'}
            ${idx === icons.length - 1 ? 'mt-8' : ''}
            hover:border-gray-300 focus:border-gray-400 active:border-gray-400`
          }
        >
          <Icon className="w-5 h-5" />
        </button>
      ))}
    </div>
  </aside>
);

export default Sidebar; 