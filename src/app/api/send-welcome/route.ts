import { Resend } from "resend";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { welcomeEmailHtml } from "@/lib/email-templates";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email, name, userId } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    // Check if we already sent the welcome email to this user
    if (userId) {
      const adminClient = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
      );
      const { data: profile } = await adminClient
        .from("profiles")
        .select("welcome_sent")
        .eq("id", userId)
        .single();

      if (profile?.welcome_sent) {
        return NextResponse.json({ skipped: true, reason: "Already sent" });
      }
    }

    // Send welcome email
    const { data, error } = await resend.emails.send({
      from: "HireMatch AI <onboarding@resend.dev>",
      to: email,
      subject: "Welcome to HireMatch AI 🎉 — Your AI job matcher is ready",
      html: welcomeEmailHtml(name),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Mark welcome_sent = true in profiles
    if (userId) {
      const adminClient = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
      );
      await adminClient
        .from("profiles")
        .update({ welcome_sent: true })
        .eq("id", userId);
    }

    console.log("Welcome email sent:", data?.id);
    return NextResponse.json({ success: true, id: data?.id });

  } catch (err: any) {
    console.error("send-welcome error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
