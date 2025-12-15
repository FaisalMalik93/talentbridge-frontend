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
    <div className="container mx-auto px-4 py-8 text-white">
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
        <div className="overflow-x-auto pb-2">
          <TabsList className="bg-gray-800 border-gray-700 inline-flex w-auto min-w-full justify-start">
            <TabsTrigger value="all" className="data-[state=active]:bg-blue-600 px-4">
              All Applications ({applications.length})
            </TabsTrigger>
            <TabsTrigger value="active" className="data-[state=active]:bg-blue-600 px-4">
              Active ({getStatusCount("Under Review") + getStatusCount("Interview Scheduled")})
            </TabsTrigger>
            <TabsTrigger value="offers" className="data-[state=active]:bg-blue-600 px-4">
              Offers ({getStatusCount("Offer Extended")})
            </TabsTrigger>
            <TabsTrigger value="archived" className="data-[state=active]:bg-blue-600 px-4">
              Archived ({getStatusCount("Rejected") + getStatusCount("Application Withdrawn")})
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all">
          <div className="space-y-6">
            {filteredApplications.map((application) => (
              <Card key={application.id} className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start justify-between mb-4 gap-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                        {application.logo}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-2">
                          <h3 className="text-xl font-semibold text-white">{application.jobTitle}</h3>
                          <Badge className={`${getStatusColor(application.status)} w-fit`}>{application.status}</Badge>
                        </div>
                        <p className="text-blue-400 mb-2">{application.company}</p>
                        <p className="text-gray-300 mb-3">{application.description}</p>
                        <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-sm text-gray-400">
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
                    <div className="text-left md:text-right pl-16 md:pl-0">
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
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                      <Button variant="outline" size="sm" className="border-gray-600 text-black hover:bg-gray-700 flex-1 sm:flex-none">
                        <Eye className="w-4 h-4 mr-1" />
                        View Job
                      </Button>
                      <Button variant="outline" size="sm" className="border-gray-600 text-black hover:bg-gray-700 flex-1 sm:flex-none">
                        <MessageSquare className="w-4 h-4 mr-1" />
                        Message
                      </Button>
                      <Button variant="outline" size="sm" className="border-gray-600 text-black hover:bg-gray-700 flex-1 sm:flex-none">
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                    </div>
                    <div className="flex space-x-2 w-full sm:w-auto">
                      {application.status === "Under Review" && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-red-600 text-red-400 hover:bg-red-600/10 w-full sm:w-auto"
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Withdraw
                        </Button>
                      )}
                      {application.status === "Offer Extended" && (
                        <Button size="sm" className="bg-green-600 hover:bg-green-700 w-full sm:w-auto">
                          Review Offer
                        </Button>
                      )}
                      {application.status === "Interview Scheduled" && (
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
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
  )
}
