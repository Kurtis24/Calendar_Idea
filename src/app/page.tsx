'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Head from 'next/head'
import { supabase } from '../lib/supabase'
import ParticleBackground from '@/components/ParticleBackground'

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isNewUser, setIsNewUser] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setIsClient(true);
    return () => {}; // Empty return for useEffect cleanup
  }, []);

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
          console.error('Error details:', JSON.stringify(error, null, 2));
          
          // Check if it's a duplicate email error
          if (error.code === '23505' || error.message?.includes('duplicate key') || error.message?.includes('already exists')) {
            setIsNewUser(false);
            setIsSubmitted(true);
            setEmail('');
            // Reset success message after 3 seconds
            setTimeout(() => setIsSubmitted(false), 3000);
          } else {
            setError(`Database error: ${error.message || 'Something went wrong. Please try again.'}`);
          }
        } else {
          console.log('Email saved successfully:', data);
          setIsNewUser(true);
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

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Defy AI",
    "description": "The smart AI scheduler that schedules around your personal capacity, mood and energy.",
    "url": "https://defyai.app",
    "applicationCategory": "ProductivityApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "description": "Early access available for beta users"
    },
    "author": {
      "@type": "Organization",
      "name": "Defy AI Inc."
    },
    "featureList": [
      "Smart Scheduling",
      "Personal Assistant",
      "Accountability",
      "Mood-based planning",
      "Energy optimization"
    ]
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

      {/* Main Container */}
      <div className="main-container">
        {isClient && <ParticleBackground />}
 
        {/* Main Content */}
        <div style={{ 
          position: 'relative', 
          zIndex: 10, 
          textAlign: 'center', 
          padding: '0 2rem',
          maxWidth: '900px',
          margin: '0 auto'
        }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h1 style={{
              fontSize: 'clamp(2rem, 6vw, 4rem)',
              fontWeight: 500,
              color: 'white',
              marginBottom: '1rem',
              lineHeight: 1.4,
              letterSpacing: '-0.02em'
            }}>
              {["Thank", "you", "for"].map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.2,
                    ease: "easeOut"
                  }}
                  style={{ display: 'inline-block', marginRight: '0.3em' }}
                >
                  {word}
                </motion.span>
              ))}
              <br />
              {["waiting", "for"].map((word, index) => (
                <motion.span
                  key={index + 3}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: (index + 3) * 0.2,
                    ease: "easeOut"
                  }}
                  style={{ display: 'inline-block', marginRight: '0.3em' }}
                >
                  {word}
                </motion.span>
              ))}{" "}
              <motion.span
                initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 5 * 0.2,
                  ease: "easeOut"
                }}
                style={{
                  background: 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontStyle: 'italic',
                  fontWeight: 400,
                  fontFamily: 'Georgia, "Times New Roman", serif',
                  textShadow: '0 0 20px rgba(96, 165, 250, 0.3)',
                  filter: 'drop-shadow(0 0 10px rgba(167, 139, 250, 0.4))',
                  letterSpacing: '0.05em',
                  display: 'inline-block'
                }}
            >
              Defy AI
              </motion.span>
            </h1>

            <p style={{
              fontSize: 'clamp(0.875rem, 2vw, 1rem)',
              fontWeight: 600,
              color: 'rgba(203, 213, 225, 0.8)',
              marginBottom: '2rem',
              maxWidth: '500px',
              margin: '0 auto 2rem auto',
              lineHeight: 1.6
            }}>
              {["Sign", "up", "below", "to", "be", "the", "first", "to", "know", "when", "it's", "released"].map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: 1.2 + (index * 0.1),
                    ease: "easeOut"
                  }}
                  style={{ display: 'inline-block', marginRight: '0.25em' }}
                >
                  {word}
                </motion.span>
              ))}
            </p>

            {/* Email Signup Form */}
            <motion.form
              onSubmit={handleEmailSubmit}
              style={{ maxWidth: '400px', margin: '0 auto' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div style={{
                display: 'flex',
                gap: '0.75rem',
                flexDirection: 'row',
                alignItems: 'center'
              }}
              className="responsive-form-container">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email Address"
                  style={{
                    flex: 1,
                    padding: '0.875rem 1.25rem',
                    background: 'rgba(30, 41, 59, 0.8)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(71, 85, 105, 0.4)',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    minWidth: '280px',
                    width: '100%'
                  }}
                  onFocus={(e) => {
                    const target = e.target as HTMLInputElement;
                    target.style.borderColor = 'rgba(96, 165, 250, 0.6)';
                    target.style.boxShadow = '0 0 0 3px rgba(96, 165, 250, 0.1)';
                  }}
                  onBlur={(e) => {
                    const target = e.target as HTMLInputElement;
                    target.style.borderColor = 'rgba(71, 85, 105, 0.4)';
                    target.style.boxShadow = 'none';
                  }}
                required
                disabled={isLoading}
              />
              <button
                type="submit"
                  style={{
                    padding: '0.875rem 1.5rem',
                    background: 'white',
                    color: '#1e293b',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: 600,
                    fontSize: '1rem',
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease',
                    opacity: isLoading ? 0.7 : 1,
                    whiteSpace: 'nowrap',
                    minWidth: '140px'
                  }}
                  onMouseEnter={(e) => {
                    if (!isLoading) {
                      const target = e.target as HTMLButtonElement;
                      target.style.background = '#f1f5f9';
                      target.style.transform = 'translateY(-1px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    const target = e.target as HTMLButtonElement;
                    target.style.background = 'white';
                    target.style.transform = 'translateY(0)';
                  }}
                disabled={isLoading}
              >
                  {isLoading ? 'Joining...' : 'Get Notified'}
              </button>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                  style={{
                    marginTop: '1rem',
                    padding: '0.75rem 1rem',
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    borderRadius: '6px',
                    color: '#fca5a5',
                    fontSize: '0.875rem'
                  }}
              >
                ❌ {error}
              </motion.div>
            )}

            {isSubmitted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                  style={{
                    marginTop: '1rem',
                    padding: '0.75rem 1rem',
                    background: 'rgba(34, 197, 94, 0.1)',
                    border: '1px solid rgba(34, 197, 94, 0.3)',
                    borderRadius: '6px',
                    color: '#86efac',
                    fontSize: '0.875rem'
                  }}
              >
                ✅ {isNewUser ? 'You have already been added to the waitlist!' : 'Thank you so much for your interest, we will be in touch soon!'}
              </motion.div>
            )}
          </motion.form>
        </motion.div>
        </div>

              {/* Global styles for dots and animations */}
              <style jsx global>{`
                ::placeholder {
                  color: rgba(148, 163, 184, 0.6);
                }
                
                input:focus::placeholder {
                  color: rgba(148, 163, 184, 0.4);
                }
 
                @media (max-width: 640px) {
                  .responsive-form-container {
                    flex-direction: column !important;
                  }
                }
 
                /* Interactive elements cursor override */
                @media (min-width: 1024px) {
                  input, button {
                    cursor: pointer !important;
                  }
                }
                
                @media (max-width: 1023px) {
                  input, button {
                    cursor: default !important;
                  }
                }
              `}</style>
      </div>
    </>
  )
}



