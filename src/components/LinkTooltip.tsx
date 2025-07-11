import React from 'react';
import type { Link } from '../data/mockGraph';

interface LinkTooltipProps {
  link: Link | null;
  isVisible: boolean;
  position: { x: number; y: number } | null;
  onClose: () => void;
}

const LinkTooltip: React.FC<LinkTooltipProps> = ({ link, isVisible, position, onClose }) => {
  if (!isVisible || !link || !position) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40"
        onClick={onClose}
        onKeyDown={(e) => e.key === 'Escape' && onClose()}
        tabIndex={-1}
      />
      
      {/* Tooltip */}
      <div 
        className="fixed z-50 bg-white rounded-lg shadow-lg border border-gray-200 p-3 max-w-xs"
        style={{
          left: Math.min(position.x + 10, window.innerWidth - 280),
          top: Math.min(position.y + 10, window.innerHeight - 120),
        }}
        role="tooltip"
        aria-label={`Connection details: ${link.type}`}
        onKeyDown={(e) => e.key === 'Escape' && onClose()}
      >
        <div className="space-y-2">
          <div className="font-medium text-gray-900 text-sm">{link.type}</div>
          <div className="text-sm text-gray-600">{link.detail}</div>
        </div>
      </div>
    </>
  );
};

export default LinkTooltip; 