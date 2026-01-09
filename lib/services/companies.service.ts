/**
 * Companies Service
 * Handles fetching company data from the backend
 */

import apiClient, { ApiResponse } from '../api-client';

export interface Company {
    id: string;
    name: string;
    industry: string;
    size: string;
    location: string;
    rating: number;
    reviews: number;
    openJobs: number;
    description: string;
    benefits: string[];
    techStack: string[];
    logo: string;
}

class CompaniesService {
    /**
     * Get all companies
     */
    async getCompanies() {
        return await apiClient.get<Company[]>('/api/companies');
    }

    /**
     * Toggle follow company (Stub for future implementation)
     */
    async toggleFollow(companyId: string) {
        // In a real app, this would call an API endpoint
        return { success: true };
    }
}

export const companiesService = new CompaniesService();
export default companiesService;
