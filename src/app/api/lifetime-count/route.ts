import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const adminClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { count, error } = await adminClient
      .from("profiles")
      .select("*", { count: "exact", head: true })
      .eq("plan_type", "lifetime");

    if (error) {
      console.error("lifetime-count error:", error);
      return NextResponse.json({ count: 50 }); // Fail closed (hide it if error)
    }

    return NextResponse.json({ count: count || 0 });
  } catch (err) {
    console.error("lifetime-count catch error:", err);
    return NextResponse.json({ count: 50 });
  }
}
