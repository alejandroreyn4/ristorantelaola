import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

const MagneticCursor: React.FC = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [isMagnetic, setIsMagnetic] = useState(false);
  const [magneticPosition, setMagneticPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (isMagnetic) return;
      cursorX.set(e.clientX - 15);
      cursorY.set(e.clientY - 15);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const magneticElement = target.closest('.magnetic') as HTMLElement;

      if (magneticElement) {
        setIsMagnetic(true);
        const rect = magneticElement.getBoundingClientRect();
        setMagneticPosition({
          x: rect.left + rect.width / 2 - 20, // 20 is half of the expanded size
          y: rect.top + rect.height / 2 - 20,
        });
        cursorX.set(rect.left + rect.width / 2 - 20);
        cursorY.set(rect.top + rect.height / 2 - 20);
      } else {
        setIsMagnetic(false);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('.magnetic')) {
        setIsMagnetic(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, [isMagnetic, cursorX, cursorY]);

  return (
    <motion.div
      className="hidden lg:flex fixed top-0 left-0 z-[9999] pointer-events-none items-center justify-center rounded-full border border-white mix-blend-difference"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        width: isMagnetic ? 40 : 30,
        height: isMagnetic ? 40 : 30,
        backgroundColor: isMagnetic ? 'rgba(255, 255, 255, 0.5)' : 'transparent',
      }}
    >
      <div className="w-1.5 h-1.5 bg-white rounded-full" />
    </motion.div>
  );
};

export default MagneticCursor;
