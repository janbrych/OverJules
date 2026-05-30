import React from 'react';
import { usePhone } from '../hooks/usePhone';
import { motion } from 'framer-motion';
import { FileText, MessageCircle, Settings, Sparkles, Camera } from 'lucide-react';

export const HomeScreen: React.FC = () => {
  const { setCurrentApp } = usePhone();

  const apps = [
    { id: 'docs', name: 'Docs', icon: <FileText className="text-white" />, color: 'bg-blue-500' },
    { id: 'instagram', name: 'Instagram', icon: <Camera className="text-white" />, color: 'bg-pink-500' },
    { id: 'whatsapp', name: 'WhatsApp', icon: <MessageCircle className="text-white" />, color: 'bg-green-500' },
    { id: 'overlay-settings', name: 'Overlay AI', icon: <Sparkles className="text-white" />, color: 'bg-gradient-to-br from-purple-500 to-blue-500' },
    { id: 'settings', name: 'Settings', icon: <Settings className="text-white" />, color: 'bg-slate-500' },
  ] as const;

  return (
    <div className="h-full bg-slate-50 p-6 flex flex-col justify-between" style={{ backgroundImage: 'radial-gradient(circle at top right, #f8fafc, #f1f5f9)' }}>
      <div className="grid grid-cols-4 gap-4 mt-4">
        {apps.map((app) => (
          <motion.button
            key={app.id}
            whileTap={{ scale: 0.9 }}
            onClick={() => setCurrentApp(app.id)}
            className="flex flex-col items-center gap-1"
          >
            <div className={`w-12 h-12 ${app.color} rounded-xl flex items-center justify-center shadow-sm`}>
              {app.icon}
            </div>
            <span className="text-[10px] font-medium text-slate-700">{app.name}</span>
          </motion.button>
        ))}
      </div>

      <div className="w-full bg-white/40 backdrop-blur-md rounded-2xl p-4 flex justify-between gap-2 shadow-inner border border-white/20">
         {apps.slice(0, 4).map((app) => (
            <motion.button
              key={`dock-${app.id}`}
              whileTap={{ scale: 0.9 }}
              onClick={() => setCurrentApp(app.id)}
              className={`w-12 h-12 ${app.color} rounded-xl flex items-center justify-center shadow-sm`}
            >
              {app.icon}
            </motion.button>
         ))}
      </div>
    </div>
  );
};
