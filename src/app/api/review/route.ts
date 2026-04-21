import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const { name, rating, message, email } = await req.json();

    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Rating must be between 1 and 5" }, { status: 400 });
    }

    const adminClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { error } = await adminClient.from("reviews").insert({
      name: name || "Anonymous",
      email: email || null,
      rating,
      message: message || null,
      created_at: new Date().toISOString(),
    });

    if (error) {
      console.error("Review insert error:", error);
      return NextResponse.json({ error: "Failed to save review" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Review API error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
