import React from "react";

const MainContentLayout: React.FC<{
  left: React.ReactNode;
  right: React.ReactNode;
}> = ({ left, right }) => {
  return (
    <>
      <p className="font-bold text-2xl text-gray-700">PeerSpace</p>
      <div className="flex flex-col lg:flex-row w-full h-full gap-4 p-4 min-h-0 flex-1">
        {/* Left Panel */}
        <aside className="bg-gray-80 rounded-2xl shadow-base flex flex-col overflow-y-auto h-full min-h-0 w-full lg:w-2/5">
          {left}
        </aside>
        {/* Right Panel */}
        <main className="flex-1 min-h-0 h-full w-full lg:w-3/5 flex flex-col">
          {/* {right} */}
        </main>
      </div>
    </>
  );
};

export default MainContentLayout;
