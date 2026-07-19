'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChatMessage } from '@/app/planner/types/planner';

interface ChatBubbleProps {
  message: ChatMessage;
}

const AI_AVATAR = (
  <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20">
    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3l14 9-14 9V3z" />
    </svg>
  </div>
);

/**
 * Renders a single conversational message bubble (user or AI).
 */
export function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {!isUser && <div className="mt-0.5">{AI_AVATAR}</div>}

      <div
        className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm font-medium leading-relaxed whitespace-pre-line shadow-sm ${
          isUser
            ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-tr-sm'
            : 'bg-white text-slate-800 border border-slate-100 rounded-tl-sm'
        }`}
      >
        {message.text}
      </div>
    </motion.div>
  );
}
