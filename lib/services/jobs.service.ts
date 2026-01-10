/**
 * Jobs Service
 * Handles job posting and management operations
 */

import apiClient from '../api-client';
import type { Job, CreateJobRequest } from '../types';

class JobsService {
  /**
   * Get all active jobs (public endpoint)
   */
  async getAllJobs() {
    return await apiClient.get<Job[]>('/api/jobs/', false);
  }

  /**
   * Get job by ID (public endpoint)
   */
  async getJobById(jobId: string) {
    return await apiClient.get<Job>(`/api/jobs/${jobId}`, false);
  }

  /**
   * Create a new job (Employer/Admin only)
   */
  async createJob(data: CreateJobRequest) {
    return await apiClient.post<Job>('/api/jobs/', data);
  }

  /**
   * Get employer's jobs
   */
  async getMyJobs() {
    return await apiClient.get<Job[]>('/api/jobs/my-jobs');
  }

  /**
   * Update a job
   */
  async updateJob(jobId: string, data: Partial<CreateJobRequest>) {
    return await apiClient.put<Job>(`/api/jobs/${jobId}`, data);
  }

  /**
   * Delete a job
   */
  async deleteJob(jobId: string) {
    return await apiClient.delete(`/api/jobs/${jobId}`);
  }

  /**
   * Apply for a job
   */
  async applyForJob(jobId: string, data: { cv_id: string; cover_letter?: string }) {
    // Note: Assuming API endpoint is /api/jobs/{id}/apply
    return await apiClient.post<{ success: boolean; error?: string }>(`/api/jobs/${jobId}/apply`, data);
  }
  /**
   * Get current user's applications
   */
  async getMyApplications() {
    return await apiClient.get<any[]>('/api/jobs/applications/my-applications');
  }

  /**
   * Check application status for a job
   */
  async getApplicationStatus(jobId: string) {
    return await apiClient.get<{ has_applied: boolean; application_id?: string; status?: string }>(`/api/jobs/${jobId}/application-status`);
  }

  /**
   * Save a job
   */
  async saveJob(jobId: string) {
    return await apiClient.post<{ message: string; saved: boolean }>(`/api/jobs/${jobId}/save`, {});
  }

  /**
   * Unsave a job
   */
  async unsaveJob(jobId: string) {
    return await apiClient.delete<{ message: string; saved: boolean }>(`/api/jobs/${jobId}/save`);
  }

  /**
   * Get saved jobs
   */
  async getSavedJobs() {
    return await apiClient.get<any[]>('/api/jobs/saved/my-saved-jobs');
  }

  /**
   * Check saved status
   */
  async checkSavedStatus(jobId: string) {
    return await apiClient.get<{ saved: boolean }>(`/api/jobs/${jobId}/save/status`);
  }

  /**
   * Get applications received by employer
   */
  async getReceivedApplications() {
    return await apiClient.get<any[]>('/api/jobs/applications/received');
  }
}

export const jobsService = new JobsService();
export default jobsService;
