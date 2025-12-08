/**
 * Candidates Service
 * Handles candidate listing and management operations
 */

import apiClient from '../api-client';

export interface Candidate {
  id: string;
  name: string;
  email: string;
  title: string;
  experience: any;
  education: any;
  skills: string[];
  overall_score: number;
  cv_id: string;
  cv_filename: string;
  last_active: string;
  created_at: string;
  summary: string;
  total_cvs: number;
}

export interface CandidatesResponse {
  success: boolean;
  total: number;
  candidates: Candidate[];
}

export interface CandidateDetailsResponse {
  success: boolean;
  candidate: {
    id: string;
    name: string;
    email: string;
    title: string;
    experience: string;
    education: any[];
    skills: string[];
    overall_score: number;
    summary: string;
    cv_text: string;
    created_at: string;
    total_cvs: number;
    all_cvs: Array<{
      id: string;
      filename: string;
      score: number;
      created_at: string;
    }>;
  };
}

export interface CandidatesFilters {
  search?: string;
  experience_level?: string[];
  skills?: string[];
  location?: string;
  availability?: string;
  sort_by?: 'match' | 'recent' | 'experience';
}

class CandidatesService {
  /**
   * Get all candidates with optional filters (Employer/Admin only)
   */
  async getCandidates(filters?: CandidatesFilters) {
    const params = new URLSearchParams();

    if (filters?.search) {
      params.append('search', filters.search);
    }
    if (filters?.skills && filters.skills.length > 0) {
      filters.skills.forEach(skill => params.append('skills', skill));
    }
    if (filters?.location) {
      params.append('location', filters.location);
    }
    if (filters?.availability) {
      params.append('availability', filters.availability);
    }
    if (filters?.sort_by) {
      params.append('sort_by', filters.sort_by);
    }

    const queryString = params.toString();
    const url = `/api/candidates/${queryString ? `?${queryString}` : ''}`;

    return await apiClient.get<CandidatesResponse>(url);
  }

  /**
   * Get detailed candidate profile (Employer/Admin only)
   */
  async getCandidateById(candidateId: string) {
    return await apiClient.get<CandidateDetailsResponse>(`/api/candidates/${candidateId}`);
  }
}

export const candidatesService = new CandidatesService();
export default candidatesService;
