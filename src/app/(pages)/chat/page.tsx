'use client';

import { useState } from 'react';
import { aiChatbotForEmotionRegulation } from '@/ai/flows/ai-chatbot-emotion-regulation';
import { ChatInput } from '@/components/chat/chat-input';
import { ChatMessages } from '@/components/chat/chat-messages';
import { Card, CardContent } from '@/components/ui/card';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        "Hello! I'm here to help you navigate your feelings. Feel free to share what's on your mind.",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (messageContent: string) => {
    if (!messageContent.trim()) return;

    const userMessage: Message = { role: 'user', content: messageContent };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const { response } = await aiChatbotForEmotionRegulation({ message: messageContent });
      const assistantMessage: Message = { role: 'assistant', content: response };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: "I'm sorry, I encountered an error. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-full flex-col p-4 md:p-6">
       <Card className="flex flex-1 flex-col overflow-hidden h-full">
        <CardContent className="flex-1 overflow-y-auto p-4 md:p-6">
          <ChatMessages messages={messages} isLoading={isLoading} />
        </CardContent>
        <div className="border-t bg-background px-4 py-3">
          <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
        </div>
      </Card>
    </div>
  );
}
