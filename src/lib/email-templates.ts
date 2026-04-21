// ─── Welcome Email ────────────────────────────────────────────────────────────
export function welcomeEmailHtml(name?: string) {
  const n = name || "there";
  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>Welcome to HireMatch AI</title></head>
<body style="margin:0;padding:0;background:#f4f6fb;font-family:'Segoe UI',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6fb;padding:40px 0;"><tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);max-width:100%;">
  <tr><td style="background:#2557a7;padding:36px 40px;text-align:center;">
    <div style="font-size:26px;font-weight:900;color:#fff;">HireMatch<span style="color:#93c5fd;">AI</span></div>
    <div style="color:#bfdbfe;font-size:13px;margin-top:6px;">AI-Powered Job Matching for India</div>
  </td></tr>
  <tr><td style="padding:40px 40px 32px;">
    <h1 style="font-size:24px;font-weight:800;color:#111827;margin:0 0 12px;">Welcome, ${n}! 🎉</h1>
    <p style="color:#4b5563;font-size:15px;line-height:1.7;margin:0 0 24px;">
      You've joined the smarter way to find jobs in India. HireMatch AI reads your resume and finds the roles you're <strong>actually qualified for</strong> — then tells you exactly why.
    </p>
    <div style="background:#f0f7ff;border:1px solid #dbeafe;border-radius:12px;padding:24px;margin-bottom:28px;">
      <div style="font-size:15px;font-weight:700;color:#1e40af;margin-bottom:14px;">Here's what you can do right now:</div>
      <table cellpadding="0" cellspacing="0" width="100%">
        ${[["📄","Upload your resume","Get 10 AI-ranked matches in 90 seconds"],["🎯","See your match %","Know before you apply"],["📝","Get ATS tips","Fix your resume for each specific job"],["💡","See improvement steps","Know exactly what skill to add next"]].map(([icon,title,desc])=>`
        <tr><td width="32" style="padding:6px 0;font-size:18px;vertical-align:top;">${icon}</td><td style="padding:6px 0;vertical-align:top;"><div style="font-size:14px;font-weight:700;color:#111827;">${title}</div><div style="font-size:13px;color:#6b7280;">${desc}</div></td></tr>`).join("")}
      </table>
    </div>
    <div style="text-align:center;margin-bottom:28px;">
      <a href="https://hirematch.ai" style="display:inline-block;background:#2557a7;color:#fff;font-size:16px;font-weight:700;padding:14px 36px;border-radius:10px;text-decoration:none;">Find My Job Matches →</a>
    </div>
    <div style="background:#fefce8;border:1px solid #fde68a;border-radius:10px;padding:16px;margin-bottom:20px;">
      <p style="font-size:13px;color:#92400e;margin:0;"><strong>🔓 Free plan:</strong> 5 uploads/month + 10 matches. Upgrade to <strong>Pro (₹399/month)</strong> for unlimited uploads and full AI insights.</p>
    </div>
    <p style="color:#6b7280;font-size:13px;margin:0;">Any questions? Reply to this email.<br/><em>The HireMatch AI Team</em></p>
  </td></tr>
  <tr><td style="background:#f9fafb;border-top:1px solid #e5e7eb;padding:20px 40px;text-align:center;">
    <p style="color:#9ca3af;font-size:12px;margin:0;">© 2026 HireMatch AI · <a href="#" style="color:#9ca3af;">Unsubscribe</a> · <a href="https://hirematch.ai/privacy" style="color:#9ca3af;">Privacy Policy</a></p>
  </td></tr>
</table>
</td></tr></table>
</body></html>`;
}

// ─── Daily Cron Job Alert ─────────────────────────────────────────────────────
// Sends real jobs only — no AI scores. Users click to get full review in app.
export function dailyAlertEmailHtml(name: string, jobs: any[], keywords: string) {
  const date = new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" });
  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>Today's Job Matches — HireMatch AI</title></head>
<body style="margin:0;padding:0;background:#f4f6fb;font-family:'Segoe UI',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6fb;padding:40px 0;"><tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);max-width:100%;">
  <!-- Header -->
  <tr><td style="background:#2557a7;padding:26px 40px;">
    <div style="font-size:22px;font-weight:900;color:#fff;">HireMatch<span style="color:#93c5fd;">AI</span></div>
    <div style="color:#bfdbfe;font-size:12px;margin-top:4px;">Daily Job Alert · ${date}</div>
  </td></tr>
  <!-- Body -->
  <tr><td style="padding:30px 40px 24px;">
    <h1 style="font-size:20px;font-weight:800;color:#111827;margin:0 0 6px;">Hey ${name}, ${jobs.length} new jobs for you 📬</h1>
    <p style="color:#6b7280;font-size:13px;margin:0 0 22px;">Based on your profile: <strong style="color:#2557a7;">${keywords}</strong></p>

    <!-- Job cards -->
    ${jobs.map((job: any) => `
    <table cellpadding="0" cellspacing="0" width="100%" style="border:1px solid #e5e7eb;border-radius:10px;margin-bottom:10px;">
      <tr><td style="padding:14px 16px;">
        <div style="font-size:15px;font-weight:700;color:#111827;">${job.title}</div>
        <div style="font-size:13px;color:#4b5563;margin-top:2px;">${job.company} &nbsp;·&nbsp; ${job.location}</div>
        <div style="font-size:12px;color:#9ca3af;margin-top:2px;">${job.type} &nbsp;·&nbsp; Posted ${job.postedAt}</div>
        <table cellpadding="0" cellspacing="0" style="margin-top:12px;"><tr>
          <td style="padding-right:10px;">
            <a href="https://hirematch.ai" style="display:inline-block;background:#2557a7;color:#fff;font-size:12px;font-weight:700;padding:7px 14px;border-radius:6px;text-decoration:none;">See AI Review</a>
          </td>
          <td>
            <a href="${job.applyUrl}" style="display:inline-block;border:1px solid #d1d5db;color:#374151;font-size:12px;font-weight:600;padding:6px 12px;border-radius:6px;text-decoration:none;">Apply Now ↗</a>
          </td>
        </tr></table>
      </td></tr>
    </table>`).join("")}

    <!-- CTA box -->
    <div style="background:#f0f7ff;border:1px solid #dbeafe;border-radius:12px;padding:20px;margin-top:18px;text-align:center;">
      <div style="font-size:14px;font-weight:700;color:#1e40af;margin-bottom:6px;">Want to know your exact match score?</div>
      <div style="font-size:13px;color:#3b82f6;margin-bottom:14px;">Upload your resume on HireMatch AI to see match %, ATS tips &amp; how to improve your chances — free or Pro.</div>
      <a href="https://hirematch.ai" style="display:inline-block;background:#2557a7;color:#fff;font-size:14px;font-weight:700;padding:12px 28px;border-radius:8px;text-decoration:none;">Get My Full AI Analysis →</a>
    </div>
  </td></tr>
  <!-- Footer -->
  <tr><td style="background:#f9fafb;border-top:1px solid #e5e7eb;padding:16px 40px;text-align:center;">
    <p style="color:#9ca3af;font-size:11px;margin:0;">© 2026 HireMatch AI · You're receiving this because you uploaded a resume.<br/>
    <a href="#" style="color:#9ca3af;">Unsubscribe from daily alerts</a></p>
  </td></tr>
</table>
</td></tr></table>
</body></html>`;
}
