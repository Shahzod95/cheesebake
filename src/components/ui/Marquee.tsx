import { ReactNode } from 'react';
import { cn } from '../../lib/utils';

export function Marquee({
  children,
  className,
  speed = 40,
}: {
  children: ReactNode;
  className?: string;
  speed?: number;
}) {
  return (
    <div className={cn('overflow-hidden whitespace-nowrap', className)}>
      <div
        className="inline-flex animate-marquee"
        style={{ animationDuration: `${speed}s` }}
      >
        <div className="inline-flex shrink-0 items-center">{children}</div>
        <div className="inline-flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
