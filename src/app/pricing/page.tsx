import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function PricingPage() {
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
    console.error("Failed to fetch lifetime count:", err);
  }

  const spotsLeft = Math.max(0, 50 - lifetimeCount);
  const showLifetime = spotsLeft > 0;

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Simple, Honest Pricing</h1>
        <p className="text-gray-500 max-w-xl mx-auto">No hidden fees. No spam calls. Upgrade for full AI features — cancel any time.</p>
      </div>

      <div className={`grid ${showLifetime ? 'lg:grid-cols-3 md:grid-cols-2' : 'md:grid-cols-2'} gap-6 max-w-6xl mx-auto mb-16 items-start`}>
        {/* Free Plan */}
        <div className="border border-gray-200 rounded-2xl p-7 bg-white">
          <h2 className="text-xl font-bold text-gray-900 mb-1">Free</h2>
          <p className="text-gray-500 text-sm mb-4">No account required. Start immediately.</p>
          <div className="text-4xl font-extrabold text-gray-900 mb-6">₹0 <span className="text-base font-normal text-gray-400">forever</span></div>
          <ul className="space-y-3 mb-8">
            {["5 resume uploads per month", "10 job / internship matches (ranked)", "Match % badge on every card", "Salary range on every card", "Save up to 3 jobs", "No account needed"].map(item => (
              <li key={item} className="flex items-center gap-2 text-sm text-gray-700">
                <span className="text-green-500 font-bold text-base">✓</span> {item}
              </li>
            ))}
            {["AI match reasoning", "ATS tips per job", "Unlimited matches", "Unlimited uploads"].map(item => (
              <li key={item} className="flex items-center gap-2 text-sm text-gray-400 line-through">
                <span className="text-gray-300 font-bold text-base">✗</span> {item}
              </li>
            ))}
          </ul>
          <Link href="/" className="block text-center border-2 border-[#2557a7] text-[#2557a7] font-bold py-3 rounded-lg hover:bg-blue-50 transition-colors">Start Free</Link>
        </div>

        {/* Paid Plan */}
        <div className="border-2 border-[#2557a7] rounded-2xl p-7 bg-white relative shadow-lg">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#2557a7] text-white text-xs font-bold px-4 py-1 rounded-full">MOST POPULAR</div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">HireMatch Pro</h2>
          <p className="text-gray-500 text-sm mb-4">Everything you need to actually get hired.</p>
          <div className="text-4xl font-extrabold text-gray-900 mb-1">₹399 <span className="text-base font-normal text-gray-400">/ month</span></div>
          <p className="text-sm text-gray-500 mb-6">Billed monthly · Cancel any time</p>
          <ul className="space-y-3 mb-8">
            {["Everything in Free, plus:", "Unlimited resume uploads", "Unlimited job & internship results", "AI Match Reasoning per job", "3 ATS tip suggestions per job", "Save unlimited jobs", "Company deep-dive summaries"].map(item => (
              <li key={item} className={`flex items-center gap-2 text-sm ${item.includes("plus") ? "text-gray-400 font-medium text-xs" : "text-gray-700 font-medium"}`}>
                {!item.includes("plus") && <span className="text-green-500 font-bold text-base">✓</span>} {item}
              </li>
            ))}
          </ul>
          <Link href="/signup" className="block text-center bg-[#2557a7] hover:bg-[#1b4383] text-white font-bold py-3 rounded-lg transition-colors">Unlock Pro — ₹399</Link>
        </div>

        {/* Lifetime Plan */}
        {showLifetime && (
          <div className="border border-purple-500 rounded-2xl p-7 bg-gradient-to-b from-white to-purple-50 relative shadow-xl overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"></div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-1">Lifetime Access</h2>
                <div className="inline-block bg-purple-100 text-purple-700 text-xs font-extrabold px-2 py-0.5 rounded uppercase tracking-wider">
                  Limited Early Bird
                </div>
              </div>
            </div>
            
            <div className="text-4xl font-extrabold text-gray-900 mb-1">₹999 <span className="text-base font-normal text-gray-400">one-time</span></div>
            <p className="text-sm text-gray-600 mb-6">Pay once. Use forever.</p>
            
            <div className="bg-white/80 p-4 rounded-xl border border-purple-100 mb-8 backdrop-blur-sm">
              <div className="text-sm font-bold text-gray-900 text-center mb-1">Secure your spot</div>
              <div className="flex justify-between text-xs text-gray-500 mb-2">
                <span>0</span>
                <span>50</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2.5 rounded-full" style={{ width: `${(lifetimeCount / 50) * 100}%` }}></div>
              </div>
              <div className="text-center text-xs font-black text-purple-600 uppercase">
                Only {spotsLeft} spots remaining!
              </div>
            </div>

            <Link href="/signup" className="block w-full text-center bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-3.5 rounded-lg transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
              Buy Lifetime Access
            </Link>
          </div>
        )}
      </div>

      {/* Why ₹399 */}
      <div className="max-w-3xl mx-auto bg-gray-50 border border-gray-200 rounded-2xl p-8 mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Why our pricing is right</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[["Other Portals", "₹11,000+", "for similar results"], ["Premium Networks", "₹14,000/mo", "needs existing connections"], ["HireMatch Pro", "₹399", "one-time, no renewal"], ["ROI", "30x", "if one application succeeds"]].map(([label, price, desc]) => (
            <div key={label}>
              <div className="text-xs text-gray-400 mb-1">{label}</div>
              <div className={`text-xl font-extrabold ${label === "HireMatch Pro" ? "text-[#2557a7]" : "text-gray-700"}`}>{price}</div>
              <div className="text-xs text-gray-400">{desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Trust badges */}
      <div className="flex flex-wrap justify-center gap-6 text-center">
        {[["🔒", "Secure Payment", "encrypted & safe"], ["✋", "Cancel Anytime", "no questions asked"], ["🗑️", "Delete Anytime", "your data, your control"], ["💬", "Real Support", "hirematchai07@gmail.com"]].map(([icon, title, sub]) => (
          <div key={title} className="flex flex-col items-center gap-1">
            <div className="text-2xl">{icon}</div>
            <div className="font-bold text-gray-800 text-sm">{title}</div>
            <div className="text-xs text-gray-400">{sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
