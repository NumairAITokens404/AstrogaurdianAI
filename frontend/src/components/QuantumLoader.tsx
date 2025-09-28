import { motion } from 'framer-motion';

interface QuantumLoaderProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'accent';
}

const QuantumLoader = ({ size = 'md', color = 'primary' }: QuantumLoaderProps) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const colorClasses = {
    primary: 'border-primary',
    secondary: 'border-secondary',
    accent: 'border-accent'
  };

  return (
    <div className={`relative ${sizeClasses[size]}`}>
      {/* Outer ring */}
      <motion.div
        className={`absolute inset-0 rounded-full border-2 border-t-transparent ${colorClasses[color]}`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Middle ring */}
      <motion.div
        className={`absolute inset-1 rounded-full border border-r-transparent ${colorClasses[color]} opacity-60`}
        animate={{ rotate: -360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Inner ring */}
      <motion.div
        className={`absolute inset-2 rounded-full border border-b-transparent ${colorClasses[color]} opacity-30`}
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Core pulse */}
      <motion.div
        className={`absolute top-1/2 left-1/2 w-1 h-1 bg-current rounded-full transform -translate-x-1/2 -translate-y-1/2 ${colorClasses[color].replace('border-', 'text-')}`}
        animate={{
          scale: [1, 2, 1],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
};

export default QuantumLoader;