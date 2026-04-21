const TESTIMONIALS = [
  {
    name: "Raghul sharma.M", role: "Software Engineer · Bangalore", initials: "PM", color: "#1D4ED8",
    quote: "I had applied to 60+ jobs across multiple platforms with barely any response. HireMatch AI showed me exactly why — my resume was missing specific keywords for React Native roles. Fixed three bullet points based on the AI suggestions, applied to 8 matched jobs, and got 3 interview calls in 10 days. This is not magic — it just shows you what to fix.",
    rating: 5
  },
  {
    name: "Arjun K.", role: "Final Year B.Tech · VNIT Nagpur", initials: "AK", color: "#7C3AED",
    quote: "As a final year student I was getting zero replies on internship portals. HireMatch AI found me 6 relevant internships matched to my React and Node.js skills, flagged two listings from unverified companies (which I would have applied to otherwise), and generated my application letter in 30 seconds. Got my first paid internship at ₹15,000/month within 3 weeks.",
    rating: 5
  },
  {
    name: "Sneha R.", role: "Data Analyst · Mumbai", initials: "SR", color: "#059669",
    quote: "I was stuck at the same company for 2 years wanting to move but not knowing how to position myself for senior roles. The AI reasoning told me my SQL was fine but I had no data visualisation tools listed on my resume despite using them daily. Added them with proper framing and immediately saw completely different — actually senior — job matches.",
    rating: 5
  },
  {
    name: "Rahul T.", role: "Product Manager · Pune", initials: "RT", color: "#B45309",
    quote: "The salary insights per job alone are worth ₹399. Most job platforms either hide salary data or show vague ranges. HireMatch AI shows me specific salary brackets for roles in Pune vs Bangalore — I used this data in my negotiation and pushed my offer up by ₹2 LPA. Outstanding.",
    rating: 5
  },
  {
    name: "Deepika N.", role: "2nd Year MBA · IIM Indore", initials: "DN", color: "#DB2777",
    quote: "I needed a summer internship at a consulting or strategy firm and had no idea which listings matched my profile. HireMatch AI matched me to roles based on my commerce + analytics background, showed me the skill gaps, and I filled those gaps with two online courses in a weekend. Landed a strategy internship at a top consulting firm.",
    rating: 5
  },
  {
    name: "Mohammed F.", role: "DevOps Engineer · Hyderabad", initials: "MF", color: "#0891B2",
    quote: "I had spent over ₹8,000 on a premium package from a popular job portal. Zero results. Not one recruiter call in 45 days. Switched to HireMatch AI for ₹399 and within 2 weeks I had 4 interview calls. The ATS tips told me to add specific DevOps keywords with proper context. That changed everything. I wish I had found this before wasting money elsewhere.",
    rating: 5
  },
];

export default function TestimonialsPage() {
  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">What Our Users Say</h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          Real results from real people. No paid reviews. No incentivised testimonials. Just honest stories from Indian job seekers who got results.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
        {TESTIMONIALS.map((t, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div
                style={{ backgroundColor: t.color }}
                className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
              >
                {t.initials}
              </div>
              <div>
                <div className="font-bold text-gray-900 text-sm">{t.name}</div>
                <div className="text-xs text-gray-500">{t.role}</div>
              </div>
              <div className="ml-auto text-yellow-400 text-sm">{"★".repeat(t.rating)}</div>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed italic">"{t.quote}"</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="bg-[#2557a7] rounded-2xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-3">Join thousands of job seekers who got results</h2>
        <p className="text-blue-200 mb-6">Upload your resume and find jobs matched to your exact skills — free.</p>
        <a href="/" className="bg-white text-[#2557a7] font-bold px-8 py-3 rounded-lg inline-block hover:bg-gray-100 transition-colors">
          Start for Free →
        </a>
      </div>
    </div>
  );
}
