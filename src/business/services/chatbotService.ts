import { MessageType } from '@business/types/chat';

/**
 * 챗봇 응답을 생성하는 서비스
 * 실제 환경에서는 API 호출 등으로 대체될 수 있습니다.
 */
export const generateBotResponse = async (userMessage: string): Promise<string> => {
  // 챗봇 응답을 시뮬레이션하기 위한 딜레이
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // 간단한 키워드 기반 응답
  const normalizedMessage = userMessage.toLowerCase();

  if (normalizedMessage.includes('안녕') || normalizedMessage.includes('hello')) {
    return '안녕하세요! 커뮤니티 채팅봇입니다. 무엇을 도와드릴까요?';
  }

  if (normalizedMessage.includes('회원가입') || normalizedMessage.includes('가입')) {
    return '회원가입은 상단 메뉴의 "회원가입" 버튼을 클릭하시면 진행하실 수 있습니다.';
  }

  if (normalizedMessage.includes('로그인') || normalizedMessage.includes('login')) {
    return '로그인은 우측 상단의 "로그인" 버튼을 통해 할 수 있습니다.';
  }

  if (normalizedMessage.includes('글') || normalizedMessage.includes('포스트') || normalizedMessage.includes('post')) {
    return '게시글은 "게시판" 메뉴에서 확인하실 수 있으며, 글 작성은 로그인 후 가능합니다.';
  }

  if (normalizedMessage.includes('도움') || normalizedMessage.includes('help')) {
    return '도움이 필요하시면 언제든지 저에게 물어보세요! 회원가입, 로그인, 글 작성 등에 대해 안내해 드릴 수 있습니다.';
  }

  // 기본 응답
  return '죄송합니다. 정확한 답변을 드리지 못했습니다. 조금 더 구체적인 질문을 해주시면 도움을 드릴 수 있을 것 같습니다.';
};

/**
 * 새 메시지 ID 생성
 */
export const generateMessageId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

/**
 * 사용자 메시지 생성
 */
export const createUserMessage = (content: string): MessageType => {
  return {
    id: generateMessageId(),
    content,
    sender: 'user',
    timestamp: Date.now(),
  };
};

/**
 * 봇 메시지 생성
 */
export const createBotMessage = (content: string): MessageType => {
  return {
    id: generateMessageId(),
    content,
    sender: 'bot',
    timestamp: Date.now(),
  };
};