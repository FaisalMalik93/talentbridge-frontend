"use client"

import { useState, useMemo, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, MapPin, Users, Star, Building, Filter, ExternalLink, Loader2 } from "lucide-react"
import Link from "next/link"
import companiesService, { type Company } from "@/lib/services/companies.service"
import { toast } from "sonner"

export default function CompaniesPage() {
  const [followedCompanies, setFollowedCompanies] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("")
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])
  const [minRating, setMinRating] = useState<number | null>(null)

  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCompanies()
  }, [])

  const fetchCompanies = async () => {
    try {
      setLoading(true)
      const response = await companiesService.getCompanies()

      if (response.error) {
        toast.error(response.error)
        return
      }

      if (response.data) {
        setCompanies(response.data)
      }
    } catch (error) {
      toast.error("Failed to fetch companies")
    } finally {
      setLoading(false)
    }
  }

  const toggleFollowCompany = (companyId: string) => {
    setFollowedCompanies((prev) =>
      prev.includes(companyId) ? prev.filter((id) => id !== companyId) : [...prev, companyId],
    )
  }

  const toggleFilter = (value: string, currentFilters: string[], setFilters: (filters: string[]) => void) => {
    if (currentFilters.includes(value)) {
      setFilters(currentFilters.filter((item) => item !== value))
    } else {
      setFilters([...currentFilters, value])
    }
  }

  // Helper function to match company size with filter ranges
  const matchesSize = (companySize: string, filterSize: string): boolean => {
    const sizeMap: { [key: string]: string[] } = {
      "1-10": ["1-10", "10-50"],
      "11-50": ["10-50", "11-50"],
      "51-200": ["50-200"],
      "201-1000": ["100-500", "200-500", "500-1000"],
      "1000+": ["1000-5000"],
    }
    return sizeMap[filterSize]?.includes(companySize) || false
  }

  // Filter and sort companies
  const filteredAndSortedCompanies = useMemo(() => {
    let result = [...companies]

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (company) =>
          company.name.toLowerCase().includes(query) ||
          company.description.toLowerCase().includes(query) ||
          company.industry.toLowerCase().includes(query)
      )
    }

    // Industry filter
    if (selectedIndustries.length > 0) {
      result = result.filter((company) => selectedIndustries.includes(company.industry))
    }

    // Size filter
    if (selectedSizes.length > 0) {
      result = result.filter((company) => selectedSizes.some((size) => matchesSize(company.size, size)))
    }

    // Location filter
    if (selectedLocations.length > 0) {
      result = result.filter((company) =>
        selectedLocations.some((loc) => company.location.includes(loc))
      )
    }

    // Rating filter
    if (minRating !== null) {
      result = result.filter((company) => company.rating >= minRating)
    }

    // Sorting
    if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating)
    } else if (sortBy === "jobs") {
      result.sort((a, b) => b.openJobs - a.openJobs)
    } else if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name))
    } else if (sortBy === "size") {
      const sizeOrder = ["10-50", "50-200", "100-500", "200-500", "500-1000", "1000-5000"]
      result.sort((a, b) => sizeOrder.indexOf(b.size) - sizeOrder.indexOf(a.size))
    }

    return result
  }, [companies, searchQuery, selectedIndustries, selectedSizes, selectedLocations, minRating, sortBy])

  return (
    <div className="container mx-auto px-4 py-8 text-white">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Discover Amazing Companies</h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Explore top companies, learn about their culture, and find your perfect workplace match
        </p>
      </div>

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
                {/* Industry */}
                <div>
                  <h3 className="font-medium mb-3">Industry</h3>
                  <div className="space-y-2">
                    {["Technology", "Software Solutions", "AI/ML", "ERP Solutions", "PropTech", "AI Technology", "Mobile Solutions"].map((industry) => (
                      <div key={industry} className="flex items-center space-x-2">
                        <Checkbox
                          id={industry}
                          checked={selectedIndustries.includes(industry)}
                          onCheckedChange={() => toggleFilter(industry, selectedIndustries, setSelectedIndustries)}
                        />
                        <label htmlFor={industry} className="text-sm text-gray-300 cursor-pointer">
                          {industry}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Company Size */}
                <div>
                  <h3 className="font-medium mb-3">Company Size</h3>
                  <div className="space-y-2">
                    {["1-10", "11-50", "51-200", "201-1000", "1000+"].map((size) => (
                      <div key={size} className="flex items-center space-x-2">
                        <Checkbox
                          id={size}
                          checked={selectedSizes.includes(size)}
                          onCheckedChange={() => toggleFilter(size, selectedSizes, setSelectedSizes)}
                        />
                        <label htmlFor={size} className="text-sm text-gray-300 cursor-pointer">
                          {size} employees
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Location */}
                <div>
                  <h3 className="font-medium mb-3">Location</h3>
                  <div className="space-y-2">
                    {["Remote", "Lahore", "Karachi", "Islamabad", "Rawalpindi", "Faisalabad"].map((location) => (
                      <div key={location} className="flex items-center space-x-2">
                        <Checkbox
                          id={location}
                          checked={selectedLocations.includes(location)}
                          onCheckedChange={() => toggleFilter(location, selectedLocations, setSelectedLocations)}
                        />
                        <label htmlFor={location} className="text-sm text-gray-300 cursor-pointer">
                          {location}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <h3 className="font-medium mb-3">Rating</h3>
                  <Select value={minRating?.toString() || ""} onValueChange={(value) => setMinRating(value ? parseFloat(value) : null)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Minimum rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="4.5">4.5+ stars</SelectItem>
                      <SelectItem value="4.0">4.0+ stars</SelectItem>
                      <SelectItem value="3.5">3.5+ stars</SelectItem>
                      <SelectItem value="3.0">3.0+ stars</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Company Listings */}
        <div className="lg:col-span-3">
          {/* Search Bar */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search companies..."
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
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="jobs">Most Jobs</SelectItem>
                  <SelectItem value="size">Company Size</SelectItem>
                  <SelectItem value="name">Company Name</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-400">{filteredAndSortedCompanies.length} companies found</p>
          </div>

          {/* Company Cards */}
          <div className="space-y-6">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
              </div>
            ) : filteredAndSortedCompanies.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">No companies found matching your criteria.</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedIndustries([])
                    setSelectedSizes([])
                    setSelectedLocations([])
                    setMinRating(null)
                    setSortBy("")
                  }}
                >
                  Clear all filters
                </Button>
              </div>
            ) : (
              filteredAndSortedCompanies.map((company) => (
                <Card key={company.id} className="bg-gray-800 border-gray-700 hover:border-blue-500 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-4">
                        <div className="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center text-3xl overflow-hidden">
                          {company.logo.startsWith('http') ? (
                            <img src={company.logo} alt={company.name} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-3xl">{company.logo}</span>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-xl font-semibold text-white">{company.name}</h3>
                            {company.industry && (
                              <Badge variant="secondary" className="bg-blue-600/20 text-blue-300">
                                {company.industry}
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                            <span className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {company.location}
                            </span>
                            <span className="flex items-center">
                              <Users className="w-4 h-4 mr-1" />
                              {company.size} employees
                            </span>
                            <span className="flex items-center">
                              <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                              {company.rating} ({company.reviews} reviews)
                            </span>
                          </div>
                          <p className="text-gray-300 mb-4 line-clamp-2">{company.description}</p>

                          {/* Benefits */}
                          {company.benefits && company.benefits.length > 0 && (
                            <div className="mb-4">
                              <p className="text-sm text-gray-400 mb-2">Benefits:</p>
                              <div className="flex flex-wrap gap-2">
                                {company.benefits.map((benefit, i) => (
                                  <Badge
                                    key={i}
                                    variant="outline"
                                    className="text-xs border-green-600 text-green-400"
                                  >
                                    {benefit}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Tech Stack */}
                          {company.techStack && company.techStack.length > 0 && (
                            <div>
                              <p className="text-sm text-gray-400 mb-2">Tech Stack:</p>
                              <div className="flex flex-wrap gap-2">
                                {company.techStack.map((tech, i) => (
                                  <Badge
                                    key={i}
                                    variant="secondary"
                                    className="text-xs bg-purple-600/20 text-purple-300"
                                  >
                                    {tech}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-400 mb-1">{company.openJobs}</div>
                        <p className="text-sm text-gray-400">Open Jobs</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                      <div className="flex items-center space-x-2">
                        <Building className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-400">Verified Company</span>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleFollowCompany(company.id)}
                          className={followedCompanies.includes(company.id) ? "border-blue-500 text-blue-400" : "border-gray-600 text-black hover:bg-gray-700"}
                        >
                          {followedCompanies.includes(company.id) ? "Following" : "Follow"}
                        </Button>
                        <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:text-white hover:bg-gray-700">
                          <ExternalLink className="w-4 h-4 mr-1" />
                          Visit Website
                        </Button>
                        <Link href={`/jobs?employer_id=${company.id}`}>
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            View Jobs ({company.openJobs})
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>


        </div>
      </div>
    </div>
  )
}
