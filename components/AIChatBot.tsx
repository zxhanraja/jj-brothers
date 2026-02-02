
import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Bot, User, Loader2 } from 'lucide-react';
import { getAIChatResponse } from '../services/gemini';

const AIChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model', parts: string }[]>([
    { role: 'model', parts: "Namaste! I'm JJ Brothers AI. How can I help? (Hindi/Bengali/English...)" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', parts: userMsg }]);
    setIsLoading(true);

    const response = await getAIChatResponse(messages, userMsg);
    
    setMessages(prev => [...prev, { role: 'model', parts: response || "Something went wrong. Try again." }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-4 right-4 z-[9999]">
      {/* Brand-Themed Cute Robot Floating Button */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="relative group w-14 h-14 flex items-center justify-center transition-all duration-500 hover:scale-110 active:scale-95"
        >
          <div className="absolute inset-0 bg-blue-900 rounded-full animate-ping opacity-20"></div>
          <div className="absolute inset-0 bg-blue-950 rounded-2xl shadow-xl border border-white/10 transition-all group-hover:rotate-3 shadow-blue-900/20"></div>
          <div className="relative z-10 flex items-center justify-center">
            <Bot className="w-7 h-7 text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.4)]" />
          </div>
          <div className="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-blue-950 rounded-full"></div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-[85vw] sm:w-[340px] h-[450px] sm:h-[520px] bg-white rounded-[2rem] shadow-2xl border border-slate-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-8 fade-in duration-300">
          {/* Header - Fixed Z-index and Hitbox */}
          <div className="bg-blue-900 p-4 text-white flex items-center justify-between relative overflow-hidden shrink-0">
            {/* Background Decoration - Added pointer-events-none to prevent blocking clicks */}
            <div className="absolute top-0 right-0 p-12 bg-white/5 rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none z-0"></div>
            
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-9 h-9 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20 shadow-inner">
                <Bot className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <h3 className="text-[10px] font-black uppercase tracking-widest leading-none">JJ Buddy</h3>
                <div className="flex items-center gap-1 mt-1">
                  <span className="w-1 h-1 bg-emerald-400 rounded-full"></span>
                  <p className="text-[8px] font-bold text-blue-100 uppercase tracking-widest">Global Support</p>
                </div>
              </div>
            </div>

            {/* Close Button - Increased z-index and padding for reliability */}
            <button 
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }} 
              className="relative z-20 p-2 -mr-1 hover:bg-white/10 rounded-xl transition-all flex items-center justify-center active:scale-90"
              aria-label="Close Chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Container */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-slate-50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}>
                <div className={`max-w-[90%] flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm ${msg.role === 'user' ? 'bg-amber-100 text-amber-600' : 'bg-blue-900 text-amber-500'}`}>
                    {msg.role === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                  </div>
                  <div className={`p-3 rounded-xl text-[11px] sm:text-xs font-medium leading-relaxed shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-blue-900 text-white rounded-tr-none' 
                      : 'bg-white text-slate-700 rounded-tl-none border border-slate-100'
                  }`}>
                    {msg.parts}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex gap-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-900 flex items-center justify-center">
                    <Loader2 className="w-3.5 h-3.5 text-amber-500 animate-spin" />
                  </div>
                  <div className="p-3 bg-white border border-slate-100 rounded-xl rounded-tl-none shadow-xs">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-amber-500/50 rounded-full animate-bounce"></span>
                      <span className="w-1.5 h-1.5 bg-amber-500/50 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-100 shrink-0">
            <div className="relative flex items-center gap-2">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 focus:outline-none focus:border-blue-900 text-xs font-bold transition-colors"
              />
              <button 
                type="submit"
                disabled={isLoading || !input.trim()}
                className="w-10 h-10 bg-blue-900 text-white rounded-xl flex items-center justify-center hover:bg-slate-900 transition-all disabled:opacity-20 flex-shrink-0 active:scale-90"
              >
                <Send className="w-4 h-4 text-amber-500" />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AIChatBot;
