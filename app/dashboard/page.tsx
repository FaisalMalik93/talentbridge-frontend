"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Briefcase, Eye, TrendingUp, Plus, MoreHorizontal, Calendar, MapPin, DollarSign, Loader2 } from "lucide-react"
import Link from "next/link"
import { jobsService } from "@/lib/services/jobs.service"
import { candidatesService } from "@/lib/services/candidates.service"
import { analyticsService } from "@/lib/services/analytics.service"
import { toast } from "sonner"
import type { Job, EmployerDashboard as EmployerDashboardType } from "@/lib/types"
import type { Candidate } from "@/lib/services/candidates.service"

export default function EmployerDashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeJobs, setActiveJobs] = useState<Job[]>([])
  const [topCandidates, setTopCandidates] = useState<Candidate[]>([])
  const [stats, setStats] = useState<EmployerDashboardType | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)

        // Fetch all data in parallel
        const [jobsRes, candidatesRes, statsRes] = await Promise.all([
          jobsService.getMyJobs().catch(e => ({ data: [], error: e.message })),
          candidatesService.getCandidates({ sort_by: 'match' }).catch(e => ({ data: { candidates: [] }, error: e.message })),
          analyticsService.getEmployerDashboard().catch(e => ({ data: null, error: e.message }))
        ])

        // Handle Jobs
        if (Array.isArray(jobsRes.data)) {
          setActiveJobs(jobsRes.data)
        }

        // Handle Candidates
        // Types check: candidatesRes.data can be CandidatesResponse or undefined if error
        if (candidatesRes.data && 'candidates' in candidatesRes.data) {
          setTopCandidates(candidatesRes.data.candidates)
        } else if (Array.isArray(candidatesRes.data)) {
          // Fallback if API returns array directly
          setTopCandidates(candidatesRes.data)
        }

        // Handle Stats
        if (statsRes.data) {
          setStats(statsRes.data)
        }

      } catch (error) {
        console.error("Failed to fetch dashboard data:", error)
        toast.error("Failed to load dashboard data")
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 text-white min-h-[50vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 text-white">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Employer Dashboard</h1>
        <p className="text-gray-400">Manage your job postings and review candidates</p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Active Jobs</p>
                <p className="text-2xl font-bold">{stats?.active_jobs || 0}</p>
              </div>
              <Briefcase className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Applicants</p>
                <p className="text-2xl font-bold">{stats?.total_applications || 0}</p>
              </div>
              <Users className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Avg Applications</p>
                <p className="text-2xl font-bold">{stats?.average_applications_per_job || 0}</p>
              </div>
              <Eye className="w-8 h-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Posted Jobs</p>
                <p className="text-2xl font-bold">{stats?.total_jobs_posted || 0}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="jobs" className="space-y-6">
        <TabsList className="bg-gray-800 border-gray-700 text-white">
          <TabsTrigger value="jobs" className="data-[state=active]:bg-blue-600">
            Active Jobs
          </TabsTrigger>
          <TabsTrigger value="candidates" className="data-[state=active]:bg-blue-600">
            Top Candidates
          </TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-blue-600">
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="jobs">
          <Card className="bg-gray-800 border-gray-700 text-white">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Active Job Postings
                <Link href="/post-job">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Post New Job
                  </Button>
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeJobs.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    <p>No active jobs found.</p>
                    <Link href="/post-job" className="text-blue-400 hover:underline mt-2 inline-block">Post your first job</Link>
                  </div>
                ) : (
                  activeJobs.map((job) => (
                    <div key={job.id} className="border border-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-semibold text-white">{job.title}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-400 mt-1">
                            <span className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {job.location}
                            </span>
                            <span className="flex items-center">
                              {job.salary_range}
                            </span>
                            <span className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              Posted {new Date(job.created_at).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant={job.is_active ? "default" : "secondary"}
                            className={job.is_active ? "bg-green-600" : "bg-yellow-600"}
                          >
                            {job.is_active ? "Active" : "Closed"}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-6 text-sm">
                          <span className="flex items-center text-blue-400">
                            <Users className="w-4 h-4 mr-1" />
                            {job.applications_count || 0} applicants
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <Link href={`/jobs/${job.id}`}>
                            <Button variant="outline" size="sm" className="border-gray-600 text-black hover:bg-gray-700">
                              View Details
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="candidates">
          <Card className="bg-gray-800 border-gray-700 text-white">
            <CardHeader>
              <CardTitle>AI-Ranked Top Candidates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topCandidates.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    <p>No candidates found yet.</p>
                  </div>
                ) : (
                  topCandidates.map((candidate) => (
                    <div key={candidate.id} className="border border-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                            <span className="text-lg font-semibold">
                              {candidate.name
                                .replace(/[^a-zA-Z\s]/g, '') // Sanitize name for initials
                                .split(" ")
                                .map((n: string) => n[0])
                                .join("")
                                .toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-white">{candidate.name}</h3>
                            <p className="text-gray-400">
                              {candidate.title} • {typeof candidate.experience === 'string' ? candidate.experience : `${candidate.experience?.length || 0} roles`}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-400">{candidate.overall_score || 0}%</div>
                          <p className="text-sm text-gray-400">AI Match Score</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                          {candidate.skills.slice(0, 5).map((skill: string) => (
                            <Badge key={skill} variant="secondary" className="bg-blue-600/20 text-blue-300">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex space-x-2">
                          <Link href={`/candidates/${candidate.id}`}>
                            <Button variant="outline" size="sm" className="border-gray-600 text-black hover:bg-gray-700">
                              View Profile
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  )))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-gray-800 border-gray-700 text-white">
              <CardHeader>
                <CardTitle>Application Activity (Last 30 Days)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-gray-400 flex-col">
                  <p className="text-4xl font-bold mb-2">{stats?.applications_last_30_days || 0}</p>
                  <p>Total Applications</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700 text-white">
              <CardHeader>
                <CardTitle>Top Performing Jobs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {(stats?.top_performing_jobs || []).map((job) => (
                    <div key={job.id} className="flex items-center justify-between">
                      <span className="text-white truncate max-w-[200px]">{job.title}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 h-2 bg-gray-700 rounded-full">
                          {/* Simple visualization relative to 100 applications (capped) */}
                          <div className="h-full bg-blue-600 rounded-full" style={{ width: `${Math.min(job.applications, 100)}%` }} />
                        </div>
                        <span className="text-sm text-gray-400">{job.applications} apps</span>
                      </div>
                    </div>
                  ))}
                  {(!stats?.top_performing_jobs || stats.top_performing_jobs.length === 0) && (
                    <p className="text-gray-400 text-center py-4">No data available yet</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
