import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const expressions = {
  idle: '/images/neutral_idle.png',
  happy: '/images/happy.png',
  thinking: '/images/thinking.png',
  curious: '/images/curious.png',
  processing: '/images/processing.png',
  confident: '/images/confident.png',
  excited: '/images/excited.png',
  surprised: '/images/surprised.png',
  sad: '/images/sad.png',
  confused: '/images/confused.png',
  celebrating: '/images/celebrating.png',
  iKnowIt: '/images/i_know_it.png'
};

interface RobotProps {
  expression?: keyof typeof expressions;
  small?: boolean;
}

export default function Robot({ expression = 'idle', small = false }: RobotProps) {
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const location = useLocation();

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      setPointer({ x: event.clientX / window.innerWidth - 0.5, y: event.clientY / window.innerHeight - 0.5 });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <motion.div
      className={`relative ${small ? 'h-32 w-32' : 'h-64 w-64'} cursor-pointer`}
      animate={{ y: [0, -12, 0], rotate: [0, pointer.x * 2, 0] }}
      transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
      whileHover={{ scale: 1.04, filter: 'brightness(1.08)' }}
    >
      <div className="absolute inset-0 rounded-full bg-cyan-400/10 blur-3xl" />
      <motion.img
        src={expressions[expression]}
        alt="Astrabot"
        className={`${small ? 'h-32 w-32' : 'h-64 w-64'} object-contain drop-shadow-[0_0_40px_rgba(93,220,255,0.4)]`}
        animate={{ scale: location.pathname === '/' ? [1, 1.015, 1] : 1 }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.div>
  );
}
