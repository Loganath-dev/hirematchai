"use client";
import { useState } from "react";

const FAQS = [
  { category: "Getting Started", q: "What is HireMatch AI?", a: "HireMatch AI is an AI-powered job matching platform that reads your resume and finds jobs you are genuinely qualified for — ranked from best fit to least fit. Unlike traditional job portals that show you thousands of irrelevant listings, HireMatch AI uses AI to match your actual skills and experience to each job description, then tells you exactly why you match or do not match." },
  { category: "Getting Started", q: "How do I get started with HireMatch AI?", a: "Just upload your resume — PDF or DOCX, under 5MB. No account required to see your first 10 job matches. You will see your results in under 90 seconds." },
  { category: "Getting Started", q: "Do I need to create an account to use HireMatch AI?", a: "No. You can upload your resume and see your first 10 free job matches without creating an account. An account is only required if you choose to upgrade to the paid plan (₹399) to unlock unlimited results and AI insights." },
  { category: "Getting Started", q: "What file formats does HireMatch AI support?", a: "We support PDF and DOCX files up to 5MB. If your file fails to parse, you will see an option to paste your resume text directly instead." },
  { category: "Job Matching", q: "Where do the job listings come from?", a: "HireMatch AI pulls real-time listings from Google for Jobs via a job data API. This aggregates results from dozens of major job boards and company career pages — so you get broad coverage from verified sources without needing to create accounts on each platform." },
  { category: "Job Matching", q: "How does the AI match percentage work?", a: "The match percentage reflects how closely your resume's skills, experience level, and role align with what the job description requires. A higher percentage means you have more of the required skills and your experience level matches the role." },
  { category: "Job Matching", q: "What is AI Match Reasoning?", a: "AI Match Reasoning is a paid feature that explains exactly why you received your match score for each job. It shows you which skills from your resume are present in the job description (strengths), which required skills are missing (gaps), and a 1–2 sentence explanation of your overall fit. This is the feature that tells you why you might be rejected — and how to fix it." },
  { category: "Job Matching", q: "What are ATS Tips per Job?", a: "ATS Tips are 3 specific, job-tailored suggestions for improving your resume to pass the Applicant Tracking System for that particular role. Unlike generic advice, these are based on the actual keywords in the specific job description you are looking at." },
  { category: "Internships", q: "Does HireMatch AI work for students looking for internships?", a: "Yes. HireMatch AI detects from your resume whether you are a student and automatically activates Internship Mode. In this mode, we show internship listings filtered by stipend, duration, remote/onsite preference, and year of study. We also flag listings from unverified companies." },
  { category: "Internships", q: "How does HireMatch AI prevent fake internship listings?", a: "We pull listings from Google for Jobs, which is a more curated source than standalone portals. Additionally, each listing has a 'Report' button — flagged listings are reviewed and removed. We also display company verification status warnings." },
  { category: "Pricing", q: "What is included in the free plan?", a: "The free plan includes resume upload and AI parsing, 10 job or internship matches ranked by AI match percentage, salary range shown on every card, and the ability to save up to 3 jobs. No account required." },
  { category: "Pricing", q: "What does the ₹399 paid plan include?", a: "The ₹399 plan (valid for 30 days) unlocks unlimited job and internship results, AI Match Reasoning per job, ATS improvement tips per job, company deep-dive summaries, salary insights, save unlimited jobs, application tracker, AI application letter generator (for internships), interview question preview (5 per job), and weekly new-match email digest." },
  { category: "Pricing", q: "Is the ₹399 plan a subscription with auto-renewal?", a: "No. HireMatch AI does not auto-renew. The ₹399 plan is a one-time payment valid for 30 days. When it expires, you will be asked if you want to renew — you will never be charged without explicit confirmation. No surprise charges. Ever." },
  { category: "Pricing", q: "Do you offer student discounts?", a: "We are working on a verified student discount programme. In the meantime, ₹399 for 30 days is designed to be affordable for college students. Follow us for announcements about student and group pricing." },
  { category: "Privacy & Security", q: "Is my resume data safe?", a: "Yes. Your resume file is stored securely with encryption at rest. The parsed text is stored in our database and is only used to generate job matches and AI insights for your session. We never share your resume or any personal data with third parties. You can delete your data at any time from your account settings." },
  { category: "Privacy & Security", q: "Will HireMatch AI share my resume with employers?", a: "Absolutely not. HireMatch AI is not a resume database for employers. We do not share your resume, contact details, or any personal information with recruiters or companies. The Apply button redirects you to the original job listing — you choose when and where to submit your resume." },
];

export default function FAQPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeCat, setActiveCat] = useState("All");
  const categories = ["All", ...Array.from(new Set(FAQS.map(f => f.category)))];
  const filtered = activeCat === "All" ? FAQS : FAQS.filter(f => f.category === activeCat);

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Frequently Asked Questions</h1>
      <p className="text-gray-500 mb-8">{FAQS.length} questions across {categories.length - 1} categories.</p>

      <div className="flex gap-2 flex-wrap mb-8">
        {categories.map(cat => (
          <button key={cat} onClick={() => setActiveCat(cat)} className={`text-sm px-4 py-1.5 rounded-full border font-medium transition-colors ${activeCat === cat ? "bg-[#2557a7] text-white border-[#2557a7]" : "bg-white text-gray-600 border-gray-200 hover:border-[#2557a7] hover:text-[#2557a7]"}`}>{cat}</button>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        {filtered.map((faq, i) => (
          <div key={i} className="border border-gray-200 rounded-xl overflow-hidden bg-white">
            <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full text-left p-5 flex justify-between items-start gap-3 hover:bg-gray-50 transition-colors">
              <div>
                <div className="text-xs text-[#2557a7] font-semibold mb-1">{faq.category}</div>
                <div className="text-[15px] font-semibold text-gray-800 leading-snug">{faq.q}</div>
              </div>
              <span className="text-gray-400 text-xl flex-shrink-0 mt-0.5">{openFaq === i ? "−" : "+"}</span>
            </button>
            {openFaq === i && (
              <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4">{faq.a}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
