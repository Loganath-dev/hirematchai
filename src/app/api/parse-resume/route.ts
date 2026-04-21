import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import PDFParser from "pdf2json";

async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  return new Promise((resolve, reject) => {
    const pdfParser = new (PDFParser as any)(null, 1);

    pdfParser.on("pdfParser_dataError", (errData: any) => {
      reject(new Error(errData.parserError));
    });

    pdfParser.on("pdfParser_dataReady", () => {
      const text = (pdfParser as any).getRawTextContent();
      resolve(text);
    });

    pdfParser.parseBuffer(buffer);
  });
}

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "");

    let userId: string | null = null;
    let isPro = false;
    let uploadCount = 0;

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
          .select("is_pro, upload_count, upload_reset_at, pro_expires_at")
          .eq("id", userId)
          .single();

        if (profile) {
          const lastReset = new Date(profile.upload_reset_at);
          const now = new Date();
          const isNewMonth =
            now.getMonth() !== lastReset.getMonth() ||
            now.getFullYear() !== lastReset.getFullYear();

          if (isNewMonth) {
            await adminClient
              .from("profiles")
              .update({ upload_count: 0, upload_reset_at: now.toISOString() })
              .eq("id", userId);
            uploadCount = 0;
          } else {
            uploadCount = profile.upload_count;
          }

          isPro = profile.is_pro &&
            (!profile.pro_expires_at || new Date(profile.pro_expires_at) > now);
        }
      }
    }

    const FREE_LIMIT = 5;
    if (!isPro && uploadCount >= FREE_LIMIT) {
      return NextResponse.json(
        {
          error: "upload_limit_reached",
          message: `You've used all ${FREE_LIMIT} free resume uploads this month. Upgrade to Pro for unlimited uploads.`,
          uploadCount,
          uploadLimit: FREE_LIMIT,
        },
        { status: 403 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const text = await extractTextFromPDF(buffer);

    if (userId) {
      const adminClient = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
      );
      await adminClient
        .from("profiles")
        .update({ upload_count: uploadCount + 1 })
        .eq("id", userId);
    }

    return NextResponse.json({
      text,
      uploadCount: uploadCount + 1,
      uploadLimit: isPro ? null : FREE_LIMIT,
      isPro,
    });

  } catch (error: any) {
    console.error("PDF Parsing Error:", error?.message || error);
    return NextResponse.json({ error: "Failed to parse PDF. Please try a different file." }, { status: 500 });
  }
}
