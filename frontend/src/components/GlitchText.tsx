import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
  trigger?: 'hover' | 'continuous' | 'none';
}

const GlitchText = ({ text, className = "", intensity = 'medium', trigger = 'hover' }: GlitchTextProps) => {
  const [isGlitching, setIsGlitching] = useState(false);
  const [glitchText, setGlitchText] = useState(text);

  const glitchChars = "!<>-_\\/[]{}—=+*^?#________";
  const glitchIntensity = {
    low: { duration: 0.1, chance: 0.1 },
    medium: { duration: 0.05, chance: 0.2 },
    high: { duration: 0.03, chance: 0.3 }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isGlitching || trigger === 'continuous') {
      interval = setInterval(() => {
        const newText = text.split('').map(char => {
          if (Math.random() < glitchIntensity[intensity].chance) {
            return glitchChars[Math.floor(Math.random() * glitchChars.length)];
          }
          return char;
        }).join('');
        
        setGlitchText(newText);

        setTimeout(() => {
          setGlitchText(text);
        }, glitchIntensity[intensity].duration * 1000);
      }, 100);
    } else {
      setGlitchText(text);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isGlitching, text, intensity, trigger]);

  useEffect(() => {
    if (trigger === 'continuous') {
      setIsGlitching(true);
    }
  }, [trigger]);

  const handleMouseEnter = () => {
    if (trigger === 'hover') {
      setIsGlitching(true);
    }
  };

  const handleMouseLeave = () => {
    if (trigger === 'hover') {
      setIsGlitching(false);
    }
  };

  return (
    <motion.span
      className={`relative inline-block font-mono ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        textShadow: isGlitching || trigger === 'continuous' 
          ? "2px 0 #ff0000, -2px 0 #00ffff, 0 0 10px #ffffff"
          : "none"
      }}
    >
      {/* Base text */}
      <span className="relative z-10">{glitchText}</span>
      
      {/* Glitch layers */}
      {(isGlitching || trigger === 'continuous') && (
        <>
          <motion.span
            className="absolute top-0 left-0 text-red-500 mix-blend-multiply"
            animate={{
              x: [0, -2, 2, 0],
              opacity: [0.7, 1, 0.7, 1]
            }}
            transition={{ 
              duration: 0.1, 
              repeat: Infinity, 
              repeatType: "reverse" 
            }}
          >
            {glitchText}
          </motion.span>
          
          <motion.span
            className="absolute top-0 left-0 text-cyan-400 mix-blend-multiply"
            animate={{
              x: [0, 2, -2, 0],
              opacity: [0.7, 1, 0.7, 1]
            }}
            transition={{ 
              duration: 0.15, 
              repeat: Infinity, 
              repeatType: "reverse" 
            }}
          >
            {glitchText}
          </motion.span>
        </>
      )}
    </motion.span>
  );
};

export default GlitchText;