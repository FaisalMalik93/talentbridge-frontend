/**
 * Type definitions for API responses
 */

export type UserRole = 'user' | 'employer' | 'admin';

export interface User {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  created_at: string;
  is_active: boolean;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  full_name: string;
  role: UserRole;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  description: string;
  requirements: string[];
  location: string;
  salary_range: string;
  job_type: string;
  employer_id: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
  applications_count: number;
}

export interface CreateJobRequest {
  title: string;
  company: string;
  description: string;
  requirements: string[];
  location: string;
  salary_range: string;
  job_type: string;
}

export interface CVAnalysis {
  skills: string[];
  experience: Array<{
    title: string;
    company: string;
    duration: string;
    description: string;
  }>;
  education: Array<{
    degree: string;
    institution: string;
    year: string;
  }>;
  summary: string;
}

export interface CVAnalysisResponse {
  success: boolean;
  id: string;
  cv_text: string;
  analysis: CVAnalysis;
}

export interface MatchResult {
  match_score: number;
  matching_skills: string[];
  missing_skills: string[];
  matching_experience: string;
  experience_gap: string;
  overall_assessment: string;
}

export interface Feedback {
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  formatting_issues: string[];
  missing_elements: string[];
}

export interface CVMatchResponse {
  success: boolean;
  id: string;
  job_title: string;
  match_result: MatchResult;
  feedback: Feedback;
}

export interface RankingResult {
  user_cv_score: number;
  comparison_results: Array<{
    reference_cv: string;
    score: number;
    feedback: string;
  }>;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
}

export interface CVRankResponse {
  success: boolean;
  id: string;
  ranking: RankingResult;
}

export interface CompleteAnalysisResponse {
  success: boolean;
  id: string;
  analysis: CVAnalysis;
  feedback: Feedback;
  overall_score: number;
  job_match?: MatchResult;
}

export interface LeaderboardEntry {
  rank: number;
  user_id: string;
  user_name: string;
  filename: string;
  overall_score: number;
  created_at: string;
  is_current_user: boolean;
}

export interface LeaderboardResponse {
  success: boolean;
  total_cvs: number;
  leaderboard: LeaderboardEntry[];
}

export interface UserDashboard {
  total_cvs_submitted: number;
  job_applications: number;
  average_score: number;
  score_trend: Array<{
    date: string;
    score: number;
    filename: string;
  }>;
  recent_cvs: Array<{
    id: string;
    filename: string;
    score: number;
    date: string;
  }>;
}

export interface EmployerDashboard {
  total_jobs_posted: number;
  active_jobs: number;
  total_applications: number;
  average_applications_per_job: number;
  top_performing_jobs: Array<{
    id: string;
    title: string;
    company: string;
    applications: number;
    posted_date: string;
  }>;
  recent_applications: Array<{
    id: string;
    job_id: string;
    filename: string;
    match_score: number;
    date: string;
  }>;
  applications_last_30_days: number;
}

export interface AdminDashboard {
  users: {
    total: number;
    by_role: {
      user: number;
      employer: number;
      admin: number;
    };
    new_last_7_days: number;
  };
  cvs: {
    total_submitted: number;
    total_rankings: number;
    average_score: number;
    submitted_last_7_days: number;
  };
  jobs: {
    total_posted: number;
    active: number;
    total_applications: number;
    posted_last_7_days: number;
  };
  reference_cvs: number;
}
