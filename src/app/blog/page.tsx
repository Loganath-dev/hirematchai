"use client";
import { useState } from "react";

const BLOGS = [
  {
    id: 1,
    slug: "why-your-resume-gets-rejected-by-ats",
    title: "Why Your Resume Gets Rejected Before a Human Even Reads It (And How to Fix It in 2025)",
    subtitle: "83% of Indian job seekers never hear back. Here's the exact reason — and the exact fix.",
    date: "April 18, 2026", readTime: "8 min read", category: "Resume Tips",
    metaDescription: "Discover why ATS systems reject 75% of resumes in India and how AI-powered tools like HireMatch AI help freshers and professionals get shortlisted faster in 2025.",
    focusKeyword: "ATS resume rejection India 2025",
    tags: ["ATS Resume", "Resume Tips India", "Fresher Jobs 2025", "Job Search India", "AI Job Matching"],
    hero: "📄",
    content: [
      { type: "intro", text: "You spent three hours crafting the perfect resume. You applied to 47 jobs last month. You heard back from exactly two. Sound familiar? You are not alone — and you are almost certainly not doing anything wrong. The problem is not your qualifications. It is a piece of software called an Applicant Tracking System, and it is silently eliminating your resume before any human being ever sees it." },
      { type: "stat-block", stats: [
        { number: "75%", label: "of resumes are rejected by ATS before a recruiter sees them" },
        { number: "83%", label: "of engineering graduates in India finish college without a job offer" },
        { number: "99.7%", label: "of recruiters use ATS filters to screen candidates" },
        { number: "10.6x", label: "more likely to get an interview if the job title is on your resume" }
      ]},
      { type: "h2", text: "What Exactly Is an ATS and Why Does It Hurt Your Application?" },
      { type: "para", text: "An Applicant Tracking System is software used by companies to manage the hundreds of applications they receive for a single job posting. When you submit your resume on any major job portal or company website, it does not go directly to a recruiter's inbox. It goes into an ATS that scans it for specific keywords, checks for the right formatting, and assigns it a relevance score. If your score is too low, your application is filtered out automatically. The recruiter never sees your name." },
      { type: "h2", text: "The 7 Most Common Reasons Your Resume Fails the ATS Scan" },
      { type: "numbered-list", items: [
        { title: "You are using the wrong keywords", body: "ATS systems are extremely literal. If the job description says 'React.js' and your resume says 'ReactJS' or just 'React', many systems treat these as different terms. Always mirror the exact phrasing from the job description." },
        { title: "Your formatting is too fancy", body: "Tables, columns, text boxes, headers, footers, and graphics confuse ATS parsers. The system reads your resume as raw text. If your skills are inside a table, the ATS may not detect them at all." },
        { title: "You are missing the job title", body: "Including the specific job title near the top of your resume makes you 10.6x more likely to get shortlisted. Most freshers write a generic 'Objective Statement' instead." },
        { title: "You have no measurable achievements", body: "'Worked on website' is invisible to both ATS and recruiters. 'Developed React-based dashboard that reduced load time by 30%' scores high on both counts." },
        { title: "Your file format is wrong", body: "PDF is generally safe, but some older ATS systems cannot read PDFs correctly. When in doubt, submit a clean DOCX file." },
        { title: "You are applying to the wrong jobs", body: "If your resume has 30% keyword overlap with a job description, your ATS score will be very low regardless of your actual fit." },
        { title: "You have no role-specific skills section", body: "A generic skills list like 'Communication, Teamwork, Microsoft Office' does nothing for your ATS score. List technical skills that appear in the specific job description you are targeting." }
      ]},
      { type: "h2", text: "How HireMatch AI Solves the ATS Problem Automatically" },
      { type: "para", text: "HireMatch AI reads your entire resume and compares it against each job description using the same logic ATS systems use. For every job we show you, we tell you exactly which keywords are present in your resume, which are missing, and what specific changes you can make to improve your score. Instead of applying to 47 jobs blindly, you apply to 5 jobs you are genuinely matched for — and you apply with a resume that is optimised for each one." },
      { type: "callout", text: "The job-search problem in India is not a lack of opportunities. It is a lack of targeted applications. HireMatch AI turns a scattergun approach into a sniper strategy." },
      { type: "h2", text: "3 Quick ATS Fixes You Can Apply Right Now" },
      { type: "bullet-list", items: [
        "Open the job description of any role you want to apply for. Copy the three most-repeated technical skills into your resume's Skills section using exact phrasing.",
        "Remove all tables, text boxes, and columns from your resume. Use plain bullet points and standard section headings: Experience, Education, Skills, Projects.",
        "Add the job title you are targeting near the top of your resume — either in a summary line or as part of your headline. Make it match the posting exactly."
      ]},
      { type: "cta", text: "Upload your resume to HireMatch AI and find out your ATS score for any job in 90 seconds — free." }
    ]
  },
  {
    id: 2,
    slug: "best-internships-india-freshers-2025",
    title: "How to Find the Best Internships in India in 2025 (Without Getting Scammed or Underpaid)",
    subtitle: "The complete guide for college students — what platforms to use, what to avoid, and how AI changes everything.",
    date: "April 15, 2026", readTime: "10 min read", category: "Internships",
    metaDescription: "Find the best paid internships in India for students in 2025. Learn how to avoid fake listings, negotiate stipends, and use AI job matching to land your dream internship faster.",
    focusKeyword: "best internships India 2025 students",
    tags: ["Internship India 2025", "Paid Internship Students", "College Students Jobs", "AI Internship Finder"],
    hero: "🎓",
    content: [
      { type: "intro", text: "Getting your first internship in India in 2025 is harder than it looks — and easier than you think, if you approach it correctly. Most students spend weeks on various internship portals applying to ten listings per day and hearing nothing back. The problem is not your profile. It is the platform, the strategy, and in many cases, the quality of the listings themselves." },
      { type: "h2", text: "The State of Internships in India Right Now" },
      { type: "para", text: "India produced over 1.5 million engineering graduates in 2025 alone. Meanwhile, many internship platforms are flooded with unregistered individuals posting unpaid 'internships' that are really just requests for free labour. Knowing how to filter signal from noise is the most important skill in your internship search." },
      { type: "h2", text: "Red Flags: Internships to Avoid Completely" },
      { type: "bullet-list", items: [
        "No stipend mentioned, or 'certificate only' — your time has value. At minimum, an internship in 2025 should offer ₹5,000–₹8,000/month.",
        "Company has no verifiable website or online presence — search the domain. If it was registered in the last 6 months, be cautious.",
        "Asks you to pay a 'registration fee' or 'training fee' — legitimate internships never ask you to pay. This is always a scam.",
        "No clear job description — vague postings like 'Marketing Intern — work on exciting projects' with no deliverables defined are exploitative.",
        "Asks for your Aadhaar or bank details before you have even started — never share these before day one."
      ]},
      { type: "h2", text: "The 5 Best Types of Internships for Indian Students in 2025" },
      { type: "numbered-list", items: [
        { title: "Tech startup internships (₹10,000–₹25,000/month)", body: "Startups give you real ownership from day one. You will ship features, talk to users, and build a portfolio that gets you hired at top companies later." },
        { title: "Product-based company PPOs (Pre-Placement Offers)", body: "Leading product companies run structured summer internship programmes that convert to full-time offers. Apply 6 months in advance — these fill early." },
        { title: "Remote internships at global companies", body: "Post-2022, many international companies hire Indian interns remotely. Pay is significantly higher — often in USD or equivalent." },
        { title: "Government and public sector internships", body: "Research institutions and government bodies offer internships with certificates that carry weight in public sector applications." },
        { title: "NGO and social impact internships", body: "If your goal is MBA or public policy, a social impact internship differentiates you from thousands with identical tech internship experience." }
      ]},
      { type: "callout", text: "HireMatch AI generates a personalised internship application letter in one click — tailored to each specific listing based on your resume and the job description. No more generic 'I am a highly motivated individual' templates." },
      { type: "h2", text: "What HireMatch AI Does Differently for Students" },
      { type: "bullet-list", items: [
        "Shows only paid internships by default — filter by minimum stipend ₹5k, ₹10k, or ₹15k+",
        "Detects your year of study from your resume and shows only internships that accept your year",
        "Flags listings from unverified companies with a warning badge",
        "Shows you what skills you will gain from each internship — important for long-term career planning",
        "Generates a tailored application letter for each listing in under 10 seconds"
      ]},
      { type: "cta", text: "Upload your resume and discover internships matched to your exact skills — free on HireMatch AI." }
    ]
  },
  {
    id: 3,
    slug: "how-to-get-job-without-experience-india",
    title: "How to Get a Job in India With No Experience in 2025 (The Honest, Complete Guide)",
    subtitle: "Freshers, this one is for you. The complete playbook for landing your first job when everyone seems to want 2 years of experience.",
    date: "April 12, 2026", readTime: "12 min read", category: "Career Advice",
    metaDescription: "A complete guide for freshers in India on how to get a job with no experience in 2025 — from building your portfolio to using AI job matching tools.",
    focusKeyword: "how to get a job in India with no experience 2025",
    tags: ["Fresher Jobs India", "First Job India 2025", "No Experience Jobs", "Entry Level Jobs India", "Job Search Tips Freshers"],
    hero: "🚀",
    content: [
      { type: "intro", text: "The cruelest joke in Indian hiring is the entry-level job that requires two years of experience. You need experience to get a job, but you need a job to get experience. If you are a fresher in India in 2025, you have probably already stared at this paradox and wondered whether you are doing something wrong. You are not. But you do need a strategy — and this guide gives you one." },
      { type: "h2", text: "Why Freshers Struggle More in 2025 Than in Previous Years" },
      { type: "para", text: "The Indian job market in 2025 is competitive in a specific way: there is genuine demand for skilled workers, but a massive oversupply of candidates who lack the specific skills companies want. The gap between what colleges teach and what companies need has never been wider. AI tools have made it easy for candidates to flood job portals with applications — which means recruiters are more selective, and ATS filters are stricter than ever." },
      { type: "h2", text: "The Experience Problem — And How to Solve It" },
      { type: "numbered-list", items: [
        { title: "Build a project portfolio, not just a resume", body: "A GitHub repository with 3 real projects tells a recruiter more than a resume full of buzzwords. Build things that solve real problems — even small ones. A personal finance tracker, a local restaurant website, a data dashboard for public datasets." },
        { title: "Do freelance work, even for free once", body: "Do one project for a local business or NGO at no charge. Use it as a case study: 'Redesigned website for a Chennai NGO — increased enquiries by 40%'. That one bullet point makes your resume real." },
        { title: "Get certified in high-demand skills", body: "Several global platforms offer free or very low-cost certifications that recruiters recognise. A cloud practitioner badge or a data analytics certificate signals commitment and self-learning." },
        { title: "Target roles with high fresher acceptance", body: "Some roles are genuinely fresher-friendly: SDE, QA Engineer, Data Analyst, Business Analyst, Technical Content Writer, and Customer Success. Avoid roles that are functionally impossible without 2+ years of experience." },
        { title: "Optimise your resume for ATS before you apply anywhere", body: "A fresher resume that passes ATS filters is worth more than a beautifully designed resume that gets filtered out. Use plain formatting and match keywords from the job description." }
      ]},
      { type: "callout", text: "HireMatch AI tells freshers exactly what is missing from their resume for each job they want to apply to. No guesswork. No generic tips. Specific, actionable changes for each specific role." },
      { type: "h2", text: "The Job Search Strategy That Actually Works for Freshers" },
      { type: "para", text: "Do not apply to 100 jobs. Apply to 10 jobs you are genuinely matched for, with a tailored resume for each. This sounds like more work but it is less — because you will hear back from 3 of those 10 instead of 0 of the 100. Use HireMatch AI to find the 10 jobs where your match percentage is above 70%. Focus your energy there." },
      { type: "cta", text: "See exactly which fresher jobs match your resume today — 10 free matches, no account needed." }
    ]
  },
  {
    id: 4,
    slug: "job-portals-comparison-india-2025",
    title: "Popular Job Portals vs HireMatch AI: Which One Actually Gets You Hired in India 2025?",
    subtitle: "An honest, data-backed comparison of traditional job portals versus AI-powered job matching for Indian professionals.",
    date: "April 10, 2026", readTime: "9 min read", category: "Job Portal Comparison",
    metaDescription: "Compare traditional job portals and HireMatch AI for job searching in India in 2025.",
    focusKeyword: "best job portal India 2025",
    tags: ["Job Portal India 2025", "Best Job Portal India", "HireMatch AI Review", "Job Search Comparison India"],
    hero: "⚔️",
    content: [
      { type: "intro", text: "Every Indian job seeker eventually faces the same question: where should I actually spend my time and money? Traditional portals are the default. But they have serious, documented problems — and most users only discover them after wasting weeks and thousands of rupees. This is the comparison no one else is willing to write honestly." },
      { type: "h2", text: "Traditional Job Portals: The Honest Assessment" },
      { type: "para", text: "India's largest job portals command enormous volumes of users and listings. For sheer breadth of opportunities — especially in IT services, banking, manufacturing, and sales — they remain useful. But the honest truth from real user reviews paints a very different picture. Users who paid ₹10,000+ for premium packages reported receiving zero recruiter calls. Some portals' own premium ATS services were found to have actively lowered a user's resume score after a 'professional rewrite'. Aggressive sales calls, misleading promises, and billing issues without confirmation are recurring complaints across the industry." },
      { type: "h2", text: "Professional Networking Platforms: The Honest Assessment" },
      { type: "para", text: "Professional networking platforms are unquestionably powerful for mid-senior candidates. The networking component is irreplaceable — 85% of jobs are filled through connections. But for freshers and early-career professionals, these platforms have two critical problems. First, they reward those who already have networks. If you are just starting out, you are invisible. Second, premium tiers at ₹14,000/month are not worth it for most Indian job seekers." },
      { type: "stat-block", stats: [
        { number: "₹0", label: "to see 10 matched jobs with HireMatch AI" },
        { number: "₹399", label: "one-time for unlimited jobs + AI insights (vs ₹14,000/month elsewhere)" },
        { number: "90 sec", label: "from resume upload to seeing 10 matched jobs" },
        { number: "0", label: "spam calls or auto-renewal charges. Ever." }
      ]},
      { type: "h2", text: "What HireMatch AI Does Differently" },
      { type: "para", text: "HireMatch AI is not trying to be a job portal. It does one thing — takes your resume and finds jobs you are actually matched for, then explains exactly why. It pulls job listings from Google for Jobs in real time, which already aggregates all major Indian job boards. You are not missing listings. You are getting the same listings with AI intelligence layered on top." },
      { type: "callout", text: "The right answer for most job seekers: use all available platforms strategically. Use networking platforms for connections, traditional portals for volume, and HireMatch AI as your AI co-pilot that tells you which applications are actually worth your time." },
      { type: "cta", text: "Try HireMatch AI free — upload your resume and see how it compares to any job listing in India." }
    ]
  },
  {
    id: 5,
    slug: "ai-resume-builder-india-ats-optimised",
    title: "The AI Resume Revolution: How to Build an ATS-Optimised Resume in India That Actually Gets You Interviews in 2025",
    subtitle: "Stop sending the same resume to every job. Here is the AI-powered way to build targeted, winning resumes for the Indian job market.",
    date: "April 7, 2026", readTime: "11 min read", category: "Resume Building",
    metaDescription: "Learn how to build an ATS-optimised resume for the Indian job market in 2025 using AI tools.",
    focusKeyword: "AI resume builder India ATS optimised 2025",
    tags: ["AI Resume Builder India", "ATS Optimised Resume 2025", "Resume Building Tips India", "Best Resume Format India 2025"],
    hero: "✍️",
    content: [
      { type: "intro", text: "The resume you wrote for your last job search is probably already outdated — not because your skills have changed, but because the tools that read your resume have. In 2025, AI-powered ATS systems are smarter, stricter, and more widely used than ever before. But so are the AI tools that help you beat them." },
      { type: "h2", text: "Why Traditional Resume Advice No Longer Works" },
      { type: "para", text: "Most resume advice floating around the internet was written for a world where a human being read your resume first. That world no longer exists for most job applications. Today, an ATS scans your resume, assigns it a match score, and decides whether a human ever sees it. Traditional advice like 'use action verbs' and 'keep it one page' is still relevant, but it is only 20% of the battle." },
      { type: "h2", text: "The 5 Non-Negotiable Elements of a 2025 ATS Resume" },
      { type: "numbered-list", items: [
        { title: "A clean, parseable format", body: "Use a single-column layout with standard section headings: Summary, Skills, Experience, Projects, Education. No tables, no columns, no graphics, no text boxes." },
        { title: "A tailored skills section per application", body: "Your skills section should not be static. For every job you apply to, mirror the technical requirements listed in the job description. Copy the exact terminology." },
        { title: "Achievement bullets with numbers", body: "'Developed a user authentication module' is weak. 'Developed a JWT-based user authentication module handling 50,000 daily active users, reducing login errors by 40%' is strong." },
        { title: "Job title in your summary", body: "If you are applying for a 'Senior Data Analyst' role, the words 'Senior Data Analyst' should appear in your resume summary." },
        { title: "Consistent section headings", body: "Use 'Work Experience' not 'My Journey'. ATS parsers are trained on standard headings. Non-standard headings cause sections to be mis-categorised or ignored." }
      ]},
      { type: "h2", text: "Before and After: AI Resume Transformation Examples" },
      { type: "bullet-list", items: [
        "Before: 'Worked on frontend features for the company website.' → After: 'Developed React.js components for a B2B SaaS dashboard, improving page load time by 35% and reducing customer-reported UI bugs by 60%.'",
        "Before: 'Analysed data and created reports for management.' → After: 'Built automated Python (Pandas) pipelines processing 2M+ daily records, reducing manual reporting time from 4 hours to 20 minutes.'",
        "Before: 'Helped with social media and content creation.' → After: 'Managed content calendar for a ₹50Cr e-commerce brand; grew organic reach by 3x in 60 days through a data-driven posting strategy.'"
      ]},
      { type: "callout", text: "HireMatch AI's Before vs After view shows you exactly what your resume looks like now and precisely what it should say for each specific job — not generic advice, but job-specific rewrites." },
      { type: "h2", text: "Common Resume Mistakes That Kill Your Chances in India" },
      { type: "bullet-list", items: [
        "Including a photo on your resume — not standard practice in India's tech sector and can trigger bias filters at international companies",
        "Listing soft skills like 'hardworking' and 'team player' without any evidence — replace these with specific instances",
        "Using graphically heavy resume templates with columns — beautiful for humans, invisible to ATS",
        "Not including a professional profile URL — recruiters who see your resume will search for you anyway",
        "Listing every skill you have ever heard of — 8–10 highly relevant skills is stronger than 25 generic ones"
      ]},
      { type: "cta", text: "Upload your resume to HireMatch AI and see exactly how it performs against any job you want to apply for." }
    ]
  }
];

function renderBlock(block: any, i: number, setActivePage?: (p: string) => void) {
  if (block.type === "intro") return <p key={i} className="text-base leading-relaxed text-gray-700 mb-5 italic border-l-4 border-[#2557a7] pl-4">{block.text}</p>;
  if (block.type === "para") return <p key={i} className="text-[15px] leading-relaxed text-gray-600 mb-4">{block.text}</p>;
  if (block.type === "h2") return <h2 key={i} className="text-xl font-bold text-gray-900 mt-8 mb-3 pb-2 border-b border-gray-100">{block.text}</h2>;
  if (block.type === "callout") return <div key={i} className="bg-blue-50 border border-blue-200 rounded-lg p-4 my-5 text-sm text-blue-800 leading-relaxed">{block.text}</div>;
  if (block.type === "cta") return <div key={i} className="bg-[#2557a7] rounded-xl p-6 my-8 text-center"><p className="text-white font-semibold mb-3">{block.text}</p><a href="/" className="bg-white text-[#2557a7] px-6 py-2 rounded-lg font-bold text-sm inline-block hover:bg-gray-100 transition-colors">Get Started Free →</a></div>;
  if (block.type === "bullet-list") return <ul key={i} className="list-disc pl-5 mb-5 space-y-2">{block.items.map((item: string, j: number) => <li key={j} className="text-[14px] text-gray-600 leading-relaxed">{item}</li>)}</ul>;
  if (block.type === "numbered-list") return <ol key={i} className="list-decimal pl-5 mb-5 space-y-3">{block.items.map((item: any, j: number) => <li key={j} className="text-[14px] text-gray-600 leading-relaxed"><span className="font-bold text-gray-800">{item.title}:</span> {item.body}</li>)}</ol>;
  if (block.type === "stat-block") return <div key={i} className="grid grid-cols-2 md:grid-cols-4 gap-3 my-6">{block.stats.map((s: any, j: number) => <div key={j} className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center"><div className="text-2xl font-bold text-[#2557a7]">{s.number}</div><div className="text-xs text-gray-500 mt-1 leading-snug">{s.label}</div></div>)}</div>;
  return null;
}

export default function BlogPage() {
  const [activeBlog, setActiveBlog] = useState<number | null>(null);

  if (activeBlog) {
    const blog = BLOGS.find(b => b.id === activeBlog)!;
    return (
      <div className="max-w-3xl mx-auto py-10 px-4">
        <button onClick={() => setActiveBlog(null)} className="text-[#2557a7] text-sm font-medium mb-6 flex items-center gap-2 hover:underline">← Back to Blog</button>
        <span className="bg-blue-50 text-[#2557a7] text-xs font-semibold px-3 py-1 rounded-full">{blog.category}</span>
        <h1 className="text-3xl font-bold text-gray-900 mt-3 mb-3 leading-tight">{blog.title}</h1>
        <p className="text-gray-500 text-[15px] mb-3">{blog.subtitle}</p>
        <div className="flex gap-4 text-xs text-gray-400 mb-2">{blog.date} · {blog.readTime}</div>
        <div className="flex flex-wrap gap-2 mb-8 pb-6 border-b border-gray-100">
          {blog.tags.map(t => <span key={t} className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded">{t}</span>)}
        </div>
        <div>{blog.content.map((block, i) => renderBlock(block, i))}</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Career Blog</h1>
      <p className="text-gray-500 mb-8">Expert guides on ATS, job search, and landing jobs in India.</p>
      <div className="flex flex-col gap-5">
        {BLOGS.map(blog => (
          <div key={blog.id} onClick={() => setActiveBlog(blog.id)} className="bg-white border border-gray-200 rounded-xl p-5 cursor-pointer hover:shadow-md transition-shadow border-l-4 border-l-[#2557a7]">
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1">
                <div className="flex gap-2 mb-3 flex-wrap">
                  <span className="text-xs bg-blue-50 text-[#2557a7] font-semibold px-2 py-1 rounded-full">{blog.category}</span>
                  <span className="text-xs text-gray-400">{blog.date} · {blog.readTime}</span>
                </div>
                <h2 className="text-[17px] font-bold text-gray-900 leading-snug mb-2">{blog.title}</h2>
                <p className="text-sm text-gray-500 leading-relaxed mb-3">{blog.subtitle}</p>
                <p className="text-xs text-[#2557a7]">Focus: {blog.focusKeyword}</p>
              </div>
              <div className="text-4xl flex-shrink-0">{blog.hero}</div>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-gray-100">
              {blog.tags.map(t => <span key={t} className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded">{t}</span>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
