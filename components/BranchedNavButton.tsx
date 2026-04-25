import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface BranchedNavButtonProps {
  mainIcon: LucideIcon;
  branch1Icon: LucideIcon;
  branch2Icon: LucideIcon;
  branch1Label: string;
  branch2Label: string;
  onSelectBranch1: () => void;
  onSelectBranch2: () => void;
  isActive?: boolean;
  label: string;
  direction?: 'column' | 'row';
  /** When true, sub-buttons expand upward instead of downward */
  expandUp?: boolean;
  /** Fired when the expanded state changes */
  onExpandChange?: (expanded: boolean) => void;
}

const BranchedNavButton: React.FC<BranchedNavButtonProps> = ({
  mainIcon: MainIcon,
  branch1Icon: Branch1Icon,
  branch2Icon: Branch2Icon,
  branch1Label,
  branch2Label,
  onSelectBranch1,
  onSelectBranch2,
  isActive = false,
  label,
  direction = 'column',
  expandUp = false,
  onExpandChange
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    onExpandChange?.(isExpanded);
  }, [isExpanded, onExpandChange]);

  // When expandUp is true, always use row layout and position above
  const positionClass = expandUp
    ? 'bottom-full left-1/2 -translate-x-1/2 pb-2 flex-row'
    : `top-full left-1/2 -translate-x-1/2 pt-2 ${direction === 'column' ? 'flex-col' : 'flex-row'}`;

  const animInitial = expandUp
    ? { opacity: 0, y: 10, scale: 0.8 }
    : { opacity: 0, y: -10, scale: 0.8 };

  return (
    <div className="relative flex items-center justify-center">
      <motion.button
        layout
        onClick={() => setIsExpanded(!isExpanded)}
        className={`relative z-50 flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300 ${isExpanded || isActive
            ? 'bg-blue-600 text-white shadow-lg'
            : 'bg-white border border-slate-200 text-blue-900 hover:bg-slate-50'
          }`}
        whileTap={{ scale: 0.95 }}
      >
        <MainIcon className={`w-4 h-4 ${isExpanded ? 'rotate-12' : ''} transition-transform`} />
        {!isExpanded && <span className="text-[10px] font-bold tracking-tight uppercase">{label}</span>}
      </motion.button>

      <AnimatePresence>
        {isExpanded && (
          <div className={`absolute flex gap-2 z-40 ${positionClass}`}>
            <motion.div
              initial={animInitial}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={animInitial}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectBranch1();
                  setIsExpanded(false);
                }}
                className="flex flex-col items-center gap-1 group"
              >
                <div className="p-2.5 rounded-full bg-blue-500 text-white shadow-md border border-white/20 hover:bg-blue-400 transition-all hover:scale-110">
                  <Branch1Icon className="w-4 h-4" />
                </div>
                <span className="text-[9px] font-black text-blue-600 bg-white px-1.5 py-0.5 rounded-md uppercase tracking-tight shadow-sm whitespace-nowrap border border-blue-50">
                  {branch1Label}
                </span>
              </button>
            </motion.div>

            <motion.div
              initial={animInitial}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={animInitial}
              transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.05 }}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectBranch2();
                  setIsExpanded(false);
                }}
                className="flex flex-col items-center gap-1 group"
              >
                <div className="p-2.5 rounded-full bg-cyan-500 text-white shadow-md border border-white/20 hover:bg-cyan-400 transition-all hover:scale-110">
                  <Branch2Icon className="w-4 h-4" />
                </div>
                <span className="text-[9px] font-black text-cyan-600 bg-white px-1.5 py-0.5 rounded-md uppercase tracking-tight shadow-sm whitespace-nowrap border border-cyan-50">
                  {branch2Label}
                </span>
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BranchedNavButton;
