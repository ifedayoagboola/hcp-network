import React, { useState } from 'react';
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
  Bars3Icon,
  XMarkIcon,
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

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <XMarkIcon className="w-6 h-6 text-gray-600" />
        ) : (
          <Bars3Icon className="w-6 h-6 text-gray-600" />
        )}
      </button>

      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:relative top-0 left-0 h-full bg-white shadow-base flex-col items-center py-6 gap-0 z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        w-20 min-w-[80px] max-w-[80px] rounded-3xl md:rounded-3xl
        flex
      `}>
        {/* Logo SVG at top */}
        <div className="mb-8">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-label="Logo">
            <rect width="40" height="40" rx="12" fill="#2563eb" />
            <text x="20" y="26" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#fff">G</text>
          </svg>
        </div>
        {/* Nav icons */}
        <nav className="flex flex-col items-center gap-5 flex-1" role="navigation" aria-label="Main navigation">
          {icons.map((Icon, idx) => (
            <button
              key={idx}
              className={`flex items-center justify-center transition-all duration-200
                border border-transparent p-1 rounded-xl
                ${idx === 0 ? 'text-blue-600' : 'text-gray-400 hover:text-blue-500'}
                ${idx === icons.length - 1 ? 'mt-8' : ''}
                hover:border-gray-300 focus:border-gray-400 active:border-gray-400
                focus:outline-none focus:ring-2 focus:ring-blue-100`
              }
              aria-label={`Navigation item ${idx + 1}`}
            >
              <Icon className="w-5 h-5" />
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar; 