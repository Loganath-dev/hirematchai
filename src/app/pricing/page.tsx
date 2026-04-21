export default function PricingPage() {
  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Simple, Honest Pricing</h1>
        <p className="text-gray-500 max-w-xl mx-auto">No hidden fees. No spam calls. Upgrade for full AI features — cancel any time.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-16">
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
          <a href="/" className="block text-center border-2 border-[#2557a7] text-[#2557a7] font-bold py-3 rounded-lg hover:bg-blue-50 transition-colors">Start Free</a>
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
          <a href="/signup" className="block text-center bg-[#2557a7] hover:bg-[#1b4383] text-white font-bold py-3 rounded-lg transition-colors">Unlock Pro — ₹399</a>
        </div>
      </div>

      {/* Why ₹399 */}
      <div className="max-w-3xl mx-auto bg-gray-50 border border-gray-200 rounded-2xl p-8 mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Why ₹399 is the right price</h2>
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
