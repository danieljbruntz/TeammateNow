import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const runtime = 'experimental-edge';

export default function About() {
  return (
    <>
      <Head>
        <title>About - TeammateNow™</title>
        <meta name="description" content="Learn more about the mission and team behind TeammateNow™" />
      </Head>

      <section className="min-h-screen bg-gray-50 py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-left mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">About TeammateNow™</h1>
            <p className="text-gray-700 leading-relaxed">
              I built TeammateNow™ after spending way too many late-night hours on Discord, Reddit, and random group chats trying to find anyone who genuinely wanted to team up on a project I could use for my college capstone. Most conversations went nowhere with people talking about ideas for a few days, then letting them fade away in a Google Doc after writing about 100 lines of code (if they even got that far).
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              TeammateNow™ fixes that: it lets builders post an idea and find teammates who are ready to start that same day, while also giving anyone who just want to join a project a clear place to discover ideas, jump in, and start making real progress right away, minus all the usual networking uncertainty.
            </p>
            <hr className="my-6 border-gray-200" />
            <p className="text-gray-700 leading-relaxed italic">
              Stop for a moment and think, how many great ideas have you had (that you were fully confident would have a good chance of succeeding) that simply did not work because you couldn't get anyone to work on it with you?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed">
                To cut the wait-time and guess-work out of collaboration: TeammateNow™ gives anyone with a tech idea a fast lane to partners who actually want to build, while also giving hungry contributors a scrollable feed of real projects they can hop onto today, so code ships and ideas stop dying in chat threads like flies.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
              <ul className="list-none text-gray-600 leading-relaxed">
                <li className="flex items-start">
                  <span className="text-gray-600 mr-2 mt-0.5 opacity-75">•</span>
                  <span className="flex-1">
                    Daniel Bruntz – Passionate Founder/Full-Stack Generalist
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
} 