import { memo, useEffect, useRef } from 'react';
import { X } from 'lucide-react';

import { IconButton } from '@components/ui/IconButton';
import { useChatStore } from '@stores/chatStore';
import { ChatInput } from './ChatInput';
import { ChatMessageList } from './ChatMessageList';

interface ChatModalProps {
  /**
   * 모달 닫기 이벤트 핸들러
   */
  onClose: () => void;
}

/**
 * 챗봇 모달 컴포넌트
 * 
 * 챗봇 버튼 클릭 시 나타나는 모달입니다.
 * 메시지 목록과 입력 폼을 포함합니다.
 */
const ChatModal = memo(({ onClose }: ChatModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { isLoading } = useChatStore();

  // 모달 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  // ESC 키 눌렀을 때 닫기
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div 
        ref={modalRef}
        className="relative flex h-[600px] w-[400px] flex-col rounded-lg bg-background shadow-lg"
      >
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-lg font-medium">커뮤니티 도우미</h2>
          <IconButton
            onClick={onClose}
            variant="ghost"
            size="sm"
            aria-label="닫기"
          >
            <X className="h-4 w-4" />
          </IconButton>
        </div>

        <div className="flex-1 overflow-hidden p-4">
          <ChatMessageList />
        </div>

        <div className="border-t p-4">
          <ChatInput disabled={isLoading} />
        </div>
      </div>
    </div>
  );
});

ChatModal.displayName = 'ChatModal';

export { ChatModal };