import { motion, AnimatePresence } from "framer-motion";

interface LogoPanelProps {
  logos: Array<{
    name: string;
    url: string;
  }>;
  currentPanel: number;
  panelIndex: number;
  label?: string;
}

const LogoPanel = ({ logos, currentPanel, panelIndex, label }: LogoPanelProps) => {
  return (
    <AnimatePresence mode="wait">
      {currentPanel === panelIndex && (
        <motion.div
          key={panelIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="flex items-center gap-6 h-full whitespace-nowrap overflow-hidden"
          style={{ width: "100%" }}
        >
          {/* Label on the left */}
          <div className="text-lg font-semibold text-gray-700 min-w-[100px]">
            {label}
          </div>

          {/* Logos container */}
          <div className="flex items-center gap-8 overflow-x-auto scrollbar-hide">
            {logos.map((logo, index) => (
              <motion.div
                key={logo.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="h-12 flex-shrink-0"
              >
                <img
                  src={logo.url}
                  alt={logo.name}
                  className="h-full w-auto object-contain filter brightness-90 hover:brightness-100 transition-all duration-300"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LogoPanel;
