'use client';

import React from 'react';
import { Sparkles, Edit2, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export interface ChatMessage {
  id: string;
  role: 'user' | 'ai' | 'thinking';
  text: string;
  timestamp: string | Date;
}

interface ConversationPanelProps {
  messages: ChatMessage[];
  children?: React.ReactNode;
  onEdit?: (id: string, newText: string) => void;
  onRetry?: (id: string) => void;
}

export function ConversationPanel({ messages, children, onEdit, onRetry }: ConversationPanelProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [editText, setEditText] = React.useState('');

  React.useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div ref={containerRef} className="flex-1 overflow-y-auto px-6 py-6 space-y-8 scrollbar-thin select-text">
      {messages.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center text-center p-8 mt-12 gap-4 text-slate-400 select-none"
        >
          <div className="w-12 h-12 rounded-full bg-slate-50 border border-black/[0.04] shadow-sm flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-indigo-500" />
          </div>
          <div className="space-y-1.5">
            <h4 className="text-sm font-medium text-slate-900 tracking-tight">What kind of trip are you planning?</h4>
            <p className="text-xs text-slate-500 font-medium">Tell VoyageAI your destination, dates, and preferences.</p>
          </div>
        </motion.div>
      ) : (
        <AnimatePresence initial={false}>
          {(messages ?? []).map((msg) => {
            const isAi = msg.role === 'ai';
            const isThinking = msg.role === 'thinking';
            const isUser = msg.role === 'user';

            return (
              <motion.div 
                key={msg.id} 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, type: "spring", bounce: 0.1 }}
                className={`flex gap-4 text-left ${isUser ? 'flex-row-reverse' : ''}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 ring-1 ring-indigo-500/20 shrink-0 mt-0.5 flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </div>
                )}

                <div className={`flex flex-col gap-1 max-w-[85%] ${isUser ? 'items-end' : 'items-start'}`}>
                  {isUser ? (
                    <div className="flex flex-col items-end gap-1 group/msg">
                      {editingId === msg.id ? (
                        <div className="flex flex-col items-end gap-2 w-full min-w-[250px]">
                          <textarea
                            className="w-full bg-white border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-800 resize-none shadow-sm"
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            rows={3}
                            autoFocus
                          />
                          <div className="flex gap-2">
                            <button onClick={() => setEditingId(null)} className="px-3 py-1.5 text-xs font-medium text-slate-500 hover:bg-slate-100 rounded-lg">Cancel</button>
                            <button 
                              onClick={() => {
                                if (onEdit) onEdit(msg.id, editText);
                                setEditingId(null);
                              }}
                              className="px-3 py-1.5 text-xs font-medium bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg shadow-sm"
                            >
                              Save & Submit
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <div className="opacity-0 group-hover/msg:opacity-100 flex items-center gap-1 transition-opacity">
                            {onEdit && (
                              <button onClick={() => { setEditingId(msg.id); setEditText(msg.text); }} className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 rounded-md transition-colors" title="Edit">
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                            {onRetry && (
                              <button onClick={() => onRetry(msg.id)} className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 rounded-md transition-colors" title="Retry">
                                <RotateCcw className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                          <div className="px-5 py-3 rounded-[24px] rounded-br-[8px] bg-slate-100 text-slate-900 border border-black/[0.03]">
                            <p className="text-sm font-medium leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                          </div>
                        </div>
                      )}
                      {!editingId && msg.timestamp && (
                        <span className="text-[10px] text-slate-400 font-medium px-1">
                          {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      )}
                    </div>
                  ) : (
                    <div className="pt-2 pb-1 text-slate-800 w-full">
                      {isThinking ? (
                        <div className="flex items-center gap-1.5 px-2 py-1">
                          <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                          <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                          <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" />
                        </div>
                      ) : (
                        <div className="flex flex-col items-start gap-1 w-full">
                          <div className="prose prose-sm max-w-none text-slate-800 prose-headings:font-bold prose-a:text-blue-600">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                              {msg.text}
                            </ReactMarkdown>
                          </div>
                          {msg.timestamp && (
                            <span className="text-[10px] text-slate-400 font-medium px-1 mt-1">
                              {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      )}
      {children}
    </div>
  );
}
