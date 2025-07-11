import type { HCP, Link } from '../data/mockGraph';

/**
 * Search for HCP by name (case-insensitive)
 * @param nodes - Array of HCP nodes to search through
 * @param query - Search query string
 * @returns Matching HCP or null if not found
 */
export const searchHCPByName = (nodes: HCP[], query: string): HCP | null => {
  if (!query.trim()) return null;
  
  const normalizedQuery = query.trim().toLowerCase();
  
  return nodes.find(node => 
    node.name.toLowerCase().includes(normalizedQuery)
  ) || null;
};

/**
 * Filter nodes by multiple criteria
 * @param nodes - Array of HCP nodes to filter
 * @param filters - Object containing filter criteria
 * @returns Filtered array of HCP nodes
 */
export const filterHCPs = (
  nodes: HCP[], 
  filters: {
    hasPublications?: boolean;
    hasExperience?: boolean;
    educationInstitutions?: string[];
  }
): HCP[] => {
  return nodes.filter(node => {
    if (filters.hasPublications && node.publications.length === 0) {
      return false;
    }
    
    if (filters.hasExperience && node.experience.length === 0) {
      return false;
    }
    
    if (filters.educationInstitutions && filters.educationInstitutions.length > 0) {
      const hasMatchingEducation = node.education.some(edu =>
        filters.educationInstitutions!.some(institution =>
          edu.toLowerCase().includes(institution.toLowerCase())
        )
      );
      if (!hasMatchingEducation) return false;
    }
    
    return true;
  });
};

/**
 * Get connection count for a specific HCP
 * @param links - Array of connection links
 * @param nodeId - ID of the HCP node
 * @returns Number of connections
 */
export const getConnectionCount = (links: Link[], nodeId: string): number => {
  return links.filter(link => 
    link.source === nodeId || link.target === nodeId
  ).length;
};

/**
 * Validate search query
 * @param query - Search query string
 * @returns Object with isValid boolean and error message if invalid
 */
export const validateSearchQuery = (query: string): { isValid: boolean; error?: string } => {
  if (!query.trim()) {
    return { isValid: false, error: 'Search query cannot be empty' };
  }
  
  if (query.length < 2) {
    return { isValid: false, error: 'Search query must be at least 2 characters' };
  }
  
  if (query.length > 50) {
    return { isValid: false, error: 'Search query cannot exceed 50 characters' };
  }
  
  return { isValid: true };
}; 