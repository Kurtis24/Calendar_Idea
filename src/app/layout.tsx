import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Defy",
  description: "The smart AI scheduler that schedules around your personal capacity, mood and energy.",
  keywords: "crypto wallet, blockchain, digital assets, cryptocurrency, security, NFT, DeFi, cross-chain",
  authors: [{ name: "Defy Team" }],
  creator: "Defy",
  publisher: "Defy Inc.",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://defy.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Defy - The smart AI scheduler that schedules around your personal capacity, mood and energy.",
    description: "The smart AI scheduler that schedules around your personal capacity, mood and energy.",
    url: 'https://defy.app',
    siteName: 'Defy',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Defy - The smart AI scheduler that schedules around your personal capacity, mood and energy.',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Defy - The smart AI scheduler that schedules around your personal capacity, mood and energy.",
    description: "The smart AI scheduler that schedules around your personal capacity, mood and energy.",
    images: ['/og-image.jpg'],
    creator: '@defy',
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
    <html lang="en" data-theme="dark">
      <body
        className={`${sora.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
