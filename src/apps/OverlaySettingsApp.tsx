import React from 'react';
import { usePhone } from '../hooks/usePhone';
import { Sparkles, Palette, Shield, Zap, Sliders } from 'lucide-react';
import { cn } from '../utils/cn';

export const OverlaySettingsApp: React.FC = () => {
  const { colorScheme, setColorScheme } = usePhone();

  const schemes = [
    { id: 'rainbow', name: 'Rainbow', desc: 'Standard vibrant spectrum', colors: 'bg-gradient-to-r from-red-400 via-green-400 to-blue-400' },
    { id: 'grey', name: '50 Shades of Grey', desc: 'Minimalist monochrome', colors: 'bg-gradient-to-r from-slate-300 via-slate-500 to-slate-700' },
    { id: 'pastel', name: 'Pastel Dreams', desc: 'Soft and muted tones', colors: 'bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200' },
    { id: 'custom', name: 'Smart Palette', desc: 'AI suggested colors', colors: 'bg-gradient-to-r from-indigo-400 to-cyan-400' },
  ] as const;

  return (
    <div className="h-full bg-slate-50 flex flex-col overflow-y-auto">
      <div className="p-6 pt-12 space-y-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
            <Sparkles size={20} />
          </div>
          <div>
            <h1 className="text-xl font-black">Overlay AI</h1>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Settings</p>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <Palette size={14} />
            Visual Appearance
          </h2>
          <div className="space-y-3">
            {schemes.map((scheme) => (
              <button
                key={scheme.id}
                onClick={() => setColorScheme(scheme.id)}
                className={cn(
                  "w-full bg-white p-4 rounded-2xl border transition-all text-left flex items-center justify-between",
                  colorScheme === scheme.id ? "border-blue-500 ring-4 ring-blue-50" : "border-slate-100 hover:border-slate-200"
                )}
              >
                <div className="space-y-1">
                  <div className="font-bold text-sm">{scheme.name}</div>
                  <div className="text-[10px] text-slate-400">{scheme.desc}</div>
                </div>
                <div className={cn("w-12 h-6 rounded-full", scheme.colors)} />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <Sliders size={14} />
            Preferences
          </h2>
          <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
             {[
               { icon: <Zap size={16} />, label: 'Auto-Highlight', value: true },
               { icon: <Shield size={16} />, label: 'Privacy Mode', value: false },
             ].map((pref, i) => (
               <div key={pref.label} className={cn("p-4 flex items-center justify-between", i === 0 && "border-b border-slate-50")}>
                  <div className="flex items-center gap-3">
                    <div className="text-slate-400">{pref.icon}</div>
                    <span className="text-sm font-medium">{pref.label}</span>
                  </div>
                  <div className={cn("w-10 h-5 rounded-full p-1 transition-colors", pref.value ? "bg-green-500" : "bg-slate-200")}>
                    <div className={cn("w-3 h-3 bg-white rounded-full transition-transform", pref.value ? "translate-x-5" : "translate-x-0")} />
                  </div>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};
