# Bun Community App

간단한 커뮤니티 사이트 - Bun, React, TypeScript, Tailwind CSS 활용

## 특징

- Bun을 사용한 빠른 개발 환경
- React와 TypeScript를 이용한 타입 안전한 컴포넌트
- Tailwind CSS를 활용한 모던 UI
- 채팅봇 기능 구현

## 시작하기

### 사전 요구사항

- Bun 설치
- Node.js 18.0.0 이상

### 설치

```bash
# 의존성 설치
bun install
```

### 개발 서버 실행

```bash
bun run dev
```

## 폴더 구조

```
/src
  /assets       # 이미지 등 정적 파일
  /business     # 비즈니스 로직, 서비스, 타입 정의
  /components   # 재사용 가능한 UI 컴포넌트
  /pages        # 라우트와 연결된 페이지 컴포넌트
  /store        # 상태 관리 (Zustand)
  /utils        # 유틸리티 함수
```

## 기술 스택

- Bun
- React 19
- TypeScript
- Tailwind CSS
- React Router
- Zustand (상태 관리)
- React Query (서버 상태 관리)
- React Hook Form (폼 관리)
- Zod (데이터 유효성 검증)