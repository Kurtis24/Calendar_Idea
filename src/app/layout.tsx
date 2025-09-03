import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SmartWallet - Secure Crypto Management Made Simple",
  description: "Advanced security, cross-platform access, and seamless digital asset management. Take control of your crypto journey with cutting-edge technology.",
  keywords: "crypto wallet, blockchain, digital assets, cryptocurrency, security, NFT, DeFi, cross-chain",
  authors: [{ name: "SmartWallet Team" }],
  creator: "SmartWallet",
  publisher: "SmartWallet Inc.",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://smartwallet.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "SmartWallet - Secure Crypto Management Made Simple",
    description: "Advanced security, cross-platform access, and seamless digital asset management. Take control of your crypto journey with cutting-edge technology.",
    url: 'https://smartwallet.app',
    siteName: 'SmartWallet',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SmartWallet - Secure Crypto Management',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "SmartWallet - Secure Crypto Management Made Simple",
    description: "Advanced security, cross-platform access, and seamless digital asset management.",
    images: ['/og-image.jpg'],
    creator: '@smartwallet',
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
