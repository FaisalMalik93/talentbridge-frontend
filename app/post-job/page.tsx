"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Plus, X, MapPin, DollarSign, Clock, Building, Briefcase } from "lucide-react"
import { jobsService } from "@/lib/services/jobs.service"
import { toast } from "sonner"

export default function PostJobPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    department: "",
    job_type: "",
    experience_level: "",
    work_mode: "",
    country: "",
    city: "",
    currency: "",
    min_salary: "",
    max_salary: "",
    summary: "",
    responsibilities: "",
    requirements: "",
    nice_to_have: "",
  })

  const [skills, setSkills] = useState<string[]>([])
  const [newSkill, setNewSkill] = useState("")
  const [benefits, setBenefits] = useState<string[]>([])

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()])
      setNewSkill("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove))
  }

  const toggleBenefit = (benefit: string) => {
    setBenefits((prev) => (prev.includes(benefit) ? prev.filter((b) => b !== benefit) : [...prev, benefit]))
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handlePublish = async () => {
    // Validation
    if (!formData.title.trim()) {
      toast.error("Please enter a job title")
      return
    }
    if (!formData.company.trim()) {
      toast.error("Please enter a company name")
      return
    }
    if (!formData.job_type) {
      toast.error("Please select a job type")
      return
    }

    // Build description from summary, responsibilities, and requirements
    let description = ""
    if (formData.summary) {
      description += `Summary:\\n${formData.summary}\\n\\n`
    }
    if (formData.responsibilities) {
      description += `Responsibilities:\\n${formData.responsibilities}\\n\\n`
    }
    if (formData.requirements) {
      description += `Requirements:\\n${formData.requirements}\\n\\n`
    }
    if (formData.nice_to_have) {
      description += `Nice to Have:\\n${formData.nice_to_have}\\n\\n`
    }

    // Build requirements array
    const requirementsArray = [
      ...formData.requirements.split("\\n").filter((r) => r.trim()),
      ...skills
    ]

    // Build salary range
    let salary_range = ""
    if (formData.min_salary && formData.max_salary) {
      const currencySymbol = formData.currency === "usd" ? "$" : formData.currency === "eur" ? "€" : formData.currency === "gbp" ? "£" : "C$"
      salary_range = `${currencySymbol}${formData.min_salary} - ${currencySymbol}${formData.max_salary}`
    }

    // Build location
    let location = formData.city || formData.country || "Remote"
    if (formData.city && formData.country) {
      location = `${formData.city}, ${formData.country}`
    }

    try {
      setIsSubmitting(true)

      const jobData = {
        title: formData.title,
        company: formData.company,
        description: description.trim() || "No description provided",
        requirements: requirementsArray,
        location,
        salary_range: salary_range || "Not specified",
        job_type: formData.job_type,
      }

      await jobsService.createJob(jobData)

      toast.success("Job posted successfully!")
      router.push("/dashboard")
    } catch (error: any) {
      console.error("Error posting job:", error)
      toast.error(error?.message || "Failed to post job")
    } finally {
      setIsSubmitting(false)
    }
  }

  const commonBenefits = [
    "Health Insurance",
    "Dental Insurance",
    "Vision Insurance",
    "401(k) Match",
    "Flexible Schedule",
    "Remote Work",
    "Paid Time Off",
    "Stock Options",
    "Learning Budget",
    "Gym Membership",
    "Free Meals",
    "Commuter Benefits",
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-white">Post a New Job</h1>
        <p className="text-gray-400">Create a compelling job posting to attract the best candidates</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-8">
          {/* Basic Information */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-white">
                <Briefcase className="w-5 h-5" />
                <span>Basic Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-white">
              <div>
                <Label htmlFor="jobTitle">Job Title *</Label>
                <Input
                  id="jobTitle"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="e.g. Senior Frontend Developer"
                  className="bg-gray-700 border-gray-600 text-white mt-2"
                />
              </div>

              <div>
                <Label htmlFor="company">Company Name *</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => handleInputChange("company", e.target.value)}
                  placeholder="e.g. Acme Corp"
                  className="bg-gray-700 border-gray-600 text-white mt-2"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="department">Department</Label>
                  <Select value={formData.department} onValueChange={(value) => handleInputChange("department", value)}>
                    <SelectTrigger className="bg-gray-700 border-gray-600 mt-2">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="engineering">Engineering</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="product">Product</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="sales">Sales</SelectItem>
                      <SelectItem value="hr">Human Resources</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="jobType">Job Type *</Label>
                  <Select value={formData.job_type} onValueChange={(value) => handleInputChange("job_type", value)}>
                    <SelectTrigger className="bg-gray-700 border-gray-600 mt-2">
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Full-time">Full-time</SelectItem>
                      <SelectItem value="Part-time">Part-time</SelectItem>
                      <SelectItem value="Contract">Contract</SelectItem>
                      <SelectItem value="Freelance">Freelance</SelectItem>
                      <SelectItem value="Internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="experience">Experience Level</Label>
                  <Select value={formData.experience_level} onValueChange={(value) => handleInputChange("experience_level", value)}>
                    <SelectTrigger className="bg-gray-700 border-gray-600 mt-2">
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                      <SelectItem value="mid">Mid Level (2-5 years)</SelectItem>
                      <SelectItem value="senior">Senior Level (5+ years)</SelectItem>
                      <SelectItem value="lead">Lead/Principal (8+ years)</SelectItem>
                      <SelectItem value="executive">Executive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="workMode">Work Mode</Label>
                  <Select value={formData.work_mode} onValueChange={(value) => handleInputChange("work_mode", value)}>
                    <SelectTrigger className="bg-gray-700 border-gray-600 mt-2">
                      <SelectValue placeholder="Select work mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="remote">Remote</SelectItem>
                      <SelectItem value="onsite">On-site</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location & Compensation */}
          <Card className="bg-gray-800 border-gray-700 text-white">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="w-5 h-5" />
                <span>Location & Compensation</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Select value={formData.country} onValueChange={(value) => handleInputChange("country", value)}>
                    <SelectTrigger className="bg-gray-700 border-gray-600 mt-2">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="United States">United States</SelectItem>
                      <SelectItem value="Canada">Canada</SelectItem>
                      <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                      <SelectItem value="Germany">Germany</SelectItem>
                      <SelectItem value="Australia">Australia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    placeholder="e.g. San Francisco"
                    className="bg-gray-700 border-gray-600 text-white mt-2"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="currency">Currency</Label>
                  <Select value={formData.currency} onValueChange={(value) => handleInputChange("currency", value)}>
                    <SelectTrigger className="bg-gray-700 border-gray-600 mt-2">
                      <SelectValue placeholder="Currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usd">USD ($)</SelectItem>
                      <SelectItem value="eur">EUR (€)</SelectItem>
                      <SelectItem value="gbp">GBP (£)</SelectItem>
                      <SelectItem value="cad">CAD (C$)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="minSalary">Min Salary</Label>
                  <Input
                    id="minSalary"
                    type="number"
                    value={formData.min_salary}
                    onChange={(e) => handleInputChange("min_salary", e.target.value)}
                    placeholder="50000"
                    className="bg-gray-700 border-gray-600 text-white mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="maxSalary">Max Salary</Label>
                  <Input
                    id="maxSalary"
                    type="number"
                    value={formData.max_salary}
                    onChange={(e) => handleInputChange("max_salary", e.target.value)}
                    placeholder="80000"
                    className="bg-gray-700 border-gray-600 text-white mt-2"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Job Description */}
          <Card className="bg-gray-800 border-gray-700 text-white">
            <CardHeader>
              <CardTitle>Job Description</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="summary">Job Summary</Label>
                <Textarea
                  id="summary"
                  value={formData.summary}
                  onChange={(e) => handleInputChange("summary", e.target.value)}
                  placeholder="Brief overview of the role and what the candidate will be doing..."
                  className="bg-gray-700 border-gray-600 text-white mt-2 min-h-[100px]"
                />
              </div>

              <div>
                <Label htmlFor="responsibilities">Key Responsibilities</Label>
                <Textarea
                  id="responsibilities"
                  value={formData.responsibilities}
                  onChange={(e) => handleInputChange("responsibilities", e.target.value)}
                  placeholder="• Develop and maintain web applications&#10;• Collaborate with cross-functional teams&#10;• Write clean, maintainable code..."
                  className="bg-gray-700 border-gray-600 text-white mt-2 min-h-[150px]"
                />
              </div>

              <div>
                <Label htmlFor="requirements">Requirements</Label>
                <Textarea
                  id="requirements"
                  value={formData.requirements}
                  onChange={(e) => handleInputChange("requirements", e.target.value)}
                  placeholder="• Bachelor's degree in Computer Science or related field&#10;• 3+ years of experience with React&#10;• Strong knowledge of JavaScript/TypeScript..."
                  className="bg-gray-700 border-gray-600 text-white mt-2 min-h-[150px]"
                />
              </div>

              <div>
                <Label htmlFor="niceToHave">Nice to Have</Label>
                <Textarea
                  id="niceToHave"
                  value={formData.nice_to_have}
                  onChange={(e) => handleInputChange("nice_to_have", e.target.value)}
                  placeholder="• Experience with Next.js&#10;• Knowledge of GraphQL&#10;• Previous startup experience..."
                  className="bg-gray-700 border-gray-600 text-white mt-2 min-h-[100px]"
                />
              </div>
            </CardContent>
          </Card>

          {/* Skills & Technologies */}
          <Card className="bg-gray-800 border-gray-700 text-white">
            <CardHeader>
              <CardTitle>Skills & Technologies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="skills">Required Skills</Label>
                <div className="flex space-x-2 mt-2">
                  <Input
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add a skill (e.g. React, Python)"
                    className="bg-gray-700 border-gray-600 text-white"
                    onKeyPress={(e) => e.key === "Enter" && addSkill()}
                  />
                  <Button onClick={addSkill} className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                {skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="bg-blue-600/20 text-blue-300">
                        {skill}
                        <button onClick={() => removeSkill(skill)} className="ml-2 hover:text-red-400">
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Benefits */}
          <Card className="bg-gray-800 border-gray-700 text-white">
            <CardHeader>
              <CardTitle>Benefits & Perks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {commonBenefits.map((benefit) => (
                  <div key={benefit} className="flex items-center space-x-2">
                    <Checkbox
                      id={benefit}
                      checked={benefits.includes(benefit)}
                      onCheckedChange={() => toggleBenefit(benefit)}
                    />
                    <Label htmlFor={benefit} className="text-sm text-gray-300">
                      {benefit}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Job Preview */}
          <Card className="bg-gray-800 border-gray-700 text-white">
            <CardHeader>
              <CardTitle>Job Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-sm">
                  <Building className="w-4 h-4 text-gray-400" />
                  <span className="text-white">{formData.company || "Your Company"}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-white">{formData.city || formData.country || "Location"}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <DollarSign className="w-4 h-4 text-gray-400" />
                  <span className="text-white">
                    {formData.min_salary && formData.max_salary
                      ? `${formData.min_salary} - ${formData.max_salary}`
                      : "Salary range"}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-white">{formData.job_type || "Job type"}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={handlePublish}
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              {isSubmitting ? "Publishing..." : "Publish Job"}
            </Button>
            <Button
              variant="outline"
              className="w-full border-gray-600 text-black hover:bg-gray-800"
              disabled={isSubmitting}
            >
              Save as Draft
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
