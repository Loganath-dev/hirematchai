import { Resend } from "resend";
import { NextResponse } from "next/server";
import { dailyAlertEmailHtml } from "@/lib/email-templates";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email, name, jobs, keywords } = await req.json();

    if (!email || !jobs || jobs.length === 0) {
      return NextResponse.json({ error: "Email and jobs required" }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: "HireMatch AI <onboarding@resend.dev>",
      to: email,
      subject: `🎯 ${jobs.length} new job matches found for you — HireMatch AI`,
      html: dailyAlertEmailHtml(name, jobs, keywords || "Your Custom Matches"),
    });

    if (error) {
      console.error("Resend job alert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log("Job alert email sent:", data?.id);
    return NextResponse.json({ success: true, id: data?.id });

  } catch (err: any) {
    console.error("send-job-alert error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
