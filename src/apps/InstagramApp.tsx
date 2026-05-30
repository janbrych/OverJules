import React from 'react';
import { usePhone } from '../hooks/usePhone';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Camera } from 'lucide-react';

export const InstagramApp: React.FC = () => {
  const posts = [
    {
      id: 1,
      user: 'design_daily',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
      image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=400',
      likes: '1,234',
      caption: 'The future of interfaces is invisible. #ux #ai #design'
    },
    {
      id: 2,
      user: 'tech_crunch',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aria',
      image: 'https://images.unsplash.com/photo-1620712943543-bcc4638ef80d?auto=format&fit=crop&q=80&w=400',
      likes: '856',
      caption: 'Overlay AI raises $50M to redefine ambient intelligence.'
    }
  ];

  return (
    <div className="h-full bg-white flex flex-col overflow-y-auto">
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b sticky top-0 bg-white z-10">
        <h1 className="font-bold text-xl italic tracking-tighter">Instagram</h1>
        <div className="flex gap-4">
          <Heart size={24} />
          <Send size={24} />
        </div>
      </div>

      {/* Stories */}
      <div className="flex gap-4 p-4 overflow-x-auto border-b shrink-0">
        {[1,2,3,4,5].map(i => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div className="w-16 h-16 rounded-full p-0.5 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600">
               <div className="w-full h-full rounded-full border-2 border-white overflow-hidden bg-slate-100">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} alt="story" />
               </div>
            </div>
            <span className="text-[10px] text-slate-500">user_{i}</span>
          </div>
        ))}
      </div>

      {/* Posts */}
      <div className="flex-1">
        {posts.map(post => (
          <div key={post.id} className="mb-4">
            <div className="p-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-100 border">
                  <img src={post.avatar} alt="avatar" />
                </div>
                <span className="text-xs font-bold">{post.user}</span>
              </div>
              <MoreHorizontal size={16} />
            </div>
            <div className="aspect-square bg-slate-100 overflow-hidden">
               <img src={post.image} alt="post" className="w-full h-full object-cover" />
            </div>
            <div className="p-3 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex gap-4">
                  <Heart size={22} />
                  <MessageCircle size={22} />
                  <Send size={22} />
                </div>
                <Bookmark size={22} />
              </div>
              <div className="text-xs font-bold">{post.likes} likes</div>
              <div className="text-xs leading-snug">
                <span className="font-bold mr-2">{post.user}</span>
                {post.caption}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
