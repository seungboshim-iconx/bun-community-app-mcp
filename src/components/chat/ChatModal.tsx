import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import IconButton from '@components/ui/icon-button';
import ChatMessageList from './ChatMessageList';
import ChatInput from './ChatInput';
import { useChatStore } from '@store/stores/useChatStore';

interface ChatModalProps {
  onClose: () => void;
}

/**
 * 채팅 모달 컴포넌트
 * 챗봇 인터페이스를 제공하는 모달 창입니다.
 */
const ChatModal = ({ onClose }: ChatModalProps) => {
  const isLoading = useChatStore((state) => state.isLoading);
  const modalRef = useRef<HTMLDivElement>(null);

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

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl w-full max-w-md h-[500px] flex flex-col overflow-hidden"
      >
        {/* 모달 헤더 */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">커뮤니티 도우미</h2>
          <IconButton onClick={onClose} size="sm" variant="ghost" aria-label="닫기">
            <X size={20} />
          </IconButton>
        </div>

        {/* 메시지 목록 */}
        <div className="flex-1 overflow-y-auto">
          <ChatMessageList />
        </div>

        {/* 입력 폼 */}
        <div className="border-t p-4">
          <ChatInput disabled={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default ChatModal;