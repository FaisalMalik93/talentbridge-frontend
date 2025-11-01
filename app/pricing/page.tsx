import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, X, Star, Zap, Crown } from "lucide-react"
import Link from "next/link"

export default function PricingPage() {
  const plans = [
    {
      name: "Starter",
      price: "Free",
      period: "",
      description: "Perfect for small businesses just getting started",
      icon: Star,
      color: "text-gray-400",
      bgColor: "bg-gray-800",
      borderColor: "border-gray-700",
      features: [
        { name: "1 active job posting", included: true },
        { name: "Basic candidate search", included: true },
        { name: "Standard support", included: true },
        { name: "Basic analytics", included: true },
        { name: "AI-powered matching", included: false },
        { name: "Advanced filters", included: false },
        { name: "Priority support", included: false },
        { name: "Custom branding", included: false },
      ],
    },
    {
      name: "Professional",
      price: "$99",
      period: "/month",
      description: "Ideal for growing companies with regular hiring needs",
      icon: Zap,
      color: "text-blue-400",
      bgColor: "bg-blue-600/10",
      borderColor: "border-blue-600",
      popular: true,
      features: [
        { name: "10 active job postings", included: true },
        { name: "Advanced candidate search", included: true },
        { name: "Priority support", included: true },
        { name: "Advanced analytics", included: true },
        { name: "AI-powered matching", included: true },
        { name: "Advanced filters", included: true },
        { name: "CV parsing & analysis", included: true },
        { name: "Custom branding", included: false },
      ],
    },
    {
      name: "Enterprise",
      price: "$299",
      period: "/month",
      description: "For large organizations with complex hiring requirements",
      icon: Crown,
      color: "text-purple-400",
      bgColor: "bg-purple-600/10",
      borderColor: "border-purple-600",
      features: [
        { name: "Unlimited job postings", included: true },
        { name: "Advanced candidate search", included: true },
        { name: "Dedicated support", included: true },
        { name: "Custom analytics & reports", included: true },
        { name: "AI-powered matching", included: true },
        { name: "Advanced filters", included: true },
        { name: "CV parsing & analysis", included: true },
        { name: "Custom branding", included: true },
      ],
    },
  ]

  const faqs = [
    {
      question: "Can I change my plan at any time?",
      answer:
        "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.",
    },
    {
      question: "What happens if I exceed my job posting limit?",
      answer:
        "You'll be notified when you approach your limit. You can either upgrade your plan or wait for the next billing cycle.",
    },
    {
      question: "Do you offer annual discounts?",
      answer: "Yes, we offer a 20% discount for annual subscriptions. Contact our sales team for more details.",
    },
    {
      question: "Is there a free trial available?",
      answer:
        "Our Starter plan is free forever. For paid plans, we offer a 14-day free trial with full access to all features.",
    },
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
            <Link href="/pricing" className="text-blue-400">
              Pricing
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-white hover:text-blue-400">
              Sign In
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">Get Started</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Simple, Transparent <span className="text-blue-400">Pricing</span>
          </h1>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Choose the perfect plan for your hiring needs. Start free and scale as you grow.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`${plan.bgColor} ${plan.borderColor} relative ${plan.popular ? "ring-2 ring-blue-600" : ""}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white px-4 py-1">Most Popular</Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-8">
                  <plan.icon className={`w-12 h-12 ${plan.color} mx-auto mb-4`} />
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-gray-400">{plan.period}</span>
                  </div>
                  <p className="text-gray-400 mt-4">{plan.description}</p>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-3">
                        {feature.included ? (
                          <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                        ) : (
                          <X className="w-5 h-5 text-gray-500 flex-shrink-0" />
                        )}
                        <span className={feature.included ? "text-white" : "text-gray-500"}>{feature.name}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    className={`w-full ${
                      plan.popular ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-700 hover:bg-gray-600"
                    }`}
                  >
                    {plan.price === "Free" ? "Get Started" : "Start Free Trial"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-16 px-4 bg-gray-800/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Compare All Features</h2>
            <p className="text-xl text-gray-300">See what's included in each plan</p>
          </div>

          <div className="max-w-6xl mx-auto overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-4 px-6">Features</th>
                  <th className="text-center py-4 px-6">Starter</th>
                  <th className="text-center py-4 px-6">Professional</th>
                  <th className="text-center py-4 px-6">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: "Job Postings", starter: "1", professional: "10", enterprise: "Unlimited" },
                  { feature: "Candidate Search", starter: "Basic", professional: "Advanced", enterprise: "Advanced" },
                  { feature: "AI Matching", starter: "❌", professional: "✅", enterprise: "✅" },
                  { feature: "Analytics", starter: "Basic", professional: "Advanced", enterprise: "Custom" },
                  { feature: "Support", starter: "Standard", professional: "Priority", enterprise: "Dedicated" },
                  { feature: "Custom Branding", starter: "❌", professional: "❌", enterprise: "✅" },
                  { feature: "API Access", starter: "❌", professional: "Limited", enterprise: "Full" },
                  { feature: "Team Members", starter: "1", professional: "5", enterprise: "Unlimited" },
                ].map((row, index) => (
                  <tr key={index} className="border-b border-gray-800">
                    <td className="py-4 px-6 font-medium">{row.feature}</td>
                    <td className="py-4 px-6 text-center">{row.starter}</td>
                    <td className="py-4 px-6 text-center">{row.professional}</td>
                    <td className="py-4 px-6 text-center">{row.enterprise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-300">Got questions? We've got answers.</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
                  <p className="text-gray-300">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-blue-600/10">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Hiring?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of companies using TalentBridge to find the best talent faster
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="border-gray-600 text-black hover:bg-gray-700">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
