export interface HCP {
  id: string;
  name: string;
  avatarUrl: string;
  education: string[];
  experience: string[];
  publications: string[];
}

export interface Link {
  source: string;
  target: string;
  type: string;
  detail: string;
}

export interface GraphData {
  nodes: HCP[];
  links: Link[];
}

const mockGraph: GraphData = {
  nodes: [
    {
      id: '1',
      name: 'Dr. Emily Carter',
      avatarUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
      education: ['Harvard Medical School', 'Cardiology Residency'],
      experience: ['HMO Hospital', 'Cardiology Clinic'],
      publications: ['Heart Health 2020', 'Cardio Advances 2022'],
    },
    {
      id: '2',
      name: 'Dr. John Smith',
      avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
      education: ['Stanford University', 'Internal Medicine Residency'],
      experience: ['Stanford Hospital', 'City Clinic'],
      publications: ['Internal Med 2019'],
    },
    {
      id: '3',
      name: 'Dr. Alice Brown',
      avatarUrl: 'https://randomuser.me/api/portraits/women/65.jpg',
      education: ['Yale School of Medicine'],
      experience: ['Yale Hospital'],
      publications: ['Yale Cardio 2021'],
    },
    {
      id: '4',
      name: 'Dr. Bob Lee',
      avatarUrl: 'https://randomuser.me/api/portraits/men/45.jpg',
      education: ['UCLA Medical School'],
      experience: ['UCLA Hospital'],
      publications: ['UCLA Heart 2020'],
    },
    {
      id: '5',
      name: 'Dr. Carol White',
      avatarUrl: 'https://randomuser.me/api/portraits/women/22.jpg',
      education: ['Columbia University'],
      experience: ['Columbia Hospital'],
      publications: ['Columbia Cardio 2022'],
    },
    {
      id: '6',
      name: 'Dr. David Kim',
      avatarUrl: 'https://randomuser.me/api/portraits/men/12.jpg',
      education: ['Johns Hopkins University'],
      experience: ['Johns Hopkins Hospital'],
      publications: ['JHU Cardio 2021'],
    },
    {
      id: '7',
      name: 'Dr. Eva Green',
      avatarUrl: 'https://randomuser.me/api/portraits/women/33.jpg',
      education: ['Duke University'],
      experience: ['Duke Hospital'],
      publications: ['Duke Heart 2020'],
    },
    {
      id: '8',
      name: 'Dr. Frank Moore',
      avatarUrl: 'https://randomuser.me/api/portraits/men/23.jpg',
      education: ['University of Michigan'],
      experience: ['Michigan Hospital'],
      publications: ['Michigan Cardio 2022'],
    },
    {
      id: '9',
      name: 'Dr. Grace Lin',
      avatarUrl: 'https://randomuser.me/api/portraits/women/77.jpg',
      education: ['University of Chicago'],
      experience: ['Chicago Hospital'],
      publications: ['Chicago Heart 2021'],
    },
    {
      id: '10',
      name: 'Dr. Henry Young',
      avatarUrl: 'https://randomuser.me/api/portraits/men/55.jpg',
      education: ['NYU School of Medicine'],
      experience: ['NYU Hospital'],
      publications: ['NYU Cardio 2020'],
    },
  ],
  links: [
    { source: '1', target: '2', type: 'Co-authored', detail: 'Co-authored 2 publications' },
    { source: '1', target: '3', type: 'Worked together', detail: 'Worked at HMO Hospital' },
    { source: '2', target: '4', type: 'Co-authored', detail: 'Co-authored 1 publication' },
    { source: '3', target: '5', type: 'Mentored', detail: 'Mentored at Yale Hospital' },
    { source: '1', target: '5', type: 'Shared workplace', detail: 'Worked at Cardiology Clinic' },
    { source: '1', target: '6', type: 'Co-authored', detail: 'Co-authored 1 publication' },
    { source: '2', target: '7', type: 'Worked together', detail: 'Worked at Stanford Hospital' },
    { source: '3', target: '8', type: 'Co-authored', detail: 'Co-authored 1 publication' },
    { source: '4', target: '9', type: 'Mentored', detail: 'Mentored at UCLA Hospital' },
    { source: '5', target: '10', type: 'Shared workplace', detail: 'Worked at Columbia Hospital' },
    { source: '6', target: '7', type: 'Co-authored', detail: 'Co-authored 1 publication' },
    { source: '8', target: '9', type: 'Worked together', detail: 'Worked at Michigan Hospital' },
    { source: '9', target: '10', type: 'Co-authored', detail: 'Co-authored 1 publication' },
    { source: '1', target: '7', type: 'Co-authored', detail: 'Co-authored 1 publication' },
    { source: '2', target: '8', type: 'Shared workplace', detail: 'Worked at City Clinic' },
  ]
};

export default mockGraph; 