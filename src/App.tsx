import './App.css';
import InfoPanel from './components/InfoPanel';
import Layout from './components/Layout';
import MainContentLayout from './components/MainContentLayout';
import GraphCanvas from './components/GraphCanvas';
import SearchFilterBar from './components/SearchFilterBar';
import mockGraph from './data/mockGraph';
import React, { useState } from 'react';

function App() {
  const [search, setSearch] = useState('');
  const [centerNodeId, setCenterNodeId] = useState<string | null>(null);

  const handleSearch = () => {
    const found = mockGraph.nodes.find(n => n.name.toLowerCase() === search.trim().toLowerCase());
    setCenterNodeId(found ? found.id : null);
  };

  return (
    <Layout>
      <div className="flex flex-col gap-4 w-full flex-1 min-h-0">
        <SearchFilterBar value={search} onChange={setSearch} onSubmit={handleSearch} />
        <MainContentLayout left={<InfoPanel />} right={<GraphCanvas centerNodeId={centerNodeId} />} />
      </div>
    </Layout>
  );
}

export default App;
