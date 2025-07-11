import './App.css';
import InfoPanel from './components/InfoPanel';
import Layout from './components/Layout';
import MainContentLayout from './components/MainContentLayout';
import GraphCanvas from './components/GraphCanvas';
import SearchFilterBar from './components/SearchFilterBar';
import LinkTooltip from './components/LinkTooltip';
import mockGraph from './data/mockGraph';
import { searchHCPByName, validateSearchQuery } from './utils/searchUtils';
import React, { useState } from 'react';
import type { HCP, Link } from './data/mockGraph';

function App() {
  const [search, setSearch] = useState('');
  const [centerNodeId, setCenterNodeId] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<HCP | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);
  
  // Hover states
  const [hoveredLink, setHoveredLink] = useState<Link | null>(null);
  
  // Tooltip state
  const [isLinkTooltipVisible, setIsLinkTooltipVisible] = useState(false);
  const [linkTooltipPosition, setLinkTooltipPosition] = useState<{ x: number; y: number } | null>(null);

  const handleSearch = () => {
    // Validate search query
    const validation = validateSearchQuery(search);
    if (!validation.isValid) {
      setSearchError(validation.error || 'Invalid search query');
      return;
    }

    setSearchError(null);
    
    // Search for HCP
    const found = searchHCPByName(mockGraph.nodes, search);
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

  const handleLinkHover = (link: Link | null) => {
    setHoveredLink(link);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleLinkClick = (_link: Link, position: { x: number; y: number }) => {
    setLinkTooltipPosition(position);
    setIsLinkTooltipVisible(true);
  };

  const closeLinkTooltip = () => {
    setIsLinkTooltipVisible(false);
    setLinkTooltipPosition(null);
  };

  return (
    <Layout>
      <div className="flex flex-col gap-4 w-full flex-1 min-h-0">
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
      
      {/* Link Tooltip */}
      <LinkTooltip 
        link={hoveredLink}
        isVisible={isLinkTooltipVisible}
        position={linkTooltipPosition}
        onClose={closeLinkTooltip}
      />
    </Layout>
  );
}

export default App;
