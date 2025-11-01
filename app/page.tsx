'use client';

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Search, MapPin, Briefcase, Users, CheckCircle, Zap, Shield, Clock, Building } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/navigation/header"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Your next <span className="text-blue-400">remote</span> job is here
          </h1>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Connect with top companies and find your perfect remote position. Our AI-powered platform matches your
            skills with the right opportunities.
          </p>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto bg-white rounded-2xl p-6 shadow-2xl">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Job title or keyword"
                  className="pl-10 h-12 text-gray-900 border-0 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Select>
                  <SelectTrigger className="pl-10 h-12 text-gray-900 border-0">
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="remote">Remote</SelectItem>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <Select>
                  <SelectTrigger className="h-12 text-gray-900 border-0">
                    <SelectValue placeholder="Job Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Full Time</SelectItem>
                    <SelectItem value="part-time">Part Time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="freelance">Freelance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Link href="/jobs">
                <Button className="bg-blue-600 hover:bg-blue-700 h-12 px-8">Find job openings now</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Company Logos */}
      <section className="py-12 border-b border-gray-800">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-400 mb-8">Trusted by leading companies</p>
          <div className="flex justify-center items-center space-x-12 opacity-60">
            <div className="text-2xl font-bold">IPSUM</div>
            <div className="text-2xl font-bold">COMPANY</div>
            <div className="text-2xl font-bold">BRAND</div>
            <div className="text-2xl font-bold">LOGO</div>
            <div className="text-2xl font-bold">BUSINESS</div>
          </div>
        </div>
      </section>

      {/* Stats Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="bg-gradient-to-br from-blue-600 to-blue-800 border-0 text-white">
              <CardContent className="p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-3xl font-bold mb-2">Over 5,000 jobs posted</h3>
                    <p className="text-blue-100">Find your perfect match from thousands of opportunities</p>
                  </div>
                  <Briefcase className="w-12 h-12 text-blue-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-600 to-green-800 border-0 text-white">
              <CardContent className="p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-3xl font-bold mb-2">Approx. 2700 people hired</h3>
                    <p className="text-green-100">Join thousands who found their dream job</p>
                  </div>
                  <Users className="w-12 h-12 text-green-200" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Job Search Preview */}
      <section className="py-16 bg-gray-800/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What's your next job?</h2>
            <p className="text-gray-400">AI-powered job matching</p>
          </div>

          {/* Search Interface */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-gray-800 rounded-xl p-6">
              <div className="flex flex-wrap gap-4 mb-6">
                <Select>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="remote">Remote</SelectItem>
                    <SelectItem value="onsite">On-site</SelectItem>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entry">Entry Level</SelectItem>
                    <SelectItem value="mid">Mid Level</SelectItem>
                    <SelectItem value="senior">Senior Level</SelectItem>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Salary Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-50k">$0 - $50k</SelectItem>
                    <SelectItem value="50k-100k">$50k - $100k</SelectItem>
                    <SelectItem value="100k+">$100k+</SelectItem>
                  </SelectContent>
                </Select>

                <Link href="/jobs">
                  <Button className="bg-blue-600 hover:bg-blue-700">Search</Button>
                </Link>
              </div>

              {/* Filter Tags */}
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="bg-blue-600/20 text-blue-300">
                  UI Designer
                </Badge>
                <Badge variant="secondary" className="bg-blue-600/20 text-blue-300">
                  Frontend
                </Badge>
                <Badge variant="secondary" className="bg-blue-600/20 text-blue-300">
                  Senior Developer
                </Badge>
                <Badge variant="secondary" className="bg-blue-600/20 text-blue-300">
                  Product
                </Badge>
                <Badge variant="secondary" className="bg-blue-600/20 text-blue-300">
                  Marketing
                </Badge>
                <Badge variant="secondary" className="bg-blue-600/20 text-blue-300">
                  Remote
                </Badge>
              </div>
            </div>
          </div>

          {/* Job Listings Preview */}
          <div className="max-w-4xl mx-auto space-y-4">
            {[
              {
                title: "Social media intern",
                company: "TechCorp",
                location: "Remote",
                salary: "$40k - $60k",
                type: "Internship",
                logo: "🚀",
              },
              {
                title: "Social media specialist",
                company: "StartupXYZ",
                location: "New York, NY",
                salary: "$60k - $80k",
                type: "Full-time",
                logo: "💼",
              },
              {
                title: "UI/UX designer",
                company: "DesignStudio",
                location: "Remote",
                salary: "$70k - $90k",
                type: "Full-time",
                logo: "🎨",
              },
            ].map((job, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700 hover:border-blue-500 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center text-2xl">
                        {job.logo}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{job.title}</h3>
                        <p className="text-gray-400">{job.company}</p>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                          <span className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {job.location}
                          </span>
                          <span>{job.salary}</span>
                          <Badge variant="outline" className="text-xs border-gray-600 text-gray-300">
                            {job.type}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Link href="/jobs">
                        <Button variant="outline" size="sm" className="border-gray-600 text-black hover:bg-gray-700">
                          View Details
                        </Button>
                      </Link>
                      <Link href="/auth/signin">
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
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-br from-blue-600 to-blue-800 border-0 text-white">
              <CardContent className="p-8">
                <CheckCircle className="w-12 h-12 text-blue-200 mb-4" />
                <h3 className="text-xl font-bold mb-2">Fair curation and selection</h3>
                <p className="text-blue-100">
                  AI-powered matching ensures fair and unbiased candidate selection based on skills and experience.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-600 to-green-800 border-0 text-white">
              <CardContent className="p-8">
                <Users className="w-12 h-12 text-green-200 mb-4" />
                <h3 className="text-xl font-bold mb-2">All welcome</h3>
                <p className="text-green-100">
                  Inclusive platform welcoming talent from all backgrounds and experience levels.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-600 to-purple-800 border-0 text-white">
              <CardContent className="p-8">
                <Shield className="w-12 h-12 text-purple-200 mb-4" />
                <h3 className="text-xl font-bold mb-2">Company verification</h3>
                <p className="text-purple-100">
                  All companies are verified to ensure legitimate job opportunities and secure applications.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-yellow-600 to-yellow-800 border-0 text-white">
              <CardContent className="p-8">
                <Zap className="w-12 h-12 text-yellow-200 mb-4" />
                <h3 className="text-xl font-bold mb-2">Lightning fast</h3>
                <p className="text-yellow-100">Get instant CV analysis and job recommendations in under 3 seconds.</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-red-600 to-red-800 border-0 text-white">
              <CardContent className="p-8">
                <Clock className="w-12 h-12 text-red-200 mb-4" />
                <h3 className="text-xl font-bold mb-2">Person-less</h3>
                <p className="text-red-100">Automated screening process eliminates human bias and speeds up hiring.</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-indigo-600 to-indigo-800 border-0 text-white">
              <CardContent className="p-8">
                <Building className="w-12 h-12 text-indigo-200 mb-4" />
                <h3 className="text-xl font-bold mb-2">Over 5,000 jobs posted</h3>
                <p className="text-indigo-100">
                  Extensive job database with opportunities across all industries and skill levels.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-800/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently asked questions</h2>

            <Accordion type="single" collapsible className="space-y-4">
              {[
                {
                  question: "What type of jobs are available here?",
                  answer:
                    "We offer remote, hybrid, and on-site positions across technology, marketing, design, sales, and many other industries.",
                },
                {
                  question: "How long will I hear something from the employer?",
                  answer:
                    "Most employers respond within 48-72 hours. Our AI system prioritizes your application based on job fit.",
                },
                {
                  question: "How should I be prepared?",
                  answer:
                    "Upload a well-formatted CV, complete your profile, and use our AI feedback to optimize your application.",
                },
                {
                  question: "What about the rest of the world wide web?",
                  answer:
                    "We aggregate opportunities from multiple sources and partner with companies globally for the best selection.",
                },
                {
                  question: "Are there any charges here?",
                  answer:
                    "Job seekers can use our platform completely free. Premium features are available for enhanced visibility.",
                },
              ].map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-gray-800 border border-gray-700 rounded-lg px-6"
                >
                  <AccordionTrigger className="text-lg font-semibold text-white hover:text-blue-400 hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300 pt-2 pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Worry no more</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let our AI-powered platform find the perfect job match for you. Upload your CV and get started today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Start applying now
              </Button>
            </Link>
            <Link href="/post-job">
              <Button size="lg" className="bg-gray-800 text-white border-2 border-white hover:bg-white hover:text-gray-900">
                Upload a job opening
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">TB</span>
                </div>
                <span className="text-xl font-bold">TalentBridge</span>
              </div>
              <p className="text-gray-400">AI-powered recruitment platform connecting talent with opportunities.</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">For Job Seekers</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/jobs" className="hover:text-white">
                    Browse Jobs
                  </Link>
                </li>
                <li>
                  <Link href="/cv-analysis" className="hover:text-white">
                    CV Analysis
                  </Link>
                </li>
                <li>
                  <Link href="/auth/signup" className="hover:text-white">
                    Sign Up
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">For Employers</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/post-job" className="hover:text-white">
                    Post a Job
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="hover:text-white">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-white">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/companies" className="hover:text-white">
                    Companies
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 TalentBridge. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
