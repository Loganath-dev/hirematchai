export default function Terms() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-6">
      <h1 className="text-4xl font-extrabold mb-4 text-gray-900">Terms & Conditions</h1>
      <p className="text-gray-500 mb-10 pb-6 border-b border-gray-100 italic">Effective Date: April 21, 2026</p>
      
      <div className="prose prose-blue max-w-none text-gray-700 space-y-10">
        <section>
          <p className="leading-relaxed">
            By accessing or using **HireMatch AI** ("the Platform"), you agree to be bound by these Terms and Conditions. These terms constitute a legally binding agreement between you and HireMatch AI regarding your use of our AI-powered job matching services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Nature of Service (AI Disclaimer)</h2>
          <p className="mb-4">HireMatch AI is an automated tool designed to assist in career search and ATS optimization. You acknowledge that:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>No Guarantee:</strong> We do not guarantee employment, interviews, or hiring outcomes. The final hiring decision rests solely with employers.</li>
            <li><strong>AI Hallucinations:</strong> AI-generated suggestions may occasionally contain errors or "hallucinations." Users should verify all generated advice before making career decisions.</li>
            <li><strong>Not a Recruitment Agency:</strong> We are a technology platform, not a recruitment agency or job consultant.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Lifetime Access & Payments</h2>
          <p className="mb-4">The "Lifetime Access" offer (one-time payment of ₹999) is subject to the following:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Validity:</strong> "Lifetime" refers to the operational life of the Platform.</li>
            <li><strong>Refunds:</strong> Since our services involve one-time digital processing of resumes, all payments are non-refundable once the service has been accessed, except as mandated by Indian Consumer Law.</li>
            <li><strong>Limits:</strong> Lifetime users are subject to the 2-month limit policy (5 resumes/month) as described in our pricing documentation.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Prohibited Conduct</h2>
          <p className="mb-4">Users agree not to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Upload fraudulent, defamatory, or illegal content.</li>
            <li>Reverse engineer or scrape the Platform's AI algorithms.</li>
            <li>Attempt to bypass the upload limits using multiple accounts.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Limitation of Liability</h2>
          <p>
            HireMatch AI shall not be liable for any indirect, incidental, or consequential damages arising from your use of the Platform, including but not limited to loss of employment opportunities or errors in AI-generated resume suggestions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Governing Law & Jurisdiction</h2>
          <p>
            These Terms are governed by the laws of India. Any disputes arising out of these Terms shall be subject to the exclusive jurisdiction of the courts located in <strong>Chennai, Tamil Nadu</strong>.
          </p>
        </section>
      </div>
    </div>
  );
}
