import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * 클래스명 병합 유틸리티 함수
 * 
 * clsx와 tailwind-merge를 사용하여 클래스명을 효율적으로 병합합니다.
 * 
 * @example
 * cn('px-2 py-1', condition && 'bg-blue-500', 'text-white')
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}