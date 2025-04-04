import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import ChatModal from './ChatModal';
import IconButton from '@components/ui/icon-button';

/**
 * 채팅봇 버튼 컴포넌트
 * 화면 오른쪽 하단에 고정되어 표시되며, 클릭 시 채팅 모달을 표시합니다.
 */
const ChatbotButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <IconButton
          onClick={openModal}
          className="bg-blue-500 hover:bg-blue-600 text-white shadow-lg"
          size="lg"
          aria-label="채팅봇 열기"
        >
          <MessageCircle size={24} />
        </IconButton>
      </div>

      {isOpen && <ChatModal onClose={closeModal} />}
    </>
  );
};

export default ChatbotButton;