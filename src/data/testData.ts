import type { GraphData } from './mockGraph';

// Single node graph for testing
export const singleNodeGraph: GraphData = {
  nodes: [
    {
      id: '1',
      name: 'Dr. Emily Carter',
      avatarUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
      education: ['Harvard Medical School'],
      experience: ['HMO Hospital'],
      publications: ['Heart Health 2020'],
    },
  ],
  links: [],
};

// Graph with nodes but no connections
export const noConnectionsGraph: GraphData = {
  nodes: [
    {
      id: '1',
      name: 'Dr. Emily Carter',
      avatarUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
      education: ['Harvard Medical School'],
      experience: ['HMO Hospital'],
      publications: ['Heart Health 2020'],
    },
    {
      id: '2',
      name: 'Dr. John Smith',
      avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
      education: ['Stanford University'],
      experience: ['Stanford Hospital'],
      publications: ['Internal Med 2019'],
    },
  ],
  links: [],
};

// Empty graph for testing
export const emptyGraph: GraphData = {
  nodes: [],
  links: [],
};

// Large graph for performance testing
export const largeGraph: GraphData = {
  nodes: Array.from({ length: 50 }, (_, i) => ({
    id: (i + 1).toString(),
    name: `Dr. Test User ${i + 1}`,
    avatarUrl: `https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${i + 1}.jpg`,
    education: [`University ${i + 1}`],
    experience: [`Hospital ${i + 1}`],
    publications: [`Publication ${i + 1}`],
  })),
  links: Array.from({ length: 100 }, (_, i) => ({
    source: (Math.floor(Math.random() * 50) + 1).toString(),
    target: (Math.floor(Math.random() * 50) + 1).toString(),
    type: ['Co-authored', 'Worked together', 'Mentored'][Math.floor(Math.random() * 3)],
    detail: `Connection ${i + 1}`,
  })),
}; 