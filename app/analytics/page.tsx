"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, Users, Briefcase, Eye, Clock, Target, Download, Filter } from "lucide-react"
import Link from "next/link"

export default function AnalyticsPage() {
  const metrics = [
    {
      title: "Total Job Views",
      value: "12,847",
      change: "+23%",
      trend: "up",
      icon: Eye,
      color: "text-blue-400",
    },
    {
      title: "Applications Received",
      value: "1,234",
      change: "+18%",
      trend: "up",
      icon: Users,
      color: "text-green-400",
    },
    {
      title: "Active Job Postings",
      value: "15",
      change: "-2",
      trend: "down",
      icon: Briefcase,
      color: "text-purple-400",
    },
    {
      title: "Average Time to Hire",
      value: "18 days",
      change: "-3 days",
      trend: "up",
      icon: Clock,
      color: "text-yellow-400",
    },
  ]

  const topPerformingJobs = [
    {
      title: "Senior Frontend Developer",
      views: 2847,
      applications: 156,
      conversionRate: 5.5,
      status: "Active",
    },
    {
      title: "Product Manager",
      views: 2134,
      applications: 89,
      conversionRate: 4.2,
      status: "Active",
    },
    {
      title: "UI/UX Designer",
      views: 1876,
      applications: 134,
      conversionRate: 7.1,
      status: "Active",
    },
    {
      title: "DevOps Engineer",
      views: 1654,
      applications: 67,
      conversionRate: 4.0,
      status: "Paused",
    },
  ]

  const skillsInDemand = [
    { skill: "React", demand: 92, growth: "+15%" },
    { skill: "Python", demand: 87, growth: "+12%" },
    { skill: "Node.js", demand: 78, growth: "+8%" },
    { skill: "AWS", demand: 74, growth: "+22%" },
    { skill: "TypeScript", demand: 69, growth: "+18%" },
    { skill: "Docker", demand: 65, growth: "+10%" },
  ]

  const applicationSources = [
    { source: "Direct Applications", count: 456, percentage: 37 },
    { source: "Job Boards", count: 389, percentage: 32 },
    { source: "Social Media", count: 234, percentage: 19 },
    { source: "Referrals", count: 155, percentage: 12 },
  ]

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
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-400" />
                  )}
                  <span
                    className={`text-sm font-semibold ${metric.trend === "up" ? "text-green-400" : "text-red-400"}`}
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
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Job Views</span>
                    <span className="font-semibold">12,847</span>
                  </div>
                  <Progress value={100} className="h-2" />

                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Applications Started</span>
                    <span className="font-semibold">2,156 (16.8%)</span>
                  </div>
                  <Progress value={17} className="h-2" />

                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Applications Completed</span>
                    <span className="font-semibold">1,234 (9.6%)</span>
                  </div>
                  <Progress value={10} className="h-2" />

                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Interviews Scheduled</span>
                    <span className="font-semibold">234 (1.8%)</span>
                  </div>
                  <Progress value={2} className="h-2" />

                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Offers Extended</span>
                    <span className="font-semibold">45 (0.4%)</span>
                  </div>
                  <Progress value={0.4} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Application Sources */}
            <Card className="bg-gray-800 border-gray-700 text-white">
              <CardHeader>
                <CardTitle>Application Sources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {applicationSources.map((source, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-blue-600 rounded-full" />
                        <span className="text-gray-300">{source.source}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="font-semibold">{source.count}</span>
                        <span className="text-sm text-gray-400">({source.percentage}%)</span>
                      </div>
                    </div>
                  ))}
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
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Review to Interview</span>
                    <span className="font-semibold">5.7 days</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Interview to Decision</span>
                    <span className="font-semibold">3.2 days</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Decision to Offer</span>
                    <span className="font-semibold">1.8 days</span>
                  </div>
                  <div className="border-t border-gray-700 pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-white font-semibold">Total Time to Hire</span>
                      <span className="font-bold text-blue-400">18 days</span>
                    </div>
                  </div>
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
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Job Quality</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={85} className="w-20 h-2" />
                      <span className="text-sm">8.5</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Response Time</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={90} className="w-20 h-2" />
                      <span className="text-sm">9.0</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Candidate Experience</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={78} className="w-20 h-2" />
                      <span className="text-sm">7.8</span>
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
                {topPerformingJobs.map((job, index) => (
                  <div key={index} className="border border-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{job.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <span className="flex items-center">
                            <Eye className="w-4 h-4 mr-1" />
                            {job.views.toLocaleString()} views
                          </span>
                          <span className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {job.applications} applications
                          </span>
                          <span className="flex items-center">
                            <Target className="w-4 h-4 mr-1" />
                            {job.conversionRate}% conversion
                          </span>
                        </div>
                      </div>
                      <Badge
                        variant={job.status === "Active" ? "default" : "secondary"}
                        className={job.status === "Active" ? "bg-green-600" : "bg-yellow-600"}
                      >
                        {job.status}
                      </Badge>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-gray-400">Views</p>
                        <Progress value={(job.views / 3000) * 100} className="mt-1" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Applications</p>
                        <Progress value={(job.applications / 200) * 100} className="mt-1" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Conversion Rate</p>
                        <Progress value={job.conversionRate * 10} className="mt-1" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="candidates">
          <div className="grid lg:grid-cols-2 gap-6 ">
            <Card className="bg-gray-800 border-gray-700 text-white">
              <CardHeader>
                <CardTitle>Candidate Quality Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-blue-400 mb-2">7.8/10</div>
                  <p className="text-gray-400">Average candidate match score</p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Excellent Match (9-10)</span>
                    <span className="font-semibold">23%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Good Match (7-8)</span>
                    <span className="font-semibold">45%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Fair Match (5-6)</span>
                    <span className="font-semibold">24%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Poor Match (0-4)</span>
                    <span className="font-semibold">8%</span>
                  </div>
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
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Entry Level</span>
                        <span className="font-semibold">15%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Mid Level</span>
                        <span className="font-semibold">42%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Senior Level</span>
                        <span className="font-semibold">35%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Lead/Principal</span>
                        <span className="font-semibold">8%</span>
                      </div>
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
              <CardTitle>Skills in Demand</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {skillsInDemand.map((skill, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <span className="text-white font-medium">{skill.skill}</span>
                      <Badge variant="outline" className="text-green-400 border-green-400">
                        {skill.growth}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Progress value={skill.demand} className="w-32" />
                      <span className="text-sm font-semibold w-12">{skill.demand}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
