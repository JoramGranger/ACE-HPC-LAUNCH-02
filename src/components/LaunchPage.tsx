import { useState, useEffect, useCallback } from 'react';
import { useAppContext } from '../context/AppContext';
import ProgressSequence from './ProgressSequence';
import Logo from './Logo';
import BackgroundCarousel from './BackgroundCarousel';
import LoadingBar from './LoadingBar';
import LaunchButton from './LaunchButton';
import BottomPanel from './BottomPanel';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';

interface LaunchPageProps {
  onComplete: () => void;
}

const LaunchPage = ({ onComplete }: LaunchPageProps) => {
  const [isLaunching, setIsLaunching] = useState(false);
  const [progress, setProgress] = useState(0);
  const { setLaunchComplete } = useAppContext();
  
  const steps = [
    "Preparing Systems...",
    "Checking Services...",
    "Verifying Network Connectivity...",
    "Checking Storage Mount...",
    "Confirming Services Status...",
    "Initiating Cluster Launch..."
  ];

  const currentStep = Math.min(Math.floor(progress / (100 / steps.length)), steps.length - 1);

  const triggerFireworks = useCallback(() => {
    const duration = 10;
    const animationEnd = Date.now() + duration;
    const colors = ['#2196F3', '#4CAF50', '#FFC107', '#9C27B0', '#FF5722', '#3F51B5'];
    let count = 0;
    
    const createFirework = () => {
      const particleCount = 70; // Reduced to 40% of original
      const angle = Math.random() * Math.PI * 2;
      
      confetti({
        particleCount,
        angle,
        spread: 60,
        origin: { x: Math.random(), y: Math.random() },
        colors,
        ticks: 300,
        gravity: 0.8,
        scalar: 1.4, // Reduced to 70% of original
        startVelocity: 30,
        shapes: ['circle', 'square'],
        zIndex: 100
      });

      // Add floating balloons
      if (count % 3 === 0) {
        const balloonColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD'];
        confetti({
          particleCount: 1,
          angle: 90,
          spread: 45,
          origin: { x: Math.random(), y: 1 },
          colors: [balloonColors[Math.floor(Math.random() * balloonColors.length)]],
          ticks: 300,
          gravity: -0.2,
          scalar: 2,
          drift: 0,
          shapes: ['circle'],
        });
      }
      count++;
    };

    const interval = setInterval(() => {
      if (Date.now() > animationEnd) {
        return clearInterval(interval);
      }
      createFirework();
    }, 250);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isLaunching) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            triggerFireworks();
            setLaunchComplete(true);
            onComplete();
          }, 1500);
          return 100;
        }
        return prev + 0.5; // Reduced speed (0.5x)
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isLaunching, onComplete, setLaunchComplete, triggerFireworks]);

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-between">
      <BackgroundCarousel />
      
      <div className="absolute inset-0 flex flex-col items-center justify-between p-10 z-10">
        <div className="w-full flex justify-center">
          <Logo />
        </div>
        
        <div className="flex flex-col items-center justify-center flex-1 w-full max-w-4xl mx-auto">
          {!isLaunching ? (
            <LaunchButton
              onClick={() => setIsLaunching(true)}
              progress={progress}
              isLaunching={isLaunching}
            />
          ) : (
            <div className="w-full space-y-12">
              <ProgressSequence 
                steps={steps} 
                currentStep={currentStep} 
                progress={progress}
              />
              
              <LoadingBar progress={progress} />
            </div>
          )}
        </div>
        
        <div className="w-full text-center mb-24">
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} African Center of Excellence in Bioinformatics and Data Intensive Sciences</p>
        </div>
      </div>

      <BottomPanel />
    </div>
  );
};

export default LaunchPage;