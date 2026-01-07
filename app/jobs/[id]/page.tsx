"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { jobsService } from "@/lib/services/jobs.service"
import { Job } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, MapPin, DollarSign, Calendar, Building, Clock, ArrowLeft, Briefcase } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"

export default function JobDetailsPage() {
    const params = useParams()
    const router = useRouter()
    const { isAuthenticated } = useAuth()

    const [job, setJob] = useState<Job | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    const handleApply = () => {
        if (!isAuthenticated) {
            toast.error("Please log in to apply for this job")
            router.push(`/auth/signin?redirect=/jobs/${job?.id}/apply`)
            return
        }
        router.push(`/jobs/${job?.id}/apply`)
    }

    useEffect(() => {
        const fetchJob = async () => {
            // In Next.js App Router, params.id can be string or array. We expect string.
            const jobId = Array.isArray(params?.id) ? params.id[0] : params?.id

            if (!jobId) return

            try {
                setIsLoading(true)
                const response = await jobsService.getJobById(jobId)

                // Correctly unwrap the API response
                if (response.data) {
                    setJob(response.data)
                } else {
                    // Check for error in response
                    const errorMsg = response.error || "Failed to load job details"
                    console.error("Error fetching job:", errorMsg)
                    toast.error(errorMsg)
                    // Optional: redirect or show error state
                }
            } catch (error) {
                console.error("Failed to fetch job details:", error)
                toast.error("Failed to load job details")
            } finally {
                setIsLoading(false)
            }
        }

        fetchJob()
    }, [params, router])

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-8 text-white min-h-[50vh] flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
        )
    }

    if (!job) {
        return (
            <div className="container mx-auto px-4 py-8 text-white text-center">
                <h1 className="text-2xl font-bold mb-4">Job Not Found</h1>
                <Link href="/dashboard">
                    <Button variant="outline">Back to Dashboard</Button>
                </Link>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8 text-white max-w-4xl">
            <Button
                variant="ghost"
                className="mb-6 hover:bg-gray-800 text-gray-400 hover:text-white"
                onClick={() => router.back()}
            >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
            </Button>

            {/* Header Section */}
            <div className="bg-gray-800 rounded-xl p-8 mb-6 border border-gray-700">
                <div className="flex flex-col md:flex-row justify-between gap-6">
                    <div className="space-y-4">
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-2">{job.title}</h1>
                            <div className="flex items-center text-blue-400 font-medium">
                                <Building className="w-5 h-5 mr-2" />
                                {job.company}
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4 text-gray-300">
                            <div className="flex items-center bg-gray-700/50 px-3 py-1.5 rounded-lg">
                                <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                                {job.location}
                            </div>
                            <div className="flex items-center bg-gray-700/50 px-3 py-1.5 rounded-lg">
                                <Briefcase className="w-4 h-4 mr-2 text-gray-400" />
                                {job.job_type}
                            </div>
                            <div className="flex items-center bg-gray-700/50 px-3 py-1.5 rounded-lg">
                                {job.salary_range}
                            </div>
                            <div className="flex items-center bg-gray-700/50 px-3 py-1.5 rounded-lg">
                                <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                                Posted {new Date(job.created_at).toLocaleDateString()}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 min-w-[200px]">
                        <Button
                            className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6"
                            onClick={handleApply}
                            disabled={!job.is_active}
                        >
                            Apply Now
                        </Button>
                        <div className="flex justify-center">
                            <Badge variant={job.is_active ? "default" : "secondary"} className={job.is_active ? "bg-green-600" : "bg-yellow-600"}>
                                {job.is_active ? "Accepting Applications" : "Closed"}
                            </Badge>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="md:col-span-2 space-y-6">
                    <Card className="bg-gray-800 border-gray-700 text-white">
                        <CardHeader>
                            <CardTitle>Job Description</CardTitle>
                        </CardHeader>
                        <CardContent className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                            {job.description.split(/\\n|\n/).map((line, i) => {
                                const trimmed = line.trim();
                                if (trimmed.endsWith(':')) {
                                    return <p key={i} className="font-bold text-white mt-4 mb-2">{trimmed}</p>;
                                }
                                return <p key={i} className="mb-2">{trimmed}</p>;
                            })}
                        </CardContent>
                    </Card>

                    <Card className="bg-gray-800 border-gray-700 text-white">
                        <CardHeader>
                            <CardTitle>Requirements</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-3">
                                {job.requirements && job.requirements
                                    .flatMap(r => r.split(/\n|\\n/)) // Split by newline or escaped newline
                                    .map(r => r.trim()) // Trim whitespace
                                    .filter(r => r.length > 0) // Remove empty lines
                                    .map((req, index) => {
                                        // Remove leading bullet point if present
                                        const cleanReq = req.replace(/^[•\-\*]\s*/, "");
                                        return (
                                            <li key={index} className="flex items-start text-gray-300">
                                                <span className="w-2 h-2 mt-2 mr-3 bg-blue-500 rounded-full shrink-0" />
                                                <span>{cleanReq}</span>
                                            </li>
                                        );
                                    })}
                            </ul>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-6">
                    <Card className="bg-gray-800 border-gray-700 text-white">
                        <CardHeader>
                            <CardTitle className="text-lg">Job Overview</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <label className="text-sm text-gray-500 block mb-1">Applications</label>
                                <div className="font-medium text-lg">{job.applications_count || 0} Applicants</div>
                            </div>
                            <div className="h-px bg-gray-700 my-2" />
                            <div>
                                <label className="text-sm text-gray-500 block mb-1">Experience Level</label>
                                <div className="font-medium capitalization">{job.job_type}</div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
