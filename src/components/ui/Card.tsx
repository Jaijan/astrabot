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
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55 }}
      className={`rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_0_80px_rgba(93,220,255,0.08)] ${className}`}
    >
      {children}
    </motion.div>
  );
}
