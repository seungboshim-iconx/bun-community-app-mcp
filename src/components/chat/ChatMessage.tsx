import { format } from 'date-fns';
import { Loader2 } from 'lucide-react';
import { memo } from 'react';

import { cn } from '@utils/cn';
import { ChatMessageType } from '@stores/chatStore';

interface ChatMessageProps {
  /**
   * 메시지 타입 (사용자/봇)
   */
  type: ChatMessageType;
  
  /**
   * 메시지 내용
   */
  content: string;
  
  /**
   * 메시지 전송 시간
   */
  timestamp?: Date;
  
  /**
   * 로딩 상태 여부
   */
  isLoading?: boolean;
}

/**
 * 채팅 메시지 컴포넌트
 * 
 * 사용자 또는 봇의 메시지를 표시하는 컴포넌트입니다.
 * 타입에 따라 다른 스타일이 적용됩니다.
 */
const ChatMessage = memo(({
  type,
  content,
  timestamp,
  isLoading = false
}: ChatMessageProps) => {
  const isUser = type === 'user';
  
  return (
    <div className={cn(
      'flex items-end gap-2',
      isUser ? 'justify-end' : 'justify-start'
    )}>
      <div className={cn(
        'max-w-[80%] rounded-lg px-4 py-2',
        isUser 
          ? 'rounded-br-none bg-primary text-primary-foreground' 
          : 'rounded-bl-none bg-muted'
      )}>
        {isLoading ? (
          <div className="flex items-center space-x-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>{content}</span>
          </div>
        ) : (
          <p className="break-words">{content}</p>
        )}
      </div>
      
      {timestamp && (
        <time className="text-xs text-muted-foreground">
          {format(timestamp, 'HH:mm')}
        </time>
      )}
    </div>
  );
});

ChatMessage.displayName = 'ChatMessage';

export { ChatMessage };