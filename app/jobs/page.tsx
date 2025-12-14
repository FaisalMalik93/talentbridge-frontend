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
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { COUNTRIES, JOB_TYPES } from "@/lib/constants"

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
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const [savedJobs, setSavedJobs] = useState<string[]>([])
  const [jobs, setJobs] = useState<Job[]>([])
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Filter States
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([])
  const [selectedCountry, setSelectedCountry] = useState("")
  const [selectedSalaryRange, setSelectedSalaryRange] = useState("")
  const [selectedExperience, setSelectedExperience] = useState<string[]>([])

  useEffect(() => {
    fetchJobs()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [jobs, searchQuery, sortBy, selectedJobTypes, selectedCountry, selectedSalaryRange, selectedExperience])

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

  const applyFilters = () => {
    let filtered = [...jobs]

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(query) ||
          job.company.toLowerCase().includes(query) ||
          job.description.toLowerCase().includes(query) ||
          job.requirements.some((req) => req.toLowerCase().includes(query))
      )
    }

    // Job type filter
    if (selectedJobTypes.length > 0) {
      filtered = filtered.filter((job) =>
        selectedJobTypes.some((type) => job.job_type.toLowerCase().includes(type.toLowerCase()))
      )
    }

    // Location filter (Country)
    if (selectedCountry && selectedCountry !== "all") {
      filtered = filtered.filter((job) =>
        job.location?.toLowerCase().includes(selectedCountry.toLowerCase())
      )
    }

    // Experience Level filter
    if (selectedExperience.length > 0) {
      filtered = filtered.filter((job) =>
        selectedExperience.some((level) => {
          // Basic keyword matching
          const text = (job.description + " " + job.title).toLowerCase()
          const lvl = level.toLowerCase()
          if (lvl.includes("entry")) return text.includes("entry") || text.includes("junior")
          if (lvl.includes("mid")) return text.includes("mid") || text.includes("intermediate")
          if (lvl.includes("senior")) return text.includes("senior")
          if (lvl.includes("executive")) return text.includes("executive") || text.includes("lead") || text.includes("principal")
          return text.includes(lvl)
        })
      )
    }

    // Salary Range filter
    if (selectedSalaryRange && selectedSalaryRange !== "all") {
      const [minStr, maxStr] = selectedSalaryRange.replace(/k/g, '000').replace(/\+/g, '').split('-')
      const min = parseInt(minStr) || 0
      const max = maxStr ? parseInt(maxStr) : Infinity

      filtered = filtered.filter(job => {
        if (!job.salary_range) return false
        const match = job.salary_range.replace(/,/g, '').match(/(\d+)/)
        if (!match) return false
        let val = parseInt(match[0])
        if (job.salary_range.toLowerCase().includes('k') && val < 1000) val *= 1000

        return val >= min && val <= max
      })
    }

    // Sorting
    switch (sortBy) {
      case "newest":
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        break
      case "oldest":
        filtered.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
        break
      case "relevance":
        filtered.sort((a, b) => b.applications_count - a.applications_count)
        break
    }

    setFilteredJobs(filtered)
  }

  const toggleJobType = (type: string) => {
    setSelectedJobTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]))
  }

  const toggleExperience = (level: string) => {
    setSelectedExperience((prev) => (prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]))
  }

  const toggleSaveJob = (jobId: string) => {
    setSavedJobs((prev) => (prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]))
  }

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
    let cleaned = text
      .replace(/^Summary:\s*/i, '')
      .replace(/\\n/g, ' ')
      .replace(/\n/g, ' ')
      .replace(/\s+/g, ' ')
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
          <Card className="bg-gray-800 border-gray-700 sticky top-8 text-white">
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
                    {[...JOB_TYPES, "Remote"].map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox
                          id={type}
                          checked={selectedJobTypes.includes(type)}
                          onCheckedChange={() => toggleJobType(type)}
                        />
                        <label htmlFor={type} className="text-sm text-gray-300 cursor-pointer">
                          {type}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Experience Level - Static for now as requested only changes to Type/Location */}
                <div>
                  <h3 className="font-medium mb-3">Experience Level</h3>
                  <div className="space-y-2">
                    {["Entry Level", "Mid Level", "Senior Level", "Executive"].map((level) => (
                      <div key={level} className="flex items-center space-x-2">
                        <Checkbox
                          id={level}
                          checked={selectedExperience.includes(level)}
                          onCheckedChange={() => toggleExperience(level)}
                        />
                        <label htmlFor={level} className="text-sm text-gray-300 cursor-pointer">
                          {level}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Salary Range */}
                <div>
                  <h3 className="font-medium mb-3">Salary Range</h3>
                  <Select value={selectedSalaryRange} onValueChange={setSelectedSalaryRange}>
                    <SelectTrigger className="bg-gray-800 border-gray-600">
                      <SelectValue placeholder="Any Salary" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any Salary</SelectItem>
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
                  <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                    <SelectTrigger className="bg-gray-800 border-gray-600">
                      <SelectValue placeholder="All Locations" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      {COUNTRIES.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                <Input
                  placeholder="Search jobs..."
                  className="pl-10 bg-gray-800 border-gray-700 text-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48 bg-gray-800 border-gray-700">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
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
          {!loading && !error && filteredJobs.length > 0 && (
            <div className="mb-6">
              <p className="text-gray-400">
                {filteredJobs.length} {filteredJobs.length === 1 ? "job" : "jobs"} found
                {searchQuery && ` for "${searchQuery}"`}
              </p>
            </div>
          )}

          {/* No Results */}
          {!loading && !error && jobs.length > 0 && filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400">No jobs match your search criteria. Try adjusting your filters.</p>
              <div className="mt-4">
                <Button
                  variant="outline"
                  className="border-gray-600 text-black hover:bg-gray-800"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedJobTypes([])
                    setSelectedCountry("")
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            </div>
          )}

          {/* Job Cards */}
          {!loading && !error && filteredJobs.length > 0 && (
            <div className="space-y-6">
              {filteredJobs.map((job) => (
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
                                {job.salary_range}
                              </span>
                            )}
                            <span className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {formatDate(job.created_at)}
                            </span>
                            <Badge variant="outline" className="text-xs border-gray-600 text-gray-300">
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
                              <Link href={`/jobs/${job.id}`}>
                                <Button variant="outline" size="sm" className="border-gray-600 text-black hover:border-blue-500 hover:bg-gray-700">
                                  View Details
                                </Button>
                              </Link>
                              {isAuthenticated ? (
                                <Link href={`/jobs/${job.id}/apply`}>
                                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                    Apply Now
                                  </Button>
                                </Link>
                              ) : (
                                <Button
                                  size="sm"
                                  className="bg-blue-600 hover:bg-blue-700"
                                  onClick={() => router.push(`/auth/signin?redirect=/jobs/${job.id}`)}
                                >
                                  Apply Now
                                </Button>
                              )}
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

          {/* Clear Filters Button (Bottom) */}
          {!loading && !error && (selectedJobTypes.length > 0 || selectedCountry || searchQuery) && (
            <div className="text-center mt-8">
              <Button
                variant="outline"
                className="border-gray-600 text-black hover:bg-gray-800"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedJobTypes([])
                  setSelectedCountry("")
                  setSelectedSalaryRange("")
                  setSelectedExperience([])
                }}
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
