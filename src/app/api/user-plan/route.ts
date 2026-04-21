import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(req: Request) {
  try {
    // Get the user's JWT from the Authorization header
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json({ isPro: false, uploadCount: 0, uploadLimit: 5, isLoggedIn: false });
    }

    // Verify the user token
    const supabaseClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json({ isPro: false, uploadCount: 0, uploadLimit: 5, isLoggedIn: false });
    }

    // Fetch profile using admin client
    const { createClient: createAdmin } = await import("@supabase/supabase-js");
    const adminClient = createAdmin(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data: profile } = await adminClient
      .from("profiles")
      .select("is_pro, upload_count, upload_reset_at, pro_expires_at")
      .eq("id", user.id)
      .single();

    if (!profile) {
      // Auto-create profile if missing (race condition safety)
      await adminClient.from("profiles").insert({ id: user.id });
      return NextResponse.json({ isPro: false, uploadCount: 0, uploadLimit: 5, isLoggedIn: true });
    }

    // Reset upload count if it's a new month
    const lastReset = new Date(profile.upload_reset_at);
    const now = new Date();
    const isNewMonth =
      now.getMonth() !== lastReset.getMonth() ||
      now.getFullYear() !== lastReset.getFullYear();

    let uploadCount = profile.upload_count;
    if (isNewMonth) {
      await adminClient
        .from("profiles")
        .update({ upload_count: 0, upload_reset_at: now.toISOString() })
        .eq("id", user.id);
      uploadCount = 0;
    }

    // Check if pro has expired
    const isPro = profile.is_pro &&
      (!profile.pro_expires_at || new Date(profile.pro_expires_at) > now);

    return NextResponse.json({
      isPro,
      uploadCount,
      uploadLimit: isPro ? Infinity : 5,
      isLoggedIn: true,
    });
  } catch (err) {
    console.error("user-plan error:", err);
    return NextResponse.json({ isPro: false, uploadCount: 0, uploadLimit: 5, isLoggedIn: false });
  }
}
