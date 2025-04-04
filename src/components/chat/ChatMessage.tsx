import React from 'react';
import { format } from 'date-fns';
import { MessageType } from '@business/types/chat';

interface ChatMessageProps {
  message: MessageType;
}

/**
 * 채팅 메시지 컴포넌트
 * 단일 메시지를 표시하며, 사용자와 봇 메시지를 구분하여 스타일링합니다.
 */
const ChatMessage = React.memo(({ message }: ChatMessageProps) => {
  const { content, sender, timestamp } = message;
  const isUser = sender === 'user';
  const formattedTime = format(new Date(timestamp), 'HH:mm');

  return (
    <div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[80%] rounded-lg px-4 py-2 ${
          isUser
            ? 'bg-blue-500 text-white rounded-br-none'
            : 'bg-gray-100 text-gray-800 rounded-bl-none'
        }`}
      >
        <div className="text-sm">{content}</div>
        <div
          className={`text-xs mt-1 ${
            isUser ? 'text-blue-100' : 'text-gray-500'
          }`}
        >
          {formattedTime}
        </div>
      </div>
    </div>
  );
});

ChatMessage.displayName = 'ChatMessage';

export default ChatMessage;