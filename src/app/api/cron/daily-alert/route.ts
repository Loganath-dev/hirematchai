import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { dailyAlertEmailHtml } from "@/lib/email-templates";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  if (searchParams.get("secret") !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const adminClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Get users with saved keywords who haven't been alerted in the last 23h
  const cutoff = new Date(Date.now() - 23 * 60 * 60 * 1000).toISOString();
  const { data: profiles, error } = await adminClient
    .from("profiles")
    .select("id, resume_keywords, last_alert_sent")
    .not("resume_keywords", "is", null)
    .or(`last_alert_sent.is.null,last_alert_sent.lt.${cutoff}`);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!profiles || profiles.length === 0) {
    return NextResponse.json({ message: "No users to alert today.", count: 0 });
  }

  let successCount = 0;
  let failCount = 0;

  for (const profile of profiles) {
    try {
      const { data: authUser } = await adminClient.auth.admin.getUserById(profile.id);
      const email = authUser?.user?.email;
      const name = authUser?.user?.user_metadata?.full_name || email?.split("@")[0] || "there";
      if (!email) continue;

      const keywords = profile.resume_keywords || "Software Developer India";

      // Fetch 5 real jobs from JSearch — no AI scoring
      const jsearchRes = await fetch(
        `https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(keywords + " India")}&page=1&num_pages=1&country=in&date_posted=3days`,
        {
          headers: {
            "X-RapidAPI-Key": process.env.RAPIDAPI_KEY || "",
            "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
          },
        }
      );
      const jsearchData = await jsearchRes.json();
      const jobs = (jsearchData.data || []).slice(0, 5).map((j: any) => ({
        title: j.job_title,
        company: j.employer_name,
        location: `${j.job_city || ""}, ${j.job_state || ""}`.replace(/^,\s*/, "").trim() || "India",
        type: j.job_employment_type || "Full-time",
        applyUrl: j.job_apply_link || "https://hirematch.ai",
        postedAt: j.job_posted_at_datetime_utc
          ? new Date(j.job_posted_at_datetime_utc).toLocaleDateString("en-IN", { day: "numeric", month: "short" })
          : "Recent",
      }));

      if (jobs.length === 0) continue;

      const { error: emailError } = await resend.emails.send({
        from: "HireMatch AI <onboarding@resend.dev>",
        to: email,
        subject: `📬 ${jobs.length} new jobs matching your profile — HireMatch AI`,
        html: dailyAlertEmailHtml(name, jobs, keywords),
      });

      if (emailError) { failCount++; continue; }

      await adminClient
        .from("profiles")
        .update({ last_alert_sent: new Date().toISOString() })
        .eq("id", profile.id);

      successCount++;
      await new Promise(r => setTimeout(r, 300));
    } catch (err) {
      console.error("Alert failed for", profile.id, err);
      failCount++;
    }
  }

  return NextResponse.json({ total: profiles.length, success: successCount, failed: failCount });
}
