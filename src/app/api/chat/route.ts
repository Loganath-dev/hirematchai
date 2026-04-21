import OpenAI from "openai";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const FREE_TOKEN_LIMIT = 2000;
const PRO_TOKEN_LIMIT = 10000;

async function fetchJSearchJobs(query: string): Promise<any[]> {
  try {
    const adminClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const normalizedQuery = query.toLowerCase().trim();

    // 1. Check Cache (12 hour expiration)
    const twelveHoursAgo = new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString();
    const { data: cached } = await adminClient
      .from("jobs_cache")
      .select("jobs")
      .eq("query", normalizedQuery)
      .gte("created_at", twelveHoursAgo)
      .single();

    if (cached && cached.jobs) {
      console.log("🔥 Cache HIT for query:", normalizedQuery);
      return cached.jobs;
    }

    // 2. Fetch JSearch (Cache MISS)
    console.log("🌐 External API HIT for query:", normalizedQuery);
    const res = await fetch(
      `https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(query)}&page=1&num_pages=1&date_posted=all`,
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": process.env.RAPIDAPI_KEY || "",
          "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
        },
      }
    );
    
    if (!res.ok) return [];
    const data = await res.json();
    const jobs = (data.data || []).slice(0, 10);

    // 3. Save to Cache
    if (jobs.length > 0) {
      await adminClient.from("jobs_cache").upsert(
        { query: normalizedQuery, jobs: jobs, created_at: new Date().toISOString() },
        { onConflict: "query" }
      );
    }

    return jobs;
  } catch (err) {
    console.error("fetchJSearchJobs error:", err);
    return [];
  }
}

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "");

    let userId: string | null = null;
    let isPro = false;
    let tokensUsed = 0;
    let tokensExhausted = false;

    // --- Fetch user profile ---
    if (token) {
      const supabaseClient = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
      const { data: { user } } = await supabaseClient.auth.getUser(token);
      userId = user?.id ?? null;

      if (userId) {
        const adminClient = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.SUPABASE_SERVICE_ROLE_KEY!
        );
        const { data: profile } = await adminClient
          .from("profiles")
          .select("is_pro, pro_expires_at, ai_tokens_used, ai_tokens_reset_at")
          .eq("id", userId)
          .single();

        if (profile) {
          const now = new Date();
          isPro = profile.is_pro && (!profile.pro_expires_at || new Date(profile.pro_expires_at) > now);

          // Pro tokens reset daily
          if (isPro) {
            const lastReset = new Date(profile.ai_tokens_reset_at);
            const isNewDay =
              now.getDate() !== lastReset.getDate() ||
              now.getMonth() !== lastReset.getMonth() ||
              now.getFullYear() !== lastReset.getFullYear();
            if (isNewDay) {
              await adminClient.from("profiles")
                .update({ ai_tokens_used: 0, ai_tokens_reset_at: now.toISOString() })
                .eq("id", userId);
              tokensUsed = 0;
            } else {
              tokensUsed = profile.ai_tokens_used || 0;
            }
            tokensExhausted = tokensUsed >= PRO_TOKEN_LIMIT;
          } else {
            // Free: lifetime limit
            tokensUsed = profile.ai_tokens_used || 0;
            tokensExhausted = tokensUsed >= FREE_TOKEN_LIMIT;
          }
        }
      }
    }

    const { messages, mode, resumeText } = await req.json();
    const lastUserMessage = messages.slice().reverse().find((m: any) => m.role === "user");
    if (!lastUserMessage) {
      return NextResponse.json({ error: "No user message found" }, { status: 400 });
    }



    const combinedContent = resumeText
      ? `User's Resume:\n${resumeText}\n\nUser's Request:\n${lastUserMessage.content}`
      : lastUserMessage.content;

    // --- STEP 1: Extract search keywords ---
    const keywordResponse = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Extract the most relevant job title and 1-2 skills from the user's message/resume. Return ONLY a short query like: 'React Developer' or 'Data Analyst Python'. Max 4 words. No location.",
        },
        { role: "user", content: combinedContent },
      ],
      max_tokens: 20,
      temperature: 0.2,
    });
    const baseQuery = keywordResponse.choices[0]?.message?.content?.trim() || "Software Developer";
    const searchQuery = `${baseQuery} India`;
    console.log("Query:", searchQuery, "| isPro:", isPro, "| tokensUsed:", tokensUsed, "| exhausted:", tokensExhausted);

    // --- STEP 2: Fetch real jobs ---
    let rawJobs = await fetchJSearchJobs(searchQuery);
    const usingRealJobs = rawJobs.length > 0;

    // --- STEP 3: If tokens exhausted, return jobs WITHOUT AI analysis ---
    if (tokensExhausted) {
      const jobs = usingRealJobs
        ? rawJobs.map((j: any, i: number) => ({
            id: `j${i}`,
            title: j.job_title,
            company: j.employer_name,
            location: `${j.job_city || ""}, ${j.job_state || ""}`.replace(/^,\s*/, "").trim() || "India",
            salary: "Competitive",
            type: j.job_employment_type || "Full-time",
            applyUrl: j.job_apply_link,
            matchScore: null,
            description: j.job_description?.slice(0, 200),
          }))
        : [];
      return NextResponse.json({
        role: "assistant",
        content: "Here are your job matches! Upgrade to Pro to see AI analysis for all jobs.",
        jobs,
        isPro,
        tokensExhausted: true,
      });
    }

    // --- STEP 4: Generate AI analysis ---
    let tokensSpent = 0;

    if (!usingRealJobs) {
      // AI-generated jobs fallback
      const aiResponse = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are HireMatch AI, an elite technical recruiter and ATS expert. Your goal is to help the user GET THE JOB. 
Generate 10 highly realistic Indian job opportunities ranked by match. Return raw JSON only:
{
  "reply": "2-3 highly encouraging and strategic sentences.",
  "jobs": [{
    "id": "j0", "title": "...", "company": "Indian/MNC company",
    "location": "City, India", "salary": "₹X,XX,XXX - ₹Y,YY,YYY per year",
    "matchScore": 50-99, "type": "Full-time",
    "applyUrl": "https://www.linkedin.com/jobs",
    "description": "2 sentence summary.",
    "matchReason": "2 specific sentences explaining exactly why their background is a match.",
    "atsTips": ["Exact keyword to add based on the job requirements...", "Specific phrase to pass ATS...", "Missing skill to list..."],
    "improvementTips": ["tip1", "tip2"]
  }]
}
CRITICAL FOR ATS TIPS: Provide EXACT keywords and actionable phrases they must inject into their resume to pass parsing software (Taleo, Greenhouse, etc.). Do not give generic advice.
Use Indian companies: Infosys, Wipro, Razorpay, Zomato, Zepto, PhonePe, Groww, CRED, Freshworks, TCS, Swiggy, Flipkart.
Rank by matchScore descending. atsTips must be job-specific.`,
          },
          { role: "user", content: combinedContent },
        ],
        max_tokens: isPro ? 3500 : 1200, // limit tokens for free users
        temperature: 0.5,
      });

      tokensSpent = aiResponse.usage?.total_tokens || 0;
      let aiText = aiResponse.choices[0]?.message?.content?.trim() || "";
      aiText = aiText.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/\s*```$/i, "").trim();

      // Update token count in DB
      if (userId) {
        const adminClient = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.SUPABASE_SERVICE_ROLE_KEY!
        );
        await adminClient.from("profiles")
          .update({ ai_tokens_used: tokensUsed + tokensSpent })
          .eq("id", userId);
      }

      try {
        const parsed = JSON.parse(aiText);
        return NextResponse.json({
          role: "assistant",
          content: parsed.reply || "Here are your top AI-matched job opportunities!",
          jobs: (parsed.jobs || []).slice(0, 10),
          isPro,
          tokensExhausted: false,
        });
      } catch {
        return NextResponse.json({ role: "assistant", content: "Try again in a moment.", jobs: [], isPro, tokensExhausted: false });
      }
    }

    // Real JSearch jobs — use AI to rank & annotate
    const jobSummaries = rawJobs.map((j: any, i: number) => ({
      index: i,
      title: j.job_title,
      company: j.employer_name,
      location: `${j.job_city || ""} ${j.job_state || ""}`.trim() || "India",
      type: j.job_employment_type || "Full-time",
      description: j.job_description?.slice(0, 300) || "",
      applyUrl: j.job_apply_link || "",
      salary: j.job_min_salary
        ? `₹${Math.round(j.job_min_salary / 1000)}K - ₹${Math.round((j.job_max_salary || j.job_min_salary * 1.5) / 1000)}K`
        : "Competitive",
    }));

    const analysisResponse = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are HireMatch AI, an elite technical recruiter and ATS (Applicant Tracking System) expert. Your primary goal is to help the user GET THE JOB.
Analyze the user's resume against these real job listings. Return raw JSON only:
{
  "reply": "2-3 highly encouraging and strategic sentences.",
  "jobs": [{ "id":"j0","title":"","company":"","location":"","salary":"","type":"","applyUrl":"","description":"1-2 sentence summary","matchScore":50-99,"matchReason":"2 specific sentences explaining exactly why they fit.","atsTips":["Exact keyword/phrase to add for ATS...","Missing skill to inject...","Specific formatting shift..."],"improvementTips":["tip1","tip2"] }]
}
CRITICAL INSTRUCTIONS FOR ATS TIPS:
- The "atsTips" MUST be highly actionable, exact keyword-based optimizations tailored specifically to the mismatch between the user's resume and the actual job description text.
- Do not give generic advice. Give EXACT phrases to add (e.g., "Add the exact phrase 'RESTful API Integration' to your skills section to pass the Taleo parser filter").
- Identify specific tools or methodologies from the job description that the resume lacks, and instruct them to add it to pass ATS parsers (Taleo, Workday, etc.).
Rank by matchScore descending.`,
        },
        {
          role: "user",
          content: `User background: ${combinedContent}\n\nJobs: ${JSON.stringify(jobSummaries)}`,
        },
      ],
      max_tokens: isPro ? 3000 : 1200,
      temperature: 0.4,
    });

    tokensSpent = analysisResponse.usage?.total_tokens || 0;

    // Save tokens used
    if (userId) {
      const adminClient = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
      );
      await adminClient.from("profiles")
        .update({ ai_tokens_used: tokensUsed + tokensSpent })
        .eq("id", userId);
    }

    let responseText = analysisResponse.choices[0]?.message?.content?.trim() || "";
    responseText = responseText.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/\s*```$/i, "").trim();

    try {
      const parsed = JSON.parse(responseText);
      return NextResponse.json({
        role: "assistant",
        content: parsed.reply || `Found ${rawJobs.length} matches!`,
        jobs: parsed.jobs || [],
        isPro,
        tokensExhausted: false,
      });
    } catch {
      return NextResponse.json({
        role: "assistant",
        content: `Found ${rawJobs.length} real job listings matching your profile!`,
        jobs: rawJobs.map((j: any, i: number) => ({
          id: `j${i}`, title: j.job_title, company: j.employer_name,
          location: `${j.job_city || ""}, ${j.job_state || ""}`.trim(),
          salary: "Competitive", type: j.job_employment_type || "Full-time",
          applyUrl: j.job_apply_link, matchScore: 85 - i * 3,
          description: j.job_description?.slice(0, 200),
          matchReason: "Based on your profile and the job requirements.",
          atsTips: ["Include keywords from the job description", "Quantify your achievements", "Match the job title in your summary"],
          improvementTips: ["Tailor your resume to this role", "Highlight relevant project experience"],
        })),
        isPro,
        tokensExhausted: false,
      });
    }
  } catch (error: any) {
    console.error("Chat API Error:", error?.message || error);
    return NextResponse.json({ role: "assistant", content: "I'm having trouble right now. Please try again." }, { status: 500 });
  }
}
