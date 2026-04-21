"use client";

import { useState } from "react";
import { MapPin, Building2, Briefcase, IndianRupee, ChevronDown, ChevronUp, ExternalLink, Lightbulb, CheckCircle2, Target, Lock, Crown } from "lucide-react";
import Link from "next/link";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  matchScore: number | null;
  type: string;
  applyUrl?: string;
  description?: string;
  matchReason?: string;
  atsTips?: string[];
  improvementTips?: string[];
}

interface JobCardProps {
  job: Job;
  rank: number;
  isPro: boolean;
  tokensExhausted: boolean;
}

function matchBadgeColor(score: number | null) {
  if (score === null) return "bg-gray-100 text-gray-400 border border-gray-200";
  if (score >= 85) return "bg-green-100 text-green-700 border border-green-200";
  if (score >= 70) return "bg-blue-50 text-[#2557a7] border border-blue-200";
  return "bg-orange-50 text-orange-600 border border-orange-200";
}

export function JobCard({ job, rank, isPro, tokensExhausted }: JobCardProps) {
  const [expanded, setExpanded] = useState(false);

  // AI details visible if: Pro user OR (free user AND rank 1 AND tokens not exhausted)
  const aiUnlocked = isPro || (rank === 1 && !tokensExhausted);
  const showProLock = !isPro && rank > 1;
  const showTokensExhausted = !isPro && rank === 1 && tokensExhausted;

  return (
    <div className={`mb-4 rounded-xl border bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden ${showProLock ? "border-gray-200 opacity-95" : "border-gray-200"}`}>
      {/* Card Header */}
      <div
        className="p-5 cursor-pointer select-none"
        onClick={() => setExpanded((prev) => !prev)}
      >
        <div className="flex justify-between items-start gap-3">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500 mt-0.5">
              #{rank}
            </div>
            <div className="min-w-0">
              <h3 className="text-[17px] font-bold text-[#2557a7] leading-snug hover:underline">
                {job.title}
              </h3>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-gray-400" />
                  <span className="font-medium">{job.company}</span>
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-gray-400" />
                  {job.location}
                </span>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded text-xs text-gray-700 font-medium">
                  <Briefcase className="w-3 h-3 text-gray-400" />
                  {job.type}
                </span>
                {job.salary && (
                  <span className="flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded text-xs text-gray-700 font-medium">
                    <IndianRupee className="w-3 h-3 text-gray-400" />
                    {job.salary}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2 flex-shrink-0">
            {job.matchScore !== null ? (
              <span className={`text-sm font-bold px-2.5 py-1 rounded-full ${matchBadgeColor(job.matchScore)}`}>
                {job.matchScore}% Match
              </span>
            ) : (
              <span className="text-xs text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full font-medium">
                {showProLock ? "🔒 Pro" : "—"}
              </span>
            )}
            {expanded ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
          </div>
        </div>

        {!expanded && job.description && (
          <p className="mt-3 text-sm text-gray-500 leading-relaxed line-clamp-2 ml-10">{job.description}</p>
        )}
      </div>

      {/* Expanded panel */}
      {expanded && (
        <div className="border-t border-gray-100 px-5 pb-5 pt-4 space-y-4">

          {/* Pro lock for jobs 2–10 */}
          {showProLock && (
            <div className="bg-gradient-to-br from-[#2557a7]/5 to-purple-50 border border-[#2557a7]/20 rounded-xl p-5 text-center">
              <Lock className="w-8 h-8 text-[#2557a7]/40 mx-auto mb-3" />
              <p className="font-bold text-gray-800 text-sm mb-1">AI Analysis locked for free users</p>
              <p className="text-xs text-gray-500 mb-4">
                You're on the free plan. Upgrade to Pro to unlock AI match reasoning, ATS tips, and improvement tips for <strong>all 10 jobs</strong>.
              </p>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-1.5 bg-[#2557a7] hover:bg-[#1b4383] text-white font-bold px-5 py-2 rounded-lg text-sm transition-colors"
              >
                <Crown className="w-3.5 h-3.5 text-amber-300" />
                Upgrade to Pro — ₹399/month
              </Link>
            </div>
          )}

          {/* Token exhausted for free user on job #1 */}
          {showTokensExhausted && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
              <p className="font-bold text-amber-800 text-sm mb-1">AI analysis limit reached</p>
              <p className="text-xs text-amber-700 mb-3">You've used your free AI quota. Upgrade to Pro for 10,000 AI tokens per day.</p>
              <Link href="/pricing" className="inline-flex items-center gap-1.5 bg-[#2557a7] text-white font-bold px-4 py-1.5 rounded-lg text-sm">
                <Crown className="w-3.5 h-3.5 text-amber-300" /> Get Pro
              </Link>
            </div>
          )}

          {/* AI unlocked content */}
          {aiUnlocked && (
            <>
              {job.description && (
                <p className="text-sm text-gray-600 leading-relaxed">{job.description}</p>
              )}

              {job.matchReason && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-sm font-bold text-green-800">Why You Match</span>
                  </div>
                  <p className="text-sm text-green-700 leading-relaxed">{job.matchReason}</p>
                </div>
              )}

              {job.atsTips && job.atsTips.length > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Target className="w-4 h-4 text-[#2557a7] flex-shrink-0" />
                    <span className="text-sm font-bold text-[#2557a7]">ATS Tips for This Job</span>
                  </div>
                  <ul className="space-y-1.5">
                    {job.atsTips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-blue-700">
                        <span className="text-blue-400 font-bold mt-0.5 flex-shrink-0">{i + 1}.</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {job.improvementTips && job.improvementTips.length > 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb className="w-4 h-4 text-amber-600 flex-shrink-0" />
                    <span className="text-sm font-bold text-amber-800">How to Improve Your Chances</span>
                  </div>
                  <ul className="space-y-1.5">
                    {job.improvementTips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-amber-700">
                        <span className="text-amber-500 font-bold mt-0.5 flex-shrink-0">→</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}

          {/* Apply Now — always visible */}
          <div>
            <a
              href={job.applyUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#2557a7] hover:bg-[#1b4383] text-white font-bold px-6 py-2.5 rounded-lg text-sm transition-colors"
            >
              Apply Now
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}

      {/* Apply Now always visible when collapsed */}
      {!expanded && (
        <div className="px-5 pb-4 ml-10 flex items-center gap-3">
          <a
            href={job.applyUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-[#2557a7] hover:bg-[#1b4383] text-white font-bold px-5 py-2 rounded-lg text-sm transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            Apply Now <ExternalLink className="w-3.5 h-3.5" />
          </a>
          {showProLock && (
            <Link
              href="/pricing"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#2557a7] hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              <Lock className="w-3 h-3" /> Unlock AI Review
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
