import { redirect } from 'next/navigation';

export default function NewAssistantChatPage() {
  // Generate a random mock ID for the new chat
  const newChatId = `chat_${Math.random().toString(36).substr(2, 9)}`;
  redirect(`/ai/assistant/${newChatId}`);
}
