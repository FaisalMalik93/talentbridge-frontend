"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  User,
  Briefcase,
  Eye,
  Heart,
  Calendar,
  TrendingUp,
  FileText,
  Bell,
  Settings,
  Upload,
  Star,
  MapPin,
  Clock,
  DollarSign,
} from "lucide-react"
import Link from "next/link"
import { authService } from "@/lib/services/auth.service"
import type { User as UserType } from "@/lib/types"
import { jobsService } from "@/lib/services/jobs.service"
import interviewsService from "@/lib/services/interviews.service"
import { toast } from "sonner"

export default function CandidateDashboard() {
  const [currentUser, setCurrentUser] = useState<UserType | null>(null)
  const [profileCompletion] = useState(75)
  const [recentApplications, setRecentApplications] = useState<any[]>([])

  const [upcomingInterviews, setUpcomingInterviews] = useState<any[]>([])
  const [recommendedJobs, setRecommendedJobs] = useState<any[]>([])

  useEffect(() => {
    const user = authService.getUser()
    setCurrentUser(user)

    const fetchDashboardData = async () => {
      try {
        const appsRes = await jobsService.getMyApplications()
        if (appsRes.data) {
          setRecentApplications(appsRes.data)
        }

        const interviewsRes = await interviewsService.getMyInterviews()
        if (interviewsRes.data) {
          const upcoming = interviewsRes.data.filter((i: any) => i.status === 'Scheduled')
          setUpcomingInterviews(upcoming)
        }

        const recommendedRes = await jobsService.getRecommendedJobs()
        if (recommendedRes.data) {
          setRecommendedJobs(recommendedRes.data)
        }

      } catch (error) {
        console.error("Failed to fetch dashboard data:", error)
      }
    }

    if (user) {
      fetchDashboardData()
    }
  }, [])

  // Calculate real stats
  const stats = [
    {
      title: "Applications Sent",
      value: recentApplications.length.toString(),
      change: recentApplications.length > 0 ? "Active" : "None",
      icon: Briefcase,
      color: "text-blue-400",
    },
    {
      title: "Interview Invites",
      value: upcomingInterviews.length.toString(),
      change: upcomingInterviews.length > 0 ? "Action Required" : "None",
      icon: Calendar,
      color: "text-yellow-400",
    },
    {
      title: "Saved Jobs",
      value: "0", // Placeholder until saved jobs API is ready
      change: "-",
      icon: Heart,
      color: "text-red-400",
    },
    {
      title: "Profile Views", // Placeholder
      value: "0",
      change: "-",
      icon: Eye,
      color: "text-purple-400"
    }
  ]



  const getStatusColor = (status: string) => {
    switch (status) {
      case "Under Review":
        return "bg-yellow-600"
      case "Interview Scheduled":
        return "bg-blue-600"
      case "Rejected":
        return "bg-red-600"
      case "Accepted":
        return "bg-green-600"
      default:
        return "bg-gray-600"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 text-white">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Welcome, {currentUser?.full_name || 'User'}!
        </h1>
        <p className="text-gray-400">Here's what's happening with your job search</p>
      </div>

      {/* Profile Completion Alert */}
      <Card className="bg-blue-600/10 border-blue-600/50 mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-4 w-full md:w-auto">
              <div className="w-12 h-12 bg-blue-600/20 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Complete Your Profile</h3>
                <p className="text-blue-300">Your profile is {profileCompletion}% complete</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 w-full md:w-auto justify-between md:justify-end">
              <Progress value={profileCompletion} className="w-full md:w-32" />
              <Link href="/candidate/profile">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 whitespace-nowrap">
                  Complete Profile
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-gray-800 border-gray-700">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between mb-4">
                <stat.icon className={`w-6 h-6 md:w-8 md:h-8 ${stat.color}`} />
                <span className="text-xs md:text-sm text-green-400 font-semibold">{stat.change}</span>
              </div>
              <div className="text-xl md:text-2xl font-bold text-white mb-1">{stat.value}</div>
              <p className="text-gray-400 text-xs md:text-sm">{stat.title}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Recent Applications */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Recent Applications
                <Link href="/candidate/applications">
                  <Button variant="outline" size="sm" className="border-gray-600 text-black hover:bg-gray-700">
                    View All
                  </Button>
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentApplications.map((application) => (
                  <div key={application.id} className="border border-gray-700 rounded-lg p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center text-lg flex-shrink-0">
                          {application.logo}
                        </div>
                        <div>
                          <h3 className="font-semibold text-white line-clamp-1">{application.jobTitle}</h3>
                          <p className="text-blue-400 text-sm">{application.company}</p>
                        </div>
                      </div>
                      <Badge className={`${getStatusColor(application.status)} w-fit`}>{application.status}</Badge>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-y-2 text-sm text-gray-400">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {application.location}
                        </span>
                        <span className="flex items-center">
                          {application.salary}
                        </span>
                      </div>
                      <span className="text-xs sm:text-sm">Applied {new Date(application.appliedDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recommended Jobs */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Recommended for You
                <Link href="/jobs">
                  <Button variant="outline" size="sm" className="border-gray-600 text-black hover:bg-gray-700">
                    View All Jobs
                  </Button>
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recommendedJobs.map((job) => (
                  <div key={job.id} className="border border-gray-700 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3 gap-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center text-lg flex-shrink-0">
                          {job.logo}
                        </div>
                        <div>
                          <h3 className="font-semibold text-white line-clamp-1">{job.title}</h3>
                          <p className="text-blue-400 text-sm">{job.company}</p>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="flex items-center justify-end space-x-1 mb-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-semibold text-green-400">{job.matchScore}% match</span>
                        </div>
                        <p className="text-xs text-gray-400">{job.postedDate}</p>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <span className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {job.location}
                        </span>
                        <span className="flex items-center">
                          {job.salary}
                        </span>
                      </div>
                      <div className="flex space-x-2 w-full sm:w-auto">
                        <Button variant="outline" size="sm" className="border-gray-600 text-black hover:bg-gray-700 flex-1 sm:flex-none">
                          <Heart className="w-4 h-4" />
                        </Button>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 flex-1 sm:flex-none">
                          Apply Now
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Quick Actions */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/cv-analysis" className="w-full">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload New CV
                </Button>
              </Link>
              <Link href="/cv-analysis" className="w-full">
                <Button variant="outline" className="w-full border-gray-600 text-black hover:bg-gray-700">
                  <FileText className="w-4 h-4 mr-2" />
                  Analyze CV
                </Button>
              </Link>
              <Link href="/candidate/profile" className="w-full">
                <Button variant="outline" className="w-full border-gray-600 text-black hover:bg-gray-700">
                  <User className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </Link>
              <Link href="/candidate/saved-jobs" className="w-full">
                <Button variant="outline" className="w-full border-gray-600 text-black hover:bg-gray-700">
                  <Briefcase className="w-4 h-4 mr-2" />
                  Job Preferences
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Upcoming Interviews */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>Upcoming Interviews</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {upcomingInterviews.length > 0 ? (
                <div className="space-y-4">
                  {upcomingInterviews.map((interview) => (
                    <div key={interview.id} className="border border-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-white">{interview.job_title}</h3>
                        <Badge variant="outline" className="text-blue-400 border-blue-400">
                          {interview.type}
                        </Badge>
                      </div>
                      <p className="text-blue-400 text-sm mb-2">{interview.company_name}</p>
                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(interview.date).toLocaleDateString()}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {new Date(interview.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">Interviewer: {interview.interviewer_name}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400">No upcoming interviews</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Job Search Tips */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span>Job Search Tips</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-blue-600/10 border border-blue-600/20 rounded-lg">
                  <h4 className="font-medium text-blue-300 mb-1">Optimize Your Profile</h4>
                  <p className="text-sm text-gray-300">Complete profiles get 40% more views from recruiters</p>
                </div>
                <div className="p-3 bg-green-600/10 border border-green-600/20 rounded-lg">
                  <h4 className="font-medium text-green-300 mb-1">Update Your Skills</h4>
                  <p className="text-sm text-gray-300">Add trending skills to match more job opportunities</p>
                </div>
                <div className="p-3 bg-purple-600/10 border border-purple-600/20 rounded-lg">
                  <h4 className="font-medium text-purple-300 mb-1">Set Job Alerts</h4>
                  <p className="text-sm text-gray-300">Get notified when new jobs match your preferences</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
