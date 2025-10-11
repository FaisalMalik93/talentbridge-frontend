"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Search,
  Filter,
  Star,
  MapPin,
  Briefcase,
  GraduationCap,
  Mail,
  Download,
  Eye,
  MessageSquare,
} from "lucide-react"
import Link from "next/link"

export default function CandidatesPage() {
  const [selectedCandidates, setSelectedCandidates] = useState<number[]>([])

  const toggleSelectCandidate = (candidateId: number) => {
    setSelectedCandidates((prev) =>
      prev.includes(candidateId) ? prev.filter((id) => id !== candidateId) : [...prev, candidateId],
    )
  }

  const candidates = [
    {
      id: 1,
      name: "Sarah Johnson",
      title: "Senior Frontend Developer",
      location: "San Francisco, CA",
      experience: "5 years",
      education: "BS Computer Science, Stanford",
      skills: ["React", "TypeScript", "Next.js", "GraphQL", "Node.js"],
      matchScore: 95,
      salary: "$120k - $140k",
      availability: "Available",
      lastActive: "2 days ago",
      appliedJobs: ["Senior Frontend Developer", "React Developer"],
      avatar: "👩‍💻",
      summary:
        "Experienced frontend developer with a passion for creating intuitive user interfaces and scalable web applications.",
    },
    {
      id: 2,
      name: "Michael Chen",
      title: "Full Stack Developer",
      location: "Remote",
      experience: "4 years",
      education: "MS Software Engineering, MIT",
      skills: ["React", "Node.js", "Python", "AWS", "Docker"],
      matchScore: 88,
      salary: "$100k - $120k",
      availability: "Available in 2 weeks",
      lastActive: "1 day ago",
      appliedJobs: ["Full Stack Developer", "Backend Engineer"],
      avatar: "👨‍💼",
      summary: "Versatile full-stack developer with expertise in modern web technologies and cloud infrastructure.",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      title: "UI/UX Designer",
      location: "New York, NY",
      experience: "3 years",
      education: "BFA Design, Parsons",
      skills: ["Figma", "Adobe XD", "Sketch", "Prototyping", "User Research"],
      matchScore: 92,
      salary: "$80k - $100k",
      availability: "Available",
      lastActive: "5 hours ago",
      appliedJobs: ["UI/UX Designer", "Product Designer"],
      avatar: "👩‍🎨",
      summary: "Creative designer focused on user-centered design and creating delightful digital experiences.",
    },
    {
      id: 4,
      name: "David Kim",
      title: "DevOps Engineer",
      location: "Seattle, WA",
      experience: "6 years",
      education: "BS Computer Engineering, UW",
      skills: ["AWS", "Kubernetes", "Docker", "Terraform", "Jenkins"],
      matchScore: 85,
      salary: "$130k - $150k",
      availability: "Available in 1 month",
      lastActive: "3 days ago",
      appliedJobs: ["DevOps Engineer", "Cloud Engineer"],
      avatar: "👨‍🔧",
      summary: "Experienced DevOps engineer specializing in cloud infrastructure and automation solutions.",
    },
    {
      id: 5,
      name: "Lisa Wang",
      title: "Product Manager",
      location: "Austin, TX",
      experience: "7 years",
      education: "MBA, Wharton",
      skills: ["Product Strategy", "Agile", "Analytics", "Leadership", "SQL"],
      matchScore: 90,
      salary: "$140k - $160k",
      availability: "Available",
      lastActive: "1 day ago",
      appliedJobs: ["Product Manager", "Senior Product Manager"],
      avatar: "👩‍💼",
      summary:
        "Strategic product manager with a track record of launching successful products and leading cross-functional teams.",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">TB</span>
            </div>
            <span className="text-xl font-bold">TalentBridge</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/dashboard" className="hover:text-blue-400 transition-colors">
              Dashboard
            </Link>
            <Link href="/post-job" className="hover:text-blue-400 transition-colors">
              Post Job
            </Link>
            <Link href="/candidates" className="text-blue-400">
              Candidates
            </Link>
            <Link href="/analytics" className="hover:text-blue-400 transition-colors">
              Analytics
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
              Export List
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">Bulk Actions</Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Candidate Database</h1>
          <p className="text-gray-400">Discover and connect with top talent using AI-powered matching</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-gray-800 border-gray-700 sticky top-8">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 mb-6">
                  <Filter className="w-5 h-5" />
                  <h2 className="text-lg font-semibold">Filters</h2>
                </div>

                <div className="space-y-6">
                  {/* Experience Level */}
                  <div>
                    <h3 className="font-medium mb-3">Experience Level</h3>
                    <div className="space-y-2">
                      {[
                        "Entry Level (0-2 years)",
                        "Mid Level (2-5 years)",
                        "Senior Level (5+ years)",
                        "Lead/Principal (8+ years)",
                      ].map((level) => (
                        <div key={level} className="flex items-center space-x-2">
                          <Checkbox id={level} />
                          <label htmlFor={level} className="text-sm text-gray-300">
                            {level}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Skills */}
                  <div>
                    <h3 className="font-medium mb-3">Skills</h3>
                    <div className="space-y-2">
                      {["React", "Python", "Node.js", "AWS", "Docker", "Figma"].map((skill) => (
                        <div key={skill} className="flex items-center space-x-2">
                          <Checkbox id={skill} />
                          <label htmlFor={skill} className="text-sm text-gray-300">
                            {skill}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <h3 className="font-medium mb-3">Location</h3>
                    <div className="space-y-2">
                      {["Remote", "San Francisco", "New York", "Seattle", "Austin"].map((location) => (
                        <div key={location} className="flex items-center space-x-2">
                          <Checkbox id={location} />
                          <label htmlFor={location} className="text-sm text-gray-300">
                            {location}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Availability */}
                  <div>
                    <h3 className="font-medium mb-3">Availability</h3>
                    <div className="space-y-2">
                      {["Available now", "Available in 2 weeks", "Available in 1 month", "Not actively looking"].map(
                        (availability) => (
                          <div key={availability} className="flex items-center space-x-2">
                            <Checkbox id={availability} />
                            <label htmlFor={availability} className="text-sm text-gray-300">
                              {availability}
                            </label>
                          </div>
                        ),
                      )}
                    </div>
                  </div>

                  {/* Salary Range */}
                  <div>
                    <h3 className="font-medium mb-3">Salary Expectation</h3>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-80k">$0 - $80k</SelectItem>
                        <SelectItem value="80k-120k">$80k - $120k</SelectItem>
                        <SelectItem value="120k-160k">$120k - $160k</SelectItem>
                        <SelectItem value="160k+">$160k+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Candidate Listings */}
          <div className="lg:col-span-3">
            {/* Search and Controls */}
            <div className="mb-8">
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input placeholder="Search candidates..." className="pl-10 bg-gray-800 border-gray-700 text-white" />
                </div>
                <Select>
                  <SelectTrigger className="w-48 bg-gray-800 border-gray-700">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="match">Best Match</SelectItem>
                    <SelectItem value="recent">Most Recent</SelectItem>
                    <SelectItem value="experience">Most Experienced</SelectItem>
                    <SelectItem value="salary">Salary: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {selectedCandidates.length > 0 && (
                <div className="flex items-center justify-between bg-blue-600/20 border border-blue-600/50 rounded-lg p-4">
                  <span className="text-blue-300">
                    {selectedCandidates.length} candidate{selectedCandidates.length > 1 ? "s" : ""} selected
                  </span>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="border-blue-600 text-blue-300">
                      Send Message
                    </Button>
                    <Button size="sm" variant="outline" className="border-blue-600 text-blue-300">
                      Export CVs
                    </Button>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      Schedule Interview
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-400">{candidates.length} candidates found</p>
            </div>

            {/* Candidate Tabs */}
            <Tabs defaultValue="all" className="space-y-6">
              <TabsList className="bg-gray-800 border-gray-700">
                <TabsTrigger value="all" className="data-[state=active]:bg-blue-600">
                  All Candidates
                </TabsTrigger>
                <TabsTrigger value="applied" className="data-[state=active]:bg-blue-600">
                  Applied to Jobs
                </TabsTrigger>
                <TabsTrigger value="shortlisted" className="data-[state=active]:bg-blue-600">
                  Shortlisted
                </TabsTrigger>
                <TabsTrigger value="interviewed" className="data-[state=active]:bg-blue-600">
                  Interviewed
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <div className="space-y-6">
                  {candidates.map((candidate) => (
                    <Card
                      key={candidate.id}
                      className="bg-gray-800 border-gray-700 hover:border-blue-500 transition-colors"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-start space-x-4">
                            <Checkbox
                              checked={selectedCandidates.includes(candidate.id)}
                              onCheckedChange={() => toggleSelectCandidate(candidate.id)}
                              className="mt-1"
                            />
                            <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center text-3xl">
                              {candidate.avatar}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <h3 className="text-xl font-semibold text-white">{candidate.name}</h3>
                                <div className="flex items-center space-x-1">
                                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                  <span className="text-sm font-semibold text-green-400">
                                    {candidate.matchScore}% match
                                  </span>
                                </div>
                              </div>
                              <p className="text-blue-400 mb-2">{candidate.title}</p>
                              <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                                <span className="flex items-center">
                                  <MapPin className="w-4 h-4 mr-1" />
                                  {candidate.location}
                                </span>
                                <span className="flex items-center">
                                  <Briefcase className="w-4 h-4 mr-1" />
                                  {candidate.experience}
                                </span>
                                <span className="flex items-center">
                                  <GraduationCap className="w-4 h-4 mr-1" />
                                  {candidate.education}
                                </span>
                              </div>
                              <p className="text-gray-300 mb-4">{candidate.summary}</p>

                              {/* Skills */}
                              <div className="mb-4">
                                <div className="flex flex-wrap gap-2">
                                  {candidate.skills.map((skill) => (
                                    <Badge key={skill} variant="secondary" className="bg-blue-600/20 text-blue-300">
                                      {skill}
                                    </Badge>
                                  ))}
                                </div>
                              </div>

                              {/* Additional Info */}
                              <div className="grid md:grid-cols-3 gap-4 text-sm">
                                <div>
                                  <span className="text-gray-400">Salary Expectation:</span>
                                  <p className="text-white">{candidate.salary}</p>
                                </div>
                                <div>
                                  <span className="text-gray-400">Availability:</span>
                                  <p className="text-white">{candidate.availability}</p>
                                </div>
                                <div>
                                  <span className="text-gray-400">Last Active:</span>
                                  <p className="text-white">{candidate.lastActive}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-green-400 mb-1">{candidate.matchScore}%</div>
                            <p className="text-sm text-gray-400">AI Match</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                          <div className="flex items-center space-x-4 text-sm text-gray-400">
                            <span>Applied to: {candidate.appliedJobs.join(", ")}</span>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm" className="text-gray-400">
                              <Eye className="w-4 h-4 mr-1" />
                              View Profile
                            </Button>
                            <Button variant="ghost" size="sm" className="text-gray-400">
                              <Download className="w-4 h-4 mr-1" />
                              Download CV
                            </Button>
                            <Button variant="outline" size="sm">
                              <MessageSquare className="w-4 h-4 mr-1" />
                              Message
                            </Button>
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                              <Mail className="w-4 h-4 mr-1" />
                              Contact
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="applied">
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-8 text-center">
                    <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Candidates who applied to your jobs</h3>
                    <p className="text-gray-400">View candidates who have specifically applied to your job postings</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="shortlisted">
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-8 text-center">
                    <Star className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Shortlisted Candidates</h3>
                    <p className="text-gray-400">Candidates you've marked as potential hires</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="interviewed">
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-8 text-center">
                    <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Interviewed Candidates</h3>
                    <p className="text-gray-400">Candidates who have completed interviews</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Load More */}
            <div className="text-center mt-8">
              <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                Load More Candidates
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
