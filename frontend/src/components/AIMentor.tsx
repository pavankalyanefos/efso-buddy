import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Header from './Header';

// ElevenLabs component wrapper - Simple implementation
const ElevenLabsConvai = ({ agentId }: { agentId: string }) => {
  console.log('Rendering ElevenLabs component with agentId:', agentId);

  // Simple direct rendering of the ElevenLabs element with full size
  return React.createElement('elevenlabs-convai', {
    'agent-id': agentId,
    style: {
      width: '448px',
      height: '448px',
      display: 'block',
      position: 'fixed',
      bottom: 0,
      top: 100,
      left: 0
    }
  });
};

const AIMentor: React.FC = () => {
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [elevenLabsLoaded, setElevenLabsLoaded] = useState(false);
  const originalWindowOpen = useRef<Window['open']>(window.open);

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

      {/* Always show centered avatar */}
      <div className="flex-1 flex items-center justify-center px-4 pt-20 pb-8 relative">
        <div className="flex flex-col items-center justify-center">
          <motion.div
            className="relative w-[28rem] h-[28rem] mb-8"
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

        {/* ElevenLabs AI Agent - Beside avatar when voice mode is active */}
        {isVoiceMode && (
          <div className="absolute top-1/2 right-8 transform -translate-y-1/2 w-[28rem] h-[28rem]">
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
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-blue mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading voice assistant...</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIMentor;
