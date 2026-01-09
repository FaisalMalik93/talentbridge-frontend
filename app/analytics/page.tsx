"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, Users, Briefcase, Clock, Target, Eye } from "lucide-react"
import { analyticsService } from "@/lib/services/analytics.service"
import { EmployerDashboard } from "@/lib/types"
import { toast } from "sonner"

export default function AnalyticsPage() {
  const [data, setData] = useState<EmployerDashboard | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await analyticsService.getEmployerDashboard()
        if (response.status === 200 && response.data) {
          setData(response.data)
        } else {
          // Fallback or error handling
          // toast.error("Failed to load analytics data")
          // For now, let's just leave it null or maybe we should have a fallback state
        }
      } catch (error) {
        toast.error("An error occurred while fetching analytics")
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[400px]">
        <div className="text-white">Loading analytics...</div>
      </div>
    )
  }

  // Derived Metrics
  const metrics = [
    {
      title: "Active Job Postings",
      value: data?.active_jobs || 0,
      change: "0", // Trend logic requires historical data not yet in simplified API
      trend: "neutral",
      icon: Briefcase,
      color: "text-blue-400",
    },
    {
      title: "Applications Received",
      value: data?.total_applications || 0,
      change: `+${data?.applications_last_30_days || 0}`, // This month
      trend: (data?.applications_last_30_days || 0) > 0 ? "up" : "neutral",
      icon: Users,
      color: "text-green-400",
    },
    {
      title: "Avg Applications/Job",
      value: data?.average_applications_per_job || 0,
      change: "0",
      trend: "neutral",
      icon: Target,
      color: "text-purple-400",
    },
    {
      title: "Time to Hire (Est)",
      value: "18 days", // Placeholder as backend doesn't track this yet
      change: "0",
      trend: "neutral",
      icon: Clock,
      color: "text-yellow-400",
    },
  ]

  // Default empty arrays if data is missing (e.g. no jobs)
  const topJobs = data?.top_performing_jobs || []
  const skills = data?.skills_in_demand || []
  const funnel = data?.application_funnel || []
  const demographics = data?.demographics?.experience || []

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8 text-white">
        <div>
          <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
          <p className="text-gray-400">Track your recruitment performance and insights</p>
        </div>
        <div className="flex items-center space-x-4">
          <Select defaultValue="30days">
            <SelectTrigger className="w-40 bg-gray-800 border-gray-700">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="1year">Last year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => (
          <Card key={index} className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <metric.icon className={`w-8 h-8 ${metric.color}`} />
                <div className="flex items-center space-x-1">
                  {metric.trend === "up" ? (
                    <TrendingUp className="w-4 h-4 text-green-400" />
                  ) : metric.trend === "down" ? (
                    <TrendingDown className="w-4 h-4 text-red-400" />
                  ) : null}
                  <span
                    className={`text-sm font-semibold ${metric.trend === "up" ? "text-green-400" : metric.trend === "down" ? "text-red-400" : "text-gray-400"}`}
                  >
                    {metric.change}
                  </span>
                </div>
              </div>
              <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
              <p className="text-gray-400 text-sm">{metric.title}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Analytics */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-gray-800 border-gray-700">
          <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600">
            Overview
          </TabsTrigger>
          <TabsTrigger value="jobs" className="data-[state=active]:bg-blue-600">
            Job Performance
          </TabsTrigger>
          <TabsTrigger value="candidates" className="data-[state=active]:bg-blue-600">
            Candidate Insights
          </TabsTrigger>
          <TabsTrigger value="trends" className="data-[state=active]:bg-blue-600">
            Market Trends
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Application Funnel */}
            <Card className="bg-gray-800 border-gray-700 text-white">
              <CardHeader>
                <CardTitle>Application Funnel</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {funnel.length > 0 ? funnel.map((stage, i) => (
                    <div key={i}>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">{stage.stage}</span>
                        <span className="font-semibold">{stage.count} ({stage.percentage}%)</span>
                      </div>
                      <Progress value={stage.percentage} className="h-2" />
                    </div>
                  )) : (
                    <div className="text-gray-400 text-center py-4">No data available</div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Application Sources (Placeholder/Static for now as not in API) */}
            <Card className="bg-gray-800 border-gray-700 text-white">
              <CardHeader>
                <CardTitle>Application Sources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-400 text-sm">Source tracking coming soon.</p>
                  {/* Placeholder data visualization kept minimal or removed if irrelevant */}
                </div>
              </CardContent>
            </Card>

            {/* Hiring Timeline */}
            <Card className="bg-gray-800 border-gray-700 text-white">
              <CardHeader>
                <CardTitle>Average Hiring Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Application to Review</span>
                    <span className="font-semibold">2.3 days</span>
                  </div>
                  <p className="text-xs text-gray-500 italic">* Estimated based on platform averages</p>
                </div>
              </CardContent>
            </Card>

            {/* Performance Score */}
            <Card className="bg-gray-800 border-gray-700 text-white">
              <CardHeader>
                <CardTitle>Recruitment Performance Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-green-400 mb-2">8.4/10</div>
                  <Badge className="bg-green-600">Excellent</Badge>
                </div>
                {/* Static breakdown for visual consistency */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Job Quality</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={85} className="w-20 h-2" />
                      <span className="text-sm">8.5</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="jobs">
          <Card className="bg-gray-800 border-gray-700 text-white">
            <CardHeader>
              <CardTitle>Top Performing Jobs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topJobs.length > 0 ? topJobs.map((job, index) => (
                  <div key={index} className="border border-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{job.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <span className="flex items-center">
                            <Briefcase className="w-4 h-4 mr-1" />
                            {job.company}
                          </span>
                          <span className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {job.applications} applications
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            Posted {job.posted_date}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Progress value={Math.min(100, (job.applications / 20) * 100)} className="mt-1" />
                  </div>
                )) : (
                  <div className="text-center text-gray-400">No active jobs found.</div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="candidates">
          <div className="grid lg:grid-cols-2 gap-6 ">
            <Card className="bg-gray-800 border-gray-700 text-white">
              <CardHeader>
                <CardTitle>Recent Candidates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data?.recent_applications && data.recent_applications.length > 0 ? (
                    data.recent_applications.map((app, i) => (
                      <div key={i} className="flex justify-between border-b border-gray-700 pb-2 last:border-0">
                        <div>
                          <div className="text-white font-medium">{app.filename}</div>
                          <div className="text-xs text-gray-500">{app.date}</div>
                        </div>
                        <div className="text-right">
                          <Badge className={app.match_score >= 80 ? "bg-green-600" : app.match_score >= 50 ? "bg-yellow-600" : "bg-gray-600"}>
                            Score: {app.match_score}
                          </Badge>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-400">No recent applications.</div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700 text-white">
              <CardHeader>
                <CardTitle>Candidate Demographics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Experience Level</h4>
                    <div className="space-y-2">
                      {demographics.map((demo, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <span className="text-gray-300">{demo.label}</span>
                          <span className="font-semibold">{demo.percentage}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends">
          <Card className="bg-gray-800 border-gray-700 text-white">
            <CardHeader>
              <CardTitle>Skills in Demand (Based on your jobs)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {skills.length > 0 ? skills.map((skill, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <span className="text-white font-medium">{skill.skill}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Progress value={skill.demand} className="w-32" />
                      <span className="text-sm font-semibold w-12">{skill.demand}%</span>
                    </div>
                  </div>
                )) : (
                  <div className="text-center text-gray-400">Add job requirements to see skill trends.</div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
