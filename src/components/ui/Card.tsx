import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function Card({ children, className = '', id }: CardProps) {
  return (
    <motion.div
      id={id}
      whileHover={{ y: -2 }}
      className={`rounded-lg border border-white/10 bg-white/[0.065] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_18px_60px_rgba(0,0,0,0.22)] backdrop-blur-2xl transition-colors hover:border-cyan-200/20 ${className}`}
    >
      {children}
    </motion.div>
  );
}
