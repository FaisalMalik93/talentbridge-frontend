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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
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
  Menu
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function CandidateHeader() {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/');
    setIsOpen(false);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => {
    const baseClass = mobile
      ? "text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2 py-2"
      : "text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2";

    return (
      <>
        <Link href="/candidate/dashboard" className={baseClass} onClick={() => mobile && setIsOpen(false)}>
          <LayoutDashboard className="w-4 h-4" />
          <span>Dashboard</span>
        </Link>

        <Link href="/jobs" className={baseClass} onClick={() => mobile && setIsOpen(false)}>
          <Search className="w-4 h-4" />
          <span>Find Jobs</span>
        </Link>

        <Link href="/cv-analysis" className={baseClass} onClick={() => mobile && setIsOpen(false)}>
          <FileText className="w-4 h-4" />
          <span>CV Analysis</span>
        </Link>

        <Link href="/candidate/ranked-cvs" className={baseClass} onClick={() => mobile && setIsOpen(false)}>
          <BarChart3 className="w-4 h-4" />
          <span>Ranked CV List</span>
        </Link>

        <Link href="/candidate/applications" className={baseClass} onClick={() => mobile && setIsOpen(false)}>
          <Briefcase className="w-4 h-4" />
          <span>My Applications</span>
        </Link>

        <Link href="/candidate/saved-jobs" className={baseClass} onClick={() => mobile && setIsOpen(false)}>
          <Heart className="w-4 h-4" />
          <span>Saved Jobs</span>
        </Link>

        <Link href="/candidate/interviews" className={baseClass} onClick={() => mobile && setIsOpen(false)}>
          <Calendar className="w-4 h-4" />
          <span>Interviews</span>
        </Link>
      </>
    );
  };

  return (
    <header className="border-b border-gray-800 bg-gray-900 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Mobile Menu Trigger */}
        <div className="md:hidden mr-2">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-gray-300">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-gray-900 border-gray-800 text-white w-[300px]">
              <SheetHeader>
                <SheetTitle className="text-white flex items-center gap-2">
                  <Image
                    src="/logo-talentbridge.png"
                    alt="TalentBridge Logo"
                    width={180}
                    height={50}
                    className="h-12 w-auto rounded-lg object-contain"
                  />
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col space-y-4 mt-8">
                <NavLinks mobile />
                {isAuthenticated && (
                  <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-gray-800">
                    <Link href="/candidate/profile" onClick={() => setIsOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start text-white hover:text-blue-400 gap-2">
                        <User className="w-4 h-4" />
                        <span>My Profile</span>
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-gray-800 gap-2"
                      onClick={handleLogout}
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Log out</span>
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/logo-talentbridge.png"
            alt="TalentBridge Logo"
            width={180}
            height={50}
            className="h-14 w-auto rounded-lg object-contain"
            priority
          />
        </Link>

        {/* Navigation Links - Candidate Specific */}
        <nav className="hidden md:flex items-center space-x-6">
          <NavLinks />
        </nav>

        {/* Right Side - User Menu */}
        <div className="flex items-center space-x-4">
          {!isAuthenticated ? (
            <div className="hidden md:flex items-center space-x-4">
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
            </div>
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
