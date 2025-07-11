import React from 'react';
import { MagnifyingGlassIcon, FunnelIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

interface SearchFilterBarProps {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
}

const SearchFilterBar: React.FC<SearchFilterBarProps> = ({ value, onChange, onSubmit }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };
  return (
    <form onSubmit={handleSubmit} className="w-full flex items-center bg-white rounded-xl md:rounded-2xl shadow-base px-3 md:px-4 py-2 gap-2 md:gap-3">
      {/* Search Input */}
      <div className="relative flex-1">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <MagnifyingGlassIcon className="w-4 h-4 md:w-5 md:h-5" />
        </span>
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder="Search"
          aria-label="Search HCP by name"
          className="w-full bg-white border border-gray-200 rounded-lg md:rounded-xl pl-8 md:pl-10 pr-3 md:pr-4 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
        />
      </div>
      {/* Filter Button */}
      <button
        type="button"
        className="flex items-center justify-between gap-1 md:gap-2 bg-white border border-gray-200 rounded-lg md:rounded-xl px-2 md:px-4 py-2 text-gray-400 text-xs md:text-sm font-medium hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition min-w-[40px] md:min-w-[44px]"
        aria-label="Filter options"
        aria-expanded="false"
      >
        {/* Mobile: Only icon */}
        <span className="block md:hidden">
          <FunnelIcon className="w-4 h-4" />
        </span>
        {/* md+: Icon, label, chevron */}
        <span className="hidden md:flex items-center gap-2">
          <FunnelIcon className="w-5 h-5" />
          <span>Filter</span>
          <ChevronDownIcon className="w-4 h-4 ml-1" />
        </span>
      </button>
    </form>
  );
};

export default SearchFilterBar; 