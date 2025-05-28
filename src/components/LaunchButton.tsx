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
      className="relative w-[600px] h-[120px] rounded-[60px] overflow-hidden border-2 border-white/30 shadow-[0_10px_30px_rgba(0,0,0,0.6)] bg-black/40"
      whileHover={{
        scale: 1.05,
        rotateX: 5,
        rotateY: -5,
        boxShadow: "0 25px 50px rgba(0,0,0,0.7)"
      }}
      whileTap={{
        scale: 0.96,
        rotateX: 0,
        rotateY: 0,
        boxShadow: "0 5px 15px rgba(0,0,0,0.5)"
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20
      }}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px"
      }}
    >
      {/* 3D Layered Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-700 via-black to-white animate-gradient-flow" />

      {/* Inner Shine Layer */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-[60px] z-10" />

      {/* Glossy Highlight */}
      <div className="absolute top-0 left-0 right-0 h-1/2 bg-white/10 rounded-t-[60px] pointer-events-none z-20" />

      {/* Progress Bar */}
      {isLaunching && (
        <div className="absolute bottom-3 left-[10%] w-[80%] h-2 bg-black/40 rounded-full overflow-hidden z-30">
          <motion.div
            className="h-full bg-white rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1.2 }}
          />
        </div>
      )}

      {/* Button Content */}
      <div className="relative flex items-center justify-center gap-6 h-full z-30">
        {/* <Cpu className="w-14 h-14 text-white drop-shadow-2xl" /> */}
        <span className="text-4xl font-extrabold text-white tracking-widest drop-shadow-xl">
          {isLaunching ? `LAUNCHING ${Math.round(progress)}%` : 'LAUNCH NOW'}
        </span>
      </div>

      {/* Reflective Shimmer Layer */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
        style={{
          transform: 'translateX(-100%)',
          animation: 'shimmer 4s infinite'
        }}
      />
    </motion.button>
  );
};

export default LaunchButton;
