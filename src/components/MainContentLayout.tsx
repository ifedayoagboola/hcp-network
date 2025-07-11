import React from "react";

const MainContentLayout: React.FC<{
  left: React.ReactNode;
  right: React.ReactNode;
}> = ({ left, right }) => {
  return (
    <>
      <p className="font-bold text-xl md:text-2xl text-gray-700">PeerSpace</p>
      <div className="flex flex-col lg:flex-row w-full gap-2 md:gap-4 p-2 md:p-4 lg:h-full lg:min-h-0 lg:flex-1 lg:overflow-hidden overflow-y-auto">
        {/* Left Panel (Details) */}
        <aside className="bg-gray-80 rounded-xl md:rounded-2xl shadow-base flex flex-col overflow-y-auto w-full lg:w-2/5 order-1 lg:order-1 lg:h-full lg:min-h-0 min-h-[400px]">
          {left}
        </aside>
        {/* Right Panel (Graph) */}
        <main className="flex-1 w-full lg:w-3/5 flex flex-col bg-white rounded-xl md:rounded-2xl shadow-base overflow-hidden order-2 lg:order-2 lg:h-full lg:min-h-0 min-h-[400px]">
          {right}
        </main>
      </div>
    </>
  );
};

export default MainContentLayout;
