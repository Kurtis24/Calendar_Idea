'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Head from 'next/head'
import styles from './page.module.css'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import ParticleSphere from '../components/ParticleSphere'
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
          // Reset success message after 3 seconds
          setTimeout(() => setIsSubmitted(false), 3000);
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
              <Canvas
                camera={{ position: [0, 0, 5] }}
                style={{ width: '100%', height: '100%', borderRadius: '50%' }}
                gl={{ 
                  antialias: true, // Enable for smooth particles
                  alpha: true,
                  powerPreference: "high-performance" 
                }}
                dpr={[1, 2]} // Higher quality for particles
              >
                <Suspense fallback={
                  <mesh>
                    <sphereGeometry args={[1, 16, 16]} />
                    <meshBasicMaterial color="#4a90e2" wireframe />
                  </mesh>
                }>
                  <OrbitControls 
                    enableZoom={false} 
                    enablePan={false}
                    enableDamping={false} // Disable damping for performance
                  />
                  <ambientLight intensity={0.8} />
                  <directionalLight position={[2, 2, 2]} intensity={0.8} />
                  <ParticleSphere />
                </Suspense>
              </Canvas>
            </div>
          </motion.div>

          {/* Email Signup in Hero */}
          <motion.div
            className={styles.heroSignupContainer}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className={styles.heroSignupContent}>
              <motion.h2
                className={styles.heroSignupTitle}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
              >
                Join the Waitlist
              </motion.h2>

              <motion.p
                className={styles.heroSignupSubtitle}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
              >
                Be the first to know when Calendar Idea launches. Get early access and exclusive updates.
              </motion.p>

              <motion.form
                className={styles.heroSignupForm}
                onSubmit={handleEmailSubmit}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.1 }}
              >
                <div className={styles.heroInputGroup}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className={styles.heroEmailInput}
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    className={styles.heroSignupButton}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Joining...' : 'Join List'}
                  </button>
                </div>

                {error && (
                  <motion.div
                    className={styles.heroErrorMessage}
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
                    className={styles.heroSuccessMessage}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                  >
                    ✅ Thanks! We&apos;ll be in touch soon.
                  </motion.div>
                )}
              </motion.form>
            </div>
          </motion.div>
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
