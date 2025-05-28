import { useEffect, useState, useRef } from 'react';
import ServerNode from './ServerNode';

interface ServerNodesGridProps {
  nodesOnline: number;
}

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
  const shuffledNodes = useRef<number[]>([]);

  // Generate all 56 node IDs (1-56)
  const allNodes = Array.from({ length: 56 }, (_, i) => i + 1);

  useEffect(() => {
    if (nodesOnline === 0) {
      setVisibleNodes([]);
      return;
    }

    // On first run or when nodesOnline changes, shuffle node order
    shuffledNodes.current = shuffleArray(allNodes);

    let currentIndex = 0;

    const interval = setInterval(() => {
      setVisibleNodes((prev) => {
        const nextNodeId = shuffledNodes.current[currentIndex];
        currentIndex++;
        if (currentIndex > nodesOnline || currentIndex > allNodes.length) {
          clearInterval(interval);
          return prev;
        }
        return [...prev, nextNodeId];
      });
    }, 50);

    return () => clearInterval(interval);
  }, [nodesOnline]);

  return (
    <div className="grid grid-cols-4 sm:grid-cols-7 md:grid-cols-14 gap-2 overflow-hidden h-[calc(100%-2rem)]">
      {allNodes.map((nodeId) => (
        <ServerNode key={nodeId} nodeId={nodeId} isActive={visibleNodes.includes(nodeId)} />
      ))}
    </div>
  );
};

export default ServerNodesGrid;