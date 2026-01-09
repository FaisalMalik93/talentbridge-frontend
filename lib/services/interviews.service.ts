import { apiClient } from '../api-client';

export interface Interview {
    id: string;
    job_id: string;
    company_name: string;
    job_title: string;
    date: string;
    duration_minutes: number;
    type: string;
    status: string;
    interviewer_name: string;
    interviewer_role: string;
    location?: string;
    notes?: string;
    round: string;
    feedback?: string;
}

export interface CreateInterviewRequest {
    job_id: string;
    company_name: string;
    job_title: string;
    date: string;
    duration_minutes: number;
    type: string;
    interviewer_name: string;
    interviewer_role: string;
    location?: string;
    notes?: string;
    round?: string;
}

class InterviewsService {
    /**
     * Get all interviews for current user
     */
    async getMyInterviews() {
        return await apiClient.get<Interview[]>('/api/interviews/my-interviews');
    }

    /**
     * Schedule a new interview
     */
    async scheduleInterview(data: CreateInterviewRequest) {
        return await apiClient.post<Interview>('/api/interviews/', data);
    }

    /**
     * Update interview notes
     */
    async updateInterview(id: string, notes: string) {
        return await apiClient.patch<Interview>(`/api/interviews/${id}`, { notes });
    }

    /**
     * DEV ONLY: Simulate employer approval flow
     */
    async simulateInterview() {
        return await apiClient.post<Interview>('/api/interviews/test-simulate', {});
    }
}

export const interviewsService = new InterviewsService();
export default interviewsService;
