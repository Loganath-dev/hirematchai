import { ChatInterface } from "@/components/chat/ChatInterface";
import { ReviewWidget } from "@/components/ReviewWidget";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero */}
      <div className="text-center pt-14 pb-8 px-4">
        <div className="inline-block bg-blue-50 text-[#2557a7] text-xs font-bold px-4 py-1.5 rounded-full mb-5 tracking-wide uppercase">AI-Powered Job Matching</div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4 leading-tight">
          Your resume. 10,000 jobs.<br />
          <span className="text-[#2557a7]">90 seconds.</span>
        </h1>
        <p className="text-lg text-gray-500 font-medium max-w-xl mx-auto mb-10">
          Upload your resume and HireMatch AI finds the jobs you're actually qualified for — then tells you exactly why you match.
        </p>
      </div>

      {/* Search / Chat Box */}
      <div className="w-full max-w-3xl mx-auto mb-16 shadow-[0_4px_24px_rgba(0,0,0,0.08)] rounded-2xl overflow-hidden border border-gray-200">
        <ChatInterface />
      </div>

      {/* Social Proof strip */}
      <div className="flex flex-wrap justify-center gap-8 text-center mb-16 px-4">
        {[["10,000+", "Job seekers matched"], ["90 sec", "From upload to matches"], ["₹399", "One-time, no renewal"], ["0", "Spam calls. Ever."]].map(([num, label]) => (
          <div key={label}>
            <div className="text-2xl font-extrabold text-[#2557a7]">{num}</div>
            <div className="text-sm text-gray-500 font-medium">{label}</div>
          </div>
        ))}
      </div>

      {/* Pricing CTA Banner */}
      <div className="max-w-3xl mx-auto w-full mb-16 px-4">
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">Want full AI match reasoning + ATS tips?</h2>
            <p className="text-sm text-gray-500">Unlock unlimited results, AI insights per job, and your application tracker.</p>
          </div>
          <div className="flex items-center gap-4 flex-shrink-0">
            <div className="text-right hidden sm:block">
              <div className="text-2xl font-extrabold text-gray-900">₹399</div>
              <div className="text-xs text-gray-400">one-time · no renewal</div>
            </div>
            <Link href="/pricing" className="bg-[#2557a7] hover:bg-[#1b4383] text-white font-bold px-6 py-3 rounded-lg text-sm transition-colors whitespace-nowrap">
              See Pricing →
            </Link>
          </div>
        </div>
      </div>

      {/* Review Widget */}
      <ReviewWidget />
    </div>
  );
}
