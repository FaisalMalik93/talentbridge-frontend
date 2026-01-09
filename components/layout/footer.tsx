import Link from "next/link"
import Image from "next/image"

export function Footer() {
    return (
        <footer className="border-t border-gray-800 py-12 bg-gray-900 text-gray-400">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <Link href="/" className="inline-block">
                            <div className="flex items-center space-x-2">
                                <Image
                                    src="/logo-talentbridge.png"
                                    alt="TalentBridge Logo"
                                    width={50}
                                    height={50}
                                    className="h-10 w-auto rounded-lg object-contain"
                                />
                                <span className="text-xl font-bold text-white">TalentBridge</span>
                            </div>
                        </Link>
                        <p className="text-sm leading-relaxed">
                            AI-powered recruitment platform connecting talent with opportunities.
                            Streamline your hiring process or find your dream job today.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold text-white mb-4">For Job Seekers</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/jobs" className="hover:text-blue-400 transition-colors">
                                    Browse Jobs
                                </Link>
                            </li>
                            <li>
                                <Link href="/cv-analysis" className="hover:text-blue-400 transition-colors">
                                    CV Analysis
                                </Link>
                            </li>
                            <li>
                                <Link href="/auth/signup" className="hover:text-blue-400 transition-colors">
                                    Sign Up
                                </Link>
                            </li>
                            <li>
                                <Link href="/candidate/dashboard" className="hover:text-blue-400 transition-colors">
                                    Candidate Dashboard
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-white mb-4">For Employers</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/post-job" className="hover:text-blue-400 transition-colors">
                                    Post a Job
                                </Link>
                            </li>
                            <li>
                                <Link href="/dashboard" className="hover:text-blue-400 transition-colors">
                                    Employer Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link href="/pricing" className="hover:text-blue-400 transition-colors">
                                    Pricing
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-white mb-4">Company</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/about" className="hover:text-blue-400 transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-blue-400 transition-colors">
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link href="/companies" className="hover:text-blue-400 transition-colors">
                                    Companies
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="hover:text-blue-400 transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm">
                    <p>&copy; {new Date().getFullYear()} TalentBridge. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
