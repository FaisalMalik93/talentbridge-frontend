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
}

export const jobsService = new JobsService();
export default jobsService;
