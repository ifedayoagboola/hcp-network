import React, { useRef, useEffect, useState } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import type { ForceGraphMethods } from 'react-force-graph-2d';
import mockGraph from '../data/mockGraph';

// Node and Link types for the graph
interface HCPNode {
  id: string;
  name: string;
  avatarUrl: string;
  education: string[];
  experience: string[];
  publications: string[];
  main?: boolean;
  x?: number;
  y?: number;
}
interface HCPLink {
  source: string;
  target: string;
  type: string;
  detail: string;
}

interface GraphCanvasProps {
  centerNodeId?: string | null;
  onNodeClick?: (node: HCPNode) => void;
  onNodeHover?: (node: HCPNode | null) => void;
  onLinkHover?: (link: HCPLink | null) => void;
  onLinkClick?: (link: HCPLink, position: { x: number; y: number }) => void;
}

const GraphCanvas: React.FC<GraphCanvasProps> = ({ centerNodeId, onNodeClick, onNodeHover, onLinkHover, onLinkClick }) => {
  const fgRef = useRef<ForceGraphMethods<HCPNode, HCPLink> | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  // Update dimensions when container size changes
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Center the main node on mount or when centerNodeId changes
  useEffect(() => {
    if (centerNodeId && fgRef.current) {
      const node = mockGraph.nodes.find(n => n.id === centerNodeId) as HCPNode | undefined;
      const x = typeof node?.x === 'number' ? node.x : 0;
      const y = typeof node?.y === 'number' ? node.y : 0;
      if (node) {
        fgRef.current.centerAt(x, y, 1000);
        fgRef.current.zoom(2, 1000);
      }
    }
  }, [centerNodeId]);

  const handleNodeClick = (node: HCPNode) => {
    if (onNodeClick) {
      onNodeClick(node);
    }
  };

  const handleNodeHover = (node: HCPNode | null) => {
    if (onNodeHover) {
      onNodeHover(node);
    }
  };

  const handleLinkHover = (link: HCPLink | null) => {
    if (onLinkHover) {
      onLinkHover(link);
    }
  };

  const handleLinkClick = (link: HCPLink, event: MouseEvent) => {
    if (onLinkClick) {
      onLinkClick(link, { x: event.clientX, y: event.clientY });
    }
  };

  return (
    <div ref={containerRef} className="w-full h-full min-h-0 bg-white rounded-2xl shadow-base overflow-hidden">
      <ForceGraph2D
        ref={fgRef}
        graphData={mockGraph}
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
        enableNodeDrag={true}
        enableZoomInteraction={true}
        enablePanInteraction={true}
        nodeCanvasObject={(node, ctx) => {
          const img = new window.Image();
          img.src = node.avatarUrl;
          const size = node.id === centerNodeId ? 56 : node.id === '1' ? 48 : 32;
          const x = typeof (node as HCPNode).x === 'number' ? (node as HCPNode).x : 0;
          const y = typeof (node as HCPNode).y === 'number' ? (node as HCPNode).y : 0;
          // Ensure x and y are numbers
          const safeX = typeof x === 'number' ? x : 0;
          const safeY = typeof y === 'number' ? y : 0;
          ctx.save();
          ctx.beginPath();
          ctx.arc(safeX, safeY, size / 2, 0, 2 * Math.PI, false);
          ctx.closePath();
          ctx.clip();
          ctx.drawImage(img, safeX - size / 2, safeY - size / 2, size, size);
          ctx.restore();
          // Border
          ctx.beginPath();
          ctx.arc(safeX, safeY, size / 2, 0, 2 * Math.PI, false);
          ctx.lineWidth = node.id === centerNodeId ? 6 : node.id === '1' ? 4 : 2;
          ctx.strokeStyle = node.id === centerNodeId ? '#1d4ed8' : node.id === '1' ? '#2563eb' : '#d1d5db';
          ctx.stroke();
        }}
        linkDirectionalArrowLength={6}
        linkDirectionalArrowRelPos={1}
        linkWidth={1.5}
        linkColor={() => '#a5b4fc'}
        cooldownTicks={100}
        cooldownTime={15000}
        d3AlphaDecay={0.02}
        d3VelocityDecay={0.1}
      />
    </div>
  );
};

export default GraphCanvas; 