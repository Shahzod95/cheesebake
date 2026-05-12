import { motion, useReducedMotion } from 'motion/react';
import { ReactNode } from 'react';
import { cn } from '../../lib/utils';

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  once?: boolean;
};

export function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.9,
  y = 24,
  once = true,
}: RevealProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : y, filter: reduce ? 'none' : 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once, margin: '-80px' }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

type RevealMaskProps = {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
};

export function RevealMask({
  text,
  className,
  delay = 0,
  stagger = 0.06,
  as = 'span',
}: RevealMaskProps) {
  const reduce = useReducedMotion();
  const Tag: any = motion[as];
  const words = text.split(' ');

  if (reduce) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag
      className={cn('inline-block', className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
      aria-label={text}
    >
      {words.map((word, wi) => (
        <span
          key={wi}
          className="inline-block overflow-hidden align-baseline"
          style={{ paddingBottom: '0.1em', marginBottom: '-0.1em' }}
        >
          <motion.span
            className="inline-block will-change-transform"
            variants={{
              hidden: { y: '110%' },
              visible: { y: '0%' },
            }}
            transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
            aria-hidden
          >
            {word}
            {wi < words.length - 1 && ' '}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
