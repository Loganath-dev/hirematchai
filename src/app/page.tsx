import { ChatInterface } from "@/components/chat/ChatInterface";
import { ReviewWidget } from "@/components/ReviewWidget";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export default async function Home() {
  const adminClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  let lifetimeCount = 0;
  try {
    const { count } = await adminClient
      .from("profiles")
      .select("*", { count: "exact", head: true })
      .eq("plan_type", "lifetime");
    lifetimeCount = count || 0;
  } catch (err) {
    console.error("Failed to fetch count:", err);
  }

  const spotsLeft = Math.max(0, 50 - lifetimeCount);
  const showLifetime = spotsLeft > 0;

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
        {showLifetime ? (
          <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg border border-purple-400 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-pink-500 text-white text-[10px] font-black px-3 py-1 rounded-bl-lg uppercase tracking-widest">
              Limited Offer
            </div>
            <div className="text-white">
              <h2 className="text-xl font-bold mb-1">Grab Lifetime Access!</h2>
              <p className="text-sm text-purple-100 flex items-center gap-2">
                Pay once. Use forever. 
                <span className="bg-white/20 text-white px-2 py-0.5 rounded-full text-xs font-bold">Only {spotsLeft} seats left</span>
              </p>
            </div>
            <div className="flex items-center gap-4 flex-shrink-0">
              <div className="text-right hidden sm:block text-white">
                <div className="text-2xl font-extrabold">₹999</div>
                <div className="text-xs text-purple-200">one-time payment</div>
              </div>
              <Link href="/pricing" className="bg-white hover:bg-gray-50 text-indigo-700 font-extrabold px-6 py-3 rounded-lg text-sm transition-colors whitespace-nowrap shadow-md">
                Grab It Fast →
              </Link>
            </div>
          </div>
        ) : (
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
        )}
      </div>

      {/* Review Widget */}
      <ReviewWidget />
    </div>
  );
}
