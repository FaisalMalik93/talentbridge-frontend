"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Heart,
  MapPin,
  DollarSign,
  Clock,
  Building,
  Share2,
  Trash2,
  Star,
  Loader2,
} from "lucide-react"
import Link from "next/link"
import jobsService from "@/lib/services/jobs.service"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export default function SavedJobsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [jobs, setJobs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [removingId, setRemovingId] = useState<string | null>(null)
  const router = useRouter()

  const fetchSavedJobs = async () => {
    try {
      const response = await jobsService.getSavedJobs()
      if (response.data) {
        setJobs(response.data)
      }
    } catch (error) {
      console.error("Failed to fetch saved jobs", error)
      toast.error("Failed to load saved jobs")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSavedJobs()
  }, [])

  const removeJob = async (jobId: string) => {
    try {
      setRemovingId(jobId)
      await jobsService.unsaveJob(jobId)
      setJobs(jobs.filter((job) => job.id !== jobId))
      toast.success("Job removed from saved list")
    } catch (error) {
      toast.error("Failed to remove job")
    } finally {
      setRemovingId(null)
    }
  }

  const filteredJobs = jobs
    .filter(
      (job) =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.savedDate).getTime() - new Date(a.savedDate).getTime()
        case "oldest":
          return new Date(a.savedDate).getTime() - new Date(b.savedDate).getTime()
        case "match":
          // Match score logic could be implemented if backend provided it
          return 0
        case "salary":
          // Simple string parsing for sorting
          const getSafeSalary = (s: string) => {
            if (!s) return 0;
            const num = s.match(/\d+/);
            return num ? parseInt(num[0]) : 0;
          }
          return getSafeSalary(b.salary) - getSafeSalary(a.salary)
        default:
          return 0
      }
    })

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 text-white">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Saved Jobs</h1>
        <p className="text-gray-400">Keep track of jobs you're interested in</p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search saved jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-800 border-gray-700 text-white"
            />
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48 bg-gray-800 border-gray-700">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Recently Saved</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="salary">Highest Salary</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6 text-center">
            <Heart className="w-8 h-8 text-red-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{jobs.length}</div>
            <p className="text-gray-400 text-sm">Saved Jobs</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6 text-center">
            <Building className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{new Set(jobs.map((job) => job.company)).size}</div>
            <p className="text-gray-400 text-sm">Companies</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6 text-center">
            <MapPin className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">
              {jobs.filter((job) => job.location === "Remote").length}
            </div>
            <p className="text-gray-400 text-sm">Remote Jobs</p>
          </CardContent>
        </Card>
      </div>

      {/* Job Listings */}
      {filteredJobs.length > 0 ? (
        <div className="space-y-6">
          {filteredJobs.map((job) => (
            <Card key={job.id} className="bg-gray-800 border-gray-700 hover:border-blue-500 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center text-2xl">
                      {job.logo}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-semibold text-white">{job.title}</h3>
                        {/* Match score not available yet
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-semibold text-green-400">{job.matchScore}% match</span>
                          </div>
                          */}
                      </div>
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
                          Posted {new Date(job.postedDate).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-300 mb-4 line-clamp-2">{job.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {job.skills.slice(0, 3).map((skill: string) => (
                          <Badge key={skill} variant="secondary" className="bg-blue-600/20 text-blue-300">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400 mb-1">Saved</p>
                    <p className="text-sm text-white">{new Date(job.savedDate).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-xs border-gray-600 text-gray-300">
                      {job.type}
                    </Badge>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeJob(job.id)}
                      disabled={removingId === job.id}
                      className="text-red-400 hover:text-red-300 hover:bg-red-600/10"
                    >
                      {removingId === job.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                    </Button>
                    {/* Removing Share button for now as it's not implemented */}

                    <Link href={`/jobs/${job.id}`}>
                      <Button variant="outline" size="sm" className="border-gray-600 text-black hover:bg-gray-700">
                        View Details
                      </Button>
                    </Link>

                    <Link href={`/jobs/${job.id}/apply`}>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        Apply Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-12 text-center">
            <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">{searchTerm ? "No jobs found" : "No saved jobs yet"}</h3>
            <p className="text-gray-400 mb-6">
              {searchTerm
                ? "Try adjusting your search terms"
                : "Start browsing jobs and save the ones you're interested in"}
            </p>
            <Link href="/jobs">
              <Button className="bg-blue-600 hover:bg-blue-700">Browse Jobs</Button>
            </Link>
          </CardContent>
        </Card>
      )}
      {/* Bulk Actions */}
      {filteredJobs.length > 0 && (
        <div className="mt-8 flex justify-center">
          <div className="flex space-x-4">
            <Button variant="outline" className="border-gray-600 text-black hover:bg-gray-800">
              Apply to Selected
            </Button>
            <Button variant="outline" className="border-red-600 text-red-400 hover:bg-red-600/10">
              Remove Selected
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

