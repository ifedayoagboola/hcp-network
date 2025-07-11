import React, { useRef, useEffect, useState } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import type { ForceGraphMethods, NodeObject, LinkObject } from 'react-force-graph-2d';
import { forceCenter, forceCollide, forceManyBody } from 'd3-force';
import mockGraph from '../data/mockGraph';
import type { HCP, Link } from '../data/mockGraph';

interface GraphCanvasProps {
  centerNodeId?: string | null;
  onNodeClick?: (node: HCP) => void;
  onNodeHover?: (node: HCP | null) => void;
  onLinkHover?: (link: Link | null) => void;
  onLinkClick?: (link: Link, position: { x: number; y: number }) => void;
}

type HCPWithCoords = HCP & { x?: number; y?: number };

const GraphCanvas: React.FC<GraphCanvasProps> = ({ centerNodeId, onNodeClick, onNodeHover, onLinkHover, onLinkClick }) => {
  const fgRef = useRef<ForceGraphMethods<NodeObject<HCPWithCoords>, LinkObject<HCPWithCoords, Link>> | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        // Ensure minimum dimensions and handle cases where rect might be 0
        const width = Math.max(rect.width, 300);
        const height = Math.max(rect.height, 400);
        setDimensions({ width, height });
      }
    };
    
    // Initial update
    updateDimensions();
    
    // Update on resize
    window.addEventListener('resize', updateDimensions);
    
    // Multiple updates to handle layout issues
    const timeoutIds = [
      setTimeout(updateDimensions, 100),
      setTimeout(updateDimensions, 500),
      setTimeout(updateDimensions, 1000)
    ];
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
      timeoutIds.forEach(id => clearTimeout(id));
    };
  }, []);

  // Set default zoom and spread web on initial mount
  useEffect(() => {
    if (fgRef.current) {
      const isMobile = dimensions.width < 768;
      fgRef.current.d3Force('center', forceCenter(dimensions.width / 2, dimensions.height / 2));
      fgRef.current.d3Force('collide', forceCollide(isMobile ? 30 : 40));
      fgRef.current.d3Force('charge', forceManyBody().strength(isMobile ? -400 : -800));
      const linkForce = fgRef.current.d3Force('link');
      if (linkForce) linkForce.distance(isMobile ? 150 : 250);
      fgRef.current.d3ReheatSimulation();
      const node = (mockGraph?.nodes?.find(n => n.id === '1') ?? {}) as HCPWithCoords;
      if (typeof node.x === 'number' && typeof node.y === 'number') {
        fgRef.current.centerAt(node.x, node.y, 1000);
      } else {
        fgRef.current.centerAt(dimensions.width / 2, dimensions.height / 2, 1000);
      }
      fgRef.current.zoom(1, 1000);
    }
  }, [dimensions.width, dimensions.height]);

  // Center the main node and spread web when centerNodeId changes
  useEffect(() => {
    if (centerNodeId && fgRef.current) {
      const node = (mockGraph?.nodes?.find(n => n.id === centerNodeId) ?? {}) as HCPWithCoords;
      if (typeof node.x === 'number' && typeof node.y === 'number') {
        const isMobile = dimensions.width < 768;
        fgRef.current.d3Force('center', forceCenter(dimensions.width / 2, dimensions.height / 2));
        fgRef.current.d3Force('collide', forceCollide(isMobile ? 30 : 40));
        fgRef.current.d3Force('charge', forceManyBody().strength(isMobile ? -400 : -800));
        const linkForce = fgRef.current.d3Force('link');
        if (linkForce) linkForce.distance(isMobile ? 150 : 250);
        fgRef.current.d3ReheatSimulation();
        fgRef.current.centerAt(node.x, node.y, 1000);
        fgRef.current.zoom(1, 1000);
      }
    }
  }, [centerNodeId, dimensions.width, dimensions.height]);

  const handleNodeClick = (node: HCPWithCoords) => {
    onNodeClick?.(node);
  };
  const handleNodeHover = (node: HCPWithCoords | null) => {
    onNodeHover?.(node);
  };
  const handleLinkHover = (link: Link | null) => {
    onLinkHover?.(link);
  };
  const handleLinkClick = (link: Link, event: MouseEvent) => {
    onLinkClick?.(link, { x: event.clientX, y: event.clientY });
  };

  return (
    <div ref={containerRef} className="w-full h-full min-h-0 bg-white rounded-xl md:rounded-2xl shadow-base overflow-hidden" style={{ minHeight: '400px' }}>
      {dimensions.width > 0 && dimensions.height > 0 ? (
        <ForceGraph2D
          ref={fgRef}
          graphData={mockGraph || { nodes: [], links: [] }}
          nodeId="id"
          nodeAutoColorBy={d => d.id === centerNodeId ? 'highlight' : 'normal'}
          nodeLabel="name"
          linkLabel={link => `${link.type}: ${link.detail}`}
          width={dimensions.width}
          height={dimensions.height}
          backgroundColor="rgba(0,0,0,0)"
          onNodeClick={handleNodeClick}
          onNodeHover={handleNodeHover}
          onLinkHover={handleLinkHover}
          onLinkClick={handleLinkClick}
          enableNodeDrag
          enableZoomInteraction
          enablePanInteraction
                  nodeCanvasObject={(node, ctx) => {
          if (!node.avatarUrl) return; // Skip if no avatar URL
          
          const img = new window.Image();
          img.src = node.avatarUrl;
          // Responsive node sizes based on screen size
          const isMobile = dimensions.width < 768;
          const size = node.id === centerNodeId ? (isMobile ? 48 : 96) : (isMobile ? 36 : 72);
          const { x = 0, y = 0 } = node;
            
            // Handle image loading errors
            img.onerror = () => {
              // Draw a placeholder circle if image fails to load
              ctx.save();
              ctx.beginPath();
              ctx.arc(x, y, size / 2, 0, 2 * Math.PI, false);
              ctx.fillStyle = '#e5e7eb';
              ctx.fill();
              ctx.restore();
            };
            
            img.onload = () => {
              ctx.save();
              ctx.beginPath();
              ctx.arc(x, y, size / 2, 0, 2 * Math.PI, false);
              ctx.closePath();
              ctx.clip();
              ctx.drawImage(img, x - size / 2, y - size / 2, size, size);
              ctx.restore();
            };
            
                      ctx.beginPath();
          ctx.arc(x, y, size / 2, 0, 2 * Math.PI, false);
          ctx.lineWidth = node.id === centerNodeId ? (isMobile ? 4 : 8) : (isMobile ? 2 : 3);
          ctx.strokeStyle = node.id === centerNodeId ? '#2563eb' : '#d1d5db';
          ctx.stroke();
          }}
          linkDirectionalArrowLength={0}
          linkDirectionalArrowRelPos={1}
          linkWidth={1.5}
          linkColor={() => 'rgba(37, 99, 235, 0.4)'}
          cooldownTicks={20}
          cooldownTime={1000}
          d3AlphaDecay={0.3}
          d3VelocityDecay={0.5}
        />
      ) : (
        <div className="flex items-center justify-center h-full">
          <div className="text-center text-gray-500">
            <div className="text-lg mb-2">Loading Network Graph...</div>
            <div className="text-sm">Dimensions: {dimensions.width} x {dimensions.height}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GraphCanvas; 