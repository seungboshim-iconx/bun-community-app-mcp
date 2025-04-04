import { memo, useCallback, useState } from 'react';
import { Send } from 'lucide-react';

import { IconButton } from '@components/ui/IconButton';
import { useChatStore } from '@stores/chatStore';

interface ChatInputProps {
  /**
   * 비활성화 여부
   */
  disabled?: boolean;
}

/**
 * 챗봇 입력 컴포넌트
 * 
 * 사용자가 메시지를 입력하고 전송할 수 있는 폼입니다.
 */
const ChatInput = memo(({ disabled = false }: ChatInputProps) => {
  const [message, setMessage] = useState('');
  const { sendMessage } = useChatStore();

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      
      // 공백만 있는 메시지는 전송하지 않음
      const trimmedMessage = message.trim();
      if (!trimmedMessage) return;
      
      sendMessage(trimmedMessage);
      setMessage('');
    },
    [message, sendMessage]
  );

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="메시지를 입력하세요..."
        className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        disabled={disabled}
      />
      <IconButton
        type="submit"
        variant="primary"
        size="sm"
        disabled={disabled || !message.trim()}
        aria-label="메시지 보내기"
      >
        <Send className="h-4 w-4" />
      </IconButton>
    </form>
  );
});

ChatInput.displayName = 'ChatInput';

export { ChatInput };