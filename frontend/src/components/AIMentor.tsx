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
      width: isMobile ? '380px' : '550px',
      height: isMobile ? '480px' : '560px',
      display: 'block',
      position: 'relative',
      margin: '0 auto'
    }
  });
};

const AIMentor: React.FC = () => {
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [elevenLabsLoaded, setElevenLabsLoaded] = useState(false);
  const originalWindowOpen = useRef<Window['open']>(window.open);

  // Desktop gap control section - Adjust this value to change spacing between avatar and agent
  const desktopGapPx = 0; // Change this number to adjust gap (in pixels) - 0 = touching

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
    } else {
      // Restore original window.open
      if (originalWindowOpen.current) {
        window.open = originalWindowOpen.current;
        console.log('Window.open override removed');
      }
    }

    // Cleanup on unmount
    return () => {
      if (originalWindowOpen.current) {
        window.open = originalWindowOpen.current;
      }
    };
  }, [isVoiceMode]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-sky to-white flex flex-col">
      <Header />

      {/* Mobile Layout - Hidden on desktop */}
      <div className="md:hidden flex-1 px-4 pt-20 pb-8 overflow-hidden">
        {isVoiceMode ? (
          // Mobile: Side-by-side when voice mode active
          <div className="flex items-center justify-center w-full">
            {/* Avatar container - Left side */}
            <div className="flex flex-col items-center justify-center overflow-hidden w-1/2 pr-1">
              <motion.div
                className="relative mb-8 w-80 h-80"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <img
                  src="/ai-mentor-avatar.png"
                  alt="EFOS Buddy AI Mentor"
                  className="w-full h-full object-contain object-center"
                />
                <motion.div
                  className="absolute inset-0 rounded-2xl border-2 border-accent-blue/50"
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(64, 196, 255, 0.3)",
                      "0 0 40px rgba(64, 196, 255, 0.6)",
                      "0 0 20px rgba(64, 196, 255, 0.3)"
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>

              {/* Voice Mode Button */}
              <button
                onClick={() => setIsVoiceMode(!isVoiceMode)}
                className={`px-6 py-3 rounded-full text-white text-lg font-semibold shadow-lg transition-colors ${
                  isVoiceMode ? "bg-red-500 hover:bg-red-600" : "bg-accent-blue hover:bg-accent-blue/90"
                }`}
              >
                {isVoiceMode ? "Close Voice Assistant" : "Open Voice Assistant"}
              </button>
            </div>

            {/* ElevenLabs AI Agent - Right side */}
            <div className="overflow-hidden w-1/2 pl-1">
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
          // Mobile: Centered when voice mode inactive
          <div className="flex items-center justify-center w-full">
            <div className="flex flex-col items-center justify-center">
              <motion.div
                className="relative mb-8 w-[28rem] h-[28rem]"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <img
                  src="/ai-mentor-avatar.png"
                  alt="EFOS Buddy AI Mentor"
                  className="w-full h-full object-contain object-center"
                />
                <motion.div
                  className="absolute inset-0 rounded-2xl border-2 border-accent-blue/50"
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(64, 196, 255, 0.3)",
                      "0 0 40px rgba(64, 196, 255, 0.6)",
                      "0 0 20px rgba(64, 196, 255, 0.3)"
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>

              {/* Voice Mode Button */}
              <button
                onClick={() => setIsVoiceMode(!isVoiceMode)}
                className={`px-8 py-4 rounded-full text-white text-xl font-semibold shadow-lg transition-colors ${
                  isVoiceMode ? "bg-red-500 hover:bg-red-600" : "bg-accent-blue hover:bg-accent-blue/90"
                }`}
              >
                {isVoiceMode ? "Close Voice Assistant" : "Open Voice Assistant"}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Desktop Layout - Hidden on mobile */}
      <div className="hidden md:flex flex-1 px-4 pt-20 pb-8 overflow-hidden">
        {isVoiceMode ? (
          // Desktop: Side-by-side when voice mode active - Close gap between outer boxes
          <div className="flex items-center justify-center w-full" style={{ gap: `${desktopGapPx}px` }}>
            {/* Avatar container - Left side */}
            <div className="flex flex-col items-center justify-center overflow-hidden w-1/2">
              <motion.div
                className="relative mb-8 w-[26rem] h-[26rem]"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <img
                  src="/ai-mentor-avatar.png"
                  alt="EFOS Buddy AI Mentor"
                  className="w-full h-full object-contain object-center"
                />
                <motion.div
                  className="absolute inset-0 rounded-2xl border-2 border-accent-blue/50"
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(64, 196, 255, 0.3)",
                      "0 0 40px rgba(64, 196, 255, 0.6)",
                      "0 0 20px rgba(64, 196, 255, 0.3)"
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>

              {/* Voice Mode Button */}
              <button
                onClick={() => setIsVoiceMode(!isVoiceMode)}
                className={`px-8 py-4 rounded-full text-white text-xl font-semibold shadow-lg transition-colors ${
                  isVoiceMode ? "bg-red-500 hover:bg-red-600" : "bg-accent-blue hover:bg-accent-blue/90"
                }`}
              >
                {isVoiceMode ? "Close Voice Assistant" : "Open Voice Assistant"}
              </button>
            </div>

            {/* ElevenLabs AI Agent - Right side */}
            <div className="overflow-hidden w-1/2">
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
          // Desktop: Centered when voice mode inactive
          <div className="flex items-center justify-center w-full">
            <div className="flex flex-col items-center justify-center">
              <motion.div
                className="relative mb-8 w-[28rem] h-[28rem]"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <img
                  src="/ai-mentor-avatar.png"
                  alt="EFOS Buddy AI Mentor"
                  className="w-full h-full object-contain object-center"
                />
                <motion.div
                  className="absolute inset-0 rounded-2xl border-2 border-accent-blue/50"
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(64, 196, 255, 0.3)",
                      "0 0 40px rgba(64, 196, 255, 0.6)",
                      "0 0 20px rgba(64, 196, 255, 0.3)"
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>

              {/* Voice Mode Button */}
              <button
                onClick={() => setIsVoiceMode(!isVoiceMode)}
                className={`px-8 py-4 rounded-full text-white text-xl font-semibold shadow-lg transition-colors ${
                  isVoiceMode ? "bg-red-500 hover:bg-red-600" : "bg-accent-blue hover:bg-accent-blue/90"
                }`}
              >
                {isVoiceMode ? "Close Voice Assistant" : "Open Voice Assistant"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIMentor;
