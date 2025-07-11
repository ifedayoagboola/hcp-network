import React from 'react';

interface TagBadgeProps {
  children: React.ReactNode;
  colorClass?: string;
}

const TagBadge: React.FC<TagBadgeProps> = ({ children, colorClass }) => (
  <span className={`bg-gray-100 text-xs font-semibold rounded-lg px-2 py-0.5 ${colorClass || ''}`}>{children}</span>
);

export default TagBadge; 