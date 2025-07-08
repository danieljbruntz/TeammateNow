import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const runtime = 'experimental-edge';

export default function HowItWorks() {
  return (
    <>
      <Head>
        <title>How It Works - TeammateNow™</title>
        <meta name="description" content="Learn how TeammateNow™ helps you find collaborators and launch projects" />
      </Head>

      <section className="min-h-screen bg-gray-50 py-24 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">How It Works</h1>
          <p className="text-xl text-gray-600 leading-relaxed mb-16 max-w-2xl mx-auto">
            Placeholder text: Explain in simple steps how users can share ideas, find collaborators, and build
            amazing projects together on TeammateNow™.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
            {[1, 2, 3].map((step) => (
              <div key={step} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-start">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center text-xl font-bold mb-4">
                  {step}
                </div>
                <h2 className="text-xl font-semibold mb-3">Step {step}</h2>
                <p className="text-gray-600 leading-relaxed">
                  Placeholder description for step {step}. Replace with real explanation of the process.
                </p>
              </div>
            ))}
          </div>

          <div className="mt-20">
            <Link href="/browse" className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg">
              Start Exploring Ideas
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
} 