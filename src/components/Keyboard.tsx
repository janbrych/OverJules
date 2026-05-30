import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Delete, Smile, Camera, Mic, Plus } from 'lucide-react';
import { cn } from '../utils/cn';

interface KeyboardProps {
  onKeyPress: (key: string) => void;
  onDelete: () => void;
  onClose: () => void;
}

export const Keyboard: React.FC<KeyboardProps> = ({ onKeyPress, onDelete, onClose }) => {
  const rows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
  ];

  return (
    <motion.div
      initial={{ y: 300 }}
      animate={{ y: 0 }}
      exit={{ y: 300 }}
      className="absolute bottom-0 inset-x-0 bg-slate-200 p-2 pb-8 flex flex-col gap-3 z-[1000] select-none"
    >
      {rows.map((row, i) => (
        <div key={i} className="flex justify-center gap-1.5">
          {i === 2 && <div className="flex-1" />}
          {row.map(key => (
            <button
              key={key}
              onClick={() => onKeyPress(key)}
              className="bg-white h-10 flex-1 rounded-md shadow-sm text-sm font-medium active:bg-slate-300 transition-colors"
            >
              {key}
            </button>
          ))}
          {i === 2 && (
            <button
              onClick={onDelete}
              className="bg-slate-300 h-10 px-3 rounded-md shadow-sm active:bg-slate-400 transition-colors"
            >
              <Delete size={18} />
            </button>
          )}
        </div>
      ))}
      <div className="flex gap-2">
        <button className="bg-slate-300 h-10 px-4 rounded-md shadow-sm text-xs font-bold uppercase">123</button>
        <button className="bg-slate-300 h-10 px-4 rounded-md shadow-sm"><Smile size={18} /></button>
        <button
          onClick={() => onKeyPress(' ')}
          className="bg-white h-10 flex-[4] rounded-md shadow-sm text-xs font-medium uppercase"
        >
          space
        </button>
        <button
          onClick={onClose}
          className="bg-blue-500 text-white h-10 flex-[2] rounded-md shadow-sm text-xs font-bold uppercase"
        >
          return
        </button>
      </div>
    </motion.div>
  );
};
