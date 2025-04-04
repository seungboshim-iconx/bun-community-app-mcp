import { memo, useEffect, useRef } from 'react';

import { useChatStore } from '@stores/chatStore';
import { ChatMessage } from './ChatMessage';

/**
 * 채팅 메시지 목록 컴포넌트
 * 
 * 채팅 메시지들을 목록으로 보여주는 컴포넌트입니다.
 * 새 메시지가 추가될 때마다 자동으로 스크롤이 아래로 이동합니다.
 */
const ChatMessageList = memo(() => {
  const { messages, isLoading } = useChatStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 새 메시지가 추가되면 스크롤을 아래로 이동
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex h-full flex-col space-y-4 overflow-y-auto">
      {messages.length === 0 ? (
        <div className="flex h-full items-center justify-center">
          <p className="text-center text-muted-foreground">
            무엇이든 물어보세요!
          </p>
        </div>
      ) : (
        messages.map((message) => (
          <ChatMessage
            key={message.id}
            type={message.type}
            content={message.content}
            timestamp={message.timestamp}
          />
        ))
      )}
      
      {isLoading && (
        <ChatMessage
          type="bot"
          content="생각 중..."
          isLoading={true}
        />
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
});

ChatMessageList.displayName = 'ChatMessageList';

export { ChatMessageList };