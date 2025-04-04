import { memo, useCallback, useState } from 'react';
import { MessageCircle } from 'lucide-react';

import { IconButton } from '@components/ui/IconButton';
import { ChatModal } from './ChatModal';

/**
 * 챗봇 버튼 컴포넌트
 * 
 * 페이지 우측 하단에 위치하는 챗봇 버튼입니다.
 * 클릭 시 챗봇 모달이 열립니다.
 */
const ChatbotButton = memo(() => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <IconButton 
          onClick={handleOpen} 
          aria-label="챗봇 열기"
          variant="primary"
          size="lg"
        >
          <MessageCircle className="h-6 w-6" />
        </IconButton>
      </div>
      
      {isOpen && <ChatModal onClose={handleClose} />}
    </>
  );
});

ChatbotButton.displayName = 'ChatbotButton';

export { ChatbotButton };