import React from 'react';
import { usePhone } from '../hooks/usePhone';
import { motion, AnimatePresence } from 'framer-motion';
import { Battery, Wifi, Signal } from 'lucide-react';

interface PhoneFrameProps {
  children: React.ReactNode;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({ children }) => {
  const { isAiMode, colorScheme, setCurrentApp } = usePhone();

  const getSchemeGradient = () => {
    switch (colorScheme) {
      case 'rainbow':
        return 'conic-gradient(from 0deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #8b00ff, #ff0000)';
      case 'grey':
        return 'conic-gradient(from 0deg, #000, #333, #666, #999, #ccc, #fff, #000)';
      case 'pastel':
        return 'conic-gradient(from 0deg, #ffb3ba, #ffdfba, #ffffba, #baffc9, #bae1ff, #ffb3ba)';
      case 'custom':
        return 'conic-gradient(from 0deg, #6366f1, #06b6d4, #10b981, #6366f1)';
      default:
        return 'conic-gradient(from 0deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #8b00ff, #ff0000)';
    }
  };

  return (
    <div className="relative group">
      {/* Outer Frame */}
      <div className="w-[300px] h-[600px] bg-slate-900 rounded-[3rem] p-3 shadow-2xl relative border-[6px] border-slate-800 outline outline-1 outline-slate-700/50">

        {/* Physical Buttons */}
        <div className="absolute -left-[8px] top-24 w-[2px] h-12 bg-slate-700 rounded-l-md" />
        <div className="absolute -left-[8px] top-40 w-[2px] h-12 bg-slate-700 rounded-l-md" />
        <div className="absolute -right-[8px] top-32 w-[2px] h-20 bg-slate-700 rounded-r-md" />

        {/* Screen Container */}
        <div className="w-full h-full bg-white rounded-[2.2rem] overflow-hidden relative flex flex-col">

          {/* Status Bar */}
          <div className="h-10 px-6 flex justify-between items-end pb-1 text-[11px] font-semibold z-50 pointer-events-none">
            <span>9:41</span>
            <div className="flex gap-1.5 items-center">
              <Signal size={12} />
              <Wifi size={12} />
              <Battery size={14} />
            </div>
          </div>

          {/* Notch / Dynamic Island */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-50" />

          {/* Screen Content */}
          <div className="flex-1 overflow-hidden relative">
            {children}
          </div>

          {/* Home Indicator */}
          <div className="h-6 flex justify-center items-center z-[60] relative">
            <button
              onClick={() => setCurrentApp('home')}
              className="w-24 h-1 bg-slate-300 rounded-full hover:bg-slate-400 transition-colors cursor-pointer"
            />
          </div>

          {/* Overlay AI Edge Border */}
          <AnimatePresence>
            {isAiMode && (
              <motion.div
                initial={{ clipPath: 'circle(0% at 0% 100%)' }}
                animate={{ clipPath: 'circle(150% at 0% 100%)' }}
                exit={{ clipPath: 'circle(0% at 0% 100%)' }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute inset-0 z-40 pointer-events-none p-1"
              >
                 <div className="w-full h-full rounded-[2.1rem] border-[4px] border-transparent relative overflow-hidden">
                    <div className="absolute inset-0 animate-spin-slow opacity-60"
                         style={{
                           background: getSchemeGradient(),
                           margin: '-100%',
                           width: '300%',
                           height: '300%'
                         }}
                    />
                    <div className="absolute inset-0 bg-white/5" />
                 </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
