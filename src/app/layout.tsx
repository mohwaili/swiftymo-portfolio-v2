import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { Metadata } from "next";


const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://swiftymo.com'),
  title: {
    default: "Swiftymo - Mohammed Al Waili",
    template: "%s | Mohammed Al Waili"
  },
  description: "Senior Software Engineer specializing in mobile and web development. Expert in Swift, Kotlin, TypeScript, React, and Next.js.",
  icons: {
    icon: '/favicon.svg',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Swiftymo Portfolio',
    title: 'Mohammed Al Waili - Senior Software Engineer',
    description: 'Senior Software Engineer specializing in mobile and web development',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mohammed Al Waili - Senior Software Engineer',
    description: 'Senior Software Engineer specializing in mobile and web development',
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jetbrainsMono.variable} antialiased`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
