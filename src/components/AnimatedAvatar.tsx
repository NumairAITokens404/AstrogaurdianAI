import { motion } from 'framer-motion';
import { User, Zap, Heart, Activity } from 'lucide-react';
import { useState } from 'react';

interface AnimatedAvatarProps {
  name: string;
  status: 'normal' | 'warning' | 'critical';
  heartRate?: number;
  activity?: string;
}

const AnimatedAvatar = ({ name, status, heartRate, activity }: AnimatedAvatarProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const getStatusColor = () => {
    switch (status) {
      case 'critical': return '#ef4444';
      case 'warning': return '#f59e0b';
      default: return '#10b981';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'critical': return <Zap className="h-3 w-3" />;
      case 'warning': return <Activity className="h-3 w-3" />;
      default: return <Heart className="h-3 w-3" />;
    }
  };

  return (
    <motion.div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 border-2 border-primary/50 flex items-center justify-center">
        {/* Animated pulse for critical status */}
        {status === 'critical' && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-red-500"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [1, 0, 1]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}

        {/* User icon */}
        <User className="h-8 w-8 text-primary" />

        {/* Status indicator */}
        <motion.div
          className="absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-background flex items-center justify-center"
          style={{ backgroundColor: getStatusColor() }}
          animate={status === 'critical' ? {
            scale: [1, 1.3, 1],
          } : {}}
          transition={status === 'critical' ? {
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut"
          } : {}}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            {getStatusIcon()}
          </motion.div>
        </motion.div>

        {/* Heart rate indicator */}
        {heartRate && (
          <motion.div
            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-background/90 px-2 py-1 rounded text-xs font-mono text-primary border border-primary/30">
              {heartRate} BPM
            </div>
          </motion.div>
        )}
      </div>

      {/* Name label */}
      <motion.div
        className="mt-2 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="text-xs text-muted-foreground">{name}</div>
        {activity && (
          <motion.div
            className="text-xs text-primary font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {activity}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default AnimatedAvatar;