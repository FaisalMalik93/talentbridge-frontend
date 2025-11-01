"use client"

import { useState } from "react"
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
  Bell,
  Settings,
  Plus,
  MessageSquare,
  FileText,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"

export default function CandidateInterviews() {
  const [viewMode, setViewMode] = useState("list")

  const interviews = [
    {
      id: 1,
      jobTitle: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      date: "2024-01-25",
      time: "2:00 PM",
      duration: "60 minutes",
      type: "Video Call",
      status: "Scheduled",
      interviewer: "Sarah Johnson",
      interviewerRole: "Engineering Manager",
      location: "Zoom Meeting",
      notes: "Technical interview focusing on React and system design",
      logo: "🚀",
      round: "Technical Round",
      preparation: ["Review React concepts", "Practice system design", "Prepare questions about the team"],
    },
    {
      id: 2,
      jobTitle: "UI/UX Designer",
      company: "DesignStudio",
      date: "2024-01-22",
      time: "10:00 AM",
      duration: "45 minutes",
      type: "Video Call",
      status: "Completed",
      interviewer: "Mike Chen",
      interviewerRole: "Design Director",
      location: "Google Meet",
      notes: "Portfolio review and design process discussion",
      logo: "🎨",
      round: "Portfolio Review",
      feedback: "Great portfolio presentation. Strong understanding of user-centered design principles.",
    },
    {
      id: 3,
      jobTitle: "Product Manager",
      company: "StartupXYZ",
      date: "2024-01-28",
      time: "3:30 PM",
      duration: "90 minutes",
      type: "In-Person",
      status: "Scheduled",
      interviewer: "Emily Rodriguez",
      interviewerRole: "VP of Product",
      location: "123 Startup Ave, San Francisco, CA",
      notes: "Final round interview with product case study",
      logo: "📊",
      round: "Final Round",
      preparation: [
        "Prepare product case study",
        "Research company's product strategy",
        "Practice behavioral questions",
      ],
    },
    {
      id: 4,
      jobTitle: "React Developer",
      company: "WebAgency",
      date: "2024-01-20",
      time: "11:00 AM",
      duration: "30 minutes",
      type: "Phone Call",
      status: "Completed",
      interviewer: "David Kim",
      interviewerRole: "Lead Developer",
      location: "Phone Interview",
      notes: "Initial screening call",
      logo: "💻",
      round: "Phone Screening",
      feedback: "Good technical knowledge. Moving to next round.",
    },
    {
      id: 5,
      jobTitle: "DevOps Engineer",
      company: "CloudTech",
      date: "2024-01-30",
      time: "1:00 PM",
      duration: "75 minutes",
      type: "Video Call",
      status: "Scheduled",
      interviewer: "Lisa Wang",
      interviewerRole: "DevOps Lead",
      location: "Microsoft Teams",
      notes: "Technical deep-dive on cloud infrastructure",
      logo: "☁️",
      round: "Technical Round",
      preparation: ["Review AWS services", "Practice Docker/Kubernetes concepts", "Prepare infrastructure examples"],
    },
  ]

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
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Schedule Interview
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
                {Math.round(
                  interviews.reduce((acc, i) => acc + Number.parseInt(i.duration.split(" ")[0]), 0) / interviews.length,
                )}
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
                          {interview.logo}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-xl font-semibold text-white">{interview.jobTitle}</h3>
                            <Badge className={getStatusColor(interview.status)}>{interview.status}</Badge>
                            <Badge variant="outline" className="text-blue-400 border-blue-400">
                              {interview.round}
                            </Badge>
                          </div>
                          <p className="text-blue-400 mb-3">{interview.company}</p>
                          <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2 text-gray-300">
                                <Calendar className="w-4 h-4" />
                                <span>{new Date(interview.date).toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center space-x-2 text-gray-300">
                                <Clock className="w-4 h-4" />
                                <span>
                                  {interview.time} ({interview.duration})
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
                                <span>{interview.interviewer}</span>
                              </div>
                              <p className="text-gray-400 text-sm">{interview.interviewerRole}</p>
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

                    {interview.preparation && (
                      <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4 mb-4">
                        <h4 className="font-medium text-blue-300 mb-2">Preparation Checklist</h4>
                        <ul className="space-y-1">
                          {interview.preparation.map((item, index) => (
                            <li key={index} className="flex items-center space-x-2 text-sm text-gray-300">
                              <div className="w-2 h-2 bg-blue-400 rounded-full" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
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
                          {interview.logo}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-xl font-semibold text-white">{interview.jobTitle}</h3>
                            <Badge className="bg-green-600">Completed</Badge>
                            <Badge variant="outline" className="text-blue-400 border-blue-400">
                              {interview.round}
                            </Badge>
                          </div>
                          <p className="text-blue-400 mb-3">{interview.company}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-400">
                            <span className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {new Date(interview.date).toLocaleDateString()}
                            </span>
                            <span className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {interview.time}
                            </span>
                            <span className="flex items-center">
                              <User className="w-4 h-4 mr-1" />
                              {interview.interviewer}
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
                          {interview.logo}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-xl font-semibold text-white">{interview.jobTitle}</h3>
                            <Badge className={getStatusColor(interview.status)}>{interview.status}</Badge>
                          </div>
                          <p className="text-blue-400 mb-2">{interview.company}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-400">
                            <span className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {new Date(interview.date).toLocaleDateString()}
                            </span>
                            <span className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {interview.time}
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
            </CardContent>
          </Card>
        )}
      </div>
  )
}
