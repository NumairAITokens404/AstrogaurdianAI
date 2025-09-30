import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface HolographicDisplayProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const HolographicDisplay = ({ title, children, className = "" }: HolographicDisplayProps) => {
  const [isActive, setIsActive] = useState(false);
  const [scanLine, setScanLine] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setScanLine(prev => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className={`relative p-6 bg-gradient-to-br from-primary/5 to-accent/5 backdrop-blur-md rounded-lg border border-primary/30 overflow-hidden ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      whileHover={{ scale: 1.02 }}
    >
      {/* Holographic scan lines */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute w-full h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent"
          style={{ top: `${scanLine}%` }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent opacity-30" />
      </div>

      {/* Corner brackets */}
      <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-primary/60" />
      <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-primary/60" />
      <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-primary/60" />
      <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-primary/60" />

      {/* Glowing border effect */}
      <motion.div
        className="absolute inset-0 border border-primary/0 rounded-lg"
        animate={{
          borderColor: isActive ? "hsl(var(--primary) / 0.6)" : "hsl(var(--primary) / 0.2)",
          boxShadow: isActive 
            ? "0 0 30px hsl(var(--primary) / 0.3), inset 0 0 30px hsl(var(--primary) / 0.1)"
            : "0 0 10px hsl(var(--primary) / 0.1)"
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Title with glitch effect */}
      <motion.div
        className="mb-4 font-mono text-sm text-primary/80 tracking-wider uppercase"
        animate={isActive ? { 
          textShadow: [
            "0 0 5px hsl(var(--primary))",
            "2px 0 5px hsl(var(--primary)), -2px 0 5px hsl(var(--accent))",
            "0 0 5px hsl(var(--primary))"
          ]
        } : {}}
        transition={{ duration: 0.1, repeat: isActive ? Infinity : 0, repeatType: "reverse" }}
      >
        {title}
      </motion.div>

      {/* Content area */}
      <motion.div
        className="relative z-10"
        animate={{ opacity: isActive ? 1 : 0.9 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>

      {/* Data stream effect */}
      {isActive && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent animate-data-stream" />
          <div className="absolute w-px h-full bg-gradient-to-b from-transparent via-primary/40 to-transparent animate-data-stream" style={{ left: '30%' }} />
        </motion.div>
      )}
    </motion.div>
  );
};

export default HolographicDisplay;