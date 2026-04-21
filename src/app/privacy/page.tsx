export default function Privacy() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-6">
      <h1 className="text-4xl font-extrabold mb-4 text-gray-900">Privacy Policy</h1>
      <p className="text-gray-500 mb-10 pb-6 border-b border-gray-100 italic">Effective Date: April 21, 2026</p>
      
      <div className="prose prose-blue max-w-none text-gray-700 space-y-10">
        <section>
          <p className="leading-relaxed">
            Welcome to **HireMatch AI**. Your privacy is paramount. This Privacy Policy explains how we collect, use, and protect your personal data in compliance with the **Digital Personal Data Protection Act (DPDPA), 2023**, and the **Information Technology Act, 2000** of India.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Data We Collect (Data Principal Rights)</h2>
          <p className="mb-4">As a "Data Fiduciary," we collect only the information necessary to fulfill our service of AI-powered job matching:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Account Data:</strong> Name, email address, and authentication data (via Google/Supabase).</li>
            <li><strong>Resume Data:</strong> Text, work history, skills, and education extracted from uploaded documents.</li>
            <li><strong>Usage Data:</strong> Search queries, job preferences, and interaction with AI-generated matches.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Purpose of Data Processing</h2>
          <p className="mb-4">Your data is processed strictly for the following purposes after obtaining your explicit consent:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Analyzing your resume to determine matching job roles.</li>
            <li>Optimizing your resume for Applicant Tracking Systems (ATS).</li>
            <li>Communicating daily job alerts (via Resend).</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">3. AI Data Processing Disclosure</h2>
          <p className="mb-4">To provide our matching services, we use third-party AI models (including OpenAI and Google Gemini). Specifically:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>We do **not** use your personal data to train these AI models.</li>
            <li>Resume text is sent via secure API to these models for one-time analysis.</li>
            <li>We enforce data-deletion or zero-retention policies where technically feasible with our AI partners.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Retention and Erasure</h2>
          <p>
            We retain your data only for as long as your account is active. Under the DPDPA 2023, you have the <strong>Right to Erasure</strong>. You may delete your account at any time, which will permanently purge your data from our active databases within 30 days.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Grievance Redressal</h2>
          <p className="mb-4 text-sm bg-gray-50 p-6 rounded-xl border border-gray-200">
            In accordance with IT Rules, if you have any complaints or concerns, you may reach out to our Grievance Officer:<br/><br/>
            <strong>Grievance Officer:</strong> HireMatch AI<br/>
            <strong>Email:</strong> hirematchai07@gmail.com<br/>
            <strong>Location:</strong> Chennai, Tamil Nadu, India.
          </p>
        </section>
      </div>
    </div>
  );
}
