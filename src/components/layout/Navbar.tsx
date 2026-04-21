import Link from "next/link";
import { Briefcase } from "lucide-react";

export function Navbar() {
  return (
    <nav className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between px-4 h-[60px]">
        {/* Logo */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-[#2557a7] p-1.5 rounded-lg">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <span className="text-[20px] font-extrabold text-[#2557a7] tracking-tight">HireMatch<span className="text-gray-900">AI</span></span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-1 text-[15px] font-medium text-gray-700">
            <Link href="/" className="px-3 py-2 hover:bg-gray-100 rounded-md transition-colors">
              Find Jobs
            </Link>
            <Link href="/pricing" className="px-3 py-2 hover:bg-gray-100 rounded-md transition-colors">
              Pricing
            </Link>
            <Link href="/blog" className="px-3 py-2 hover:bg-gray-100 rounded-md transition-colors">
              Blog
            </Link>
            <Link href="/faq" className="px-3 py-2 hover:bg-gray-100 rounded-md transition-colors">
              FAQs
            </Link>
            <Link href="/testimonials" className="px-3 py-2 hover:bg-gray-100 rounded-md transition-colors">
              Testimonials
            </Link>
          </div>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-2">
          <Link href="/login" className="hidden sm:block px-4 py-2 text-[15px] font-bold text-[#2557a7] hover:bg-blue-50 rounded-md transition-colors">
            Sign in
          </Link>
          <Link href="/signup" className="px-4 py-2 bg-[#2557a7] hover:bg-[#1b4383] text-white text-[15px] font-bold rounded-lg transition-colors">
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
