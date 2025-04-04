import { Outlet, Link, useLocation } from 'react-router-dom';
import ChatbotButton from '@components/chat/ChatbotButton';

/**
 * 애플리케이션 루트 레이아웃
 * 모든 페이지에 공통으로 적용되는 레이아웃을 정의합니다.
 */
const RootLayout = () => {
  const location = useLocation();
  
  // 현재 경로에 따라 활성 메뉴 결정
  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* 헤더 */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          {/* 로고 */}
          <Link to="/" className="text-xl font-bold text-blue-600">
            Bun 커뮤니티
          </Link>
          
          {/* 네비게이션 메뉴 */}
          <nav className="hidden md:flex space-x-6">
            <Link
              to="/"
              className={`hover:text-blue-600 transition-colors ${
                isActive('/') ? 'text-blue-600 font-medium' : 'text-gray-600'
              }`}
            >
              홈
            </Link>
            <Link
              to="/posts"
              className={`hover:text-blue-600 transition-colors ${
                isActive('/posts') ? 'text-blue-600 font-medium' : 'text-gray-600'
              }`}
            >
              게시판
            </Link>
            <Link
              to="/write"
              className={`hover:text-blue-600 transition-colors ${
                isActive('/write') ? 'text-blue-600 font-medium' : 'text-gray-600'
              }`}
            >
              글쓰기
            </Link>
          </nav>
          
          {/* 로그인 버튼 */}
          <div>
            <button className="px-4 py-2 rounded border border-blue-500 text-blue-500 hover:bg-blue-50 transition-colors">
              로그인
            </button>
          </div>
        </div>
      </header>
      
      {/* 메인 콘텐츠 */}
      <main className="flex-1 container mx-auto px-4 py-6">
        <Outlet />
      </main>
      
      {/* 푸터 */}
      <footer className="bg-gray-100 border-t py-6">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© 2025 Bun 커뮤니티. All rights reserved.</p>
        </div>
      </footer>
      
      {/* 채팅봇 버튼 */}
      <ChatbotButton />
    </div>
  );
};

export default RootLayout;