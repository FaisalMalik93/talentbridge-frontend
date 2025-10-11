"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Calendar,
  MapPin,
  DollarSign,
  Building,
  Clock,
  Eye,
  MessageSquare,
  Download,
  Trash2,
  User,
  Bell,
  Settings,
} from "lucide-react"
import Link from "next/link"

export default function CandidateApplications() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const applications = [
    {
      id: 1,
      jobTitle: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      location: "Remote",
      salary: "$80k - $120k",
      appliedDate: "2024-01-15",
      status: "Under Review",
      logo: "🚀",
      description: "Leading technology company focused on innovative solutions",
      jobType: "Full-time",
      lastUpdate: "2024-01-18",
      applicationStatus: "Application submitted and under review by hiring team",
    },
    {
      id: 2,
      jobTitle: "UI/UX Designer",
      company: "DesignStudio",
      location: "New York, NY",
      salary: "$70k - $90k",
      appliedDate: "2024-01-12",
      status: "Interview Scheduled",
      logo: "🎨",
      description: "Creative design agency specializing in brand identity",
      jobType: "Full-time",
      lastUpdate: "2024-01-16",
      applicationStatus: "Interview scheduled for January 20th at 2:00 PM",
    },
    {
      id: 3,
      jobTitle: "Product Manager",
      company: "StartupXYZ",
      location: "San Francisco, CA",
      salary: "$100k - $140k",
      appliedDate: "2024-01-10",
      status: "Rejected",
      logo: "📊",
      description: "Fast-growing fintech startup revolutionizing payments",
      jobType: "Full-time",
      lastUpdate: "2024-01-14",
      applicationStatus: "Thank you for your interest. We've decided to move forward with other candidates.",
    },
    {
      id: 4,
      jobTitle: "React Developer",
      company: "WebAgency",
      location: "Remote",
      salary: "$75k - $95k",
      appliedDate: "2024-01-08",
      status: "Offer Extended",
      logo: "💻",
      description: "Digital agency creating modern web experiences",
      jobType: "Contract",
      lastUpdate: "2024-01-17",
      applicationStatus: "Congratulations! We'd like to extend an offer. Please review the details.",
    },
    {
      id: 5,
      jobTitle: "DevOps Engineer",
      company: "CloudTech",
      location: "Seattle, WA",
      salary: "$90k - $130k",
      appliedDate: "2024-01-05",
      status: "Application Withdrawn",
      logo: "☁️",
      description: "Enterprise cloud solutions provider",
      jobType: "Full-time",
      lastUpdate: "2024-01-09",
      applicationStatus: "Application withdrawn by candidate",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Under Review":
        return "bg-yellow-600"
      case "Interview Scheduled":
        return "bg-blue-600"
      case "Rejected":
        return "bg-red-600"
      case "Offer Extended":
        return "bg-green-600"
      case "Application Withdrawn":
        return "bg-gray-600"
      default:
        return "bg-gray-600"
    }
  }

  const getStatusCount = (status: string) => {
    if (status === "all") return applications.length
    return applications.filter((app) => app.status === status).length
  }

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || app.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">TB</span>
            </div>
            <span className="text-xl font-bold">TalentBridge</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/candidate/dashboard" className="hover:text-blue-400 transition-colors">
              Dashboard
            </Link>
            <Link href="/jobs" className="hover:text-blue-400 transition-colors">
              Find Jobs
            </Link>
            <Link href="/candidate/applications" className="text-blue-400">
              Applications
            </Link>
            <Link href="/candidate/profile" className="hover:text-blue-400 transition-colors">
              Profile
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="w-5 h-5" />
            </Button>
            <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Applications</h1>
          <p className="text-gray-400">Track and manage your job applications</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search applications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48 bg-gray-800 border-gray-700">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Applications ({getStatusCount("all")})</SelectItem>
                <SelectItem value="Under Review">Under Review ({getStatusCount("Under Review")})</SelectItem>
                <SelectItem value="Interview Scheduled">
                  Interview Scheduled ({getStatusCount("Interview Scheduled")})
                </SelectItem>
                <SelectItem value="Offer Extended">Offer Extended ({getStatusCount("Offer Extended")})</SelectItem>
                <SelectItem value="Rejected">Rejected ({getStatusCount("Rejected")})</SelectItem>
                <SelectItem value="Application Withdrawn">
                  Withdrawn ({getStatusCount("Application Withdrawn")})
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Applications Tabs */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="bg-gray-800 border-gray-700">
            <TabsTrigger value="all" className="data-[state=active]:bg-blue-600">
              All Applications ({applications.length})
            </TabsTrigger>
            <TabsTrigger value="active" className="data-[state=active]:bg-blue-600">
              Active ({getStatusCount("Under Review") + getStatusCount("Interview Scheduled")})
            </TabsTrigger>
            <TabsTrigger value="offers" className="data-[state=active]:bg-blue-600">
              Offers ({getStatusCount("Offer Extended")})
            </TabsTrigger>
            <TabsTrigger value="archived" className="data-[state=active]:bg-blue-600">
              Archived ({getStatusCount("Rejected") + getStatusCount("Application Withdrawn")})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="space-y-6">
              {filteredApplications.map((application) => (
                <Card key={application.id} className="bg-gray-800 border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center text-2xl">
                          {application.logo}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-xl font-semibold text-white">{application.jobTitle}</h3>
                            <Badge className={getStatusColor(application.status)}>{application.status}</Badge>
                          </div>
                          <p className="text-blue-400 mb-2">{application.company}</p>
                          <p className="text-gray-300 mb-3">{application.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-400">
                            <span className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {application.location}
                            </span>
                            <span className="flex items-center">
                              <DollarSign className="w-4 h-4 mr-1" />
                              {application.salary}
                            </span>
                            <span className="flex items-center">
                              <Building className="w-4 h-4 mr-1" />
                              {application.jobType}
                            </span>
                            <span className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              Applied {new Date(application.appliedDate).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-400 mb-1">Last Update</p>
                        <p className="text-sm text-white">{new Date(application.lastUpdate).toLocaleDateString()}</p>
                      </div>
                    </div>

                    {/* Application Status */}
                    <div className="bg-gray-700/50 rounded-lg p-4 mb-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Clock className="w-4 h-4 text-blue-400" />
                        <span className="text-sm font-medium text-blue-400">Application Status</span>
                      </div>
                      <p className="text-sm text-gray-300">{application.applicationStatus}</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="border-gray-600 text-white hover:bg-gray-700">
                          <Eye className="w-4 h-4 mr-1" />
                          View Job
                        </Button>
                        <Button variant="outline" size="sm" className="border-gray-600 text-white hover:bg-gray-700">
                          <MessageSquare className="w-4 h-4 mr-1" />
                          Message
                        </Button>
                        <Button variant="outline" size="sm" className="border-gray-600 text-white hover:bg-gray-700">
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </Button>
                      </div>
                      <div className="flex space-x-2">
                        {application.status === "Under Review" && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-red-600 text-red-400 hover:bg-red-600/10"
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Withdraw
                          </Button>
                        )}
                        {application.status === "Offer Extended" && (
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            Review Offer
                          </Button>
                        )}
                        {application.status === "Interview Scheduled" && (
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            View Interview Details
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="active">
            <div className="space-y-6">
              {filteredApplications
                .filter((app) => app.status === "Under Review" || app.status === "Interview Scheduled")
                .map((application) => (
                  <Card key={application.id} className="bg-gray-800 border-gray-700">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center text-2xl">
                            {application.logo}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-xl font-semibold text-white">{application.jobTitle}</h3>
                              <Badge className={getStatusColor(application.status)}>{application.status}</Badge>
                            </div>
                            <p className="text-blue-400 mb-2">{application.company}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-400">
                              <span className="flex items-center">
                                <MapPin className="w-4 h-4 mr-1" />
                                {application.location}
                              </span>
                              <span className="flex items-center">
                                <DollarSign className="w-4 h-4 mr-1" />
                                {application.salary}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-700/50 rounded-lg p-4">
                        <p className="text-sm text-gray-300">{application.applicationStatus}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="offers">
            <div className="space-y-6">
              {filteredApplications
                .filter((app) => app.status === "Offer Extended")
                .map((application) => (
                  <Card key={application.id} className="bg-green-600/10 border-green-600/50">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center text-2xl">
                            {application.logo}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-xl font-semibold text-white">{application.jobTitle}</h3>
                              <Badge className="bg-green-600">Offer Extended</Badge>
                            </div>
                            <p className="text-blue-400 mb-2">{application.company}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-400">
                              <span className="flex items-center">
                                <MapPin className="w-4 h-4 mr-1" />
                                {application.location}
                              </span>
                              <span className="flex items-center">
                                <DollarSign className="w-4 h-4 mr-1" />
                                {application.salary}
                              </span>
                            </div>
                          </div>
                        </div>
                        <Button className="bg-green-600 hover:bg-green-700">Review Offer</Button>
                      </div>
                      <div className="bg-green-600/20 border border-green-600/30 rounded-lg p-4">
                        <p className="text-sm text-green-300">{application.applicationStatus}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="archived">
            <div className="space-y-6">
              {filteredApplications
                .filter((app) => app.status === "Rejected" || app.status === "Application Withdrawn")
                .map((application) => (
                  <Card key={application.id} className="bg-gray-800 border-gray-700 opacity-75">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center text-2xl">
                            {application.logo}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-xl font-semibold text-white">{application.jobTitle}</h3>
                              <Badge className={getStatusColor(application.status)}>{application.status}</Badge>
                            </div>
                            <p className="text-blue-400 mb-2">{application.company}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-400">
                              <span className="flex items-center">
                                <MapPin className="w-4 h-4 mr-1" />
                                {application.location}
                              </span>
                              <span className="flex items-center">
                                <DollarSign className="w-4 h-4 mr-1" />
                                {application.salary}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-700/50 rounded-lg p-4">
                        <p className="text-sm text-gray-400">{application.applicationStatus}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Empty State */}
        {filteredApplications.length === 0 && (
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-12 text-center">
              <Building className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No applications found</h3>
              <p className="text-gray-400 mb-6">
                {searchTerm || statusFilter !== "all"
                  ? "Try adjusting your search or filters"
                  : "Start applying to jobs to see them here"}
              </p>
              <Link href="/jobs">
                <Button className="bg-blue-600 hover:bg-blue-700">Browse Jobs</Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
