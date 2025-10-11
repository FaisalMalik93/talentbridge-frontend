/**
 * CV Service
 * Handles CV analysis, matching, and ranking operations
 */

import apiClient from '../api-client';
import type { CVAnalysisResponse, CVMatchResponse, CVRankResponse, CompleteAnalysisResponse, LeaderboardResponse } from '../types';

class CVService {
  /**
   * Analyze a CV file
   */
  async analyzeCV(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    return await apiClient.postFormData<CVAnalysisResponse>('/api/cv/analyze', formData);
  }

  /**
   * Complete CV analysis with feedback (all-in-one)
   */
  async completeAnalysis(file: File, jobDescription?: string) {
    const formData = new FormData();
    formData.append('file', file);
    if (jobDescription) {
      formData.append('job_description', jobDescription);
    }

    return await apiClient.postFormData<CompleteAnalysisResponse>('/api/cv/complete-analysis', formData);
  }

  /**
   * Match CV with a specific job
   */
  async matchWithJob(file: File, jobId: string) {
    const formData = new FormData();
    formData.append('file', file);

    return await apiClient.postFormData<CVMatchResponse>(`/api/cv/match/${jobId}`, formData);
  }

  /**
   * Rank CV against reference CVs
   */
  async rankCV(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    return await apiClient.postFormData<CVRankResponse>('/api/cv/rank', formData);
  }

  /**
   * Get user's CV history
   */
  async getMyCVs() {
    return await apiClient.get('/api/cv/my-cvs');
  }

  /**
   * Upload reference CV (Admin only)
   */
  async uploadReferenceCV(file: File, title: string, description: string, category: string) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);

    return await apiClient.postFormData('/api/cv/reference', formData);
  }

  /**
   * Get all reference CVs (Admin only)
   */
  async getReferenceCVs() {
    return await apiClient.get('/api/cv/reference');
  }

  /**
   * Delete reference CV (Admin only)
   */
  async deleteReferenceCV(cvId: string) {
    return await apiClient.delete(`/api/cv/reference/${cvId}`);
  }

  /**
   * Get CV leaderboard (all CVs ranked by score)
   */
  async getLeaderboard() {
    return await apiClient.get<LeaderboardResponse>('/api/cv/leaderboard');
  }
}

export const cvService = new CVService();
export default cvService;
