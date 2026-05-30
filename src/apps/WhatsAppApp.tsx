import React from 'react';
import { usePhone } from '../hooks/usePhone';
import { Phone, Video, MoreVertical, Search, CheckCheck } from 'lucide-react';

export const WhatsAppApp: React.FC = () => {
  const chats = [
    { id: 1, name: 'Product Team', msg: 'The new overlay looks amazing!', time: '9:41', unread: 2 },
    { id: 2, name: 'John Doe', msg: 'Can you translate that document?', time: '9:30', unread: 0 },
    { id: 3, name: 'Alice Smith', msg: 'Definition of ambient AI?', time: 'Yesterday', unread: 0 },
  ];

  return (
    <div className="h-full bg-white flex flex-col overflow-y-auto">
      {/* Header */}
      <div className="bg-[#008069] text-white p-4 pt-10 pb-4 shrink-0">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-bold text-xl">WhatsApp</h1>
          <div className="flex gap-6">
            <Search size={20} />
            <MoreVertical size={20} />
          </div>
        </div>
        <div className="flex justify-around text-xs font-bold uppercase">
          <div className="pb-2 border-b-2 border-white">Chats</div>
          <div className="pb-2 opacity-70">Status</div>
          <div className="pb-2 opacity-70">Calls</div>
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1">
        {chats.map(chat => (
          <div key={chat.id} className="flex gap-4 p-4 hover:bg-slate-50 transition-colors">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-200 border shrink-0">
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${chat.name}`} alt="avatar" />
            </div>
            <div className="flex-1 border-b pb-4 flex flex-col justify-center">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-sm">{chat.name}</span>
                <span className={`text-[10px] ${chat.unread > 0 ? 'text-green-500 font-bold' : 'text-slate-400'}`}>
                  {chat.time}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1">
                  <CheckCheck size={14} className="text-blue-400" />
                  <span className="text-xs text-slate-500 line-clamp-1">{chat.msg}</span>
                </div>
                {chat.unread > 0 && (
                  <div className="bg-green-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {chat.unread}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
