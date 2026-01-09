"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Calendar,
  Clock,
  Video,
  Phone,
  MapPin,
  User,
  Plus,
  MessageSquare,
  FileText,
  CheckCircle,
  Loader2,
} from "lucide-react"
import Link from "next/link"
import interviewsService, { Interview } from "@/lib/services/interviews.service"
import { toast } from "sonner"

export default function CandidateInterviews() {
  const [viewMode, setViewMode] = useState("list")
  const [interviews, setInterviews] = useState<Interview[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchInterviews()
  }, [])

  const fetchInterviews = async () => {
    try {
      const response = await interviewsService.getMyInterviews()
      if (response.data) {
        setInterviews(response.data)
      }
    } catch (error) {
      console.error("Failed to fetch interviews", error)
      toast.error("Failed to load interviews")
    } finally {
      setLoading(false)
    }
  }

  const scheduleMockInterview = async () => {
    try {
      await interviewsService.simulateInterview()
      toast.success("Mock interview scheduled (Employer approval simulated)")
      fetchInterviews()
    } catch (error) {
      toast.error("Failed to schedule mock interview")
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Scheduled":
        return "bg-blue-600"
      case "Completed":
        return "bg-green-600"
      case "Cancelled":
        return "bg-red-600"
      case "Rescheduled":
        return "bg-yellow-600"
      default:
        return "bg-gray-600"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Video Call":
        return <Video className="w-4 h-4" />
      case "Phone Call":
        return <Phone className="w-4 h-4" />
      case "In-Person":
        return <MapPin className="w-4 h-4" />
      default:
        return <Calendar className="w-4 h-4" />
    }
  }

  const upcomingInterviews = interviews.filter((interview) => interview.status === "Scheduled")
  const completedInterviews = interviews.filter((interview) => interview.status === "Completed")

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 text-white">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Interviews</h1>
          <p className="text-gray-400">Manage your interview schedule and preparation</p>
        </div>
        <div className="flex items-center space-x-4">
          <Select value={viewMode} onValueChange={setViewMode}>
            <SelectTrigger className="w-32 bg-gray-800 border-gray-700">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="list">List View</SelectItem>
              <SelectItem value="calendar">Calendar</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={scheduleMockInterview}>
            <Plus className="w-4 h-4 mr-2" />
            Schedule Mock
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6 text-center">
            <Calendar className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{upcomingInterviews.length}</div>
            <p className="text-gray-400 text-sm">Upcoming</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6 text-center">
            <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{completedInterviews.length}</div>
            <p className="text-gray-400 text-sm">Completed</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6 text-center">
            <Video className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">
              {interviews.filter((i) => i.type === "Video Call").length}
            </div>
            <p className="text-gray-400 text-sm">Video Calls</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6 text-center">
            <Clock className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">
              {interviews.length > 0 ? Math.round(
                interviews.reduce((acc, i) => acc + i.duration_minutes, 0) / interviews.length,
              ) : 0}
              min
            </div>
            <p className="text-gray-400 text-sm">Avg Duration</p>
          </CardContent>
        </Card>
      </div>

      {/* Interview Tabs */}
      <Tabs defaultValue="upcoming" className="space-y-6">
        <TabsList className="bg-gray-800 border-gray-700">
          <TabsTrigger value="upcoming" className="data-[state=active]:bg-blue-600">
            Upcoming ({upcomingInterviews.length})
          </TabsTrigger>
          <TabsTrigger value="completed" className="data-[state=active]:bg-blue-600">
            Completed ({completedInterviews.length})
          </TabsTrigger>
          <TabsTrigger value="all" className="data-[state=active]:bg-blue-600">
            All Interviews ({interviews.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          <div className="space-y-6">
            {upcomingInterviews.map((interview) => (
              <Card key={interview.id} className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center text-2xl">
                        {(interview.company_name || "C")[0]}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-semibold text-white">{interview.job_title}</h3>
                          <Badge className={getStatusColor(interview.status)}>{interview.status}</Badge>
                          <Badge variant="outline" className="text-blue-400 border-blue-400">
                            {interview.round}
                          </Badge>
                        </div>
                        <p className="text-blue-400 mb-3">{interview.company_name}</p>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2 text-gray-300">
                              <Calendar className="w-4 h-4" />
                              <span>{new Date(interview.date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-gray-300">
                              <Clock className="w-4 h-4" />
                              <span>
                                {new Date(interview.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} ({interview.duration_minutes} min)
                              </span>
                            </div>
                            <div className="flex items-center space-x-2 text-gray-300">
                              {getTypeIcon(interview.type)}
                              <span>{interview.location}</span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2 text-gray-300">
                              <User className="w-4 h-4" />
                              <span>{interview.interviewer_name}</span>
                            </div>
                            <p className="text-gray-400 text-sm">{interview.interviewer_role}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-400 mb-2">
                        {Math.ceil(
                          (new Date(interview.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
                        )}{" "}
                        days away
                      </p>
                    </div>
                  </div>

                  {interview.notes && (
                    <div className="bg-gray-700/50 rounded-lg p-4 mb-4">
                      <h4 className="font-medium text-white mb-2">Interview Notes</h4>
                      <p className="text-gray-300 text-sm">{interview.notes}</p>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs border-gray-600 text-gray-300">
                        {interview.type}
                      </Badge>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="border-gray-600 text-black hover:bg-gray-700">
                        <MessageSquare className="w-4 h-4 mr-1" />
                        Message
                      </Button>
                      <Button variant="outline" size="sm" className="border-gray-600 text-black hover:bg-gray-700">
                        <FileText className="w-4 h-4 mr-1" />
                        Prepare
                      </Button>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        Join Interview
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed">
          <div className="space-y-6">
            {completedInterviews.map((interview) => (
              <Card key={interview.id} className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center text-2xl">
                        {(interview.company_name || "C")[0]}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-semibold text-white">{interview.job_title}</h3>
                          <Badge className="bg-green-600">Completed</Badge>
                          <Badge variant="outline" className="text-blue-400 border-blue-400">
                            {interview.round}
                          </Badge>
                        </div>
                        <p className="text-blue-400 mb-3">{interview.company_name}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(interview.date).toLocaleDateString()}
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {new Date(interview.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                          <span className="flex items-center">
                            <User className="w-4 h-4 mr-1" />
                            {interview.interviewer_name}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {interview.feedback && (
                    <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4 mb-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <h4 className="font-medium text-green-300">Interview Feedback</h4>
                      </div>
                      <p className="text-gray-300 text-sm">{interview.feedback}</p>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs border-gray-600 text-gray-300">
                        {interview.type}
                      </Badge>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="border-gray-600 text-black hover:bg-gray-700">
                        <FileText className="w-4 h-4 mr-1" />
                        View Notes
                      </Button>
                      <Button variant="outline" size="sm" className="border-gray-600 text-black hover:bg-gray-700">
                        <MessageSquare className="w-4 h-4 mr-1" />
                        Follow Up
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="all">
          <div className="space-y-6">
            {interviews.map((interview) => (
              <Card key={interview.id} className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center text-2xl">
                        {(interview.company_name || "C")[0]}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-semibold text-white">{interview.job_title}</h3>
                          <Badge className={getStatusColor(interview.status)}>{interview.status}</Badge>
                        </div>
                        <p className="text-blue-400 mb-2">{interview.company_name}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(interview.date).toLocaleDateString()}
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {interview.duration_minutes} min
                          </span>
                          <span className="flex items-center">
                            {getTypeIcon(interview.type)}
                            <span className="ml-1">{interview.type}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Empty State */}
      {interviews.length === 0 && (
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-12 text-center">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No interviews scheduled</h3>
            <p className="text-gray-400 mb-6">Start applying to jobs to get interview invitations</p>
            <Link href="/jobs">
              <Button className="bg-blue-600 hover:bg-blue-700">Browse Jobs</Button>
            </Link>
            <div className="mt-4">
              {/* Optional: Mock schedule button even in empty state for first-time use */}
              <Button variant="outline" className="text-blue-400 border-blue-400 hover:bg-blue-900/20" onClick={scheduleMockInterview}>
                Test: Schedule Data
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
