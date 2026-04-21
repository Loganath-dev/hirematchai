"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/utils/supabase";
import { Briefcase } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
    } else {
      router.push("/");
    }
  };

  const handleOAuth = async (provider: 'google') => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: window.location.origin }
    });
    if (error) setErrorMsg(error.message);
  };

  return (
    <div className="flex justify-center py-20 px-4 bg-white">
      <div className="w-full max-w-md p-8 bg-white border border-gray-200 rounded-xl shadow-lg">
        <div className="flex justify-center mb-6">
           <div className="bg-[#2557a7] p-2 rounded-lg mr-2">
             <Briefcase className="w-6 h-6 text-white" />
           </div>
           <span className="text-2xl font-bold text-[#2557a7] uppercase tracking-tight">HireMatch<span className="font-extrabold text-gray-900">AI</span></span>
        </div>
        <h2 className="text-2xl font-bold mb-2">Ready to take the next step?</h2>
        <p className="text-gray-600 mb-8">Sign in to sync your resume matches.</p>

        {errorMsg && <div className="text-red-500 font-medium mb-4 text-sm">{errorMsg}</div>}

        <Button 
          variant="outline" 
          className="w-full font-bold h-12 border-gray-300 text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-3"
          onClick={() => handleOAuth("google")}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /><path fill="none" d="M1 1h22v22H1z" /></svg>
          Continue with Google
        </Button>

        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-gray-200"></div>
          <span className="px-4 text-sm text-gray-500 font-medium">or</span>
          <div className="flex-1 border-t border-gray-200"></div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Email address *</label>
            <Input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 border-gray-300 focus-visible:ring-[#2557a7]"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Password *</label>
            <Input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 border-gray-300 focus-visible:ring-[#2557a7]"
              required
            />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-[#2557a7] hover:bg-[#1b4383] text-white font-bold h-12 text-[17px] mt-2"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        <p className="mt-6 text-center text-gray-600 font-medium">
          New to HireMatch? <Link href="/signup" className="text-[#2557a7] hover:underline font-bold">Create an account</Link>
        </p>
      </div>
    </div>
  );
}
