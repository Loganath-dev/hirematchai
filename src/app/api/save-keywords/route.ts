import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "");
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const supabaseClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const { data: { user } } = await supabaseClient.auth.getUser(token);
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { keywords } = await req.json();
    if (!keywords) return NextResponse.json({ error: "No keywords" }, { status: 400 });

    const adminClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    await adminClient
      .from("profiles")
      .update({ resume_keywords: keywords })
      .eq("id", user.id);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("save-keywords error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
