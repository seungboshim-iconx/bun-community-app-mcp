import * as React from 'react';
import { cn } from '@utils/cn';

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * 버튼 크기
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * 버튼 변형
   */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
}

/**
 * 아이콘 버튼 컴포넌트
 * 
 * 다양한 크기와 스타일을 지원하는 아이콘 전용 버튼입니다.
 */
const IconButton = React.memo(
  React.forwardRef<HTMLButtonElement, IconButtonProps>(
    (
      {
        className,
        size = 'md',
        variant = 'primary',
        type = 'button',
        ...props
      },
      ref
    ) => {
      return (
        <button
          type={type}
          className={cn(
            'inline-flex items-center justify-center rounded-full',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
            'disabled:pointer-events-none disabled:opacity-50',
            {
              // 크기별 스타일
              'h-8 w-8': size === 'sm',
              'h-10 w-10': size === 'md',
              'h-12 w-12': size === 'lg',
              
              // 변형별 스타일
              'bg-primary text-primary-foreground hover:bg-primary/90': variant === 'primary',
              'bg-secondary text-secondary-foreground hover:bg-secondary/80': variant === 'secondary',
              'border border-input bg-background hover:bg-accent hover:text-accent-foreground': variant === 'outline',
              'hover:bg-accent hover:text-accent-foreground': variant === 'ghost',
            },
            className
          )}
          ref={ref}
          {...props}
        />
      );
    }
  )
);

IconButton.displayName = 'IconButton';

export { IconButton };