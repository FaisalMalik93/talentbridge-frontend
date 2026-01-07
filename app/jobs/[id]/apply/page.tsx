"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { jobsService } from "@/lib/services/jobs.service"
import { cvService } from "@/lib/services/cv.service"
import { Job, CVResponse } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Loader2, ArrowLeft, Upload, FileText, CheckCircle } from "lucide-react"
import { toast } from "sonner"
import { useAuth } from "@/contexts/auth-context"

export default function JobApplicationPage() {
    const params = useParams()
    const router = useRouter()
    const { user, isAuthenticated, isLoading: isAuthLoading } = useAuth()

    const [job, setJob] = useState<Job | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Application Form State
    const [coverLetter, setCoverLetter] = useState("")
    const [selectedCvId, setSelectedCvId] = useState<string>("")
    const [userCvs, setUserCvs] = useState<CVResponse[]>([])
    const [uploadMode, setUploadMode] = useState<"existing" | "new">("existing")
    const [newCvFile, setNewCvFile] = useState<File | null>(null)

    // Fetch Job and User CVs
    useEffect(() => {
        const initData = async () => {
            // In Next.js App Router, params.id can be string or array. We expect string.
            const jobId = Array.isArray(params?.id) ? params.id[0] : params?.id

            if (!jobId) return

            try {
                setIsLoading(true)
                const [jobRes, cvsRes] = await Promise.all([
                    jobsService.getJobById(jobId),
                    cvService.getMyCVs() // Assuming this service exists
                ])

                if (jobRes.data) {
                    setJob(jobRes.data)
                } else {
                    toast.error(jobRes.error || "Failed to load job details")
                    router.push("/jobs")
                    return
                }

                // Handle user CVs if logged in (which they should be)
                if (Array.isArray(cvsRes)) {
                    setUserCvs(cvsRes)
                    if (cvsRes.length > 0) {
                        setSelectedCvId(cvsRes[0].id)
                    } else {
                        setUploadMode("new")
                    }
                }

            } catch (error) {
                console.error("Failed to load application data:", error)
                toast.error("Failed to load application data")
            } finally {
                setIsLoading(false)
            }
        }

        if (!isAuthLoading) {
            if (!isAuthenticated) {
                toast.error("Please log in to apply")
                router.push(`/auth/signin?redirect=/jobs/${params?.id}/apply`)
                return
            }
            initData()
        }
    }, [params, router, isAuthenticated, isAuthLoading])


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            if (file.size > 5 * 1024 * 1024) {
                toast.error("File size must be less than 5MB")
                return
            }
            if (!['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)) {
                toast.error("Only PDF and DOCX files are supported")
                return
            }
            setNewCvFile(file)
        }
    }

    useEffect(() => {
        const checkEligibility = async () => {
            if (!job) return;

            // Check if already applied
            try {
                const statusRes = await jobsService.getApplicationStatus(job.id)
                if (statusRes.data?.has_applied) {
                    toast.error("You have already applied for this job")
                    router.push(`/jobs/${job.id}`)
                    return
                }
            } catch (error) {
                console.error("Failed to check status:", error)
            }
        }

        if (isAuthenticated && job) {
            checkEligibility()
        }
    }, [isAuthenticated, job, router])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!job) return

        if (uploadMode === "new" && !newCvFile) {
            toast.error("Please upload a CV")
            return
        }
        if (uploadMode === "existing" && !selectedCvId) {
            toast.error("Please select a CV")
            return
        }

        try {
            setIsSubmitting(true)

            // If uploading new CV, first analyze/upload it
            let cvIdToUse = selectedCvId
            if (uploadMode === "new" && newCvFile) {
                const uploadRes = await cvService.analyzeCV(newCvFile)
                if (uploadRes.data && uploadRes.data.id) {
                    cvIdToUse = uploadRes.data.id
                } else {
                    throw new Error("Failed to upload CV")
                }
            }

            // Submit Application
            const response = await jobsService.applyForJob(job.id, {
                cv_id: cvIdToUse,
                cover_letter: coverLetter
            })

            if (response.data?.success) {
                toast.success("Application submitted successfully!")
                // Force a small delay or invalidate cache if using React Query (not here though)
                router.push("/candidate/dashboard")
            } else {
                toast.error(response.error || "Failed to submit application")
            }

        } catch (error) {
            console.error("Application submission failed:", error)
            toast.error("Failed to submit application. Please try again.")
        } finally {
            setIsSubmitting(false)
        }
    }

    if (isAuthLoading || isLoading) {
        return (
            <div className="container mx-auto px-4 py-8 text-white min-h-[50vh] flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
        )
    }

    if (!job) return null

    return (
        <div className="container mx-auto px-4 py-8 text-white max-w-3xl">
            <Button
                variant="ghost"
                className="mb-6 hover:bg-gray-800 text-gray-400 hover:text-white"
                onClick={() => router.back()}
            >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Job Details
            </Button>

            <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                    <CardTitle className="text-2xl text-white">Apply for {job.title}</CardTitle>
                    <CardDescription className="text-gray-400">
                        {job.company} • {job.location}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-8">

                        {/* CV Selection Section */}
                        <div className="space-y-4">
                            <Label className="text-lg font-semibold text-white">Resume / CV</Label>

                            <RadioGroup
                                value={uploadMode}
                                onValueChange={(v) => setUploadMode(v as "existing" | "new")}
                                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                            >
                                <div className={`border rounded-lg p-4 cursor-pointer transition-colors ${uploadMode === 'existing' ? 'border-blue-500 bg-blue-500/10' : 'border-gray-600 hover:border-gray-500'}`}>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="existing" id="existing" disabled={userCvs.length === 0} />
                                        <Label htmlFor="existing" className="cursor-pointer text-white">Select Existing CV</Label>
                                    </div>
                                    <p className="text-sm text-gray-400 mt-2 ml-6">
                                        Choose from your previously uploaded resumes
                                    </p>
                                </div>
                                <div className={`border rounded-lg p-4 cursor-pointer transition-colors ${uploadMode === 'new' ? 'border-blue-500 bg-blue-500/10' : 'border-gray-600 hover:border-gray-500'}`}>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="new" id="new" />
                                        <Label htmlFor="new" className="cursor-pointer text-white">Upload New CV</Label>
                                    </div>
                                    <p className="text-sm text-gray-400 mt-2 ml-6">
                                        Upload a new PDF or DOCX file
                                    </p>
                                </div>
                            </RadioGroup>

                            {uploadMode === "existing" && (
                                <div className="mt-4 pl-1">
                                    {userCvs.length > 0 ? (
                                        <div className="grid gap-3">
                                            {userCvs.map((cv) => (
                                                <div
                                                    key={cv.id}
                                                    className={`flex items-center justify-between p-3 rounded border cursor-pointer ${selectedCvId === cv.id ? 'border-blue-500 bg-blue-900/20' : 'border-gray-700 hover:bg-gray-700/50'}`}
                                                    onClick={() => setSelectedCvId(cv.id)}
                                                >
                                                    <div className="flex items-center space-x-3">
                                                        <FileText className="w-5 h-5 text-blue-400" />
                                                        <div>
                                                            <p className="font-medium text-white">{cv.filename}</p>
                                                            <p className="text-xs text-gray-400">Uploaded {new Date(cv.created_at).toLocaleDateString()}</p>
                                                        </div>
                                                    </div>
                                                    {selectedCvId === cv.id && <CheckCircle className="w-5 h-5 text-blue-500" />}
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-yellow-400 text-sm">No existing CVs found. Please upload a new one.</p>
                                    )}
                                </div>
                            )}

                            {uploadMode === "new" && (
                                <div className="mt-4 border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-gray-500 transition-colors">
                                    <input
                                        type="file"
                                        id="cv-upload"
                                        className="hidden"
                                        accept=".pdf,.docx"
                                        onChange={handleFileChange}
                                    />
                                    <Label htmlFor="cv-upload" className="cursor-pointer">
                                        <div className="flex flex-col items-center">
                                            <Upload className="w-10 h-10 text-gray-400 mb-3" />
                                            <span className="text-lg font-medium text-white">Click to upload or drag and drop</span>
                                            <span className="text-sm text-gray-400 mt-1">PDF, DOCX (Max 5MB)</span>
                                            {newCvFile && (
                                                <div className="mt-4 flex items-center text-blue-400 font-medium">
                                                    <FileText className="w-4 h-4 mr-2" />
                                                    {newCvFile.name}
                                                </div>
                                            )}
                                        </div>
                                    </Label>
                                </div>
                            )}
                        </div>

                        {/* Cover Letter Section */}
                        <div className="space-y-4">
                            <Label htmlFor="cover-letter" className="text-lg font-semibold text-white">Cover Letter (Optional)</Label>
                            <Textarea
                                id="cover-letter"
                                placeholder="Tell the hiring manager why you're a great fit..."
                                className="min-h-[200px] bg-gray-900 border-gray-700 text-white placeholder:text-gray-500"
                                value={coverLetter}
                                onChange={(e) => setCoverLetter(e.target.value)}
                            />
                        </div>

                        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                                    Submitting Application...
                                </>
                            ) : (
                                "Submit Application"
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
