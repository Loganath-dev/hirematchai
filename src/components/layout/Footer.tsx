import Link from "next/link";
import { Briefcase } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white mt-16">
      <div className="max-w-[1400px] mx-auto px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-[#2557a7] p-1.5 rounded-lg"><Briefcase className="w-4 h-4 text-white" /></div>
              <span className="text-lg font-extrabold text-[#2557a7]">HireMatch<span className="text-gray-900">AI</span></span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed max-w-[200px]">The job selection engine that tells you exactly why you get rejected — and how to fix it.</p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-bold text-gray-900 mb-3 text-sm">Product</h3>
            <ul className="space-y-2">
              {[["Find Jobs", "/"], ["Pricing", "/pricing"], ["Blog", "/blog"], ["FAQs", "/faq"], ["Testimonials", "/testimonials"]].map(([label, href]) => (
                <li key={label}><Link href={href} className="text-sm text-gray-500 hover:text-[#2557a7] hover:underline transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold text-gray-900 mb-3 text-sm">Legal</h3>
            <ul className="space-y-2">
              {[["Privacy Policy", "/privacy"], ["Terms & Conditions", "/terms"]].map(([label, href]) => (
                <li key={label}><Link href={href} className="text-sm text-gray-500 hover:text-[#2557a7] hover:underline transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-gray-900 mb-3 text-sm">Contact</h3>
            <ul className="space-y-2">
              <li><a href="mailto:hirematchai07@gmail.com" className="text-sm text-gray-500 hover:text-[#2557a7] transition-colors">hirematchai07@gmail.com</a></li>
              <li><span className="text-sm text-gray-400">Chennai, Tamil Nadu, India</span></li>
              <li><span className="text-sm text-gray-400">Response within 2 business days</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-gray-400">© 2026 HireMatch AI. Built for Indian job seekers.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="text-xs text-gray-400 hover:text-[#2557a7] hover:underline">Privacy</Link>
            <Link href="/terms" className="text-xs text-gray-400 hover:text-[#2557a7] hover:underline">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
