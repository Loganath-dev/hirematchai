import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GoogleAnalytics } from "@next/third-parties/google";
import { WelcomeTrigger } from "@/components/auth/WelcomeTrigger";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HireMatch AI | Find Your Dream Job with AI",
  description: "Stop searching, start matching. The only AI job assistant that matches your resume to real openings in seconds.",
  openGraph: {
    title: "HireMatch AI | Match Your Resume to 1,000s of Jobs",
    description: "Scan your resume, find instant matches, and let AI write your applications. First 50 users get Lifetime Access!",
    url: "https://aihirematch.netlify.app",
    siteName: "HireMatch AI",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HireMatch AI - The Smart Way to Find Jobs",
    description: "AI-powered job matching that actually works. Grabe Lifetime Access before the 50 seats are gone!",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased bg-white`}
    >
      <body className="min-h-full flex flex-col pt-0 m-0">
        <WelcomeTrigger />
        <Navbar />
        <main className="flex-1 max-w-[1400px] mx-auto w-full px-4">
          {children}
        </main>
        <Footer />
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ""} />
      </body>
    </html>
  );
}
