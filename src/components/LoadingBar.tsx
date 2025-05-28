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
    <div className="relative w-[900px] h-6 bg-white/10 rounded-xl overflow-hidden shadow-[0_0_15px_rgba(33,150,243,0.3)]">
      {/* Progress fill */}
      <motion.div
        className={`h-full absolute left-0 top-0 bg-gradient-to-r ${getGradientColors(progress)}`}
        style={{
          width: `${progress}%`
        }}
        transition={{
          duration: 0.5,
          ease: "easeInOut"
        }}
      />

      {/* Centered static percentage text */}
      <div className="absolute inset-0 flex items-center justify-center text-white font-semibold text-sm">
        {Math.floor(progress)}%
      </div>
    </div>
  );
};

export default LoadingBar;
