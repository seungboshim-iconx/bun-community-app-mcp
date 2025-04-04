import { useState } from 'react';
import { Send } from 'lucide-react';
import { useChatStore } from '@store/stores/useChatStore';
import IconButton from '@components/ui/icon-button';

interface ChatInputProps {
  disabled?: boolean;
}

/**
 * 채팅 입력 컴포넌트
 * 사용자가 메시지를 입력하고 전송할 수 있는 폼을 제공합니다.
 */
const ChatInput = ({ disabled = false }: ChatInputProps) => {
  const [message, setMessage] = useState('');
  const sendMessage = useChatStore((state) => state.sendMessage);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (message.trim()) {
      sendMessage(message.trim());
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        disabled={disabled}
        placeholder="메시지를 입력하세요..."
        className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
      />
      <IconButton 
        type="submit" 
        disabled={disabled || !message.trim()} 
        className="bg-blue-500 hover:bg-blue-600 text-white disabled:bg-gray-400"
        aria-label="전송"
      >
        <Send size={16} />
      </IconButton>
    </form>
  );
};

export default ChatInput;