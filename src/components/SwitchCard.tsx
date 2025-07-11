import React from 'react';

interface SwitchOption {
  checked: boolean;
  label: string;
  onChange: (checked: boolean) => void;
}

interface SwitchCardProps {
  switches: SwitchOption[];
}

const SwitchCard: React.FC<SwitchCardProps> = ({ switches }) => (
  <div className="flex flex-col gap-2 w-full items-center justify-center">
    {switches.map((sw) => (
     <label className="inline-flex items-center cursor-pointer w-full">
     <input type="checkbox" value="" className="sr-only peer" checked={sw.checked} onChange={() => sw.onChange(!sw.checked)}/>
     <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
     <span className="ms-3 text-sm font-medium text-gray-400 dark:text-gray-500">{sw.label}</span>
   </label>
    ))}
  </div>
);

export default SwitchCard; 