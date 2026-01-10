"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Search, Filter, Download, MessageSquare, Eye, Briefcase, Calendar, User } from "lucide-react"
import { toast } from "sonner"
import { jobsService } from "@/lib/services/jobs.service"
import Link from "next/link"
import { candidatesService } from "@/lib/services/candidates.service"
import { interviewsService } from "@/lib/services/interviews.service"

interface Application {
    id: string
    jobId: string
    jobTitle: string
    candidateId: string
    candidateName: string
    candidateEmail: string
    appliedDate: string
    status: string
    matchScore: number
    cvFilename: string
    cvId: string
}

export default function AppliedCandidatesPage() {
    const [applications, setApplications] = useState<Application[]>([])
    const [filteredApplications, setFilteredApplications] = useState<Application[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [jobFilter, setJobFilter] = useState("all")

    useEffect(() => {
        fetchApplications()
    }, [])

    useEffect(() => {
        filterApplications()
    }, [searchQuery, statusFilter, jobFilter, applications])

    const fetchApplications = async () => {
        try {
            setLoading(true)
            const response = await jobsService.getReceivedApplications()
            if (response.data) {
                setApplications(response.data)
            } else if (response.error) {
                toast.error(response.error)
            }
        } catch (error) {
            toast.error("Failed to fetch applications")
        } finally {
            setLoading(false)
        }
    }

    const filterApplications = () => {
        let filtered = [...applications]

        if (searchQuery) {
            const query = searchQuery.toLowerCase()
            filtered = filtered.filter(app =>
                app.candidateName.toLowerCase().includes(query) ||
                app.jobTitle.toLowerCase().includes(query)
            )
        }

        if (statusFilter !== "all") {
            filtered = filtered.filter(app => app.status === statusFilter)
        }

        if (jobFilter !== "all") {
            filtered = filtered.filter(app => app.jobTitle === jobFilter)
        }

        setFilteredApplications(filtered)
    }

    const handleDownloadCV = async (app: Application) => {
        try {
            toast.info("Downloading CV...")
            // Re-using the download logic from candidates service if possible or implementing direct download
            // Since we have candidate ID, we can fetch detailed profile which includes CV text
            // Or we can assume we might need a dedicated download endpoint if it's a file.
            // For now, let's try to get profile content as text as per existing pattern
            const response = await candidatesService.getCandidateById(app.candidateId)

            if (response.data?.candidate?.cv_text) {
                const element = document.createElement("a");
                const file = new Blob([response.data.candidate.cv_text], { type: 'text/plain' });
                element.href = URL.createObjectURL(file);
                element.download = `${app.candidateName.replace(/\s+/g, '_')}_CV.txt`;
                document.body.appendChild(element);
                element.click();
                document.body.removeChild(element);
                toast.success("CV downloaded")
            } else {
                toast.error("CV content unavailable")
            }
        } catch (error) {
            toast.error("Failed to download CV")
        }
    }

    // Get unique job titles for filter
    const uniqueJobs = Array.from(new Set(applications.map(app => app.jobTitle)))

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
            case 'reviewed': return 'bg-blue-500/10 text-blue-500 border-blue-500/20'
            case 'shortlisted': return 'bg-green-500/10 text-green-500 border-green-500/20'
            case 'rejected': return 'bg-red-500/10 text-red-500 border-red-500/20'
            case 'interview_scheduled': return 'bg-purple-500/10 text-purple-500 border-purple-500/20'
            default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20'
        }
    }

    const [selectedInterviewApp, setSelectedInterviewApp] = useState<Application | null>(null)
    const [isInterviewOpen, setIsInterviewOpen] = useState(false)
    const [interviewLoading, setInterviewLoading] = useState(false)
    const [interviewDate, setInterviewDate] = useState("")
    const [interviewTime, setInterviewTime] = useState("")

    const openInterviewDialog = (app: Application) => {
        setSelectedInterviewApp(app)
        setIsInterviewOpen(true)
        // Preset some values
        setInterviewDate(new Date().toISOString().split('T')[0])
        setInterviewTime("10:00")
    }

    const handleScheduleInterview = async () => {
        if (!selectedInterviewApp || !interviewDate || !interviewTime) {
            toast.error("Please select date and time")
            return
        }

        setInterviewLoading(true)
        try {
            // Combine date and time
            const dateTime = new Date(`${interviewDate}T${interviewTime}:00`)

            await interviewsService.scheduleInterview({
                application_id: selectedInterviewApp.id,
                job_id: selectedInterviewApp.jobId,
                company_name: "My Company", // Ideally fetched from profile
                job_title: selectedInterviewApp.jobTitle,
                date: dateTime.toISOString(),
                duration_minutes: 60,
                type: "Video Call",
                interviewer_name: "Hiring Manager", // Placeholder or from profile
                interviewer_role: "Interviewer",
                location: "Online",
                notes: "Scheduled from Applied Candidates page",
                round: "First Round"
            })

            toast.success("Interview scheduled successfully")
            setIsInterviewOpen(false)
            // Refresh list to update status
            fetchApplications()
        } catch (error) {
            toast.error("Failed to schedule interview")
            console.error(error)
        } finally {
            setInterviewLoading(false)
        }
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Applied Candidates</h1>
                    <p className="text-gray-400">Manage and review applications for your job postings</p>
                </div>
                <div className="flex gap-2">
                    <Link href="/dashboard">
                        <Button variant="outline">Back to Dashboard</Button>
                    </Link>
                </div>
            </div>

            {/* Filters */}
            <Card className="bg-gray-800 border-gray-700 mb-8">
                <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <Input
                                placeholder="Search candidates or jobs..."
                                className="pl-10 bg-gray-900 border-gray-700"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-full md:w-48 bg-gray-900 border-gray-700">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Statuses</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="reviewed">Reviewed</SelectItem>
                                <SelectItem value="shortlisted">Shortlisted</SelectItem>
                                <SelectItem value="interview_scheduled">Interview Scheduled</SelectItem>
                                <SelectItem value="rejected">Rejected</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={jobFilter} onValueChange={setJobFilter}>
                            <SelectTrigger className="w-full md:w-64 bg-gray-900 border-gray-700">
                                <SelectValue placeholder="Filter by Job" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Jobs</SelectItem>
                                {uniqueJobs.map(job => (
                                    <SelectItem key={job} value={job}>{job}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            {/* Applications List */}
            {loading ? (
                <div className="flex justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                </div>
            ) : filteredApplications.length === 0 ? (
                <div className="text-center py-12 text-gray-400 bg-gray-800/50 rounded-lg border border-gray-700">
                    <User className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <h3 className="text-lg font-medium text-white mb-2">No Applications Found</h3>
                    <p>You haven't received any applications matching your filters yet.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredApplications.map((app) => (
                        <Card key={app.id} className="bg-gray-800 border-gray-700 hover:border-gray-600 transition-colors">
                            <CardContent className="p-6">
                                <div className="flex flex-col lg:flex-row justify-between gap-6">
                                    {/* Candidate Info */}
                                    <div className="flex items-start gap-4 flex-1">
                                        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-xl font-bold text-white shrink-0">
                                            {app.candidateName.charAt(0)}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-white mb-1">{app.candidateName}</h3>
                                            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-400 mb-2">
                                                <span className="flex items-center">
                                                    <Briefcase className="w-4 h-4 mr-1" />
                                                    Applied for: <span className="text-blue-400 ml-1">{app.jobTitle}</span>
                                                </span>
                                                <span className="flex items-center">
                                                    <Calendar className="w-4 h-4 mr-1" />
                                                    {new Date(app.appliedDate).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <Badge variant="outline" className={getStatusColor(app.status)}>
                                                {app.status.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                                            </Badge>
                                        </div>
                                    </div>

                                    {/* Match Score */}
                                    <div className="flex items-center gap-4 lg:border-l lg:border-r border-gray-700 lg:px-8 shrink-0">
                                        <div className="text-right">
                                            <div className="text-2xl font-bold text-green-400">{Math.round(app.matchScore)}%</div>
                                            <div className="text-xs text-gray-400">AI Match Score</div>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex flex-wrap items-center gap-2 shrink-0">
                                        <Link href={`/candidates/${app.candidateId}`}>
                                            <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                                                <Eye className="w-4 h-4 mr-2" />
                                                Profile
                                            </Button>
                                        </Link>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-gray-300 hover:text-white"
                                            onClick={() => handleDownloadCV(app)}
                                        >
                                            <Download className="w-4 h-4 mr-2" />
                                            CV
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => window.location.href = `mailto:${app.candidateEmail}`}
                                        >
                                            <MessageSquare className="w-4 h-4 mr-2" />
                                            Message
                                        </Button>
                                        {app.status !== 'interview_scheduled' && (
                                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={() => openInterviewDialog(app)}>
                                                Select for Interview
                                            </Button>
                                        )}
                                        {app.status === 'interview_scheduled' && (
                                            <Button size="sm" variant="outline" className="text-green-400 border-green-400 hover:text-green-300" disabled>
                                                Interview Scheduled
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            {/* Interview Dialog */}
            {isInterviewOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <Card className="bg-gray-900 border-gray-700 w-full max-w-md mx-4">
                        <CardHeader>
                            <CardTitle className="text-white">Schedule Interview</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <p className="text-sm text-gray-400 mb-4">
                                    Schedule an interview with <span className="text-white font-medium">{selectedInterviewApp?.candidateName}</span> for <span className="text-blue-400">{selectedInterviewApp?.jobTitle}</span>.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400">Date</label>
                                <Input
                                    type="date"
                                    className="bg-gray-800 border-gray-700 text-white"
                                    value={interviewDate}
                                    onChange={(e) => setInterviewDate(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400">Time</label>
                                <Input
                                    type="time"
                                    className="bg-gray-800 border-gray-700 text-white"
                                    value={interviewTime}
                                    onChange={(e) => setInterviewTime(e.target.value)}
                                />
                            </div>
                            <div className="flex gap-2 justify-end mt-6">
                                <Button variant="ghost" onClick={() => setIsInterviewOpen(false)} className="text-gray-400 hover:text-white">
                                    Cancel
                                </Button>
                                <Button
                                    className="bg-blue-600 hover:bg-blue-700"
                                    onClick={handleScheduleInterview}
                                    disabled={interviewLoading}
                                >
                                    {interviewLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Confirm Schedule"}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    )
}
