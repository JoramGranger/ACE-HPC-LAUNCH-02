import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Server } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ServerNodeProps {
  nodeId: number;
  isActive: boolean;
}

interface NodeMetrics {
  cores: number;
  memory: number;
  temperature: number;
  loadAverage: number;
}

const generateRandomMetrics = (): Pick<NodeMetrics, 'temperature' | 'loadAverage'> => ({
  temperature: parseFloat((35 + Math.random() * 20).toFixed(1)), // 35.0°C – 55.0°C
  loadAverage: parseFloat((Math.random() * 2).toFixed(2)),        // 0.00 – 2.00
});

const ServerNode = ({ nodeId, isActive }: ServerNodeProps) => {
  const [status, setStatus] = useState<'offline' | 'initializing' | 'online'>('offline');
  const [showDetails, setShowDetails] = useState(false);
  const [metrics, setMetrics] = useState<NodeMetrics>({
    cores: 272,
    memory: 96,
    temperature: 45.5,
    loadAverage: 0.45,
  });

  const nodeRef = useRef<HTMLDivElement>(null);
  const [tooltipPos, setTooltipPos] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

  // Update node status
  useEffect(() => {
    if (!isActive) {
      setStatus('offline');
      return;
    }

    setStatus('initializing');
    const timer = setTimeout(() => {
      setStatus('online');
    }, 1000 + Math.random() * 2000);

    return () => clearTimeout(timer);
  }, [isActive]);

  // Update tooltip position on hover
  useEffect(() => {
    if (showDetails && nodeRef.current) {
      const rect = nodeRef.current.getBoundingClientRect();
      setTooltipPos({
        top: rect.top - 10,
        left: rect.left + rect.width / 2,
      });
    }
  }, [showDetails]);

  // Periodically randomize temperature and loadAverage while online
  useEffect(() => {
    if (status !== 'online') return;

    const interval = setInterval(() => {
      const randomMetrics = generateRandomMetrics();
      setMetrics((prev) => ({
        ...prev,
        ...randomMetrics,
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, [status]);

  const statusColors = {
    offline: 'bg-gray-700',
    initializing: 'bg-amber-500',
    online: 'bg-green-500',
  };

  const getStatusLabel = () => {
    switch (status) {
      case 'offline':
        return 'Node Offline';
      case 'initializing':
        return 'Node Initializing';
      case 'online':
        return 'Node Online';
    }
  };

  const tooltipRoot = document.getElementById('tooltip-root');

  return (
    <>
      <motion.div
        ref={nodeRef}
        className={`
          relative overflow-visible rounded-lg p-2 flex flex-col items-center justify-center
          border transition-all duration-300 hover:scale-105 hover:bg-gray-700/80
          ${status === 'offline' ? 'border-gray-700 bg-gray-800/60 opacity-40' : ''}
          ${status === 'initializing' ? 'border-amber-500 bg-gray-800/80' : ''}
          ${status === 'online' ? 'border-green-600 bg-gradient-to-br from-gray-800 to-gray-700 animate-pulse-slow' : ''}
        `}
        onMouseEnter={() => setShowDetails(true)}
        onMouseLeave={() => setShowDetails(false)}
        role="button"
        aria-label={`Server Node ${String(nodeId).padStart(2, '0')} - ${getStatusLabel()}`}
      >
        {status === 'initializing' ? (
          <div className="w-6 h-6 mb-2 rounded bg-amber-300/30 animate-pulse"></div>
        ) : (
          <Server
            className={`w-6 h-6 mb-1 ${status === 'offline' ? 'text-gray-500' : 'text-white'}`}
          />
        )}

        <div className="text-xs font-mono text-gray-300 mb-1">
          kla-ac-cpu-{String(nodeId).padStart(2, '0')}
        </div>

        <div className="flex items-center justify-center gap-1 mt-1">
          <div
            className={`w-2 h-2 rounded-full ${statusColors[status]} shadow-lg ${
              status === 'initializing' ? 'animate-pulse' : ''
            }`}
            role="status"
            aria-label={getStatusLabel()}
          />
        </div>
      </motion.div>

      {tooltipRoot &&
        ReactDOM.createPortal(
          <AnimatePresence>
            {showDetails && status !== 'offline' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                style={{
                  position: 'fixed',
                  top: tooltipPos.top,
                  left: tooltipPos.left,
                  transform: 'translateX(-50%)',
                  zIndex: 9999,
                  width: 256,
                }}
                className="p-4 bg-gray-900/95 backdrop-blur-md rounded-lg shadow-xl border border-gray-700"
              >
                <h3 className="text-white font-semibold mb-2">Node Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status</span>
                    <span className="text-white capitalize">{status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Cores</span>
                    <span className="text-white">{metrics.cores} vCPUs</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Memory</span>
                    <span className="text-white">{metrics.memory} GB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Temperature</span>
                    <span className="text-white">{metrics.temperature}°C</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Load Average</span>
                    <span className="text-white">{metrics.loadAverage.toFixed(2)}</span>
                  </div>

                  <div className="mt-3">
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-400 text-sm">System Load</span>
                      <span className="text-white text-sm">
                        {(metrics.loadAverage / metrics.cores * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500 rounded-full transition-all duration-300"
                        style={{ width: `${(metrics.loadAverage / metrics.cores) * 100}%` }}
                        role="progressbar"
                        aria-valuenow={Number((metrics.loadAverage / metrics.cores * 100).toFixed(1))}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      ></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          tooltipRoot
        )}
    </>
  );
};

export default ServerNode;
