/**
 * 메시지 발신자 타입
 */
export type SenderType = 'user' | 'bot';

/**
 * 채팅 메시지 타입
 */
export interface MessageType {
  id: string;
  content: string;
  sender: SenderType;
  timestamp: number;
}

/**
 * 채팅 상태 타입
 */
export interface ChatState {
  messages: MessageType[];
  isLoading: boolean;
  sendMessage: (content: string) => void;
}