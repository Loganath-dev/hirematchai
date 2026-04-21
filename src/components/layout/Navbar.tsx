"use client";

import Link from "next/link";
import { Briefcase, LogOut, User } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import { useRouter } from "next/navigation";

export function Navbar() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    // 1. Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // 2. Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <nav className="border-b border-gray-200 bg-white sticky top-0 z-50 overflow-hidden">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between px-4 h-[60px]">
        {/* Logo */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-[#2557a7] p-1.5 rounded-lg shrink-0">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <span className="text-[20px] font-extrabold text-[#2557a7] tracking-tight whitespace-nowrap">HireMatch<span className="text-gray-900">AI</span></span>
          </Link>

          {/* Nav Links */}
          <div className="hidden lg:flex items-center gap-1 text-[15px] font-medium text-gray-700">
            <Link href="/" className="px-3 py-2 hover:bg-gray-100 rounded-md transition-colors">
              Find Jobs
            </Link>
            <Link href="/pricing" className="px-3 py-2 hover:bg-gray-100 rounded-md transition-colors">
              Pricing
            </Link>
          </div>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-2">
          {user ? (
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 text-gray-700 font-medium">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <User className="w-5 h-5" />
                </div>
                <span className="text-[14px] truncate max-w-[120px]">{user.email}</span>
              </div>
              <button 
                onClick={handleSignOut}
                className="flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors text-[14px] font-bold"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          ) : (
            <>
              <Link href="/login" className="hidden sm:block px-4 py-2 text-[15px] font-bold text-[#2557a7] hover:bg-blue-50 rounded-md transition-colors">
                Sign in
              </Link>
              <Link href="/signup" className="px-4 py-2 bg-[#2557a7] hover:bg-[#1b4383] text-white text-[15px] font-bold rounded-lg transition-colors whitespace-nowrap">
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
