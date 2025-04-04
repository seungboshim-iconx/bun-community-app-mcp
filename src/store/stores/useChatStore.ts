import { create } from 'zustand';
import { 
  generateBotResponse, 
  createUserMessage, 
  createBotMessage 
} from '@business/services/chatbotService';
import { ChatState } from '@business/types/chat';

/**
 * 채팅 상태 관리를 위한 Zustand 스토어
 */
export const useChatStore = create<ChatState>((set, get) => ({
  messages: [],
  isLoading: false,

  /**
   * 사용자 메시지 전송 및 봇 응답 처리
   */
  sendMessage: async (content: string) => {
    // 사용자 메시지 추가
    const userMessage = createUserMessage(content);
    set((state) => ({
      messages: [...state.messages, userMessage],
      isLoading: true,
    }));

    try {
      // 봇 응답 생성
      const botResponse = await generateBotResponse(content);
      const botMessage = createBotMessage(botResponse);
      
      // 봇 메시지 추가
      set((state) => ({
        messages: [...state.messages, botMessage],
        isLoading: false,
      }));
    } catch (error) {
      // 오류 처리
      const errorMessage = createBotMessage(
        '죄송합니다. 응답을 처리하는 중 오류가 발생했습니다.'
      );
      
      set((state) => ({
        messages: [...state.messages, errorMessage],
        isLoading: false,
      }));
      
      console.error('챗봇 응답 오류:', error);
    }
  },
}));