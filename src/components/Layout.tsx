import React from 'react';
import Sidebar from './Sidebar';

const Layout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className="bg-gray-50 fixed top-0 left-0 right-0 bottom-0">
      <div className="flex gap-4 justify-center items-start px-2 lg:px-20 py-5 h-full min-h-0 md:pl-0 pl-16">
        <Sidebar />
        <div className="flex flex-col flex-1 gap-2 h-full min-h-0">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout; 