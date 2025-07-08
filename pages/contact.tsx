import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const runtime = 'experimental-edge';

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact - TeammateNow™</title>
        <meta name="description" content="Get in touch with the TeammateNow™ team" />
      </Head>

      <section className="min-h-screen bg-gray-50 py-24 px-4">
        <div className="max-w-lg mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Get in Touch</h1>
          <p className="text-xl text-gray-600 leading-relaxed mb-6">
            You can reach us anytime at<br/>
            <a href="mailto:contact@teammatenow.com" className="text-blue-600 font-medium">contact@teammatenow.com</a>
          </p>
          <p className="text-gray-500 mb-12">We aim to respond within 24 hours.</p>

          <form className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">Name</label>
              <input id="name" type="text" placeholder="Your name" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">Email</label>
              <input id="email" type="email" placeholder="you@example.com" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">Message</label>
              <textarea id="message" rows={6} placeholder="Your message..." className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none" required />
            </div>

            <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all">
              Send Message (Placeholder)
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
} 