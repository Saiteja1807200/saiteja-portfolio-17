import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

const IntroOverlay = ({ onComplete }: { onComplete: () => void }) => {
  const [visible, setVisible] = useState(true);
  const [sliding, setSliding] = useState(false);

  const triggerExit = useCallback(() => {
    if (sliding) return;
    setSliding(true);
    setTimeout(() => {
      setVisible(false);
      onComplete();
    }, 1200);
  }, [sliding, onComplete]);

  useEffect(() => {
    const timer = setTimeout(triggerExit, 2000);
    return () => clearTimeout(timer);
  }, [triggerExit]);

  if (!visible) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center cursor-pointer"
      style={{ backgroundColor: '#020617' }}
      onClick={triggerExit}
      animate={{ y: sliding ? '-100%' : '0%' }}
      transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
    >
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(186,210,255,0.06) 50%, transparent 100%)',
          backgroundSize: '200% 100%',
        }}
        animate={{ backgroundPosition: ['200% 0%', '-200% 0%'] }}
        transition={{ duration: 3, ease: 'easeInOut', delay: 0.8 }}
      />

      <motion.p
        className="relative text-[clamp(1.2rem,4vw,2rem)] tracking-[0.25em] font-medium select-none"
        style={{ color: 'rgba(226, 232, 240, 0.85)', fontFamily: 'Montserrat, sans-serif' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.1, ease: 'easeOut' }}
      >
        @tejapolio 2026
      </motion.p>
    </motion.div>
  );
};

export default IntroOverlay;
