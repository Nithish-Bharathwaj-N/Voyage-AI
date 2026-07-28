'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { io, Socket } from 'socket.io-client';
import { AssistantLayout } from '@/components/ai/assistant/AssistantLayout';
import { UserBubble, AssistantBubble, TypingIndicator } from '@/components/ai/assistant/AssistantChat';
import { assistantRepository } from '@/lib/ai/assistant/AssistantRepository';
import type { AssistantMessage } from '@/lib/ai/assistant/types';
import type { WorkflowState } from '@/lib/ai/workflows/types';

export default function AssistantChatPage() {
  const pathname = usePathname();
  const sessionId = pathname?.split('/').pop() || '';
  
  const [messages, setMessages] = useState<AssistantMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [status, setStatus] = useState<WorkflowState>('IDLE');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (sessionId) {
      const session = assistantRepository.getOrCreateSession(sessionId);
      setTimeout(() => {
        setMessages(session.memory.getAllMessages());
      }, 0);

      const socket = io(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/ai', { transports: ['websocket'] });
      socketRef.current = socket;

      socket.on('workflow_event', (data: { sessionId: string; state: WorkflowState }) => {
        if (data.sessionId === sessionId) setStatus(data.state);
      });

      socket.on('stream_token', (data: { sessionId: string; token: string }) => {
        if (data.sessionId === sessionId) {
          // Stream logic could go here
        }
      });

      socket.on('chat_completed', (data: { sessionId: string; response: string }) => {
        if (data.sessionId === sessionId) {
          const session = assistantRepository.getSession(sessionId);
          if (session) {
            // For now, mock storing it since backend hasn't hooked up full DB yet
            const astMsg: AssistantMessage = {
              id: `msg_${Date.now()}`,
              type: 'Assistant',
              content: data.response,
              timestamp: new Date().toISOString(),
            };
            session.memory.addMessage(astMsg);
            setMessages(session.memory.getAllMessages());
            setStatus('COMPLETED');
          }
        }
      });

      socket.on('workflow_error', (data: { sessionId: string; error: string }) => {
        if (data.sessionId === sessionId) {
          setStatus('FAILED');
          console.error('Workflow error:', data.error);
        }
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [sessionId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || status !== 'IDLE' && status !== 'COMPLETED' && status !== 'FAILED') return;

    const userText = inputValue.trim();
    setInputValue('');
    
    const userMsg: AssistantMessage = {
      id: `tmp_${Date.now()}`,
      type: 'User',
      content: userText,
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, userMsg]);
    
    const session = assistantRepository.getSession(sessionId);
    if (session) session.memory.addMessage(userMsg);

    if (socketRef.current) {
      setStatus('VALIDATING');
      socketRef.current.emit('assistant_chat', {
        sessionId,
        message: userText,
        context: {
          command: 'Unknown',
          messages: session?.memory.getAllMessages() || [],
          planModified: false
        }
      });
    }
  };

  const isGenerating = !['IDLE', 'COMPLETED', 'FAILED'].includes(status);

  return (
    <AssistantLayout activeId={sessionId}>
      <div className="flex flex-col h-full bg-zinc-900">
        
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
          <div className="max-w-3xl mx-auto flex flex-col">
            {messages.length === 0 && (
              <div className="flex items-center justify-center h-64 text-zinc-500">
                <p>Start chatting to modify your trip plan...</p>
              </div>
            )}
            
            {messages.map(msg => (
              msg.type === 'User' 
                ? <UserBubble key={msg.id} message={msg} />
                : <AssistantBubble key={msg.id} message={msg} />
            ))}
            
            {isGenerating && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 bg-zinc-950 border-t border-zinc-800 shrink-0">
          <div className="max-w-3xl mx-auto">
            {isGenerating && (
              <div className="text-xs text-blue-400 mb-2 font-medium tracking-wide">
                Status: {status}
              </div>
            )}
            <form onSubmit={handleSubmit} className="relative">
              <input 
                type="text" 
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:border-blue-500 text-white placeholder-zinc-500"
                placeholder="Ask me to move a museum, find cheaper hotels, or add a day..."
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                disabled={isGenerating}
              />
              <button 
                type="submit"
                disabled={!inputValue.trim() || isGenerating}
                className="absolute right-2 top-2 p-2 bg-blue-600 rounded-lg hover:bg-blue-500 disabled:opacity-50 disabled:hover:bg-blue-600 transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
              </button>
            </form>
            <div className="flex justify-center mt-3 text-[10px] text-zinc-500 space-x-4">
              <span>Press ↵ to send</span>
              <span>AI can make mistakes. Verify important plans.</span>
            </div>
          </div>
        </div>
      </div>
    </AssistantLayout>
  );
}
