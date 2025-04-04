import React from 'react';
import { cn } from '@utils/cn';

type IconButtonSize = 'sm' | 'md' | 'lg';
type IconButtonVariant = 'default' | 'outline' | 'ghost';

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: IconButtonSize;
  variant?: IconButtonVariant;
  children: React.ReactNode;
}

/**
 * 아이콘 버튼 컴포넌트
 * 다양한 크기와 스타일 옵션을 제공하는 아이콘 전용 버튼입니다.
 */
const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      children,
      className,
      size = 'md',
      variant = 'default',
      type = 'button',
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          'inline-flex items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-colors',
          // 크기 변형
          {
            'p-1.5': size === 'sm',
            'p-2': size === 'md',
            'p-3': size === 'lg',
          },
          // 스타일 변형
          {
            'bg-gray-200 hover:bg-gray-300 text-gray-700': variant === 'default',
            'border border-gray-300 hover:bg-gray-100 text-gray-700': variant === 'outline',
            'hover:bg-gray-100 text-gray-700': variant === 'ghost',
          },
          // 비활성화 상태
          {
            'opacity-50 cursor-not-allowed': props.disabled,
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';

export default IconButton;