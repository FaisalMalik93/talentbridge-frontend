"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Briefcase, Eye, TrendingUp, Plus, MoreHorizontal, Calendar, MapPin, DollarSign } from "lucide-react"
import Link from "next/link"

export default function EmployerDashboard() {
  const [activeJobs] = useState([
    {
      id: 1,
      title: "Senior Frontend Developer",
      location: "Remote",
      salary: "$80k - $120k",
      posted: "2024-01-15",
      applicants: 24,
      views: 156,
      status: "Active",
    },
    {
      id: 2,
      title: "UI/UX Designer",
      location: "New York, NY",
      salary: "$70k - $90k",
      posted: "2024-01-10",
      applicants: 18,
      views: 89,
      status: "Active",
    },
    {
      id: 3,
      title: "Product Manager",
      location: "San Francisco, CA",
      salary: "$100k - $140k",
      posted: "2024-01-08",
      applicants: 31,
      views: 203,
      status: "Paused",
    },
  ])

  const [topCandidates] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      title: "Senior Frontend Developer",
      experience: "5 years",
      skills: ["React", "TypeScript", "Next.js"],
      matchScore: 95,
      appliedFor: "Senior Frontend Developer",
    },
    {
      id: 2,
      name: "Michael Chen",
      title: "Full Stack Developer",
      experience: "4 years",
      skills: ["React", "Node.js", "Python"],
      matchScore: 88,
      appliedFor: "Senior Frontend Developer",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      title: "UI/UX Designer",
      experience: "3 years",
      skills: ["Figma", "Adobe XD", "Prototyping"],
      matchScore: 92,
      appliedFor: "UI/UX Designer",
    },
  ])

  return (
    <div className="container mx-auto px-4 py-8">
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
                  <p className="text-2xl font-bold">3</p>
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
                  <p className="text-2xl font-bold">73</p>
                </div>
                <Users className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Profile Views</p>
                  <p className="text-2xl font-bold">448</p>
                </div>
                <Eye className="w-8 h-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Hire Rate</p>
                  <p className="text-2xl font-bold">12%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="jobs" className="space-y-6">
          <TabsList className="bg-gray-800 border-gray-700">
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
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Active Job Postings
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Post New Job
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeJobs.map((job) => (
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
                              <DollarSign className="w-4 h-4 mr-1" />
                              {job.salary}
                            </span>
                            <span className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              Posted {new Date(job.posted).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant={job.status === "Active" ? "default" : "secondary"}
                            className={job.status === "Active" ? "bg-green-600" : "bg-yellow-600"}
                          >
                            {job.status}
                          </Badge>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-6 text-sm">
                          <span className="flex items-center text-blue-400">
                            <Users className="w-4 h-4 mr-1" />
                            {job.applicants} applicants
                          </span>
                          <span className="flex items-center text-gray-400">
                            <Eye className="w-4 h-4 mr-1" />
                            {job.views} views
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            View Applicants
                          </Button>
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            Edit Job
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="candidates">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle>AI-Ranked Top Candidates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topCandidates.map((candidate) => (
                    <div key={candidate.id} className="border border-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                            <span className="text-lg font-semibold">
                              {candidate.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </span>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-white">{candidate.name}</h3>
                            <p className="text-gray-400">
                              {candidate.title} • {candidate.experience}
                            </p>
                            <p className="text-sm text-blue-400">Applied for: {candidate.appliedFor}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-400">{candidate.matchScore}%</div>
                          <p className="text-sm text-gray-400">AI Match Score</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                          {candidate.skills.map((skill) => (
                            <Badge key={skill} variant="secondary" className="bg-blue-600/20 text-blue-300">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            View Profile
                          </Button>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            Contact
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle>Application Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-400">
                    <p>Analytics chart would be displayed here</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle>Top Skills in Demand</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { skill: "React", percentage: 85 },
                      { skill: "TypeScript", percentage: 72 },
                      { skill: "Node.js", percentage: 68 },
                      { skill: "Python", percentage: 61 },
                      { skill: "AWS", percentage: 54 },
                    ].map((item) => (
                      <div key={item.skill} className="flex items-center justify-between">
                        <span className="text-white">{item.skill}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-24 h-2 bg-gray-700 rounded-full">
                            <div className="h-full bg-blue-600 rounded-full" style={{ width: `${item.percentage}%` }} />
                          </div>
                          <span className="text-sm text-gray-400">{item.percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
    </div>
  )
}
