"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Loader2, ArrowLeft, Mail, MapPin, Phone, Briefcase, GraduationCap, FileText, Download, Calendar } from "lucide-react"
import { toast } from "sonner"
import { candidatesService } from "@/lib/services/candidates.service"

interface CandidateDetails {
    id: string
    name: string
    email: string
    title: string
    experience: any
    education: any[]
    skills: string[]
    overall_score: number
    summary: string
    cv_text: string
    created_at: string
    all_cvs: any[]
}

export default function CandidateProfilePage() {
    const params = useParams()
    const router = useRouter()
    const [candidate, setCandidate] = useState<CandidateDetails | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (params.id) {
            fetchCandidateAndCV(params.id as string)
        }
    }, [params.id])

    const fetchCandidateAndCV = async (id: string) => {
        try {
            setLoading(true)
            const response = await candidatesService.getCandidateById(id)
            if (response.data) {
                setCandidate(response.data.candidate)
            } else {
                toast.error("Failed to load candidate details")
            }
        } catch (error) {
            toast.error("Error fetching candidate")
        } finally {
            setLoading(false)
        }
    }

    const handleDownloadCV = () => {
        if (candidate?.cv_text) {
            const element = document.createElement("a");
            const file = new Blob([candidate.cv_text], { type: 'text/plain' });
            element.href = URL.createObjectURL(file);
            element.download = `${candidate.name.replace(/\s+/g, '_')}_CV.txt`;
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
            toast.success("CV text downloaded")
        } else {
            toast.error("No CV text available")
        }
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
        )
    }

    if (!candidate) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <h1 className="text-2xl font-bold text-white mb-4">Candidate Not Found</h1>
                <Button onClick={() => router.back()}>Go Back</Button>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Button
                variant="ghost"
                className="mb-6 text-gray-400 hover:text-white"
                onClick={() => router.back()}
            >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
            </Button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Sidebar - Personal Info */}
                <div className="lg:col-span-1 space-y-6">
                    <Card className="bg-gray-800 border-gray-700">
                        <CardContent className="p-6 flex flex-col items-center text-center">
                            <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-3xl font-bold text-white mb-4">
                                {candidate.name.charAt(0)}
                            </div>
                            <h2 className="text-xl font-bold text-white mb-1">{candidate.name}</h2>
                            <p className="text-gray-400 mb-4">{candidate.title}</p>

                            <div className="w-full space-y-3 text-left">
                                <div className="flex items-center text-gray-300">
                                    <Mail className="w-4 h-4 mr-3 text-blue-400" />
                                    <span className="text-sm truncate">{candidate.email}</span>
                                </div>
                                {candidate.experience && (
                                    Array.isArray(candidate.experience) ? (
                                        candidate.experience.map((exp: any, i: number) => (
                                            <div key={i} className="flex items-start text-gray-300">
                                                <Briefcase className="w-4 h-4 mr-3 mt-1 text-blue-400 shrink-0" />
                                                <div className="text-sm">
                                                    <p className="font-medium text-white">{exp.title}</p>
                                                    <p className="text-gray-400 text-xs">{exp.company}</p>
                                                    <p className="text-gray-500 text-xs">{exp.duration}</p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        candidate.experience !== "Not specified" && (
                                            <div className="flex items-center text-gray-300">
                                                <Briefcase className="w-4 h-4 mr-3 text-blue-400" />
                                                <span className="text-sm">{candidate.experience}</span>
                                            </div>
                                        )
                                    )
                                )}
                                <div className="flex items-center text-gray-300">
                                    <Calendar className="w-4 h-4 mr-3 text-blue-400" />
                                    <span className="text-sm">Joined {new Date(candidate.created_at).toLocaleDateString()}</span>
                                </div>
                            </div>

                            <div className="mt-6 w-full flex gap-2">
                                <Button className="flex-1 bg-blue-600 hover:bg-blue-700" onClick={() => window.location.href = `mailto:${candidate.email}`}>
                                    Contact
                                </Button>
                                <Button variant="outline" className="flex-1" onClick={handleDownloadCV}>
                                    <Download className="w-4 h-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* AI Score Badge */}
                    <Card className="bg-gray-800 border-gray-700">
                        <CardContent className="p-6">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-gray-400 font-medium">AI Profile Score</span>
                                <span className="text-2xl font-bold text-green-400">{Math.round(candidate.overall_score)}%</span>
                            </div>
                            <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                                <div
                                    className="bg-green-500 h-full rounded-full"
                                    style={{ width: `${candidate.overall_score}%` }}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* About / Summary */}
                    <Card className="bg-gray-800 border-gray-700">
                        <CardHeader>
                            <CardTitle className="text-white">Professional Summary</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-300 leading-relaxed">
                                {candidate.summary || "No summary provided."}
                            </p>
                        </CardContent>
                    </Card>

                    {/* Skills */}
                    <Card className="bg-gray-800 border-gray-700">
                        <CardHeader>
                            <CardTitle className="text-white">Skills</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2">
                                {candidate.skills.length > 0 ? (
                                    candidate.skills.map((skill, index) => (
                                        <Badge key={index} variant="secondary" className="bg-gray-700 text-gray-200 hover:bg-gray-600">
                                            {skill}
                                        </Badge>
                                    ))
                                ) : (
                                    <p className="text-gray-400">No skills listed.</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Education */}
                    <Card className="bg-gray-800 border-gray-700">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center">
                                <GraduationCap className="w-5 h-5 mr-2 text-blue-400" />
                                Education
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {candidate.education.length > 0 ? (
                                candidate.education.map((edu, index) => (
                                    <div key={index} className="pb-4 border-b border-gray-700 last:border-0 last:pb-0">
                                        <h4 className="text-white font-medium">{edu.degree || "Degree"}</h4>
                                        <p className="text-gray-400 text-sm">{edu.institution || "Institution"}</p>
                                        <p className="text-gray-500 text-xs mt-1">{edu.year || "Year"}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-400">No education details available.</p>
                            )}
                        </CardContent>
                    </Card>

                    {/* CV Preview (Text) */}
                    <Card className="bg-gray-800 border-gray-700">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center">
                                <FileText className="w-5 h-5 mr-2 text-blue-400" />
                                CV Content
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="bg-gray-900 p-4 rounded-md overflow-x-auto">
                                <pre className="text-gray-400 text-sm whitespace-pre-wrap font-mono">
                                    {candidate.cv_text || "No CV content available."}
                                </pre>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
