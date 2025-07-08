import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-800 text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 rounded-lg overflow-hidden">
              <img 
                src="/Images/FINAL_CHOSEN_LARGER.png?v=1" 
                alt="TeammateNow™" 
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-xl font-bold">TeammateNow™</span>
          </div>
          <p className="text-gray-300 mb-6">Connecting innovators and building the future together</p>
          <div className="flex flex-wrap items-center justify-center space-x-6 text-sm">
            <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-gray-300 hover:text-white transition-colors">
              Terms
            </Link>
            <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 