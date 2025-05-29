import { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import CircularProgressMeter from './CircularProgressMeter';
import ServerNodesGrid from './ServerNodesGrid';
import Logo from './Logo';
import Particles from './Particles';

const StatusPage = () => {
  const { 
    nodesOnline, 
    totalCores, 
    memoryAvailable, 
    storageCapacity,
    setNodesOnline,
    setTotalCores,
    setMemoryAvailable
  } = useAppContext();

  const [showBanner, setShowBanner] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(false);

  // Animation timing
  useEffect(() => {
    const animationDuration = 1000;
    const totalNodes = 56;
    const coresPerNode = 272;
    const memoryPerNode = 96;
    const totalCoresMax = totalNodes * coresPerNode;
    const memoryMax = totalNodes * memoryPerNode;
    
    const interval = 50;
    const steps = animationDuration / interval;
    
    const nodeIncrement = totalNodes / steps;
    const coreIncrement = totalCoresMax / steps;
    const memoryIncrement = memoryMax / steps;
    
    let currentStep = 0;
    
    const timer = setInterval(() => {
      currentStep++;
      
      const progress = 1 - Math.pow(1 - currentStep / steps, 3);
      
      setNodesOnline(Math.min(Math.floor(totalNodes * progress), totalNodes));
      setTotalCores(Math.min(Math.floor(totalCoresMax * progress), totalCoresMax));
      setMemoryAvailable(Math.min(Math.floor(memoryMax * progress), memoryMax));
      
      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, interval);
    
    return () => clearInterval(timer);
  }, [setNodesOnline, setTotalCores, setMemoryAvailable]);

  // Show banner when all nodes are online
  useEffect(() => {
    if (nodesOnline === 56 && !showBanner) {
      setShowBanner(true);
      // Delay the visibility for smooth animation
      setTimeout(() => setBannerVisible(true), 100);
      
      // Auto-hide banner after 5 seconds
      setTimeout(() => {
        setBannerVisible(false);
        setTimeout(() => setShowBanner(false), 500); // Wait for fade out
      }, 5000);
    }
  }, [nodesOnline, showBanner]);

  return (
    <div className="relative w-full h-full flex flex-col">
      <Particles />
      
      {/* HPC Live Banner */}
      {showBanner && (
        <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ${
          bannerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        }`}>
          <div className="bg-gradient-to-r from-green-500/90 to-emerald-600/90 backdrop-blur-md rounded-xl px-8 py-4 border border-green-400/50 shadow-2xl">
            <div className="flex items-center gap-3">
              {/* Pulsing indicator */}
              <div className="relative">
                <div className="w-4 h-4 rounded-full bg-green-300 animate-pulse"></div>
                <div className="absolute inset-0 w-4 h-4 rounded-full bg-green-300 animate-ping opacity-75"></div>
              </div>
              
              <div className="flex flex-col">
                <h3 className="text-white font-bold text-lg tracking-wide">
                  HPC CLUSTER LIVE
                </h3>
                <p className="text-green-100 text-sm">
                  All 56 nodes operational • {totalCores.toLocaleString()} cores active
                </p>
              </div>
              
              {/* Success icon */}
              <div className="ml-4">
                <svg className="w-6 h-6 text-green-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            
            {/* Animated border glow */}
            <div className="absolute inset-0 rounded-xl border border-green-400/30 animate-pulse"></div>
          </div>
        </div>
      )}
      
      <div className="absolute inset-0 z-10 flex flex-col p-6">
        <div className="mb-4">
          <Logo />
        </div>
        
        <div className="flex-1 flex flex-col">
          <div className="h-[45%] mb-4">
            <div className="bg-black/60 backdrop-blur-md rounded-xl p-6 h-full border border-gray-800">
              <h2 className="text-white text-2xl font-bold mb-4">Cluster Performance</h2>
              <div className="grid grid-cols-4 gap-4 h-[calc(100%-2rem)]">
                <CircularProgressMeter 
                  title="Nodes Online" 
                  value={nodesOnline} 
                  maxValue={56} 
                  unit=""
                  color="red" 
                />
                <CircularProgressMeter 
                  title="Total CPUs Active" 
                  value={totalCores} 
                  maxValue={15232} 
                  unit=""
                  color="blue" 
                />
                <CircularProgressMeter 
                  title="Memory Available" 
                  value={memoryAvailable} 
                  maxValue={5376} 
                  unit="GB"
                  color="green" 
                />
                <CircularProgressMeter 
                  title="Online Storage" 
                  value={storageCapacity} 
                  maxValue={500000} 
                  unit="GB"
                  color="purple"
                  isStatic 
                />
              </div>
            </div>
          </div>
          
          <div className="h-[55%]">
            <div className="bg-black/60 backdrop-blur-md rounded-xl p-6 h-full border border-gray-800">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white text-2xl font-bold">Cluster Nodes</h2>
                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
                    <span className="text-white text-sm">Initializing</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-white text-sm">Online</span>
                  </div>
                </div>
              </div>
              <ServerNodesGrid nodesOnline={nodesOnline} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusPage;