/// <reference types="jest" />
import { searchHCPByName, filterHCPs, getConnectionCount, validateSearchQuery } from '../searchUtils';
import type { HCP, Link } from '../../data/mockGraph';

// Mock data for testing
const mockHCPs: HCP[] = [
  {
    id: '1',
    name: 'Dr. Emily Carter',
    avatarUrl: 'https://example.com/emily.jpg',
    education: ['Harvard Medical School', 'Cardiology Residency'],
    experience: ['HMO Hospital', 'Cardiology Clinic'],
    publications: ['Heart Health 2020', 'Cardio Advances 2022'],
  },
  {
    id: '2',
    name: 'Dr. John Smith',
    avatarUrl: 'https://example.com/john.jpg',
    education: ['Stanford University'],
    experience: ['Stanford Hospital'],
    publications: [],
  },
  {
    id: '3',
    name: 'Dr. Alice Brown',
    avatarUrl: 'https://example.com/alice.jpg',
    education: ['Yale School of Medicine'],
    experience: [],
    publications: ['Yale Cardio 2021'],
  },
];

const mockLinks: Link[] = [
  { source: '1', target: '2', type: 'Co-authored', detail: 'Research paper' },
  { source: '1', target: '3', type: 'Worked together', detail: 'Hospital collaboration' },
  { source: '2', target: '3', type: 'Mentored', detail: 'Training program' },
];

describe('searchUtils', () => {
  describe('searchHCPByName', () => {
    it('should find HCP by exact name match', () => {
      const result = searchHCPByName(mockHCPs, 'Dr. Emily Carter');
      expect(result).toEqual(mockHCPs[0]);
    });

    it('should find HCP by partial name match', () => {
      const result = searchHCPByName(mockHCPs, 'Emily');
      expect(result).toEqual(mockHCPs[0]);
    });

    it('should be case insensitive', () => {
      const result = searchHCPByName(mockHCPs, 'emily carter');
      expect(result).toEqual(mockHCPs[0]);
    });

    it('should return null for non-existing name', () => {
      const result = searchHCPByName(mockHCPs, 'Dr. Non Existent');
      expect(result).toBeNull();
    });

    it('should return null for empty query', () => {
      const result = searchHCPByName(mockHCPs, '');
      expect(result).toBeNull();
    });

    it('should return null for whitespace-only query', () => {
      const result = searchHCPByName(mockHCPs, '   ');
      expect(result).toBeNull();
    });
  });

  describe('filterHCPs', () => {
    it('should filter HCPs with publications', () => {
      const result = filterHCPs(mockHCPs, { hasPublications: true });
      expect(result).toHaveLength(2);
      expect(result).toContain(mockHCPs[0]); // Emily Carter
      expect(result).toContain(mockHCPs[2]); // Alice Brown
    });

    it('should filter HCPs with experience', () => {
      const result = filterHCPs(mockHCPs, { hasExperience: true });
      expect(result).toHaveLength(2);
      expect(result).toContain(mockHCPs[0]); // Emily Carter
      expect(result).toContain(mockHCPs[1]); // John Smith
    });

    it('should filter HCPs by education institution', () => {
      const result = filterHCPs(mockHCPs, { educationInstitutions: ['Harvard'] });
      expect(result).toHaveLength(1);
      expect(result).toContain(mockHCPs[0]); // Emily Carter
    });

    it('should return all HCPs when no filters applied', () => {
      const result = filterHCPs(mockHCPs, {});
      expect(result).toHaveLength(3);
    });

    it('should apply multiple filters', () => {
      const result = filterHCPs(mockHCPs, { 
        hasPublications: true, 
        hasExperience: true 
      });
      expect(result).toHaveLength(1);
      expect(result).toContain(mockHCPs[0]); // Emily Carter (only one with both)
    });
  });

  describe('getConnectionCount', () => {
    it('should return correct connection count for a node', () => {
      const result = getConnectionCount(mockLinks, '1');
      expect(result).toBe(2); // Emily Carter has 2 connections
    });

    it('should return 0 for node with no connections', () => {
      const result = getConnectionCount(mockLinks, '999');
      expect(result).toBe(0);
    });

    it('should count both incoming and outgoing connections', () => {
      const result = getConnectionCount(mockLinks, '2');
      expect(result).toBe(2); // John Smith has 2 connections (1 incoming, 1 outgoing)
    });
  });

  describe('validateSearchQuery', () => {
    it('should validate a good query', () => {
      const result = validateSearchQuery('Dr. Emily');
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('should reject empty query', () => {
      const result = validateSearchQuery('');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Search query cannot be empty');
    });

    it('should reject whitespace-only query', () => {
      const result = validateSearchQuery('   ');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Search query cannot be empty');
    });

    it('should reject query that is too short', () => {
      const result = validateSearchQuery('a');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Search query must be at least 2 characters');
    });

    it('should reject query that is too long', () => {
      const longQuery = 'a'.repeat(51);
      const result = validateSearchQuery(longQuery);
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Search query cannot exceed 50 characters');
    });

    it('should accept query with exactly 2 characters', () => {
      const result = validateSearchQuery('ab');
      expect(result.isValid).toBe(true);
    });

    it('should accept query with exactly 50 characters', () => {
      const query = 'a'.repeat(50);
      const result = validateSearchQuery(query);
      expect(result.isValid).toBe(true);
    });
  });
}); 