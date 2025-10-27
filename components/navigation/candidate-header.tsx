'use client';

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/auth-context";
import {
  User,
  Briefcase,
  FileText,
  Heart,
  LogOut,
  Settings,
  Home,
  Search,
  LayoutDashboard,
  Calendar,
  BarChart3,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function CandidateHeader() {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <header className="border-b border-gray-800 bg-gray-900 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">TB</span>
          </div>
          <span className="text-xl font-bold text-white">TalentBridge</span>
        </Link>

        {/* Navigation Links - Candidate Specific */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/candidate/dashboard"
            className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2"
          >
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </Link>

          <Link
            href="/jobs"
            className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2"
          >
            <Search className="w-4 h-4" />
            Find Jobs
          </Link>

          <Link
            href="/cv-analysis"
            className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            CV Analysis
          </Link>

          <Link
            href="/candidate/ranked-cvs"
            className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2"
          >
            <BarChart3 className="w-4 h-4" />
            Ranked CV List
          </Link>

          <Link
            href="/candidate/applications"
            className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2"
          >
            <Briefcase className="w-4 h-4" />
            My Applications
          </Link>

          <Link
            href="/candidate/saved-jobs"
            className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2"
          >
            <Heart className="w-4 h-4" />
            Saved Jobs
          </Link>

          <Link
            href="/candidate/interviews"
            className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            Interviews
          </Link>
        </nav>

        {/* Right Side - User Menu */}
        <div className="flex items-center space-x-4">
          {!isAuthenticated ? (
            <>
              <Link href="/auth/signin">
                <Button variant="ghost" className="text-white hover:text-blue-400">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Get Started
                </Button>
              </Link>
            </>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-blue-600 text-white">
                      {user ? getInitials(user.full_name) : 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-gray-800 border-gray-700 text-white" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.full_name || 'Job Seeker'}</p>
                    <p className="text-xs leading-none text-gray-400">{user?.email || 'user@example.com'}</p>
                    <p className="text-xs leading-none text-blue-400 capitalize">Candidate</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-700" />

                <DropdownMenuItem className="hover:bg-gray-700">
                  <Link href="/candidate/dashboard" className="flex items-center w-full">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>My Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-gray-700">
                  <Link href="/candidate/profile" className="flex items-center w-full">
                    <User className="mr-2 h-4 w-4" />
                    <span>My Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-gray-700">
                  <Link href="/candidate/profile" className="flex items-center w-full">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator className="bg-gray-700" />
                {isAuthenticated ? (
                  <DropdownMenuItem
                    className="hover:bg-gray-700 text-red-400"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem className="hover:bg-gray-700">
                    <Link href="/auth/signin" className="flex items-center w-full">
                      <User className="mr-2 h-4 w-4" />
                      <span>Sign In</span>
                    </Link>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
}
