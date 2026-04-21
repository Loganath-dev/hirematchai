"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Briefcase, Paperclip, Crown, AlertCircle, Send, X, FileText } from "lucide-react";
import { supabase } from "@/utils/supabase";
import { JobCard } from "./JobCard";
import Link from "next/link";

interface UserPlan {
  isPro: boolean;
  uploadCount: number;
  uploadLimit: number;
  isLoggedIn: boolean;
}

export function ChatInterface() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [resumeText, setResumeText] = useState("");
  const [attachedFile, setAttachedFile] = useState<{name: string, isUploading: boolean} | null>(null);
  const [userPlan, setUserPlan] = useState<UserPlan>({
    isPro: false,
    uploadCount: 0,
    uploadLimit: 5,
    isLoggedIn: false,
  });

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Fetch user plan on mount
  useEffect(() => {
    const fetchPlan = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const res = await fetch("/api/user-plan", {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setUserPlan(data);
      }
    };
    fetchPlan();
  }, []);

  const handleFileUpload = async (file: File) => {
    // Check limit before uploading
    if (!userPlan.isPro && userPlan.uploadCount >= userPlan.uploadLimit) {
      alert(`You've used all ${userPlan.uploadLimit} free resume uploads this month. Upgrade to Pro for unlimited uploads.`);
      return;
    }

    setAttachedFile({ name: file.name, isUploading: true });

    try {
      const { data: { session } } = await supabase.auth.getSession();
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/parse-resume", {
        method: "POST",
        headers: session ? { Authorization: `Bearer ${session.access_token}` } : {},
        body: formData,
      });

      const textData = await res.json();

      if (res.status === 403 && textData.error === "upload_limit_reached") {
        alert(textData.message);
        setAttachedFile(null);
        return;
      }

      if (textData.text) {
        if (textData.uploadCount !== undefined) {
          setUserPlan((prev) => ({ ...prev, uploadCount: textData.uploadCount }));
        }
        setResumeText(textData.text);
        setAttachedFile({ name: file.name, isUploading: false });
      }
    } catch (err) {
      console.error(err);
      setAttachedFile(null);
    }
  };

  const removeAttachment = () => {
    setAttachedFile(null);
    setResumeText("");
  };

  const handleSend = async () => {
    if (!input.trim() && !resumeText) return;
    if (attachedFile?.isUploading) return;

    let uiInput = input.trim() || `Analyze my resume: ${attachedFile?.name}`;
    
    const userMsg = { id: Date.now().toString(), role: "user", content: uiInput };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(session?.access_token ? { Authorization: `Bearer ${session.access_token}` } : {}),
        },
        body: JSON.stringify({ messages: [...messages, userMsg], resumeText }),
      });

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: data.role || "assistant",
          content: data.content,
          jobs: data.jobs || null,
          isPro: data.isPro ?? userPlan.isPro,
          tokensExhausted: data.tokensExhausted ?? false,
        },
      ]);

      // Save keywords for daily alert
      if (data.jobs?.length > 0 && userPlan.isLoggedIn && session?.access_token) {
        fetch("/api/save-keywords", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${session.access_token}` },
          body: JSON.stringify({ keywords: data.jobs[0]?.title || "Software Developer India" }),
        }).catch(() => {});
      }
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "Sorry, I had an issue connecting. Please try again.",
        },
      ]);
    } finally {
      setIsTyping(false);
      setAttachedFile(null);
      setResumeText("");
    }
  };

  const isInitialState = messages.length === 0;

  return (
    <div className="flex flex-col w-full h-[calc(100vh-80px)] min-h-[600px] bg-[#fdfdfd] relative font-sans">
      
      {/* Scrollable Chat Area */}
      <div className={`flex-1 overflow-y-auto w-full transition-all duration-300 ${isInitialState ? 'hidden' : 'p-4 md:p-8'}`}>
        <div className="max-w-3xl mx-auto flex flex-col gap-8 pb-32">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex w-full ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              {msg.role === "assistant" && (
                <div className="w-8 h-8 rounded-full bg-[#1e1e1e] flex items-center justify-center shrink-0 shadow-sm mr-4 mt-1">
                  <Briefcase className="w-4 h-4 text-white" />
                </div>
              )}
              
              <div className={`flex flex-col max-w-[85%] ${msg.role === "user" ? "items-end" : "items-start"}`}>
                <div className={`px-5 py-3.5 text-[15px] leading-relaxed ${
                  msg.role === "user" 
                    ? "bg-[#f4f4f4] text-gray-800 rounded-3xl" 
                    : "bg-transparent text-gray-800"
                }`}>
                  {msg.content}
                </div>

                {/* Job Cards */}
                {msg.jobs && msg.jobs.length > 0 && (
                  <div className="mt-4 w-full border-t border-gray-100 pt-6">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-lg font-bold text-gray-900 tracking-tight">Top {msg.jobs.length} Matches</h4>
                      {msg.isPro && (
                        <span className="flex items-center gap-1 text-[11px] font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
                          <Crown className="w-3 h-3" /> Pro Active
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-400 mb-5">
                      {msg.isPro
                        ? "Click any card to see AI reasoning, ATS tips & how to improve."
                        : "Click job #1 for free AI review. Upgrade to Pro to unlock all 10."}
                    </p>
                    <div className="space-y-3">
                      {msg.jobs.map((job: any, idx: number) => (
                        <JobCard
                          key={job.id}
                          job={job}
                          rank={idx + 1}
                          isPro={msg.isPro ?? false}
                          tokensExhausted={msg.tokensExhausted ?? false}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex w-full justify-start mt-2">
              <div className="w-8 h-8 rounded-full bg-[#1e1e1e] flex items-center justify-center shrink-0 mr-4">
                 <span className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" />
                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:-.3s]" />
                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:-.5s]" />
                 </span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
      </div>

      {/* Input Area (Centered if initial, absolute bottom if chatting) */}
      <div className={`w-full px-4 transition-all duration-500 ease-in-out flex flex-col items-center
        ${isInitialState ? "flex-1 justify-center pb-[10vh]" : "absolute bottom-0 pt-10 pb-6 bg-gradient-to-t from-[#fdfdfd] via-[#fdfdfd] to-transparent"}
      `}>

        
        <div className="w-full max-w-3xl mx-auto relative flex flex-col bg-[#f4f4f4] rounded-3xl overflow-hidden focus-within:bg-[#efefef] transition-colors duration-200">
          
          {/* Attachment Pill (Only visible when file attached) */}
          {attachedFile && (
            <div className="px-4 mt-3 mb-1">
               <div className="inline-flex items-center gap-3 bg-white ring-1 ring-black/5 shadow-sm rounded-xl px-3 py-2.5">
                 <div className="bg-red-50 p-2 rounded-lg text-red-500">
                   <FileText className="w-5 h-5" />
                 </div>
                 <div className="flex flex-col max-w-[150px] sm:max-w-[200px]">
                   <span className="text-sm font-semibold text-gray-800 truncate">{attachedFile.name}</span>
                   <span className="text-[11px] font-medium text-gray-500">{attachedFile.isUploading ? "Reading PDF..." : "PDF attached"}</span>
                 </div>
                 <button onClick={removeAttachment} className="ml-1 text-gray-400 hover:text-gray-800 p-1.5 bg-transparent hover:bg-gray-100 rounded-full transition-colors">
                   <X className="w-4 h-4" />
                 </button>
               </div>
            </div>
          )}

          <div className="flex items-center min-h-[56px] px-2 py-1.5 bg-transparent">
            <label className={`cursor-pointer p-2.5 mx-1 text-gray-500 hover:text-gray-900 rounded-full hover:bg-black/5 transition-colors ${attachedFile ? 'opacity-50 pointer-events-none' : ''}`}>
              <input 
                 type="file" 
                 className="hidden" 
                 accept=".pdf" 
                 onChange={async (e) => {
                   const file = e.target.files?.[0];
                   if (file) await handleFileUpload(file);
                   e.target.value = "";
                 }} 
                 disabled={!!attachedFile} 
              />
              <Paperclip className="w-[22px] h-[22px]" />
            </label>
            
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder={attachedFile ? "Add any additional thoughts..." : "Ask anything or attach a resume"}
              className="flex-1 border-none bg-transparent shadow-none focus-visible:ring-0 text-[16px] h-12 px-2 placeholder:text-gray-500 font-medium"
            />
            
            <button
               onClick={handleSend}
               disabled={(!input.trim() && !resumeText) || (attachedFile?.isUploading)}
               className={`p-2.5 mx-1 rounded-full text-white transition-all duration-200 ${
                 (input.trim() || resumeText) && !attachedFile?.isUploading 
                   ? "bg-[#2557a7] hover:bg-[#1b4383] cursor-pointer shadow-sm" 
                   : "bg-gray-200 text-gray-400 cursor-not-allowed"
               }`}
            >
              <Send className="w-5 h-5 ml-0.5" />
            </button>
          </div>
        </div>
        
        {/* Suggestion Chips */}
        {isInitialState && (
          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-6 px-4">
            <button onClick={()=>setInput("Find Front-end React roles in Bangalore")} className="px-4 py-2 bg-transparent ring-1 ring-gray-200 rounded-full text-[13px] font-semibold text-gray-600 hover:bg-gray-50 transition-colors">Find Front-end roles</button>
            <button onClick={()=>setInput("Remote Data Analyst jobs with standard salary")} className="px-4 py-2 bg-transparent ring-1 ring-gray-200 rounded-full text-[13px] font-semibold text-gray-600 hover:bg-gray-50 transition-colors hidden sm:block">Remote Data Analyst jobs</button>
            <button onClick={()=>setInput("I have 5 years experience in marketing")} className="px-4 py-2 bg-transparent ring-1 ring-gray-200 rounded-full text-[13px] font-semibold text-gray-600 hover:bg-gray-50 transition-colors">Marketing jobs</button>
          </div>
        )}
        
        {/* Plan Nudge footer */}
        {userPlan.isLoggedIn && !userPlan.isPro && (
           <div className={`mt-3 text-[11px] text-gray-400 font-medium ${isInitialState ? 'absolute bottom-6' : 'hidden'}`}>
             {userPlan.uploadLimit - userPlan.uploadCount} free AI reviews left this month. <Link href="/pricing" className="text-black hover:underline">Upgrade to Pro</Link>.
           </div>
        )}
      </div>
    </div>
  );
}
