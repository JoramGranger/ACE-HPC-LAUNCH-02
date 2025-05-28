import { Cpu } from 'lucide-react';
import aceLogo from '../assets/ace-logo.png';

const Logo = () => {
  return (
    <div className="flex items-center justify-center mb-12">
      <div className="flex items-center bg-black/40 backdrop-blur-sm px-16 py-8 rounded-2xl border border-gray-800 shadow-lg">
        {/* Logo Image */}
        <div className="flex items-center mr-12">
          <img 
            src={aceLogo}
            alt="ACE Logo" 
            className="h-24 mr-4" // Larger logo
          />
        </div>

        {/* Text and Icon */}
        <div className="flex items-center">
          <Cpu className="h-16 w-16 text-red-600 mr-4" /> {/* Bigger icon */}
          <div>
            <h1 className="text-5xl font-bold text-white tracking-wide">ACE HPC CLUSTER</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logo;