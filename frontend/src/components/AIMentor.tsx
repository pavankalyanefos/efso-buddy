import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Header from './Header';

// ElevenLabs component wrapper - Responsive implementation
const ElevenLabsConvai = ({ agentId }: { agentId: string }) => {
  console.log('Rendering ElevenLabs component with agentId:', agentId);

  // Check if we're on mobile for responsive sizing
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // Responsive rendering of the ElevenLabs element
  return React.createElement('elevenlabs-convai', {
    'agent-id': agentId,
    style: {
      width: isMobile ? '100vw' : '560px',
      height: isMobile ? '100vh' : '570px',
      display: 'block',
      position: 'relative',
      margin: '0 auto',
      border: 'none',
      background: 'transparent'
    }
  });
};

const AIMentor: React.FC = () => {
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [elevenLabsLoaded, setElevenLabsLoaded] = useState(false);
  const [isLipSyncActive, setIsLipSyncActive] = useState(false);
  const [mouthOpenness, setMouthOpenness] = useState(0);
  const originalWindowOpen = useRef<Window['open']>(window.open);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Desktop gap control section - Adjust this value to change spacing between avatar and agent
  const desktopGapPx = 0; // Change this number to adjust gap (in pixels) - 0 = touching

  // Lip sync functions - Professional implementation for AI agent voice
  const startLipSync = async () => {
    try {
      setIsLipSyncActive(true);

      // Create realistic speech animation pattern
      let animationStep = 0;
      const animateMouth = () => {
        if (!isLipSyncActive) return;

        // Create natural speech pattern with varying mouth openness
        const time = Date.now() * 0.005;
        const basePattern = Math.sin(time) * 0.5 + 0.5; // 0-1 range
        const speechVariation = Math.sin(time * 2) * 0.3 + 0.3; // Additional variation
        const randomFactor = Math.random() * 0.2; // Natural randomness

        // Combine patterns for realistic mouth movement
        let mouthOpenness = (basePattern + speechVariation + randomFactor) / 2;

        // Occasionally create bigger mouth openings for emphasis
        if (Math.random() < 0.1) {
          mouthOpenness = Math.min(mouthOpenness * 1.5, 0.9);
        }

        // Ensure minimum and maximum bounds
        mouthOpenness = Math.max(0.1, Math.min(mouthOpenness, 0.8));

        setMouthOpenness(mouthOpenness);

        animationStep++;
        animationFrameRef.current = requestAnimationFrame(animateMouth);
      };

      animateMouth();

    } catch (error) {
      console.error('Error starting lip sync:', error);
    }
  };

  const stopLipSync = () => {
    setIsLipSyncActive(false);
    setMouthOpenness(0);

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    if (analyserRef.current) {
      analyserRef.current = null;
    }
  };

  // Load ElevenLabs script
  useEffect(() => {
    // Check if script is already loaded
    const existingScript = document.querySelector('script[src="https://unpkg.com/@elevenlabs/convai-widget-embed"]');
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
      script.async = true;
      script.onload = () => {
        console.log('ElevenLabs script loaded successfully');
        // Small delay to ensure the library is fully initialized
        setTimeout(() => {
          setElevenLabsLoaded(true);
        }, 1000);
      };
      script.onerror = (error) => {
        console.error('Failed to load ElevenLabs script:', error);
        setElevenLabsLoaded(false);
      };
      document.head.appendChild(script);
    } else {
      // Script already exists, assume it's loaded
      setElevenLabsLoaded(true);
    }
  }, []);

  // Override window.open when voice mode is active to prevent navigation
  useEffect(() => {
    if (isVoiceMode) {
      // Store original window.open
      originalWindowOpen.current = window.open;

      // Override window.open to prevent navigation
      window.open = function(url?: string | URL, target?: string, features?: string) {
        console.log('Blocked navigation attempt:', url);
        // Return null to prevent navigation
        return null;
      };

      console.log('Window.open override active');

      // Start lip sync when voice mode is activated
      if (elevenLabsLoaded) {
        startLipSync();
      }
    } else {
      // Restore original window.open
      if (originalWindowOpen.current) {
        window.open = originalWindowOpen.current;
        console.log('Window.open override removed');
      }

      // Stop lip sync when voice mode is deactivated
      stopLipSync();
    }

    // Cleanup on unmount
    return () => {
      if (originalWindowOpen.current) {
        window.open = originalWindowOpen.current;
      }
      stopLipSync();
    };
  }, [isVoiceMode, elevenLabsLoaded]);

  // Monitor ElevenLabs widget for speech activity
  useEffect(() => {
    if (!elevenLabsLoaded || !isVoiceMode) return;

    // Create a mutation observer to detect changes in the ElevenLabs widget
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        // Check if the widget is showing speaking indicators or audio activity
        const elevenLabsElements = document.querySelectorAll('[data-testid*="elevenlabs"], elevenlabs-convai, [class*="elevenlabs"]');

        elevenLabsElements.forEach((element) => {
          // Look for indicators that the AI is speaking
          const speakingIndicators = element.querySelectorAll('[class*="speaking"], [class*="active"], [class*="playing"]');

          if (speakingIndicators.length > 0) {
            if (!isLipSyncActive) {
              console.log('AI speaking detected - starting lip sync');
              startLipSync();
            }
          } else {
            // Check for silence periods
            const silenceTimeout = setTimeout(() => {
              if (isLipSyncActive) {
                console.log('AI speaking ended - stopping lip sync');
                stopLipSync();
              }
            }, 1000); // Wait 1 second before stopping

            return () => clearTimeout(silenceTimeout);
          }
        });
      });
    });

    // Start observing the document for ElevenLabs widget changes
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'style', 'data-speaking']
    });

    return () => {
      observer.disconnect();
    };
  }, [elevenLabsLoaded, isVoiceMode, isLipSyncActive]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-sky to-white flex flex-col">
      <Header />

      {/* Mobile Layout - Hidden on desktop */}
      <div className="md:hidden flex-1 px-4 pt-12 pb-6 overflow-hidden">
        {isVoiceMode ? (
          // Mobile: Full page ElevenLabs AI Agent when voice mode active
          <div className="flex items-center justify-center w-full h-full">
            <div className="overflow-hidden w-full h-full">
              <div
                className="w-full h-full relative"
                style={{
                  pointerEvents: 'auto',
                  userSelect: 'none',
                  width: '100vw',
                  height: '100vh',
                  position: 'fixed',
                  top: '0',
                  left: '0',
                  zIndex: '9999'
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  // Prevent any link clicks
                  const target = e.target as HTMLElement;
                  if (target.tagName === 'A' || target.closest('a')) {
                    e.preventDefault();
                  }
                }}
              >
                {elevenLabsLoaded ? (
                  <ElevenLabsConvai agentId="agent_2001kcbmp42jfj5sxdgr852pmzt1" />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-blue mx-auto mb-2"></div>
                      <p className="text-gray-600 text-sm">Loading voice assistant...</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          // Mobile: Positioned at bottom when voice mode inactive
          <div className="flex flex-col justify-end items-center w-full h-full pb-12">
            <div className="flex flex-col items-center justify-center">
              <motion.div
                className="relative mt-12 mb-10 w-[26rem] h-[26rem] bg-white/10 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-white/20"
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                whileHover={{ scale: 1.02, y: -10 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent-blue/20 to-transparent pointer-events-none"></div>
                <img
                  src="/ai-mentor-avatar.png"
                  alt="EFOS Buddy AI Mentor"
                  className="w-full h-full object-contain object-center relative z-10"
                />
                <motion.div
                  className="absolute inset-0 rounded-3xl border-2 border-accent-blue/60"
                  animate={{
                    boxShadow: [
                      "0 0 30px rgba(64, 196, 255, 0.4)",
                      "0 0 60px rgba(64, 196, 255, 0.8)",
                      "0 0 30px rgba(64, 196, 255, 0.4)"
                    ]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-accent-blue to-primary-sky rounded-full opacity-80 animate-pulse"></div>
                <div className="absolute -top-2 -left-2 w-6 h-6 bg-gradient-to-br from-accent-blue to-primary-sky rounded-full opacity-60 animate-pulse delay-1000"></div>
              </motion.div>

              {/* Voice Mode Button */}
              <motion.button
                onClick={() => setIsVoiceMode(true)}
                className="px-8 py-4 rounded-full text-white text-lg font-bold shadow-2xl transition-all duration-300 bg-gradient-to-r from-accent-blue via-blue-500 to-accent-blue hover:from-accent-blue hover:to-blue-600 transform hover:scale-105 active:scale-95 border border-white/30"
                whileHover={{
                  boxShadow: "0 10px 30px rgba(64, 196, 255, 0.6)",
                  y: -2
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <span className="flex items-center gap-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Open Voice Assistant
                  <svg className="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </span>
              </motion.button>
            </div>
          </div>
        )}
      </div>

      {/* Desktop Layout - Hidden on mobile */}
      <div className="hidden md:flex flex-1 px-4 pt-12 pb-6 overflow-hidden">
        {isVoiceMode ? (
          // Desktop: Full page ElevenLabs AI Agent when voice mode active
          <div className="flex items-center justify-center w-full h-full">
            <div className="overflow-hidden w-full h-full">
              <div
                className="w-full h-full relative"
                style={{
                  pointerEvents: 'auto',
                  userSelect: 'none'
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  // Prevent any link clicks
                  const target = e.target as HTMLElement;
                  if (target.tagName === 'A' || target.closest('a')) {
                    e.preventDefault();
                  }
                }}
              >
                {elevenLabsLoaded ? (
                  <ElevenLabsConvai agentId="agent_2001kcbmp42jfj5sxdgr852pmzt1" />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-blue mx-auto mb-2"></div>
                      <p className="text-gray-600 text-sm">Loading voice assistant...</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          // Desktop: Positioned at bottom when voice mode inactive
          <div className="flex flex-col justify-end items-center w-full h-full pb-16">
            <div className="flex flex-col items-center justify-center">
              <motion.div
                className="relative mt-12 mb-12 w-[32rem] h-[32rem] bg-white/10 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20"
                initial={{ opacity: 0, y: 60, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                whileHover={{ scale: 1.03, y: -15 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent-blue/20 to-transparent pointer-events-none"></div>
                <img
                  src="/ai-mentor-avatar.png"
                  alt="EFOS Buddy AI Mentor"
                  className="w-full h-full object-contain object-center relative z-10"
                />
                <motion.div
                  className="absolute inset-0 rounded-3xl border-2 border-accent-blue/60"
                  animate={{
                    boxShadow: [
                      "0 0 40px rgba(64, 196, 255, 0.5)",
                      "0 0 80px rgba(64, 196, 255, 0.9)",
                      "0 0 40px rgba(64, 196, 255, 0.5)"
                    ]
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <div className="absolute -bottom-3 -right-3 w-10 h-10 bg-gradient-to-br from-accent-blue to-primary-sky rounded-full opacity-80 animate-pulse"></div>
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-br from-accent-blue to-primary-sky rounded-full opacity-60 animate-pulse delay-1000"></div>
                <div className="absolute top-4 right-4 w-4 h-4 bg-white/30 rounded-full animate-bounce"></div>
                <div className="absolute bottom-4 left-4 w-3 h-3 bg-white/30 rounded-full animate-bounce delay-500"></div>
              </motion.div>

              {/* Voice Mode Button */}
              <motion.button
                onClick={() => setIsVoiceMode(true)}
                className="px-10 py-5 rounded-full text-white text-xl font-bold shadow-2xl transition-all duration-300 bg-gradient-to-r from-accent-blue via-blue-500 to-accent-blue hover:from-accent-blue hover:to-blue-600 transform hover:scale-105 active:scale-95 border border-white/30"
                whileHover={{
                  boxShadow: "0 15px 40px rgba(64, 196, 255, 0.7)",
                  y: -3
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <span className="flex items-center gap-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Open Voice Assistant
                  <svg className="w-6 h-6 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </span>
              </motion.button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIMentor;
