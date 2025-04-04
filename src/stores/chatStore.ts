import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

export type ChatMessageType = 'user' | 'bot';

export interface ChatMessage {
  id: string;
  type: ChatMessageType;
  content: string;
  timestamp: Date;
}

interface ChatStore {
  messages: ChatMessage[];
  isLoading: boolean;
  sendMessage: (content: string) => Promise<void>;
  resetMessages: () => void;
}

/**
 * 챗봇 상태 관리 스토어
 * 
 * 메시지 전송, 조회, 로딩 상태 등을 관리합니다.
 */
export const useChatStore = create<ChatStore>((set, get) => ({
  messages: [],
  isLoading: false,
  
  sendMessage: async (content: string) => {
    // 사용자 메시지 추가
    const userMessage: ChatMessage = {
      id: uuidv4(),
      type: 'user',
      content,
      timestamp: new Date(),
    };
    
    set((state) => ({
      messages: [...state.messages, userMessage],
      isLoading: true,
    }));
    
    try {
      // API 호출 또는 메시지 처리 로직 (임시로 타임아웃 사용)
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // 봇 응답 추가 (실제로는 API 응답 사용)
      const botResponse = getBotResponse(content);
      const botMessage: ChatMessage = {
        id: uuidv4(),
        type: 'bot',
        content: botResponse,
        timestamp: new Date(),
      };
      
      set((state) => ({
        messages: [...state.messages, botMessage],
        isLoading: false,
      }));
    } catch (error) {
      // 오류 처리
      console.error('메시지 전송 중 오류 발생:', error);
      
      const errorMessage: ChatMessage = {
        id: uuidv4(),
        type: 'bot',
        content: '죄송합니다. 메시지 처리 중 오류가 발생했습니다.',
        timestamp: new Date(),
      };
      
      set((state) => ({
        messages: [...state.messages, errorMessage],
        isLoading: false,
      }));
    }
  },
  
  resetMessages: () => {
    set({ messages: [] });
  },
}));

/**
 * 간단한 봇 응답 생성 함수 (임시)
 * 
 * 실제 구현에서는 API 호출로 대체됩니다.
 */
function getBotResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase();
  
  if (lowerMessage.includes('안녕') || lowerMessage.includes('반가워')) {
    return '안녕하세요! 무엇을 도와드릴까요?';
  } else if (lowerMessage.includes('게시글') || lowerMessage.includes('글')) {
    return '게시글은 상단 메뉴의 "게시글" 또는 "글쓰기" 버튼을 통해 확인하고 작성할 수 있습니다.';
  } else if (lowerMessage.includes('질문') || lowerMessage.includes('문의')) {
    return '궁금한 점이 있으시면 언제든지 물어봐주세요. 최대한 답변해 드리겠습니다.';
  } else {
    return '더 자세한 내용을 알려주시면 도움을 드릴 수 있습니다.';
  }
}