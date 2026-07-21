import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import celebrating from '../../images/celebrating.png';
import confident from '../../images/confident.png';
import confused from '../../images/confused.png';
import curious from '../../images/curious.png';
import excited from '../../images/excited.png';
import happy from '../../images/happy.png';
import iKnowIt from '../../images/i_know_it.png';
import neutralIdle from '../../images/neutral_idle.png';
import processing from '../../images/processing.png';
import sad from '../../images/sad.png';
import surprised from '../../images/surprised.png';
import thinking from '../../images/thinking.png';

const expressions = {
  idle: neutralIdle,
  happy,
  thinking,
  curious,
  processing,
  confident,
  excited,
  surprised,
  sad,
  confused,
  celebrating,
  iKnowIt
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
      className={`robot-orbit relative ${small ? 'h-28 w-28' : 'h-52 w-52 sm:h-60 sm:w-60 xl:h-72 xl:w-72'} cursor-pointer`}
      style={{ transformStyle: 'preserve-3d' }}
      animate={{
        y: [0, -8, 0],
        rotateX: pointer.y * -4,
        rotateY: pointer.x * 7
      }}
      transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
      whileHover={{ scale: 1.035, filter: 'brightness(1.1)' }}
    >
      <div className="absolute inset-[8%] rounded-full bg-cyan-300/[0.12] blur-3xl" />
      <motion.div
        className="absolute inset-[18%] rounded-full border border-cyan-200/15"
        animate={{ rotate: 360 }}
        transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute left-[18%] right-[18%] top-[30%] h-px bg-cyan-200/45 shadow-[0_0_20px_rgba(125,220,255,0.55)]"
        animate={{ opacity: [0, 0.75, 0], y: [-24, 54, -24] }}
        transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.img
        src={expressions[expression]}
        alt="Astrabot"
        className={`relative z-10 ${small ? 'h-28 w-28' : 'h-52 w-52 sm:h-60 sm:w-60 xl:h-72 xl:w-72'} object-contain drop-shadow-[0_0_34px_rgba(93,220,255,0.38)]`}
        animate={{ scale: location.pathname === '/' ? [1, 1.018, 1] : [1, 1.01, 1] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[17%] left-1/2 h-1.5 w-16 -translate-x-1/2 rounded-full bg-cyan-200/30 blur-md"
        animate={{ opacity: [0.25, 0.7, 0.25], scaleX: [0.76, 1.12, 0.76] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.div>
  );
}
