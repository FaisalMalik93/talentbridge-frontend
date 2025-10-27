"use client"

import { useState, useEffect } from "react"
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
  Loader2,
} from "lucide-react"
import candidatesService, { type Candidate } from "@/lib/services/candidates.service"
import { toast } from "sonner"

export default function CandidatesPage() {
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([])
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<"match" | "recent" | "experience">("match")
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])

  // Available skills for filtering (extracted from candidates)
  const [availableSkills, setAvailableSkills] = useState<string[]>([])

  useEffect(() => {
    fetchCandidates()
  }, [])

  const fetchCandidates = async () => {
    try {
      setLoading(true)
      const response = await candidatesService.getCandidates()

      // Check for errors
      if (response.error) {
        toast.error(response.error)
        setLoading(false)
        return
      }

      // Access data from ApiResponse wrapper
      const candidatesData = response.data?.candidates || []

      // Debug: log the data structure
      console.log('Candidates data:', candidatesData)
      if (candidatesData.length > 0) {
        console.log('First candidate:', candidatesData[0])
      }

      setCandidates(candidatesData)
      setFilteredCandidates(candidatesData)

      // Extract unique skills
      const allSkills = new Set<string>()
      candidatesData.forEach((candidate) => {
        if (candidate.skills && Array.isArray(candidate.skills)) {
          candidate.skills.forEach((skill) => {
            if (typeof skill === 'string') {
              allSkills.add(skill)
            }
          })
        }
      })
      setAvailableSkills(Array.from(allSkills).slice(0, 10)) // Limit to 10 most common
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch candidates")
    } finally {
      setLoading(false)
    }
  }

  // Apply filters and search
  useEffect(() => {
    let filtered = [...candidates]

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (c) =>
          (c.name && c.name.toLowerCase().includes(query)) ||
          (c.title && c.title.toLowerCase().includes(query)) ||
          (c.skills && Array.isArray(c.skills) && c.skills.some((skill) => typeof skill === 'string' && skill.toLowerCase().includes(query)))
      )
    }

    // Skills filter
    if (selectedSkills.length > 0) {
      filtered = filtered.filter((c) =>
        c.skills && Array.isArray(c.skills) && selectedSkills.some((skill) => c.skills.map((s) => typeof s === 'string' ? s.toLowerCase() : '').includes(skill.toLowerCase()))
      )
    }

    // Sort
    if (sortBy === "match") {
      filtered.sort((a, b) => b.overall_score - a.overall_score)
    } else if (sortBy === "recent") {
      filtered.sort((a, b) => new Date(b.last_active).getTime() - new Date(a.last_active).getTime())
    } else if (sortBy === "experience") {
      filtered.sort((a, b) => b.overall_score - a.overall_score) // Using score as proxy for experience
    }

    setFilteredCandidates(filtered)
  }, [searchQuery, selectedSkills, sortBy, candidates])

  const toggleSelectCandidate = (candidateId: string) => {
    setSelectedCandidates((prev) =>
      prev.includes(candidateId) ? prev.filter((id) => id !== candidateId) : [...prev, candidateId]
    )
  }

  const toggleSkillFilter = (skill: string) => {
    setSelectedSkills((prev) => (prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]))
  }

  const getRelativeTime = (date: string) => {
    const now = new Date()
    const past = new Date(date)
    const diffMs = now.getTime() - past.getTime()
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return "Today"
    if (diffDays === 1) return "1 day ago"
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
    return `${Math.floor(diffDays / 30)} months ago`
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Candidate Database</h1>
        <p className="text-gray-400">Discover and connect with top talent using AI-powered matching</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <Card className="bg-gray-800 border-gray-700 sticky top-24">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-6">
                <Filter className="w-5 h-5" />
                <h2 className="text-lg font-semibold">Filters</h2>
              </div>

              <div className="space-y-6">
                {/* Skills */}
                <div>
                  <h3 className="font-medium mb-3">Skills</h3>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {availableSkills.map((skill) => (
                      <div key={skill} className="flex items-center space-x-2">
                        <Checkbox
                          id={skill}
                          checked={selectedSkills.includes(skill)}
                          onCheckedChange={() => toggleSkillFilter(skill)}
                        />
                        <label htmlFor={skill} className="text-sm text-gray-300 cursor-pointer">
                          {skill}
                        </label>
                      </div>
                    ))}
                  </div>
                  {selectedSkills.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-2 text-blue-400"
                      onClick={() => setSelectedSkills([])}
                    >
                      Clear all
                    </Button>
                  )}
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
                <Input
                  placeholder="Search candidates by name, title, or skills..."
                  className="pl-10 bg-gray-800 border-gray-700 text-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                <SelectTrigger className="w-48 bg-gray-800 border-gray-700">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="match">Best Match</SelectItem>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="experience">Most Experienced</SelectItem>
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
            <p className="text-gray-400">
              {loading ? "Loading..." : `${filteredCandidates.length} candidates found`}
            </p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
            </div>
          )}

          {/* Empty State */}
          {!loading && filteredCandidates.length === 0 && (
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-12 text-center">
                <p className="text-gray-400 text-lg">No candidates found matching your criteria</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedSkills([])
                  }}
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Candidate Cards */}
          {!loading && filteredCandidates.length > 0 && (
            <div className="space-y-6">
              {filteredCandidates.map((candidate) => (
                <Card key={candidate.id} className="bg-gray-800 border-gray-700 hover:border-blue-500 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-4 flex-1">
                        <Checkbox
                          checked={selectedCandidates.includes(candidate.id)}
                          onCheckedChange={() => toggleSelectCandidate(candidate.id)}
                          className="mt-1"
                        />
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-2xl font-bold">
                          {candidate.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-xl font-semibold text-white">{candidate.name}</h3>
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm font-semibold text-green-400">
                                {Math.round(candidate.overall_score)}% match
                              </span>
                            </div>
                          </div>
                          <p className="text-blue-400 mb-2">{candidate.title}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                            <span className="flex items-center">
                              <Briefcase className="w-4 h-4 mr-1" />
                              {typeof candidate.experience === 'string'
                                ? candidate.experience
                                : (typeof candidate.experience === 'object' && candidate.experience?.duration)
                                  ? candidate.experience.duration
                                  : "Not specified"}
                            </span>
                            {candidate.education && typeof candidate.education === 'object' && Object.keys(candidate.education).length > 0 && (
                              <span className="flex items-center">
                                <GraduationCap className="w-4 h-4 mr-1" />
                                {candidate.education.degree || candidate.education.title || "Education"}
                              </span>
                            )}
                          </div>
                          {candidate.summary && <p className="text-gray-300 mb-4 line-clamp-2">{candidate.summary}</p>}

                          {/* Skills */}
                          <div className="mb-4">
                            <div className="flex flex-wrap gap-2">
                              {candidate.skills && Array.isArray(candidate.skills) && candidate.skills.slice(0, 8).map((skill, index) => (
                                <Badge key={`${candidate.id}-skill-${index}`} variant="secondary" className="bg-blue-600/20 text-blue-300">
                                  {typeof skill === 'string' ? skill : JSON.stringify(skill)}
                                </Badge>
                              ))}
                              {candidate.skills && candidate.skills.length > 8 && (
                                <Badge variant="secondary" className="bg-gray-700 text-gray-300">
                                  +{candidate.skills.length - 8} more
                                </Badge>
                              )}
                            </div>
                          </div>

                          {/* Additional Info */}
                          <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-gray-400">Last Active:</span>
                              <p className="text-white">{getRelativeTime(candidate.last_active)}</p>
                            </div>
                            <div>
                              <span className="text-gray-400">CVs Uploaded:</span>
                              <p className="text-white">{candidate.total_cvs}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-2xl font-bold text-green-400 mb-1">
                          {Math.round(candidate.overall_score)}%
                        </div>
                        <p className="text-sm text-gray-400">AI Score</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <span>{candidate.email}</span>
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
          )}
        </div>
      </div>
    </div>
  )
}
