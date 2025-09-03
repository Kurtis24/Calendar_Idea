'use client'

import React, { useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Head from 'next/head'
import styles from './page.module.css'

const slides = [
  {
    title: "Unified Portfolio",
    description: "Oversee your entire digital asset collection, from Bitcoin to the latest DeFi tokens, in one streamlined interface."
  },
  {
    title: "Fortified Security",
    description: "Your peace of mind is our priority. Your assets are secured with multi-layered, audited protection."
  },
  {
    title: "Effortless DeFi",
    description: "Connect to the decentralized ecosystem with a single click. Swap, stake, and earn with confidence and simplicity."
  }
];

export default function Home() {
  const [showBackToTop, setShowBackToTop] = useState(false)
  const { scrollY } = useScroll()
  const y2 = useTransform(scrollY, [0, 300], [0, -100])
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Track active section and back to top button
  useEffect(() => {
    const handleScroll = () => {
      // Show/hide back to top button
      setShowBackToTop(window.scrollY > 500)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerOffset = 80
      const elementPosition = element.offsetTop
      const offsetPosition = elementPosition - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "SmartWallet",
    "description": "Advanced security, cross-platform access, and seamless digital asset management for cryptocurrency users.",
    "url": "https://smartwallet.app",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "iOS, Android, Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "description": "Free tier with premium features available"
    },
    "author": {
      "@type": "Organization",
      "name": "SmartWallet Inc."
    },
    "featureList": [
      "Multi-chain support",
      "Advanced security features",
      "NFT marketplace integration",
      "Cross-platform synchronization",
      "DeFi protocol access"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "12543",
      "bestRating": "5",
      "worstRating": "1"
    }
  }
  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </Head>

      {/* Main Content Container */}
      <motion.div
        className={styles.mainContent}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
      {/* Hero Section */}
      <section id="hero" className={styles.hero}>
        <motion.div
          className={styles.heroBackground}
          style={{ y: y2 }}
        >
          <div className={styles.heroGradient}></div>
          <div className={styles.walkwayGrid}></div>
        </motion.div>

        <div className={styles.heroContent}>
          <motion.div
            className={styles.heroText}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h1
              className={styles.heroTitle}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Your Assets, Your Control.
              <span className={styles.heroHighlight}> The Premier Smart Wallet.</span>
            </motion.h1>

            <motion.p
              className={styles.heroSubtitle}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              SmartWallet offers unparalleled security and seamless access to the decentralized web. 
              Manage your portfolio across 150+ blockchains with institutional-grade protection.
            </motion.p>
          </motion.div>

          {/* Central Circular Logo */}
          <motion.div
            className={styles.heroCenterLogo}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 1.0, type: "spring", stiffness: 100 }}
          >
            <div className={styles.centerLogoCircle}>
              <span className={styles.centerLogoText}>SW</span>
              <div className={styles.centerLogoGlow}></div>
            </div>
          </motion.div>

          <div className={styles.slideshowContainer}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                className={styles.slideContent}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                <h3>{slides[currentSlide].title}</h3>
                <p>{slides[currentSlide].description}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

        {/* Back to Top Button */}
        <motion.button
          className={styles.backToTop}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: showBackToTop ? 1 : 0,
            scale: showBackToTop ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
          onClick={() => scrollToSection('hero')}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </motion.button>

        {/* Scroll Buffer */}
        <div className={styles.scrollBuffer}></div>
      </motion.div>
    </>
  )
}
