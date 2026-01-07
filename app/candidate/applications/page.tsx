"use client"

import { useState, useEffect } from "react"
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
  Building,
  Clock,
  Eye,
  MessageSquare,
  Download,
  Trash2,
  Loader2,
} from "lucide-react"
import Link from "next/link"
import { jobsService } from "@/lib/services/jobs.service"
import { toast } from "sonner"

export default function CandidateApplications() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [applications, setApplications] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await jobsService.getMyApplications()
        if (response.data) {
          // Determine application status message based on status code
          const mappedApps = response.data.map(app => ({
            ...app,
            description: "Job Description not available", // Placeholder as backend join might be simple
            jobType: "Full-time", // Placeholder
            lastUpdate: app.appliedDate,
            applicationStatus: getStatusMessage(app.status)
          }))
          setApplications(mappedApps)
        }
      } catch (error) {
        console.error("Failed to fetch applications:", error)
        toast.error("Failed to load applications")
      } finally {
        setIsLoading(false)
      }
    }

    fetchApplications()
  }, [])

  const getStatusMessage = (status: string) => {
    switch (status) {
      case 'pending': return "Application submitted and under review by hiring team";
      case 'reviewed': return "Your application has been reviewed";
      case 'rejected': return "Thank you for your interest. We've decided to move forward with other candidates.";
      case 'shortlisted': return "Congratulations! You have been shortlisted.";
      default: return "Application status update pending";
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
      case "Under Review":
        return "bg-yellow-600"
      case "Interview Scheduled":
      case "shortlisted":
        return "bg-blue-600"
      case "Rejected":
      case "rejected":
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
    // Map frontend conceptual status to backend status if needed, or just match exact strings
    // Backend uses: pending, reviewed, rejected, shortlisted
    return applications.filter((app) => app.status === status).length
  }

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      (app.jobTitle?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (app.company?.toLowerCase() || "").includes(searchTerm.toLowerCase())

    // Simple filter logic - for real usage might need mapping
    const matchesStatus = statusFilter === "all" || app.status === statusFilter
    return matchesSearch && matchesStatus
  })

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
          {/* 
            Simplified Filter for now as status codes might differ. 
            Ideally should map backend status codes to these options 
          */}
        </div>
      </div>

      {/* Applications List */}
      <div className="space-y-6">
        {filteredApplications.length > 0 ? filteredApplications.map((application) => (
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

                    <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-sm text-gray-400">
                      <span className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {application.location}
                      </span>
                      <span className="flex items-center">
                        {/* Removed DollarSign icon as requested */}
                        {application.salary}
                      </span>
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        Applied {new Date(application.appliedDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-left md:text-right pl-16 md:pl-0">
                  <p className="text-sm text-gray-400 mb-1">Applied Date</p>
                  <p className="text-sm text-white">{new Date(application.appliedDate).toLocaleDateString()}</p>
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
                  <Link href={`/jobs/${application.jobId}`} className="flex-1 sm:flex-none">
                    <Button variant="outline" size="sm" className="border-gray-600 text-black hover:bg-gray-700 w-full">
                      <Eye className="w-4 h-4 mr-1" />
                      View Job
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        )) : (
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-12 text-center">
              <Building className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No applications found</h3>
              <p className="text-gray-400 mb-6">
                Start applying to jobs to see them here
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
