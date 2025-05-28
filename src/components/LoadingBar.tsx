import { motion } from 'framer-motion';

interface LoadingBarProps {
  progress: number;
}

const LoadingBar = ({ progress }: LoadingBarProps) => {
  const getGradientColors = (progress: number) => {
    if (progress < 33) {
      return 'from-blue-500/30 to-blue-500/80';
    } else if (progress < 66) {
      return 'from-blue-500/30 via-green-500/50 to-green-500/80';
    } else {
      return 'from-green-500/30 to-green-500/80';
    }
  };

  return (
    <div className="w-[500px] h-3 bg-white/10 rounded-xl overflow-hidden shadow-[0_0_15px_rgba(33,150,243,0.3)]">
      <motion.div
        className={`h-full w-full relative transform-gpu bg-gradient-to-r ${getGradientColors(progress)}`}
        style={{
          transform: `translateX(${progress - 100}%)`
        }}
        transition={{
          duration: 0.5,
          ease: "easeInOut"
        }}
      >
        <div 
          className="absolute inset-0 animate-shimmer"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
            transform: 'translateX(-100%)',
            animation: 'shimmer 2s infinite'
          }}
        />
      </motion.div>
    </div>
  );
};

export default LoadingBar;