'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { MessageSquare, Clock } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';

interface ChatHistoryItem {
  id: string;
  title: string;
  updatedAt: string;
  snippet?: string;
}

interface RecentConversationsProps {
  conversations: ChatHistoryItem[];
  loading: boolean;
  error: boolean;
}

/**
 * Lists recent AI conversational threads with date tags.
 */
export function RecentConversations({ conversations, loading, error }: RecentConversationsProps) {
  const router = useRouter();

  return (
    <div className="space-y-4 text-left">
      <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Recent Conversations</h3>

      {loading ? (
        <div className="space-y-2.5">
          <Skeleton variant="text" className="h-10" />
          <Skeleton variant="text" className="h-10" />
        </div>
      ) : error || conversations.length === 0 ? (
        <EmptyState
          icon={<MessageSquare className="w-8 h-8 text-slate-300" />}
          title="No recent chats"
          description="Your conversational itinerary designs will appear here."
        />
      ) : (
        <div className="grid grid-cols-1 gap-2.5">
          {conversations.slice(0, 4).map((chat) => (
            <Card
              key={chat.id}
              onClick={() => router.push(`/planner?chatId=${chat.id}`)}
              className="p-3.5 hover:border-slate-350:border-slate-700/80 cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99]"
            >
              <div className="space-y-1">
                <h4 className="text-xs font-black text-slate-900 leading-tight truncate">
                  {chat.title}
                </h4>
                <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-400">
                  <Clock className="w-3 h-3 text-slate-350" />
                  <span>
                    {new Date(chat.updatedAt).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
