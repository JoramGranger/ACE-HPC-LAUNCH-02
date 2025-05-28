import { useState, useEffect } from 'react';
import { Cpu } from 'lucide-react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

interface LaunchButtonProps {
  onClick: () => void;
  progress: number;
  isLaunching: boolean;
}

const LaunchButton = ({ onClick, progress, isLaunching }: LaunchButtonProps) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (progress === 100) {
      setShowConfetti(true);
      const colors = ['#FF0000', '#FF3333', '#FF6666', '#FFFFFF'];
      const end = Date.now() + 2000;

      const frame = () => {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.8 },
          colors
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.8 },
          colors
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };

      frame();
    }
  }, [progress]);

  return (
    <motion.button
      onClick={onClick}
      disabled={isLaunching}
      className="relative w-[400px] h-[80px] rounded-[40px] overflow-hidden transform-gpu
                 transition-all duration-300 ease-in-out focus:outline-none"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{
        willChange: 'transform'
      }}
    >
      {/* Gradient Background */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-red-600 via-black to-white"
        style={{
          backgroundSize: '200% 200%',
          animation: 'gradientFlow 3s infinite ease-in-out'
        }}
      />

      {/* Glass Overlay */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />

      {/* Progress Bar */}
      {isLaunching && (
        <div className="absolute bottom-0 left-[10%] w-[80%] h-1 bg-black/20 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-white rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
            style={{
              animation: progress < 100 ? 'pulse 1.5s infinite' : 'none'
            }}
          />
        </div>
      )}

      {/* Button Content */}
      <div className="relative flex items-center justify-center gap-4 h-full">
        <Cpu className="w-8 h-8 text-white" />
        <span className="text-2xl font-bold text-white tracking-wider">
          {isLaunching ? `LAUNCHING ${Math.round(progress)}%` : 'LAUNCH HPC CLUSTER'}
        </span>
      </div>

      {/* Shimmer Effect */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        style={{
          transform: 'translateX(-100%)',
          animation: 'shimmer 2s infinite'
        }}
      />
    </motion.button>
  );
};

export default LaunchButton;