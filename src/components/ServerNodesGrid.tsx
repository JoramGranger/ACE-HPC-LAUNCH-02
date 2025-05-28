import { useEffect, useState, useRef } from 'react';
import ServerNode from './ServerNode';

interface ServerNodesGridProps {
  nodesOnline: number;
}

// Fisher-Yates shuffle
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const ServerNodesGrid = ({ nodesOnline }: ServerNodesGridProps) => {
  const [visibleNodes, setVisibleNodes] = useState<number[]>([]);
  const shuffledOrderRef = useRef<number[]>([]);
  const currentIndexRef = useRef<number>(0);

  const allNodes = Array.from({ length: 56 }, (_, i) => i + 1);

  useEffect(() => {
    shuffledOrderRef.current = shuffleArray(allNodes);
    currentIndexRef.current = 0;
  }, []);

  useEffect(() => {
    if (nodesOnline === 0) {
      setVisibleNodes([]);
      currentIndexRef.current = 0;
      return;
    }

    const interval = setInterval(() => {
      if (currentIndexRef.current >= nodesOnline || currentIndexRef.current >= allNodes.length) {
        clearInterval(interval);
        return;
      }

      const nextNode = shuffledOrderRef.current[currentIndexRef.current];
      currentIndexRef.current++;

      setVisibleNodes((prev) => [...prev, nextNode]);
    }, 50);

    return () => clearInterval(interval);
  }, [nodesOnline]);

  return (
    <div className="grid grid-cols-4 sm:grid-cols-7 md:grid-cols-14 gap-2 overflow-hidden h-[calc(100%-2rem)]">
      {allNodes.map((nodeId) => (
        <ServerNode
          key={nodeId}
          nodeId={nodeId}
          isActive={visibleNodes.includes(nodeId)}
        />
      ))}
    </div>
  );
};

export default ServerNodesGrid;
