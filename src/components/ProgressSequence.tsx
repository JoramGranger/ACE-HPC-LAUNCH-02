import { CheckCircle } from 'lucide-react';

interface ProgressSequenceProps {
  steps: string[];
  currentStep: number;
  progress: number;
}

const ProgressSequence = ({ steps, currentStep, progress }: ProgressSequenceProps) => {
  return (
    <div className="w-full max-w-md">
      <div className="space-y-5">
        {steps.map((step, index) => (
          <div 
            key={index} 
            className={`flex items-center transition-all duration-300 ${
              index <= currentStep ? 'opacity-100' : 'opacity-40'
            }`}
          >
            <div className="flex-shrink-0 mr-3">
              {index < currentStep ? (
                <CheckCircle className="w-6 h-6 text-green-500" />
              ) : (
                <div className={`w-6 h-6 rounded-full ${
                  index === currentStep ? 'bg-red-500 animate-pulse' : 'bg-gray-600'
                }`}></div>
              )}
            </div>
            <p className="text-white text-2xl">{step}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressSequence;