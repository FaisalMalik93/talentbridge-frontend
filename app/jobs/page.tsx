"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, MapPin, Clock, DollarSign, Filter, Heart, Share2 } from "lucide-react"
import Link from "next/link"

export default function JobsPage() {
  const [savedJobs, setSavedJobs] = useState<number[]>([])

  const toggleSaveJob = (jobId: number) => {
    setSavedJobs((prev) => (prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]))
  }

  const jobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      location: "Remote",
      salary: "$80k - $120k",
      type: "Full-time",
      posted: "2 days ago",
      description: "We're looking for a senior frontend developer with React and TypeScript experience...",
      skills: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
      logo: "🚀",
    },
    {
      id: 2,
      title: "UI/UX Designer",
      company: "DesignStudio",
      location: "New York, NY",
      salary: "$70k - $90k",
      type: "Full-time",
      posted: "1 day ago",
      description: "Join our creative team to design beautiful and intuitive user experiences...",
      skills: ["Figma", "Adobe Creative Suite", "Prototyping", "User Research"],
      logo: "🎨",
    },
    {
      id: 3,
      title: "Product Manager",
      company: "StartupXYZ",
      location: "San Francisco, CA",
      salary: "$100k - $140k",
      type: "Full-time",
      posted: "3 days ago",
      description: "Lead product strategy and work with cross-functional teams...",
      skills: ["Product Strategy", "Agile", "Analytics", "Leadership"],
      logo: "📊",
    },
    {
      id: 4,
      title: "DevOps Engineer",
      company: "CloudTech",
      location: "Remote",
      salary: "$90k - $130k",
      type: "Full-time",
      posted: "1 week ago",
      description: "Manage cloud infrastructure and CI/CD pipelines...",
      skills: ["AWS", "Docker", "Kubernetes", "Terraform"],
      logo: "☁️",
    },
    {
      id: 5,
      title: "Marketing Specialist",
      company: "GrowthCo",
      location: "Austin, TX",
      salary: "$50k - $70k",
      type: "Full-time",
      posted: "4 days ago",
      description: "Drive marketing campaigns and analyze performance metrics...",
      skills: ["Digital Marketing", "SEO", "Analytics", "Content Creation"],
      logo: "📈",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
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
                  {/* Job Type */}
                  <div>
                    <h3 className="font-medium mb-3">Job Type</h3>
                    <div className="space-y-2">
                      {["Full-time", "Part-time", "Contract", "Freelance"].map((type) => (
                        <div key={type} className="flex items-center space-x-2">
                          <Checkbox id={type} />
                          <label htmlFor={type} className="text-sm text-gray-300">
                            {type}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Experience Level */}
                  <div>
                    <h3 className="font-medium mb-3">Experience Level</h3>
                    <div className="space-y-2">
                      {["Entry Level", "Mid Level", "Senior Level", "Executive"].map((level) => (
                        <div key={level} className="flex items-center space-x-2">
                          <Checkbox id={level} />
                          <label htmlFor={level} className="text-sm text-gray-300">
                            {level}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Salary Range */}
                  <div>
                    <h3 className="font-medium mb-3">Salary Range</h3>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-50k">$0 - $50k</SelectItem>
                        <SelectItem value="50k-100k">$50k - $100k</SelectItem>
                        <SelectItem value="100k-150k">$100k - $150k</SelectItem>
                        <SelectItem value="150k+">$150k+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Location */}
                  <div>
                    <h3 className="font-medium mb-3">Location</h3>
                    <div className="space-y-2">
                      {["Remote", "New York", "San Francisco", "Austin", "Seattle"].map((location) => (
                        <div key={location} className="flex items-center space-x-2">
                          <Checkbox id={location} />
                          <label htmlFor={location} className="text-sm text-gray-300">
                            {location}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Job Listings */}
          <div className="lg:col-span-3">
            {/* Search Bar */}
            <div className="mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input placeholder="Search jobs..." className="pl-10 bg-gray-800 border-gray-700 text-white" />
                </div>
                <Select>
                  <SelectTrigger className="w-48 bg-gray-800 border-gray-700">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="salary-high">Salary: High to Low</SelectItem>
                    <SelectItem value="salary-low">Salary: Low to High</SelectItem>
                    <SelectItem value="relevance">Most Relevant</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-400">{jobs.length} jobs found</p>
            </div>

            {/* Job Cards */}
            <div className="space-y-6">
              {jobs.map((job) => (
                <Card key={job.id} className="bg-gray-800 border-gray-700 hover:border-blue-500 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center text-2xl">
                          {job.logo}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-white mb-1">{job.title}</h3>
                          <p className="text-blue-400 mb-2">{job.company}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                            <span className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {job.location}
                            </span>
                            <span className="flex items-center">
                              <DollarSign className="w-4 h-4 mr-1" />
                              {job.salary}
                            </span>
                            <span className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {job.posted}
                            </span>
                          </div>
                          <p className="text-gray-300 mb-4">{job.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {job.skills.map((skill) => (
                              <Badge key={skill} variant="secondary" className="bg-blue-600/20 text-blue-300">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleSaveJob(job.id)}
                          className={savedJobs.includes(job.id) ? "text-red-400" : "text-gray-400"}
                        >
                          <Heart className={`w-5 h-5 ${savedJobs.includes(job.id) ? "fill-current" : ""}`} />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-400">
                          <Share2 className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                          {job.type}
                        </Badge>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          Apply Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                Load More Jobs
              </Button>
            </div>
          </div>
        </div>
      </div>
  )
}
