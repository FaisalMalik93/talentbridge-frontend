"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Award,
  Plus,
  X,
  Edit,
  Save,
  Upload,
  Download,
  Eye,
  Settings,
  Bell,
} from "lucide-react"
import Link from "next/link"

import { apiClient } from "@/lib/api-client"
import { useToast } from "@/components/ui/use-toast"

interface Experience {
  id: number | string
  title: string
  company: string
  location: string
  startDate: string
  endDate: string
  description: string
}

interface Education {
  id: number | string
  degree: string
  school: string
  location: string
  startDate: string
  endDate: string
  gpa?: string
}

interface Certification {
  id: number | string
  name: string
  issuer: string
  date: string
  credentialId?: string
}

interface ProfileData {
  firstName: string
  lastName: string
  email: string
  phone: string
  location: string
  title: string
  summary: string
  avatar?: string
  experience: Experience[]
  education: Education[]
  certifications: Certification[]
}

export default function CandidateProfile() {
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [newSkill, setNewSkill] = useState("")
  const [skills, setSkills] = useState<string[]>([])
  const [uploading, setUploading] = useState(false)

  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    title: "",
    summary: "",
    avatar: "",
    experience: [],
    education: [],
    certifications: [],
  })

  // ... useEffect and fetchProfile ...

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    formData.append("file", file)

    try {
      const response = await apiClient.postFormData<any>("/api/candidates/me/avatar", formData)
      if (response.data && response.data.avatar_url) {
        setProfileData(prev => ({ ...prev, avatar: response.data.avatar_url }))
        alert("Avatar uploaded successfully!")
      }
    } catch (error) {
      console.error("Upload failed", error)
      alert("Failed to upload avatar")
    } finally {
      setUploading(false)
    }
  }

  // ... saveProfile and other functions ...


  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    setIsLoading(true)
    try {
      const response = await apiClient.get<any>('/api/candidates/me')
      if (response.data && response.data.profile) {
        const p = response.data.profile
        setProfileData({
          firstName: p.firstName || "",
          lastName: p.lastName || "",
          email: p.email || "",
          phone: p.phone || "",
          location: p.location || "",
          title: p.title || "",
          summary: p.summary || "",
          avatar: p.avatar || "",
          experience: p.experience || [],
          education: p.education || [],
          certifications: p.certifications || [],
        })
        setSkills(p.skills || [])
      }
    } catch (error) {
      console.error("Failed to fetch profile", error)
    } finally {
      setIsLoading(false)
    }
  }

  const saveProfile = async () => {
    try {
      const updatedProfile = {
        ...profileData,
        skills: skills
      }

      const response = await apiClient.put('/api/candidates/me', updatedProfile)

      if (response.data) {
        setIsEditing(false)
        // toast({ title: "Success", description: "Profile updated successfully" }) // Basic alert if toast not available
        alert("Profile updated successfully!")
      } else {
        alert("Failed to update profile")
      }
    } catch (error) {
      alert("An error occurred")
    }
  }

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()])
      setNewSkill("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove))
  }

  return (
    <div className="container mx-auto px-4 py-8 text-white">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Profile</h1>
          <p className="text-gray-400">Manage your professional information and preferences</p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="outline" className="border-gray-600 text-black hover:bg-gray-800 flex-1 md:flex-none">
            <Eye className="w-4 h-4 mr-2" />
            Preview Profile
          </Button>
          <Button
            onClick={() => setIsEditing(!isEditing)}
            className={`${isEditing ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"} flex-1 md:flex-none`}
          >
            {isEditing ? (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </>
            ) : (
              <>
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Profile Overview */}
        <div className="space-y-6">
          {/* Profile Picture & Basic Info */}
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6 text-center">
              <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center text-4xl mx-auto mb-4 overflow-hidden relative">
                {profileData.avatar ? (
                  <img
                    src={profileData.avatar.startsWith("http") ? profileData.avatar : `http://localhost:8000${profileData.avatar}`}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span>👨‍💻</span>
                )}
              </div>
              {isEditing && (
                <>
                  <input
                    type="file"
                    id="avatar-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileUpload}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="mb-4 border-gray-600 text-black hover:bg-gray-700"
                    onClick={() => document.getElementById("avatar-upload")?.click()}
                    disabled={uploading}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    {uploading ? "Uploading..." : "Upload Photo"}
                  </Button>
                </>
              )}
              <h2 className="text-xl font-bold mb-1">
                {profileData.firstName} {profileData.lastName}
              </h2>
              <p className="text-blue-400 mb-4">{profileData.title}</p>
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex items-center justify-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span className="break-all">{profileData.email}</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>{profileData.phone}</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>{profileData.location}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skills */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Skills
                {isEditing && (
                  <Button variant="outline" size="sm" className="border-gray-600 text-black hover:bg-gray-700">
                    <Plus className="w-4 h-4" />
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isEditing && (
                <div className="flex space-x-2 mb-4">
                  <Input
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add a skill"
                    className="bg-gray-700 border-gray-600 text-white"
                    onKeyPress={(e) => e.key === "Enter" && addSkill()}
                  />
                  <Button onClick={addSkill} size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              )}
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="bg-blue-600/20 text-blue-300">
                    {skill}
                    {isEditing && (
                      <button onClick={() => removeSkill(skill)} className="ml-2 hover:text-red-400">
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                <Upload className="w-4 h-4 mr-2" />
                Upload New CV
              </Button>
              <Button variant="outline" className="w-full border-gray-600 text-black hover:bg-gray-700">
                <Download className="w-4 h-4 mr-2" />
                Download CV
              </Button>
              <Link href="/cv-analysis">
                <Button variant="outline" className="w-full border-gray-600 text-black hover:bg-gray-700">
                  <Award className="w-4 h-4 mr-2" />
                  Analyze CV
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Detailed Information */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="personal" className="space-y-6">
            <div className="overflow-x-auto pb-2">
              <TabsList className="bg-gray-800 border-gray-700 inline-flex w-auto min-w-full justify-start">
                <TabsTrigger value="personal" className="data-[state=active]:bg-blue-600 px-4">
                  Personal Info
                </TabsTrigger>
                <TabsTrigger value="experience" className="data-[state=active]:bg-blue-600 px-4">
                  Experience
                </TabsTrigger>
                <TabsTrigger value="education" className="data-[state=active]:bg-blue-600 px-4">
                  Education
                </TabsTrigger>
                <TabsTrigger value="certifications" className="data-[state=active]:bg-blue-600 px-4">
                  Certifications
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="personal">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={profileData.firstName}
                        onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                        className="bg-gray-700 border-gray-600 text-white mt-2"
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={profileData.lastName}
                        onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                        className="bg-gray-700 border-gray-600 text-white mt-2"
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="title">Professional Title</Label>
                    <Input
                      id="title"
                      value={profileData.title}
                      onChange={(e) => setProfileData({ ...profileData, title: e.target.value })}
                      className="bg-gray-700 border-gray-600 text-white mt-2"
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        className="bg-gray-700 border-gray-600 text-white mt-2"
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                        className="bg-gray-700 border-gray-600 text-white mt-2"
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={profileData.location}
                      onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                      className="bg-gray-700 border-gray-600 text-white mt-2"
                      disabled={!isEditing}
                    />
                  </div>

                  <div>
                    <Label htmlFor="summary">Professional Summary</Label>
                    <Textarea
                      id="summary"
                      value={profileData.summary}
                      onChange={(e) => setProfileData({ ...profileData, summary: e.target.value })}
                      className="bg-gray-700 border-gray-600 text-white mt-2 min-h-[120px]"
                      disabled={!isEditing}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="experience">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Work Experience
                    {isEditing && (
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Experience
                      </Button>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {profileData.experience.map((exp, index) => (
                      <div key={exp.id} className="border border-gray-700 rounded-lg p-4">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4 gap-4">
                          <div className="flex items-start space-x-3">
                            <Briefcase className="w-8 h-8 text-blue-400 flex-shrink-0" />
                            <div>
                              <h3 className="font-semibold text-white">{exp.title}</h3>
                              <p className="text-blue-400">{exp.company}</p>
                              <p className="text-sm text-gray-400">
                                {exp.location} • {exp.startDate} - {exp.endDate}
                              </p>
                            </div>
                          </div>
                          {isEditing && (
                            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white self-end sm:self-auto">
                              <Edit className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                        <p className="text-gray-300">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="education">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Education
                    {isEditing && (
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Education
                      </Button>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {profileData.education.map((edu, index) => (
                      <div key={edu.id} className="border border-gray-700 rounded-lg p-4">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4 gap-4">
                          <div className="flex items-start space-x-3">
                            <GraduationCap className="w-8 h-8 text-green-400 flex-shrink-0" />
                            <div>
                              <h3 className="font-semibold text-white">{edu.degree}</h3>
                              <p className="text-green-400">{edu.school}</p>
                              <p className="text-sm text-gray-400">
                                {edu.location} • {edu.startDate} - {edu.endDate}
                              </p>
                              {edu.gpa && <p className="text-sm text-gray-400">GPA: {edu.gpa}</p>}
                            </div>
                          </div>
                          {isEditing && (
                            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white self-end sm:self-auto">
                              <Edit className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="certifications">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Certifications
                    {isEditing && (
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Certification
                      </Button>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {profileData.certifications.map((cert, index) => (
                      <div key={cert.id} className="border border-gray-700 rounded-lg p-4">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4 gap-4">
                          <div className="flex items-start space-x-3">
                            <Award className="w-8 h-8 text-yellow-400 flex-shrink-0" />
                            <div>
                              <h3 className="font-semibold text-white">{cert.name}</h3>
                              <p className="text-yellow-400">{cert.issuer}</p>
                              <p className="text-sm text-gray-400">Issued: {cert.date}</p>
                              <p className="text-sm text-gray-400">Credential ID: {cert.credentialId}</p>
                            </div>
                          </div>
                          {isEditing && (
                            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white self-end sm:self-auto">
                              <Edit className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
