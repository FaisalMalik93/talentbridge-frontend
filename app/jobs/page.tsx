"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, MapPin, Clock, DollarSign, Filter, Heart, Share2 } from "lucide-react"
import Link from "next/link"
import { apiClient } from "@/lib/api-client"

interface Job {
  id: string
  title: string
  company: string
  description: string
  requirements: string[]
  location?: string
  salary_range?: string
  job_type: string
  employer_id: string
  created_at: string
  updated_at: string
  is_active: boolean
  applications_count: number
}

export default function JobsPage() {
  const [savedJobs, setSavedJobs] = useState<string[]>([])
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    setLoading(true)
    setError(null)
    const response = await apiClient.get<Job[]>('/api/jobs/', false)

    if (response.error) {
      setError(response.error)
    } else if (response.data) {
      setJobs(response.data)
    }
    setLoading(false)
  }

  const toggleSaveJob = (jobId: string) => {
    setSavedJobs((prev) => (prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]))
  }

  // COMMENTED OUT: Dummy data - now fetching from database
  // const jobs = [
  //   {
  //     id: 1,
  //     title: "Senior Frontend Developer",
  //     company: "TechCorp Inc.",
  //     location: "Remote",
  //     salary: "$80k - $120k",
  //     type: "Full-time",
  //     posted: "2 days ago",
  //     description: "We're looking for a senior frontend developer with React and TypeScript experience...",
  //     skills: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
  //     logo: "🚀",
  //   },
  //   {
  //     id: 2,
  //     title: "UI/UX Designer",
  //     company: "DesignStudio",
  //     location: "New York, NY",
  //     salary: "$70k - $90k",
  //     type: "Full-time",
  //     posted: "1 day ago",
  //     description: "Join our creative team to design beautiful and intuitive user experiences...",
  //     skills: ["Figma", "Adobe Creative Suite", "Prototyping", "User Research"],
  //     logo: "🎨",
  //   },
  //   {
  //     id: 3,
  //     title: "Product Manager",
  //     company: "StartupXYZ",
  //     location: "San Francisco, CA",
  //     salary: "$100k - $140k",
  //     type: "Full-time",
  //     posted: "3 days ago",
  //     description: "Lead product strategy and work with cross-functional teams...",
  //     skills: ["Product Strategy", "Agile", "Analytics", "Leadership"],
  //     logo: "📊",
  //   },
  //   {
  //     id: 4,
  //     title: "DevOps Engineer",
  //     company: "CloudTech",
  //     location: "Remote",
  //     salary: "$90k - $130k",
  //     type: "Full-time",
  //     posted: "1 week ago",
  //     description: "Manage cloud infrastructure and CI/CD pipelines...",
  //     skills: ["AWS", "Docker", "Kubernetes", "Terraform"],
  //     logo: "☁️",
  //   },
  //   {
  //     id: 5,
  //     title: "Marketing Specialist",
  //     company: "GrowthCo",
  //     location: "Austin, TX",
  //     salary: "$50k - $70k",
  //     type: "Full-time",
  //     posted: "4 days ago",
  //     description: "Drive marketing campaigns and analyze performance metrics...",
  //     skills: ["Digital Marketing", "SEO", "Analytics", "Content Creation"],
  //     logo: "📈",
  //   },
  // ]

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return "Today"
    if (diffDays === 1) return "1 day ago"
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? 's' : ''} ago`
    return `${Math.floor(diffDays / 30)} month${Math.floor(diffDays / 30) > 1 ? 's' : ''} ago`
  }

  const cleanDescription = (text: string) => {
    // Remove "Summary:" prefix and "\n" characters
    let cleaned = text
      .replace(/^Summary:\s*/i, '') // Remove "Summary:" at the start
      .replace(/\\n/g, ' ') // Replace literal \n with space
      .replace(/\n/g, ' ') // Replace actual newlines with space
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .trim()

    return cleaned
  }

  const truncateText = (text: string, maxLength: number = 150) => {
    const cleaned = cleanDescription(text)
    if (cleaned.length <= maxLength) return cleaned
    return cleaned.substring(0, maxLength).trim() + "..."
  }

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

            {/* Loading State */}
            {loading && (
              <div className="text-center py-12">
                <p className="text-gray-400">Loading jobs...</p>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="bg-red-900/20 border border-red-500 rounded-lg p-4 mb-6">
                <p className="text-red-400">Error loading jobs: {error}</p>
                <Button onClick={fetchJobs} className="mt-2" variant="outline">
                  Retry
                </Button>
              </div>
            )}

            {/* Empty State */}
            {!loading && !error && jobs.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400">No jobs available at the moment.</p>
              </div>
            )}

            {/* Results Count */}
            {!loading && !error && jobs.length > 0 && (
              <div className="mb-6">
                <p className="text-gray-400">{jobs.length} jobs found</p>
              </div>
            )}

            {/* Job Cards */}
            {!loading && !error && (
              <div className="space-y-6">
                {jobs.map((job) => (
                  <Card key={job.id} className="bg-gray-800 border-gray-700 hover:border-blue-500 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start space-x-4 flex-1">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                            💼
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <div className="flex-1">
                                <h3 className="text-xl font-semibold text-white mb-1">{job.title}</h3>
                                <p className="text-blue-400 font-medium">{job.company}</p>
                              </div>
                              <div className="flex items-center space-x-2 flex-shrink-0">
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

                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-400 mb-3">
                              {job.location && (
                                <span className="flex items-center">
                                  <MapPin className="w-4 h-4 mr-1" />
                                  {job.location}
                                </span>
                              )}
                              {job.salary_range && (
                                <span className="flex items-center">
                                  <DollarSign className="w-4 h-4 mr-1" />
                                  {job.salary_range}
                                </span>
                              )}
                              <span className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                {formatDate(job.created_at)}
                              </span>
                              <Badge variant="outline" className="text-xs">
                                {job.job_type}
                              </Badge>
                            </div>

                            <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                              {truncateText(job.description, 200)}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-4">
                              {job.requirements.slice(0, 6).map((requirement, index) => (
                                <Badge key={index} variant="secondary" className="bg-blue-600/20 text-blue-300 text-xs">
                                  {requirement}
                                </Badge>
                              ))}
                              {job.requirements.length > 6 && (
                                <Badge variant="secondary" className="bg-gray-700 text-gray-300 text-xs">
                                  +{job.requirements.length - 6} more
                                </Badge>
                              )}
                            </div>

                            <div className="flex items-center justify-between pt-3 border-t border-gray-700">
                              <div className="flex items-center space-x-2">
                                <Badge variant="outline" className="text-xs text-gray-400 border-gray-600">
                                  {job.applications_count} applicants
                                </Badge>
                              </div>
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm" className="border-gray-600 hover:border-blue-500">
                                  View Details
                                </Button>
                                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                  Apply Now
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Load More */}
            {!loading && !error && jobs.length > 0 && (
              <div className="text-center mt-8">
                <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                  Load More Jobs
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
  )
}
