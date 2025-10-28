
import { ReactNode, useEffect, useRef, useState } from 'react';

interface AnimationWrapperProps {
  children: ReactNode;
  type?: 'fade' | 'slide' | 'zoom' | 'blur-fade' | 'scale-up' | 'flip' | 'rotate-3d' | 'glitch' | 'ripple';
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
  className?: string;
}

export default function AnimationWrapper({
  children,
  type = 'fade',
  direction = 'up',
  delay = 0,
  duration = 700,
  className = '',
}: AnimationWrapperProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  const getAnimationClass = () => {
    const baseClass = 'transition-all';
    
    if (!isVisible) {
      switch (type) {
        case 'fade':
          return `${baseClass} opacity-0`;
        case 'slide':
          return `${baseClass} opacity-0 ${
            direction === 'up' ? 'translate-y-20' :
            direction === 'down' ? '-translate-y-20' :
            direction === 'left' ? 'translate-x-20' :
            '-translate-x-20'
          }`;
        case 'zoom':
          return `${baseClass} opacity-0 scale-50`;
        case 'blur-fade':
          return `${baseClass} opacity-0 blur-md`;
        case 'scale-up':
          return `${baseClass} opacity-0 scale-90`;
        case 'flip':
          return `${baseClass} opacity-0 rotate-y-90`;
        case 'rotate-3d':
          return `${baseClass} opacity-0 [transform:perspective(1000px)_rotateX(-45deg)]`;
        case 'glitch':
          return `${baseClass} opacity-0 skew-x-12`;
        case 'ripple':
          return `${baseClass} opacity-0 scale-0`;
        default:
          return `${baseClass} opacity-0`;
      }
    }

    return `${baseClass} opacity-100 translate-y-0 translate-x-0 scale-100 blur-0 rotate-0 skew-x-0 [transform:perspective(1000px)_rotateX(0deg)]`;
  };

  return (
    <div
      ref={ref}
      className={`${getAnimationClass()} ${className}`}
      style={{ transitionDuration: `${duration}ms` }}
    >
      {children}
    </div>
  );
}
