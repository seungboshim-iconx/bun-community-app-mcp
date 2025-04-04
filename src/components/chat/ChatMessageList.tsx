import { useEffect, useRef } from 'react';
import { useChatStore } from '@store/stores/useChatStore';
import ChatMessage from './ChatMessage';

/**
 * 채팅 메시지 목록 컴포넌트
 * 대화 내용을 표시하고 자동으로 스크롤을 최신 메시지로 이동시킵니다.
 */
const ChatMessageList = () => {
  const messages = useChatStore((state) => state.messages);
  const isLoading = useChatStore((state) => state.isLoading);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 새 메시지가 추가되면 스크롤을 아래로 이동
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // 메시지가 없을 때 초기 메시지 표시
  if (messages.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        <p>안녕하세요! 무엇을 도와드릴까요?</p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} />
      ))}
      
      {/* 로딩 표시 */}
      {isLoading && (
        <div className="flex items-center gap-2 text-gray-500">
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-300"></div>
        </div>
      )}
      
      {/* 스크롤 기준점 */}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessageList;