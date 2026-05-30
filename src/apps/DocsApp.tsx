import React, { useRef, useState } from 'react';
import { usePhone } from '../hooks/usePhone';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Globe, MessageSquare, StickyNote, ChevronLeft, X, Maximize2, Send } from 'lucide-react';
import { cn } from '../utils/cn';
import { Keyboard } from '../components/Keyboard';

interface SelectionRect {
  top: number;
  left: number;
  width: number;
  height: number;
  text: string;
}

export const DocsApp: React.FC = () => {
  const { isAiMode } = usePhone();
  const containerRef = useRef<HTMLDivElement>(null);
  const [selection, setSelection] = useState<SelectionRect | null>(null);
  const [activeMenu, setActiveMenu] = useState<SelectionRect | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [windows, setWindows] = useState<any[]>([]);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [currentChatId, setCurrentChatId] = useState<number | null>(null);
  const [chatInput, setChatInput] = useState("");

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isAiMode) return;
    setIsDragging(true);
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    setSelection({
      top: e.clientY - rect.top + (containerRef.current?.scrollTop || 0),
      left: e.clientX - rect.left,
      width: 0,
      height: 0,
      text: ''
    });
    setActiveMenu(null);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !selection || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top + containerRef.current.scrollTop;

    setSelection({
      ...selection,
      width: Math.abs(currentX - selection.left),
      height: Math.abs(currentY - selection.top),
    });
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (selection && selection.width > 10) {
      const snappedSelection = {
        ...selection,
        width: Math.max(selection.width, 140),
        height: Math.max(selection.height, 20),
        text: "ambient intelligence"
      };
      setSelection(snappedSelection);
      setActiveMenu(snappedSelection);
    } else {
      setSelection(null);
      setActiveMenu(null);
    }
  };

  const addWindow = (type: string, title: string, content: string) => {
    if (!activeMenu) return;
    const newWindow = {
      id: Date.now(),
      type,
      title,
      content,
      x: Math.min(containerRef.current?.clientWidth! - 160, Math.max(15, activeMenu.left)),
      y: activeMenu.top + 40,
      messages: type === 'chat' ? [{ role: 'system', content: `How can I help with "${activeMenu.text}"?` }] : []
    };
    setWindows([...windows, newWindow]);
    setActiveMenu(null);
  };

  const handleClearAll = (e: React.MouseEvent) => {
    if (e.target === containerRef.current || (e.target as HTMLElement).classList.contains('content-bg')) {
      setActiveMenu(null);
      setSelection(null);
    }
  };

  return (
    <div
      className="h-full bg-white flex flex-col relative select-none"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onClick={handleClearAll}
    >
      <div className="p-4 border-b flex items-center gap-3 sticky top-0 bg-white z-40">
        <ChevronLeft size={20} className="text-blue-600" />
        <h1 className="font-bold text-sm">Ambient Intelligence</h1>
      </div>

      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto relative content-bg"
      >
        <div className="p-6 space-y-6 pb-20 pointer-events-none">
          <div className="space-y-2">
             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">8 min read</span>
             <h2 className="text-2xl font-black leading-tight text-slate-900">
               The Quiet Revolution of Ambient Intelligence
             </h2>
             <p className="text-xs text-slate-500 font-medium italic">By Maya Lindqvist</p>
          </div>

          <div className="w-full aspect-video bg-slate-100 rounded-xl overflow-hidden mb-6">
             <img src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800" alt="AI representation" className="w-full h-full object-cover" />
          </div>

          <p className="text-sm leading-relaxed text-slate-700">
            For decades we imagined artificial intelligence as a separate place we would visit — a chatbot window, a search bar, a sterile assistant waiting for instructions. The truth is turning out to be more interesting: AI is becoming the air around our work, not the room we step into.
          </p>

          <h3 className="text-lg font-bold pt-4">From destination to atmosphere</h3>

          <p className="text-sm leading-relaxed text-slate-700">
            The earliest large language models lived behind a single door. You opened the door, asked your question, copied the answer, and returned to whatever you were actually doing. That round trip — the constant context switch — was the real bottleneck.
          </p>

          <p className="text-sm leading-relaxed text-slate-700">
            <span className="font-bold text-slate-900">Ambient AI</span> inverts the geometry. Instead of you traveling to the model, the model arrives at your cursor. It understands the context of what you are reading, writing, or designing.
          </p>
        </div>

        <div className={cn("absolute inset-0 pointer-events-none z-30", isKeyboardOpen && "pb-[250px]")}>
           {selection && (
             <div
               className="absolute bg-blue-500/20 border border-blue-500/50 rounded-sm"
               style={{
                 top: selection.top,
                 left: selection.left,
                 width: selection.width,
                 height: selection.height
               }}
             />
           )}

           <AnimatePresence>
             {activeMenu && (
               <motion.div
                 initial={{ opacity: 0, y: 10, scale: 0.9 }}
                 animate={{ opacity: 1, y: 0, scale: 1 }}
                 className="absolute bg-white shadow-2xl rounded-xl border border-slate-200 p-1 flex gap-1 pointer-events-auto"
                 style={{
                   top: Math.max(10, activeMenu.top - 50),
                   left: Math.min(containerRef.current?.clientWidth! - 170, Math.max(15, activeMenu.left))
                 }}
               >
                {[
                  { id: 'translate', icon: <Globe size={16} />, label: 'Translate' },
                  { id: 'definition', icon: <Search size={16} />, label: 'Define' },
                  { id: 'chat', icon: <MessageSquare size={16} />, label: 'Chat' },
                  { id: 'note', icon: <StickyNote size={16} />, label: 'Note' },
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => addWindow(item.id, item.label, "Mock content for " + item.label)}
                    className="p-2 hover:bg-slate-50 rounded-lg text-slate-600 transition-colors"
                  >
                    {item.icon}
                  </button>
                ))}
             </motion.div>
           )}
         </AnimatePresence>

         {windows.map(win => (
           <DraggableWindow
             key={win.id}
             win={win}
             onClose={() => setWindows(windows.filter(w => w.id !== win.id))}
             onFocusChat={() => {
                setIsKeyboardOpen(true);
                setCurrentChatId(win.id);
             }}
             messages={win.messages}
           />
         ))}
        </div>
      </div>

      <AnimatePresence>
        {isKeyboardOpen && (
          <Keyboard
            onKeyPress={(key) => setChatInput(prev => prev + key)}
            onDelete={() => setChatInput(prev => prev.slice(0, -1))}
            onClose={() => {
              if (currentChatId !== null && chatInput.trim()) {
                setWindows(windows.map(w => w.id === currentChatId ? {
                  ...w,
                  messages: [...w.messages, { role: 'user', content: chatInput }]
                } : w));
              }
              setChatInput("");
              setIsKeyboardOpen(false);
              setCurrentChatId(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const DraggableWindow = ({ win, onClose, onFocusChat, messages }: { win: any, onClose: () => void, onFocusChat: () => void, messages: any[] }) => {
  const [pos, setPos] = useState({ x: win.x, y: win.y });
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      drag
      dragMomentum={false}
      className="absolute bg-white/95 backdrop-blur-sm shadow-xl rounded-lg border border-slate-200 overflow-hidden pointer-events-auto"
      style={{ left: pos.x, top: pos.y, zIndex: 100 }}
    >
      <div className="bg-slate-50/50 p-1 flex items-center justify-between cursor-move gap-4 border-b border-slate-100">
        <div className="flex items-center gap-1.5 px-1">
          {win.type === 'translate' && <Globe size={10} className="text-blue-500" />}
          {win.type === 'definition' && <Search size={10} className="text-blue-500" />}
          {win.type === 'chat' && <MessageSquare size={10} className="text-blue-500" />}
          {win.type === 'note' && <StickyNote size={10} className="text-blue-500" />}
          {expanded && <span className="text-[8px] font-black text-slate-400 uppercase tracking-tighter">{win.title}</span>}
        </div>
        <div className="flex gap-0.5">
          <button onClick={() => setExpanded(!expanded)} className="p-0.5 hover:bg-slate-200 rounded text-slate-400">
            <Maximize2 size={8} />
          </button>
          <button onClick={onClose} className="p-0.5 hover:bg-red-100 text-red-500 rounded">
            <X size={8} />
          </button>
        </div>
      </div>
      <div className={cn("p-2 text-[10px] leading-tight text-slate-700", expanded ? "w-48" : "w-28")}>
        {win.type === 'translate' ? (
          <div className="flex flex-col">
             <div className="font-bold text-blue-600">okolní inteligence</div>
             {expanded && <div className="mt-1 text-[8px] text-slate-400">The literal translation of "ambient intelligence" into Czech.</div>}
          </div>
        ) : win.type === 'chat' ? (
          <div className="space-y-2">
            <div className="max-h-32 overflow-y-auto space-y-2">
              {messages.map((m: any, i: number) => (
                <div key={i} className={cn("p-1.5 rounded-lg", m.role === 'system' ? "bg-slate-100" : "bg-blue-50 text-blue-700 ml-4")}>
                  {m.content}
                </div>
              ))}
            </div>
            <button
              onClick={onFocusChat}
              className="w-full p-2 bg-slate-50 border border-slate-100 rounded-lg text-slate-400 flex items-center justify-between"
            >
              <span>Type a message...</span>
              <Send size={12} />
            </button>
          </div>
        ) : win.type === 'note' ? (
          <textarea
            className="w-full h-20 bg-transparent border-none focus:ring-0 p-0 text-[11px] resize-none"
            placeholder="Write a note..."
            defaultValue="Research ambient AI trends for the upcoming Q3 product presentation."
          />
        ) : win.content}
      </div>
    </motion.div>
  );
};
