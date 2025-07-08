import { useRouter } from 'next/router';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Terms() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Header />
      <main className="pt-20">
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms of Service</h1>
              <p className="text-sm text-gray-500 mb-6">Last updated: ___ [Month Day, 2025]</p>
              
              <div className="prose prose-gray max-w-none">
                <p className="mb-4">Welcome to TeammateNow™ ("TeammateNow™," "we," "our," or "us"). These Terms govern your access to and use of our website, mobile applications, APIs, and any related services (collectively, the "Services"). By accessing or using the Services, you agree to be bound by these Terms and by our <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>. If you do not agree, do not use the Services.</p>

                <h3 className="text-xl font-semibold mt-6 mb-3">1. Eligibility & Account Registration</h3>
                <ul className="list-disc list-inside mb-4 space-y-1">
                  <li>You must be at least 13 years old (or the minimum age required in your country) to create an account.</li>
                  <li>You agree to provide accurate, complete information during sign-up and to keep it current.</li>
                  <li>You are responsible for all activity under your account. Keep your credentials secure and notify us immediately of any unauthorized use.</li>
                </ul>

                <h3 className="text-xl font-semibold mt-6 mb-3">2. User Content</h3>
                <p className="mb-2"><strong>Your Content.</strong> "User Content" means any text, code, images, ideas, or other material you submit or display via the Services.</p>
                <p className="mb-2"><strong>License to TeammateNow™.</strong> You grant us a non-exclusive, worldwide, royalty-free license to host, store, reproduce, and display your User Content solely to operate, improve, and promote the Services.</p>
                <p className="mb-2"><strong>Responsibility.</strong> You own (or have rights to) the User Content you post and assume all risk for it—including any reliance by others.</p>
                <p className="mb-4"><strong>Removal.</strong> We may remove or disable access to any User Content that we believe violates these Terms or applicable law.</p>

                <h3 className="text-xl font-semibold mt-6 mb-3">3. Acceptable Use</h3>
                <p className="mb-2">You agree not to:</p>
                <ul className="list-disc list-inside mb-4 space-y-1">
                  <li>Use the Services for any unlawful purpose.</li>
                  <li>Post or share content that is abusive, harassing, defamatory, or infringes intellectual-property rights.</li>
                  <li>Upload malware or conduct activity that could harm TeammateNow™ or its users.</li>
                  <li>Harvest personal data, spam, or attempt to reverse-engineer any part of the Services.</li>
                </ul>

                <h3 className="text-xl font-semibold mt-6 mb-3">4. Collaboration & Project Agreements</h3>
                <p className="mb-4">TeammateNow™ merely provides a platform for users to discover ideas and teammates. We are not a party to—and assume no liability for—any agreement, contract, or dispute between users. Set clear expectations with your collaborators (e.g., ownership, licensing, revenue-sharing) before starting a project.</p>

                <h3 className="text-xl font-semibold mt-6 mb-3">5. Intellectual Property</h3>
                <p className="mb-2"><strong>Our IP.</strong> The Services, including all software, branding, and content we provide (excluding User Content), are owned by TeammateNow™ or its licensors and are protected by law.</p>
                <p className="mb-4"><strong>Feedback.</strong> Any feedback or suggestions you provide may be used by us without obligation or compensation to you.</p>

                <h3 className="text-xl font-semibold mt-6 mb-3">6. Third-Party Services</h3>
                <p className="mb-4">The Services may integrate third-party tools (e.g., Supabase, GitHub OAuth). Use of those tools is subject to their own terms, and we are not responsible for their actions or data practices.</p>

                <h3 className="text-xl font-semibold mt-6 mb-3">7. Paid Features (If Applicable)</h3>
                <p className="mb-2">If we introduce paid tiers or add-on services:</p>
                <p className="mb-2"><strong>Billing.</strong> Fees, billing cycles, and payment methods will be disclosed at purchase.</p>
                <p className="mb-2"><strong>Refunds.</strong> Unless required by law, payments are non-refundable.</p>
                <p className="mb-4"><strong>Taxes.</strong> You are responsible for any applicable taxes.</p>

                <h3 className="text-xl font-semibold mt-6 mb-3">8. Termination</h3>
                <p className="mb-4">We may suspend or terminate your account (and remove User Content) at our discretion, including for breach of these Terms. You may delete your account at any time; certain data may persist as required by law or legitimate business needs.</p>

                <h3 className="text-xl font-semibold mt-6 mb-3">9. Disclaimers</h3>
                <p className="mb-2"><strong>"As Is."</strong> The Services are provided "as is" and "as available." We disclaim all warranties, express or implied, including merchantability, fitness for a particular purpose, and non-infringement.</p>
                <p className="mb-2"><strong>No Guarantee.</strong> We do not guarantee uninterrupted or error-free operation, that defects will be corrected, or that the Services are free of harmful components.</p>
                <p className="mb-4"><strong>User Interactions.</strong> We do not screen users or their content and are not liable for interactions between users.</p>

                <h3 className="text-xl font-semibold mt-6 mb-3">10. Limitation of Liability</h3>
                <p className="mb-4">To the maximum extent permitted by law, TeammateNow™ and its affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or for any loss of profits, data, or goodwill, arising out of or relating to the Services, even if advised of the possibility of such damages. Our aggregate liability will not exceed $100 USD or the amount you paid to us in the past 12 months, whichever is greater.</p>

                <h3 className="text-xl font-semibold mt-6 mb-3">11. Indemnification</h3>
                <p className="mb-4">You agree to defend, indemnify, and hold harmless TeammateNow™, its affiliates, and their respective officers, directors, and employees from any claims, damages, or expenses arising from your use of the Services or your breach of these Terms.</p>

                <h3 className="text-xl font-semibold mt-6 mb-3">12. Modifications to the Terms</h3>
                <p className="mb-4">We may revise these Terms from time to time. We will post the updated version with an "Last updated" date. Continued use of the Services after changes become effective constitutes acceptance.</p>

                <h3 className="text-xl font-semibold mt-6 mb-3">13. Governing Law & Dispute Resolution</h3>
                <p className="mb-4">These Terms are governed by the laws of the State of [Your State/Country], excluding its conflict-of-laws principles. Any dispute shall be resolved exclusively in the courts located in [Your Jurisdiction], unless a mandatory arbitration clause is added here.</p>

                <h3 className="text-xl font-semibold mt-6 mb-3">14. Contact</h3>
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