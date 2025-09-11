'use client'

import React, { useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Head from 'next/head'
import styles from './page.module.css'

const slides = [
  {
    title: "Unified Calendar",
    description: "Oversee your entire digital calendar, from resting time to the latest appointments, in one streamlined interface."
  },
  {
    title: "Simple to use",
    description: "Managing your schedule is effortless with our intuitive calendar. Stay organized and stress-free every day."
  },
  {
    title: "Effortless Calendar",
    description: "Connect your calendar by speaking with a command. Sync, schedule, and manage with confidence and simplicity."
  }
];

export default function Home() {
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const { scrollY } = useScroll()
  const y2 = useTransform(scrollY, [0, 300], [0, -100])
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Auto-play slideshow
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Handle manual navigation
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false); // Pause auto-play when user interacts
    // Resume auto-play after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
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

  // Custom cursor tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
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
      {/* Custom RGB Cursor */}
      <div
        className="cursor"
        style={{
          left: `${cursorPosition.x - 10}px`,
          top: `${cursorPosition.y - 10}px`,
        }}
      />

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
              Your Tempo, Your Control.
              <span className={styles.heroHighlight}> The Elite Productivity Planner</span>
            </motion.h1>

            <motion.p
              className={styles.heroSubtitle}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Calendar Idea keeps you organized and boosts your productivity every day.
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
              <div className={styles.centerBlocker}></div>
              <span className={styles.centerLogoText}>Steady</span>
              <div className={styles.centerLogoGlow}></div>
            </div>
          </motion.div>

          <div
            className={styles.slideshowContainer}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Navigation Arrows */}
            <motion.button
              className={`${styles.navArrow} ${styles.leftArrow}`}
              onClick={prevSlide}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0.7 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              ‹
            </motion.button>

            <motion.button
              className={`${styles.navArrow} ${styles.rightArrow}`}
              onClick={nextSlide}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0.7 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              ›
            </motion.button>

            {/* Main Slide Content */}
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

            {/* Slide Indicators */}
            <div className={styles.slideIndicators}>
              {slides.map((_, index) => (
                <motion.button
                  key={index}
                  className={`${styles.indicator} ${index === currentSlide ? styles.active : ''}`}
                  onClick={() => goToSlide(index)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                  animate={{
                    scale: index === currentSlide ? 1.1 : 1,
                    backgroundColor: index === currentSlide ? 'var(--accent-purple)' : 'rgba(255, 255, 255, 0.3)'
                  }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>

            {/* Auto-play Indicator */}
            <motion.div
              className={styles.autoPlayIndicator}
              initial={{ opacity: 0 }}
              animate={{ opacity: isAutoPlaying ? 0.6 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.autoPlayDot} />
              <span>Auto-playing</span>
            </motion.div>
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
