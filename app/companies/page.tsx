"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, MapPin, Users, Star, Building, Filter, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function CompaniesPage() {
  const [followedCompanies, setFollowedCompanies] = useState<number[]>([])

  const toggleFollowCompany = (companyId: number) => {
    setFollowedCompanies((prev) =>
      prev.includes(companyId) ? prev.filter((id) => id !== companyId) : [...prev, companyId],
    )
  }

  const companies = [
    {
      id: 1,
      name: "TechCorp Inc.",
      logo: "🚀",
      industry: "Technology",
      size: "1000-5000",
      location: "San Francisco, CA",
      rating: 4.8,
      reviews: 234,
      openJobs: 12,
      description: "Leading technology company focused on innovative solutions and cutting-edge software development.",
      benefits: ["Remote Work", "Health Insurance", "Stock Options", "Flexible Hours"],
      techStack: ["React", "Node.js", "AWS", "Python"],
    },
    {
      id: 2,
      name: "DesignStudio",
      logo: "🎨",
      industry: "Design",
      size: "50-200",
      location: "New York, NY",
      rating: 4.6,
      reviews: 89,
      openJobs: 5,
      description: "Creative design agency specializing in brand identity, web design, and user experience.",
      benefits: ["Creative Freedom", "Health Insurance", "Paid Time Off", "Learning Budget"],
      techStack: ["Figma", "Adobe Creative Suite", "Sketch", "Principle"],
    },
    {
      id: 3,
      name: "StartupXYZ",
      logo: "💡",
      industry: "Fintech",
      size: "10-50",
      location: "Austin, TX",
      rating: 4.4,
      reviews: 45,
      openJobs: 8,
      description: "Fast-growing fintech startup revolutionizing digital payments and financial services.",
      benefits: ["Equity", "Flexible Schedule", "Health Insurance", "Growth Opportunities"],
      techStack: ["React", "Python", "PostgreSQL", "Docker"],
    },
    {
      id: 4,
      name: "CloudTech Solutions",
      logo: "☁️",
      industry: "Cloud Computing",
      size: "500-1000",
      location: "Seattle, WA",
      rating: 4.7,
      reviews: 156,
      openJobs: 15,
      description: "Enterprise cloud solutions provider helping businesses scale and modernize their infrastructure.",
      benefits: ["Remote Work", "401k Match", "Health Insurance", "Professional Development"],
      techStack: ["AWS", "Kubernetes", "Terraform", "Go"],
    },
    {
      id: 5,
      name: "GrowthCo Marketing",
      logo: "📈",
      industry: "Marketing",
      size: "200-500",
      location: "Los Angeles, CA",
      rating: 4.3,
      reviews: 78,
      openJobs: 6,
      description: "Full-service digital marketing agency helping brands grow through data-driven strategies.",
      benefits: ["Flexible Hours", "Health Insurance", "Bonus Structure", "Team Events"],
      techStack: ["Google Analytics", "HubSpot", "Salesforce", "Adobe Creative Suite"],
    },
    {
      id: 6,
      name: "DataFlow Analytics",
      logo: "📊",
      industry: "Data Science",
      size: "100-500",
      location: "Boston, MA",
      rating: 4.9,
      reviews: 112,
      openJobs: 9,
      description: "Advanced analytics and machine learning company providing insights for enterprise clients.",
      benefits: ["Remote Work", "Stock Options", "Health Insurance", "Learning Budget"],
      techStack: ["Python", "R", "TensorFlow", "Apache Spark"],
    },
  ]

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
            <Card className="bg-gray-800 border-gray-700 sticky top-8">
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
                      {["Technology", "Design", "Fintech", "Marketing", "Healthcare", "E-commerce"].map((industry) => (
                        <div key={industry} className="flex items-center space-x-2">
                          <Checkbox id={industry} />
                          <label htmlFor={industry} className="text-sm text-gray-300">
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
                          <Checkbox id={size} />
                          <label htmlFor={size} className="text-sm text-gray-300">
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
                      {["Remote", "San Francisco", "New York", "Austin", "Seattle", "Boston"].map((location) => (
                        <div key={location} className="flex items-center space-x-2">
                          <Checkbox id={location} />
                          <label htmlFor={location} className="text-sm text-gray-300">
                            {location}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Rating */}
                  <div>
                    <h3 className="font-medium mb-3">Rating</h3>
                    <Select>
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
                  <Input placeholder="Search companies..." className="pl-10 bg-gray-800 border-gray-700 text-white" />
                </div>
                <Select>
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
              <p className="text-gray-400">{companies.length} companies found</p>
            </div>

            {/* Company Cards */}
            <div className="space-y-6">
              {companies.map((company) => (
                <Card key={company.id} className="bg-gray-800 border-gray-700 hover:border-blue-500 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-4">
                        <div className="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center text-3xl">
                          {company.logo}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-xl font-semibold text-white">{company.name}</h3>
                            <Badge variant="secondary" className="bg-blue-600/20 text-blue-300">
                              {company.industry}
                            </Badge>
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
                          <p className="text-gray-300 mb-4">{company.description}</p>

                          {/* Benefits */}
                          <div className="mb-4">
                            <p className="text-sm text-gray-400 mb-2">Benefits:</p>
                            <div className="flex flex-wrap gap-2">
                              {company.benefits.map((benefit) => (
                                <Badge
                                  key={benefit}
                                  variant="outline"
                                  className="text-xs border-green-600 text-green-400"
                                >
                                  {benefit}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          {/* Tech Stack */}
                          <div>
                            <p className="text-sm text-gray-400 mb-2">Tech Stack:</p>
                            <div className="flex flex-wrap gap-2">
                              {company.techStack.map((tech) => (
                                <Badge
                                  key={tech}
                                  variant="secondary"
                                  className="text-xs bg-purple-600/20 text-purple-300"
                                >
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>
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
                          className={followedCompanies.includes(company.id) ? "border-blue-500 text-blue-400" : ""}
                        >
                          {followedCompanies.includes(company.id) ? "Following" : "Follow"}
                        </Button>
                        <Button variant="outline" size="sm">
                          <ExternalLink className="w-4 h-4 mr-1" />
                          Visit Website
                        </Button>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          View Jobs ({company.openJobs})
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
                Load More Companies
              </Button>
            </div>
          </div>
        </div>
      </div>
  )
}
