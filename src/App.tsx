import './App.css';
import InfoPanel from './components/InfoPanel';
import Layout from './components/Layout';
import MainContentLayout from './components/MainContentLayout';
import GraphCanvas from './components/GraphCanvas';
import SearchFilterBar from './components/SearchFilterBar';
import ConnectionDetailsPanel from './components/ConnectionDetailsPanel';
import mockGraph from './data/mockGraph';
import { searchHCPByName, validateSearchQuery } from './utils/searchUtils';
import { useState } from 'react';
import type { HCP, Link } from './data/mockGraph';
import ProfileHeader from './components/ProfileHeader';

function App() {
  const [search, setSearch] = useState('');
  const [centerNodeId, setCenterNodeId] = useState<string | null>('1'); // Default to Dr. Emily Carter
  const [selectedNode, setSelectedNode] = useState<HCP | null>(mockGraph.nodes[0] || null); // Default to Dr. Emily Carter
  const [searchError, setSearchError] = useState<string | null>(null);
  
  // Connection details state
  const [selectedLink, setSelectedLink] = useState<Link | null>(null);
  const [isConnectionPanelOpen, setIsConnectionPanelOpen] = useState(false);
  const [connectionPanelPosition, setConnectionPanelPosition] = useState<{ x: number; y: number } | null>(null);

  const handleSearch = () => {
    // Validate search query
    const validation = validateSearchQuery(search);
    if (!validation.isValid) {
      setSearchError(validation.error || 'Invalid search query');
      return;
    }

    setSearchError(null);
    
    // Search for HCP
    const found = searchHCPByName(mockGraph?.nodes || [], search);
    setCenterNodeId(found ? found.id : null);
    setSelectedNode(found || null);
  };

  const handleNodeClick = (node: HCP) => {
    setSelectedNode(node);
    setCenterNodeId(node.id);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleNodeHover = (_node: HCP | null) => {
    // Node hover state can be used for future features like highlighting
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleLinkHover = (_link: Link | null) => {
    // Link hover state can be used for future features like highlighting
  };

  const handleLinkClick = (link: Link, position: { x: number; y: number }) => {
    setSelectedLink(link);
    setConnectionPanelPosition(position);
    setIsConnectionPanelOpen(true);
  };

  const closeConnectionPanel = () => {
    setIsConnectionPanelOpen(false);
    setSelectedLink(null);
    setConnectionPanelPosition(null);
  };

  return (
    <Layout>
      <div className="flex flex-col gap-4 w-full lg:flex-1 lg:min-h-0 lg:overflow-hidden overflow-y-auto">
        <ProfileHeader selectedNode={selectedNode} />
        <SearchFilterBar value={search} onChange={setSearch} onSubmit={handleSearch} />
        {searchError && (
          <div className="text-red-500 text-sm px-4">{searchError}</div>
        )}
        <MainContentLayout 
          left={<InfoPanel selectedNode={selectedNode} />} 
          right={<GraphCanvas 
            centerNodeId={centerNodeId} 
            onNodeClick={handleNodeClick}
            onNodeHover={handleNodeHover}
            onLinkHover={handleLinkHover}
            onLinkClick={handleLinkClick}
          />} 
        />
      </div>
      
      {/* Connection Details Panel */}
      <ConnectionDetailsPanel 
        link={selectedLink}
        sourceHcp={selectedLink ? mockGraph?.nodes?.find(n => n.id === selectedLink.source) || null : null}
        targetHcp={selectedLink ? mockGraph?.nodes?.find(n => n.id === selectedLink.target) || null : null}
        isOpen={isConnectionPanelOpen}
        onClose={closeConnectionPanel}
        position={connectionPanelPosition || undefined}
      />
    </Layout>
  );
}

export default App;
