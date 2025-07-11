import React, { useRef, useEffect } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import type { ForceGraphMethods } from 'react-force-graph-2d';

// Node and Link types for the graph
interface HCPNode {
  id: string;
  name: string;
  avatar: string;
  main?: boolean;
  x?: number;
  y?: number;
}
interface HCPLink {
  source: string;
  target: string;
  label: string;
}

interface GraphCanvasProps {
  centerNodeId?: string | null;
}

// Mock data for demonstration
const mockData = {
  nodes: [
    { id: '1', name: 'Dr. Emily Carter', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', main: true },
    { id: '2', name: 'Dr. John Smith', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { id: '3', name: 'Dr. Alice Brown', avatar: 'https://randomuser.me/api/portraits/women/65.jpg' },
    { id: '4', name: 'Dr. Bob Lee', avatar: 'https://randomuser.me/api/portraits/men/45.jpg' },
    { id: '5', name: 'Dr. Carol White', avatar: 'https://randomuser.me/api/portraits/women/22.jpg' },
  ],
  links: [
    { source: '1', target: '2', label: 'Co-authored' },
    { source: '1', target: '3', label: 'Worked together' },
    { source: '2', target: '4', label: 'Co-authored' },
    { source: '3', target: '5', label: 'Mentored' },
    { source: '1', target: '5', label: 'Shared workplace' },
  ]
};

const GraphCanvas: React.FC<GraphCanvasProps> = ({ centerNodeId }) => {
  const fgRef = useRef<ForceGraphMethods<HCPNode, HCPLink> | undefined>(undefined);

  // Center the main node on mount or when centerNodeId changes
  useEffect(() => {
    if (centerNodeId && fgRef.current) {
      const node = mockData.nodes.find(n => n.id === centerNodeId) as HCPNode | undefined;
      const x = typeof node?.x === 'number' ? node.x : 0;
      const y = typeof node?.y === 'number' ? node.y : 0;
      if (node) {
        fgRef.current.centerAt(x, y, 1000);
        fgRef.current.zoom(2, 1000);
      }
    }
  }, [centerNodeId]);

  return (
    <div className="w-full h-full">
      <ForceGraph2D
        ref={fgRef}
        graphData={mockData}
        nodeId="id"
        nodeLabel="name"
        linkLabel="label"
        width={undefined}
        height={undefined}
        backgroundColor="rgba(0,0,0,0)"
        nodeCanvasObject={(node, ctx) => {
          const img = new window.Image();
          img.src = node.avatar;
          const size = node.id === centerNodeId ? 56 : node.main ? 48 : 32;
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
          ctx.lineWidth = node.id === centerNodeId ? 6 : node.main ? 4 : 2;
          ctx.strokeStyle = node.id === centerNodeId ? '#1d4ed8' : node.main ? '#2563eb' : '#d1d5db';
          ctx.stroke();
        }}
        linkDirectionalArrowLength={6}
        linkDirectionalArrowRelPos={1}
        linkWidth={1.5}
        linkColor={() => '#a5b4fc'}
      />
    </div>
  );
};

export default GraphCanvas; 