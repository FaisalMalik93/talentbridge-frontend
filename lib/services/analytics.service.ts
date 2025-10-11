/**
 * Analytics Service
 * Handles dashboard and analytics data
 */

import apiClient from '../api-client';
import type { UserDashboard, EmployerDashboard, AdminDashboard } from '../types';

class AnalyticsService {
  /**
   * Get user dashboard analytics
   */
  async getUserDashboard() {
    return await apiClient.get<UserDashboard>('/api/analytics/user/dashboard');
  }

  /**
   * Get employer dashboard analytics
   */
  async getEmployerDashboard() {
    return await apiClient.get<EmployerDashboard>('/api/analytics/employer/dashboard');
  }

  /**
   * Get admin overview analytics
   */
  async getAdminOverview() {
    return await apiClient.get<AdminDashboard>('/api/analytics/admin/overview');
  }

  /**
   * Get detailed CV analysis by ID
   */
  async getCVDetails(cvId: string) {
    return await apiClient.get(`/api/analytics/cv/${cvId}/details`);
  }
}

export const analyticsService = new AnalyticsService();
export default analyticsService;
