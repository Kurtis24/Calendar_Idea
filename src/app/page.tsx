'use client'

import React, { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Head from 'next/head'
import styles from './page.module.css'
import { supabase } from '../lib/supabase'

export default function Home() {
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const { scrollY } = useScroll()
  const y2 = useTransform(scrollY, [0, 300], [0, -100])
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showThankYouModal, setShowThankYouModal] = useState(false);

  // Card carousel state
  const [currentCard, setCurrentCard] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Feature cards data
  const featureCards = [
    {
      id: 1,
      title: "Smart Scheduling",
      description: "AI-powered time blocking that adapts to your productivity patterns and automatically schedules your most important tasks.",
      icon: "🧠"
    },
    {
      id: 2,
      title: "Cross-Platform Sync",
      description: "Seamlessly sync your calendar across all devices with real-time updates and conflict resolution.",
      icon: "🔄"
    },
    {
      id: 3,
      title: "Goal Tracking",
      description: "Set ambitious goals and track your progress with visual milestones and achievement badges.",
      icon: "🎯"
    },
    {
      id: 4,
      title: "Focus Mode",
      description: "Enter distraction-free focus sessions with automated Do Not Disturb and website blocking.",
      icon: "🎧"
    },
    {
      id: 5,
      title: "Team Collaboration",
      description: "Share calendars, delegate tasks, and coordinate seamlessly with your team members.",
      icon: "🤝"
    },
    {
      id: 6,
      title: "Analytics & Insights",
      description: "Get detailed insights into your time usage with beautiful charts and productivity reports.",
      icon: "📊"
    }
  ];

  // Handle email signup
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsLoading(true);
      setError('');

      try {
        const { data, error } = await supabase
          .from('waitlist')
          .insert([
            { email: email, created_at: new Date().toISOString() }
          ])

        if (error) {
          console.error('Error saving email:', error);
          setError('Something went wrong. Please try again.');
        } else {
          console.log('Email saved successfully:', data);
          setIsSubmitted(true);
          setEmail('');
          setShowThankYouModal(true);
          // Reset success message after 3 seconds
          setTimeout(() => setIsSubmitted(false), 3000);
          // Hide modal after 5 seconds
          setTimeout(() => setShowThankYouModal(false), 5000);
        }
      } catch (err) {
        console.error('Error:', err);
        setError('Something went wrong. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };


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

  // Auto-scroll carousel
  useEffect(() => {
    if (!isAutoScrolling) return

    const interval = setInterval(() => {
      setCurrentCard((prev) => (prev + 1) % featureCards.length)
    }, 4000) // Change card every 4 seconds

    return () => clearInterval(interval)
  }, [isAutoScrolling, featureCards.length])

  // Touch handlers for swipe functionality (vertical swipes)
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientY)
    setIsAutoScrolling(false) // Pause auto-scroll when user interacts
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientY)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isSwipeUp = distance > 50  // Swipe up (next card)
    const isSwipeDown = distance < -50  // Swipe down (previous card)

    if (isSwipeUp) {
      setCurrentCard((prev) => (prev + 1) % featureCards.length)
    } else if (isSwipeDown) {
      setCurrentCard((prev) => (prev - 1 + featureCards.length) % featureCards.length)
    }

    setTouchStart(0)
    setTouchEnd(0)

    // Resume auto-scroll after 10 seconds of inactivity
    setTimeout(() => setIsAutoScrolling(true), 10000)
  }

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

          {/* Liquid Glass Scroll Component */}
          <motion.div
            className={styles.liquidGlassScroll}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 1.0, type: "spring", stiffness: 100 }}
          >
            <div
              className={styles.glassScrollContainer}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div className={styles.glassScroll}>
                <div className={styles.cardCarousel}>
                  {featureCards.map((card, index) => {
                    const getCardClass = () => {
                      if (index === currentCard) return styles.activeCard;
                      const diff = index - currentCard;
                      if (diff === 1 || (diff === -5 && currentCard === 5)) return styles.nextCard;
                      if (diff === -1 || (diff === 5 && currentCard === 0)) return styles.prevCard;
                      return '';
                    };

                    const handleCardClick = () => {
                      if (index !== currentCard) {
                        setCurrentCard(index);
                        setIsAutoScrolling(false);
                        setTimeout(() => setIsAutoScrolling(true), 10000);
                      }
                    };

                    return (
                      <motion.div
                        key={card.id}
                        className={`${styles.featureCard} ${getCardClass()}`}
                        onClick={handleCardClick}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                      >
                        <div className={styles.cardIcon}>{card.icon}</div>
                        <h3 className={styles.cardTitle}>{card.title}</h3>
                        <p className={styles.cardDescription}>{card.description}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Bottom Waitlist Section */}
      <section className={styles.bottomWaitlist}>
        <motion.div
          className={styles.bottomWaitlistContainer}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className={styles.bottomWaitlistTitle}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Join the Waitlist
          </motion.h2>

          <motion.p
            className={styles.bottomWaitlistSubtitle}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            Be the first to know when Calendar Idea launches
          </motion.p>

          <motion.form
            className={styles.bottomWaitlistForm}
            onSubmit={handleEmailSubmit}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <div className={styles.bottomInputGroup}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className={styles.bottomEmailInput}
                required
                disabled={isLoading}
              />
              <button
                type="submit"
                className={styles.bottomSignupButton}
                disabled={isLoading}
              >
                {isLoading ? 'Joining...' : 'Join Waitlist'}
              </button>
            </div>

            {error && (
              <motion.div
                className={styles.bottomErrorMessage}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                ❌ {error}
              </motion.div>
            )}

            {isSubmitted && (
              <motion.div
                className={styles.bottomSuccessMessage}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                ✅ Thanks! We&apos;ll be in touch soon.
              </motion.div>
            )}
          </motion.form>
        </motion.div>
      </section>

      {/* Thank You Modal */}
      {showThankYouModal && (
        <motion.div
          className={styles.thankYouModal}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className={styles.thankYouContent}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className={styles.thankYouIcon}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3, type: "spring", stiffness: 200 }}
              >
                🎉
              </motion.div>
            </div>
            <motion.h2
              className={styles.thankYouTitle}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Welcome to the Future! 🚀
            </motion.h2>
            <motion.p
              className={styles.thankYouMessage}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              Thanks for joining our waitlist! You&apos;re now part of an exclusive group of early adopters who will be the first to experience Calendar Idea.
            </motion.p>
            <motion.div
              className={styles.thankYouFeatures}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>✨</span>
                <span>Early Access</span>
              </div>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>🎯</span>
                <span>Exclusive Updates</span>
              </div>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>🚀</span>
                <span>Beta Testing</span>
              </div>
            </motion.div>
            <motion.button
              className={styles.closeThankYou}
              onClick={() => setShowThankYouModal(false)}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: 1.0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Continue Exploring
            </motion.button>
          </motion.div>
        </motion.div>
      )}

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
