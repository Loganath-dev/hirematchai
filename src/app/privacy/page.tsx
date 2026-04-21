export default function Privacy() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      <p className="text-gray-600 mb-6">Last updated: April 2026</p>
      <div className="prose max-w-none text-gray-800 space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-3">1. Information We Collect</h2>
          <p>At HireMatch AI, we collect information to provide better job matches for all our users. We do not sell your personal data or your resume text to third parties.</p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-3">2. AI Data Processing</h2>
          <p>Your resume data is temporarily processed by our AI models (OpenAI/Gemini) strictly to generate job matches and ATS optimization tips. We enforce zero-retention policies with our AI partners where applicable.</p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-3">3. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at privacy@hirematch.ai.</p>
        </section>
      </div>
    </div>
  );
}
