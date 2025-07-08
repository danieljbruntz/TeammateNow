import { useRouter } from 'next/router';
import Footer from '../components/Footer';

export default function Privacy() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header rendered globally in _app */}
      <main className="pt-20">
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
              <p className="text-sm text-gray-500 mb-6">Last updated: 7 July 2025</p>
              
              <div className="prose prose-gray max-w-none">
                <p className="mb-4">TeammateNow™ ("we," "our," "us") helps makers find teammates and turn ideas into real projects. Protecting your privacy is important to us. This Policy explains what data we collect, why we collect it, and how you can control it.</p>

                <h3 className="text-xl font-semibold mt-6 mb-3">1. Information We Collect</h3>
                <div className="overflow-x-auto mb-4">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-300 px-4 py-2 text-left">Category</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">What we collect</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">How we collect it</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Why we collect it</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">Account info</td>
                        <td className="border border-gray-300 px-4 py-2">GitHub username, public-profile e-mail, avatar</td>
                        <td className="border border-gray-300 px-4 py-2">When you sign in with GitHub OAuth</td>
                        <td className="border border-gray-300 px-4 py-2">Create your TeammateNow™ account and display your profile</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">User-generated content</td>
                        <td className="border border-gray-300 px-4 py-2">Project posts, comments, messages</td>
                        <td className="border border-gray-300 px-4 py-2">You decide to publish or send it</td>
                        <td className="border border-gray-300 px-4 py-2">Show your ideas and communication to teammates</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">Usage data</td>
                        <td className="border border-gray-300 px-4 py-2">Page views, clicks, device type, IP address, referrer</td>
                        <td className="border border-gray-300 px-4 py-2">Supabase logs + analytics cookies</td>
                        <td className="border border-gray-300 px-4 py-2">Improve the product, debug issues, prevent abuse</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">Optional profile details</td>
                        <td className="border border-gray-300 px-4 py-2">Skills, bio, links</td>
                        <td className="border border-gray-300 px-4 py-2">You add them in settings</td>
                        <td className="border border-gray-300 px-4 py-2">Help others evaluate collaboration fit</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mb-4">We do not intentionally collect sensitive categories of data (e.g., race, health, precise location).</p>

                <h3 className="text-xl font-semibold mt-6 mb-3">2. Cookies & Similar Technologies</h3>
                <p className="mb-4">We use first-party cookies for session management (keeping you logged in) and anonymous analytics (understanding which features are used). You may disable cookies in your browser, but the site may not function properly.</p>

                <h3 className="text-xl font-semibold mt-6 mb-3">3. How We Use Your Data</h3>
                <ul className="list-disc list-inside mb-4 space-y-1">
                  <li>Provide and secure the service</li>
                  <li>Match you with relevant projects and teammates</li>
                  <li>Send transactional emails (e.g., "someone replied to your post")</li>
                  <li>Improve features through aggregated analytics</li>
                  <li>Enforce our Terms of Use and prevent fraud</li>
                </ul>
                <p className="mb-4">We never sell your personal information.</p>

                <h3 className="text-xl font-semibold mt-6 mb-3">4. Legal Bases (GDPR)</h3>
                <p className="mb-4">We process personal data on:</p>
                <ul className="list-disc list-inside mb-4 space-y-1">
                  <li>Contractual necessity – to provide the service you request</li>
                  <li>Legitimate interests – improve and secure our platform</li>
                  <li>Consent – optional profile details and marketing e-mails (you may withdraw at any time)</li>
                </ul>

                <h3 className="text-xl font-semibold mt-6 mb-3">5. How We Share Information</h3>
                <div className="overflow-x-auto mb-4">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-300 px-4 py-2 text-left">Recipient</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Reason</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">Supabase, Inc. (hosting provider)</td>
                        <td className="border border-gray-300 px-4 py-2">Store databases, authentication, and logs</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">Cloudflare, Inc.</td>
                        <td className="border border-gray-300 px-4 py-2">Serve the website quickly and protect against attacks</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">Analytics provider (e.g., PostHog or Plausible)</td>
                        <td className="border border-gray-300 px-4 py-2">Understand aggregated usage patterns</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mb-4">All vendors are contractually required to protect your information and may not use it for their own purposes.</p>

                <h3 className="text-xl font-semibold mt-6 mb-3">6. International Transfers</h3>
                <p className="mb-4">Servers are currently located in the United States. If you access TeammateNow™ from outside the U.S., your information may be transferred and processed there. We rely on Standard Contractual Clauses or equivalent safeguards where required.</p>

                <h3 className="text-xl font-semibold mt-6 mb-3">7. Data Retention</h3>
                <ul className="list-disc list-inside mb-4 space-y-1">
                  <li>Account data: kept until you delete your account or request erasure</li>
                  <li>Logs: up to 30 days for security, then aggregated or deleted</li>
                  <li>Posts/comments: remain visible until you remove them or delete your account</li>
                </ul>

                <h3 className="text-xl font-semibold mt-6 mb-3">8. Your Rights</h3>
                <p className="mb-2">Depending on your jurisdiction, you may have rights to:</p>
                <ul className="list-disc list-inside mb-4 space-y-1">
                  <li>Access or download a copy of your data</li>
                  <li>Correct inaccurate data</li>
                  <li>Delete your account and associated personal data</li>
                  <li>Object to or restrict certain processing</li>
                  <li>Opt out of marketing e-mails</li>
                </ul>
                <p className="mb-4">To exercise any right, email us at privacy@teammatenow.com. We will respond within 30 days.</p>

                <h3 className="text-xl font-semibold mt-6 mb-3">9. Children</h3>
                <p className="mb-4">TeammateNow™ is intended for users 13 years and older. We do not knowingly collect personal data from children under 13 (or lower age as defined by local law).</p>

                <h3 className="text-xl font-semibold mt-6 mb-3">10. Security</h3>
                <p className="mb-4">We use industry-standard measures such as HTTPS transport, hashed passwords, and role-based access controls. No system is 100% secure, but we continuously monitor and improve our defenses.</p>

                <h3 className="text-xl font-semibold mt-6 mb-3">11. Changes to This Policy</h3>
                <p className="mb-4">We may update this Policy to reflect changes in technology, law, or our service. We will post the revised version here and, if changes are material, notify you by e-mail or in-app notice at least 7 days before it takes effect.</p>

                <h3 className="text-xl font-semibold mt-6 mb-3">12. Contact</h3>
                <p className="mb-4">Questions or concerns?<br/>
                TeammateNow™<br/>
                contact@teammatenow.com</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
} 