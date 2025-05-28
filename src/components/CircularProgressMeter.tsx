// File: components/CircularProgressMeter.tsx
import { useEffect, useState } from 'react';

interface CircularProgressMeterProps {
  title: string;
  value: number;
  maxValue: number;
  unit: string;
  color: 'red' | 'blue' | 'green' | 'purple';
  isStatic?: boolean;
}

const CircularProgressMeter = ({ 
  title, 
  value, 
  maxValue, 
  unit, 
  color,
  isStatic = false 
}: CircularProgressMeterProps) => {
  const [displayValue, setDisplayValue] = useState(0);

  const colorMap = {
    red: { stroke: 'stroke-red-500', text: 'text-red-500', glow: 'shadow-red-500/50' },
    blue: { stroke: 'stroke-blue-500', text: 'text-blue-500', glow: 'shadow-blue-500/50' },
    green: { stroke: 'stroke-green-500', text: 'text-green-500', glow: 'shadow-green-500/50' },
    purple: { stroke: 'stroke-purple-500', text: 'text-purple-500', glow: 'shadow-purple-500/50' }
  };

  const percentage = (displayValue / maxValue) * 100;
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  useEffect(() => {
    if (isStatic) {
      setDisplayValue(value);
      return;
    }

    const animationDuration = 1000;
    const interval = 30;
    const steps = animationDuration / interval;
    const increment = (value - displayValue) / steps;
    let currentValue = displayValue;

    const timer = setInterval(() => {
      currentValue += increment;
      if ((increment > 0 && currentValue >= value) || (increment < 0 && currentValue <= value)) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(currentValue);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [value, isStatic]);

  const formattedValue = isStatic 
    ? value.toString() 
    : Math.floor(displayValue).toLocaleString();

  const formattedPercentage = percentage.toFixed(1);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative">
        <svg className="w-40 h-40" viewBox="0 0 100 100">
          <circle
            className="stroke-gray-700 fill-transparent"
            cx="50" cy="50" r={radius} strokeWidth="8"
          />
          <circle
            className={`fill-transparent ${colorMap[color].stroke} transition-all duration-500 ease-out ${!isStatic ? 'shadow-lg ' + colorMap[color].glow : ''}`}
            cx="50" cy="50" r={radius} strokeWidth="8"
            strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
            strokeLinecap="round" transform="rotate(-90 50 50)"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-3xl font-bold ${colorMap[color].text}`}>{formattedValue}</span>
          <span className="text-sm text-white opacity-80">{unit}</span>
        </div>
      </div>
      <div className="mt-2 text-center">
        <h3 className="text-white font-semibold">{title}</h3>
        <p className="text-gray-400 text-sm">{formattedPercentage}%</p>
      </div>
    </div>
  );
};

export default CircularProgressMeter;
