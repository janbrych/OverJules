import React from 'react';
import { usePhone, PhoneProvider } from './hooks/usePhone';
import { PhoneFrame } from './components/PhoneFrame';
import { HomeScreen } from './components/HomeScreen';
import { DocsApp } from './apps/DocsApp';
import { InstagramApp } from './apps/InstagramApp';
import { WhatsAppApp } from './apps/WhatsAppApp';
import { OverlaySettingsApp } from './apps/OverlaySettingsApp';
import { motion } from 'framer-motion';
import { Sparkles, MousePointer2, Zap, Globe, MessageSquare, StickyNote, FileText, Camera } from 'lucide-react';

const PhoneInterface = () => {
  const { currentApp, isAiMode, setIsAiMode } = usePhone();

  return (
    <div className="flex flex-col items-center">
      <PhoneFrame>
        {currentApp === 'home' && <HomeScreen />}
        {currentApp === 'docs' && <DocsApp />}
        {currentApp === 'instagram' && <InstagramApp />}
        {currentApp === 'whatsapp' && <WhatsAppApp />}
        {currentApp === 'overlay-settings' && <OverlaySettingsApp />}
        {currentApp === 'settings' && (
           <div className="h-full bg-slate-50 flex items-center justify-center text-slate-400">Settings app</div>
        )}
      </PhoneFrame>

      <div className="mt-8 flex flex-col items-center gap-4">
        <button
          onClick={() => setIsAiMode(!isAiMode)}
          className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold transition-all ${
            isAiMode
              ? 'bg-slate-800 text-white'
              : 'bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 text-white shadow-lg hover:scale-105'
          }`}
        >
          <Sparkles size={18} />
          {isAiMode ? 'Deactivate Overlay AI' : 'Activate Overlay AI'}
        </button>
        <p className="text-slate-400 text-sm">
          Click button to toggle AI mode
        </p>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
    <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
  </div>
);

function App() {
  return (
    <PhoneProvider>
      <div className="min-h-screen bg-[#fcfcfd] text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
        {/* Navigation */}
        <nav className="fixed top-0 inset-x-0 bg-white/80 backdrop-blur-md z-[100] border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2 font-black text-xl tracking-tighter">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                <Sparkles size={18} />
              </div>
              OVERLAY AI
            </div>
            <div className="flex items-center gap-8 text-sm font-medium text-slate-600">
              <a href="#" className="hover:text-blue-600">Features</a>
              <a href="#" className="hover:text-blue-600">Developers</a>
              <a href="#" className="hover:text-blue-600">Pricing</a>
              <button className="bg-slate-900 text-white px-5 py-2 rounded-full text-xs font-bold hover:bg-slate-800 transition-colors">
                Get Started
              </button>
            </div>
          </div>
        </nav>

        <main className="pt-32 pb-20 px-6 overflow-x-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">

              {/* Left Column: Hero Content */}
              <div className="space-y-10">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider">
                    <Zap size={12} fill="currentColor" />
                    v2.0 Ambient Intelligence
                  </div>
                  <h1 className="text-6xl md:text-7xl font-black tracking-tight leading-[1.1] text-slate-950">
                    The AI layer for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">every app</span> you use.
                  </h1>
                  <p className="text-xl text-slate-600 leading-relaxed max-w-lg">
                    Overlay AI brings powerful context-aware intelligence directly to your cursor. Highlight text in any app and get instant translations, definitions, and AI chats without leaving your flow.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FeatureCard
                    icon={<MousePointer2 size={24} />}
                    title="Smart Highlight"
                    description="Just drag over text. We'll snap to words and understand the context instantly."
                  />
                  <FeatureCard
                    icon={<Globe size={24} />}
                    title="Instant Translate"
                    description="Contextual translation to any language, focused on meaning not just words."
                  />
                  <FeatureCard
                    icon={<MessageSquare size={24} />}
                    title="Ambient Chat"
                    description="An AI companion that knows what you're looking at. No more copy-pasting."
                  />
                  <FeatureCard
                    icon={<StickyNote size={24} />}
                    title="Draggable Notes"
                    description="Keep your thoughts organized with spatial windows that stick to your content."
                  />
                </div>
              </div>

              {/* Right Column: Interactive Phone */}
              <div className="relative flex justify-center lg:justify-end">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[120px] pointer-events-none" />
                <PhoneInterface />
              </div>
            </div>

            {/* Presentation Section */}
            <div className="space-y-32">
               {/* App Ecosystem Section */}
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100 flex flex-col justify-between aspect-square">
                     <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-blue-600">
                        <FileText size={28} />
                     </div>
                     <div>
                        <h3 className="text-2xl font-bold mb-2">Docs & Work</h3>
                        <p className="text-slate-500">Perfectly integrated with your workspace. Analyze complex documents in seconds.</p>
                     </div>
                  </div>
                  <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100 flex flex-col justify-between aspect-square translate-y-12">
                     <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-pink-600">
                        <Camera size={28} />
                     </div>
                     <div>
                        <h3 className="text-2xl font-bold mb-2">Social & Media</h3>
                        <p className="text-slate-500">Translate comments, research topics, and explore content without leaving the feed.</p>
                     </div>
                  </div>
                  <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100 flex flex-col justify-between aspect-square">
                     <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-green-600">
                        <MessageSquare size={28} />
                     </div>
                     <div>
                        <h3 className="text-2xl font-bold mb-2">Messaging</h3>
                        <p className="text-slate-500">Smart replies and instant definitions right inside your favorite chat apps.</p>
                     </div>
                  </div>
               </div>

               {/* Performance Graph Section (Visual Placeholder) */}
               <div className="pt-20 border-t border-slate-100">
                  <div className="text-center mb-16">
                     <h2 className="text-3xl font-bold mb-4">Unmatched Productivity</h2>
                     <p className="text-slate-500">How Overlay AI compares to traditional context switching.</p>
                  </div>
                  <div className="h-[400px] w-full bg-white rounded-3xl border border-slate-100 shadow-sm p-8 flex flex-col">
                     <div className="flex-1 flex items-end gap-12 px-10">
                        {[40, 65, 45, 90, 55, 80, 95].map((h, i) => (
                           <div key={i} className="flex-1 flex flex-col items-center gap-4">
                              <motion.div
                                 initial={{ height: 0 }}
                                 whileInView={{ height: `${h}%` }}
                                 className={`w-full rounded-t-xl ${i === 6 ? 'bg-blue-600' : 'bg-slate-200'}`}
                              />
                              <span className="text-xs font-bold text-slate-400">MAY {10 + i}</span>
                           </div>
                        ))}
                     </div>
                     <div className="mt-8 pt-8 border-t border-slate-50 flex justify-between items-center px-10">
                        <div className="flex gap-8">
                           <div className="flex items-center gap-2">
                              <div className="w-3 h-3 bg-blue-600 rounded-full" />
                              <span className="text-xs font-bold">Overlay AI Mode</span>
                           </div>
                           <div className="flex items-center gap-2">
                              <div className="w-3 h-3 bg-slate-200 rounded-full" />
                              <span className="text-xs font-bold">Traditional Apps</span>
                           </div>
                        </div>
                        <div className="text-sm font-bold text-slate-900">
                           +240% Efficiency Increase
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </main>

        <footer className="bg-slate-950 text-white py-20 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="flex items-center gap-2 font-black text-xl tracking-tighter">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                <Sparkles size={18} />
              </div>
              OVERLAY AI
            </div>
            <div className="text-slate-500 text-sm">
              © 2026 Overlay AI Inc. All rights reserved.
            </div>
            <div className="flex gap-6 text-sm font-medium">
              <a href="#" className="hover:text-blue-400">Twitter</a>
              <a href="#" className="hover:text-blue-400">GitHub</a>
              <a href="#" className="hover:text-blue-400">Discord</a>
            </div>
          </div>
        </footer>
      </div>
    </PhoneProvider>
  )
}

export default App
