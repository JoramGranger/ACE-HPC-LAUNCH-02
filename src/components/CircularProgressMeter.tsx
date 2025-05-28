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
  isStatic = false,
}: CircularProgressMeterProps) => {
  const [displayValue, setDisplayValue] = useState(0);

  const colorMap = {
    red: {
      stroke: 'stroke-red-500',
      gradient: 'from-red-400 via-red-500 to-red-600',
      text: 'text-red-500',
      glow: 'shadow-red-500/50',
    },
    blue: {
      stroke: 'stroke-blue-500',
      gradient: 'from-blue-400 via-blue-500 to-blue-600',
      text: 'text-blue-500',
      glow: 'shadow-blue-500/50',
    },
    green: {
      stroke: 'stroke-green-500',
      gradient: 'from-green-400 via-green-500 to-green-600',
      text: 'text-green-500',
      glow: 'shadow-green-500/50',
    },
    purple: {
      stroke: 'stroke-purple-500',
      gradient: 'from-purple-400 via-purple-500 to-purple-600',
      text: 'text-purple-500',
      glow: 'shadow-purple-500/50',
    },
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
      if (
        (increment > 0 && currentValue >= value) ||
        (increment < 0 && currentValue <= value)
      ) {
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
    <div className="flex flex-col items-center justify-center transition-transform duration-300 hover:scale-105">
      <div className="relative bg-white/5 backdrop-blur-md p-4 rounded-full shadow-md shadow-black/30">
        <svg className="w-44 h-44" viewBox="0 0 100 100">
          {/* Base ring */}
          <circle
            className="stroke-gray-800/60 fill-transparent"
            cx="50"
            cy="50"
            r={radius}
            strokeWidth="8"
          />
          {/* Animated progress arc */}
          <circle
            className={`fill-transparent stroke-[8] ${colorMap[color].stroke}`}
            style={{
              strokeDasharray: circumference,
              strokeDashoffset,
              transition: 'stroke-dashoffset 0.5s ease-out',
              transform: 'rotate(-90deg)',
              transformOrigin: '50% 50%',
            }}
            cx="50"
            cy="50"
            r={radius}
            strokeLinecap="round"
          />
          {/* Optional gradient overlay */}
          <defs>
            <linearGradient id={`grad-${color}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff11" />
              <stop offset="100%" stopColor="#ffffff33" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center Value */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-4xl font-semibold ${colorMap[color].text}`}>
            {formattedValue}
          </span>
          <span className="text-sm text-gray-300">{unit}</span>
        </div>
      </div>

      <div className="mt-3 text-center">
        <h3 className="text-white font-medium text-lg">{title}</h3>
        <p className="text-gray-400 text-sm">{formattedPercentage}%</p>
      </div>
    </div>
  );
};

export default CircularProgressMeter;
