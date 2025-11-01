import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Target, Zap, Shield, Award, TrendingUp, CheckCircle, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  const stats = [
    { label: "Jobs Posted", value: "5,000+", icon: Target },
    { label: "People Hired", value: "2,700+", icon: Users },
    { label: "Companies", value: "500+", icon: Shield },
    { label: "Success Rate", value: "85%", icon: TrendingUp },
  ]

  const features = [
    {
      icon: Zap,
      title: "AI-Powered Matching",
      description: "Our advanced AI analyzes CVs and job descriptions to find perfect matches in seconds.",
    },
    {
      icon: Shield,
      title: "Verified Companies",
      description: "All companies are thoroughly verified to ensure legitimate opportunities and secure applications.",
    },
    {
      icon: Users,
      title: "Fair & Inclusive",
      description: "Our platform promotes diversity and eliminates bias through AI-driven candidate evaluation.",
    },
    {
      icon: Award,
      title: "CV Optimization",
      description: "Get personalized feedback and suggestions to improve your CV and increase your chances.",
    },
  ]

  const team = [
    {
      name: "Faisal Habib",
      role: "Full Stack Developer",
      description: "Passionate about creating seamless user experiences and robust backend systems.",
      avatar: "👨‍💻",
    },
    {
      name: "Muhammad Bilal Sajid",
      role: "Full Stack Developer",
      description: "Expert in modern web technologies and AI integration for recruitment solutions.",
      avatar: "👨‍💼",
    },
    {
      name: "Pervaiz Bilal",
      role: "Full Stack Developer",
      description: "Focused on scalable architecture and innovative solutions for job matching.",
      avatar: "👨‍🔬",
    },
  ]

  const milestones = [
    {
      year: "2024",
      title: "TalentBridge Founded",
      description: "Started as a university project with a vision to revolutionize recruitment",
    },
    {
      year: "2024",
      title: "AI Integration",
      description: "Implemented advanced NLP and machine learning for CV analysis",
    },
    {
      year: "2024",
      title: "Platform Launch",
      description: "Launched beta version with core matching and analysis features",
    },
    { year: "2024", title: "Growing Community", description: "Expanding user base and company partnerships" },
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
            <Link href="/" className="hover:text-blue-400 transition-colors">
              Home
            </Link>
            <Link href="/jobs" className="hover:text-blue-400 transition-colors">
              Find Jobs
            </Link>
            <Link href="/companies" className="hover:text-blue-400 transition-colors">
              Companies
            </Link>
            <Link href="/about" className="text-blue-400">
              About
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-white hover:text-blue-400">
              Sign In
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">For Employers</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Bridging Talent with <span className="text-blue-400">Opportunity</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            TalentBridge is revolutionizing recruitment through AI-powered matching, making the hiring process smarter,
            faster, and more fair for everyone involved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Get Started Today
            </Button>
            <Button size="lg" variant="outline" className="border-gray-600 text-black hover:bg-gray-700">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-800/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700 text-center">
                <CardContent className="p-8">
                  <stat.icon className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                  <p className="text-gray-400">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Our Mission</h2>
            <p className="text-xl text-gray-300 mb-12">
              We believe that finding the right job or the perfect candidate shouldn't be a matter of luck. Our mission
              is to create a more efficient, transparent, and fair recruitment process that benefits both job seekers
              and employers through the power of artificial intelligence.
            </p>

            <div className="grid md:grid-cols-2 gap-12 text-left">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-blue-400">For Job Seekers</h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300">Get personalized CV feedback and improvement suggestions</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300">Discover jobs that match your skills and experience</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300">Increase your chances of getting hired by 30%</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4 text-blue-400">For Employers</h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300">Reduce HR workload by 40% through automation</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300">Find the best candidates faster with AI ranking</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300">Make data-driven hiring decisions</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-800/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Makes Us Different</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Our AI-powered platform goes beyond simple keyword matching to understand context and meaning
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700 text-center">
                <CardContent className="p-8">
                  <feature.icon className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              A passionate team of developers from University of Central Punjab working to revolutionize recruitment
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700 text-center">
                <CardContent className="p-8">
                  <div className="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center text-4xl mx-auto mb-4">
                    {member.avatar}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                  <Badge className="bg-blue-600 mb-4">{member.role}</Badge>
                  <p className="text-gray-300">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-gray-800/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Journey</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              From university project to revolutionary recruitment platform
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                      {milestone.year.slice(-2)}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
                    <p className="text-gray-300">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Powered by Advanced Technology</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Built with cutting-edge technologies to deliver the best experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { name: "Natural Language Processing", desc: "Advanced text analysis" },
              { name: "Machine Learning", desc: "Intelligent matching algorithms" },
              { name: "React & Next.js", desc: "Modern web framework" },
              { name: "Cloud Infrastructure", desc: "Scalable and reliable" },
            ].map((tech, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700 text-center">
                <CardContent className="p-6">
                  <h3 className="font-bold mb-2">{tech.name}</h3>
                  <p className="text-sm text-gray-400">{tech.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Career?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have found their dream jobs through TalentBridge
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Start Your Journey
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="border-gray-600 text-black hover:bg-gray-700">
              For Employers
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
