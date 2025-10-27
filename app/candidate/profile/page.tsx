"use client"

import { useState } from "react"
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

export default function CandidateProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [newSkill, setNewSkill] = useState("")
  const [skills, setSkills] = useState([
    "React",
    "TypeScript",
    "Next.js",
    "Node.js",
    "Python",
    "AWS",
    "Docker",
    "GraphQL",
  ])

  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    title: "Senior Frontend Developer",
    summary:
      "Experienced frontend developer with 5+ years of expertise in React, TypeScript, and modern web technologies. Passionate about creating intuitive user interfaces and scalable applications.",
    experience: [
      {
        id: 1,
        title: "Senior Frontend Developer",
        company: "TechCorp Inc.",
        location: "San Francisco, CA",
        startDate: "2022-01",
        endDate: "Present",
        description:
          "Led development of React-based web applications, mentored junior developers, and implemented modern frontend architecture patterns.",
      },
      {
        id: 2,
        title: "Frontend Developer",
        company: "StartupXYZ",
        location: "Remote",
        startDate: "2020-03",
        endDate: "2021-12",
        description:
          "Developed responsive web applications using React and TypeScript, collaborated with design team to implement pixel-perfect UIs.",
      },
    ],
    education: [
      {
        id: 1,
        degree: "Bachelor of Science in Computer Science",
        school: "University of California, Berkeley",
        location: "Berkeley, CA",
        startDate: "2016-09",
        endDate: "2020-05",
        gpa: "3.8",
      },
    ],
    certifications: [
      {
        id: 1,
        name: "AWS Certified Developer",
        issuer: "Amazon Web Services",
        date: "2023-06",
        credentialId: "AWS-123456",
      },
      {
        id: 2,
        name: "React Developer Certification",
        issuer: "Meta",
        date: "2022-11",
        credentialId: "META-789012",
      },
    ],
  })

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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Profile</h1>
            <p className="text-gray-400">Manage your professional information and preferences</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
              <Eye className="w-4 h-4 mr-2" />
              Preview Profile
            </Button>
            <Button
              onClick={() => setIsEditing(!isEditing)}
              className={isEditing ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"}
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
                <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center text-4xl mx-auto mb-4">
                  👨‍💻
                </div>
                {isEditing && (
                  <Button variant="outline" size="sm" className="mb-4 border-gray-600 text-white hover:bg-gray-700">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Photo
                  </Button>
                )}
                <h2 className="text-xl font-bold mb-1">
                  {profileData.firstName} {profileData.lastName}
                </h2>
                <p className="text-blue-400 mb-4">{profileData.title}</p>
                <div className="space-y-2 text-sm text-gray-400">
                  <div className="flex items-center justify-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>{profileData.email}</span>
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
                    <Button variant="outline" size="sm" className="border-gray-600 text-white hover:bg-gray-700">
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
                <Button variant="outline" className="w-full border-gray-600 text-white hover:bg-gray-700">
                  <Download className="w-4 h-4 mr-2" />
                  Download CV
                </Button>
                <Link href="/cv-analysis">
                  <Button variant="outline" className="w-full border-gray-600 text-white hover:bg-gray-700">
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
              <TabsList className="bg-gray-800 border-gray-700">
                <TabsTrigger value="personal" className="data-[state=active]:bg-blue-600">
                  Personal Info
                </TabsTrigger>
                <TabsTrigger value="experience" className="data-[state=active]:bg-blue-600">
                  Experience
                </TabsTrigger>
                <TabsTrigger value="education" className="data-[state=active]:bg-blue-600">
                  Education
                </TabsTrigger>
                <TabsTrigger value="certifications" className="data-[state=active]:bg-blue-600">
                  Certifications
                </TabsTrigger>
              </TabsList>

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
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              <Briefcase className="w-8 h-8 text-blue-400" />
                              <div>
                                <h3 className="font-semibold text-white">{exp.title}</h3>
                                <p className="text-blue-400">{exp.company}</p>
                                <p className="text-sm text-gray-400">
                                  {exp.location} • {exp.startDate} - {exp.endDate}
                                </p>
                              </div>
                            </div>
                            {isEditing && (
                              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
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
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              <GraduationCap className="w-8 h-8 text-green-400" />
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
                              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
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
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              <Award className="w-8 h-8 text-yellow-400" />
                              <div>
                                <h3 className="font-semibold text-white">{cert.name}</h3>
                                <p className="text-yellow-400">{cert.issuer}</p>
                                <p className="text-sm text-gray-400">Issued: {cert.date}</p>
                                <p className="text-sm text-gray-400">Credential ID: {cert.credentialId}</p>
                              </div>
                            </div>
                            {isEditing && (
                              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
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
