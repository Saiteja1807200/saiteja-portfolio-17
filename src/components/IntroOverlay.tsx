import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const IntroOverlay = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<'fade-in' | 'hold' | 'slide-up' | 'done'>('fade-in');

  const triggerExit = useCallback(() => {
    if (phase === 'done' || phase === 'slide-up') return;
    setPhase('slide-up');
    setTimeout(onComplete, 1200);
  }, [phase, onComplete]);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('hold'), 1000);
    const t2 = setTimeout(() => triggerExit(), 2000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [triggerExit]);

  const handleSkip = () => triggerExit();

  return (
    <AnimatePresence>
      {phase !== 'slide-up' || true ? (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center cursor-pointer"
          style={{ backgroundColor: '#020617' }}
          onClick={handleSkip}
          animate={phase === 'slide-up' ? { y: '-100%' } : { y: 0 }}
          transition={phase === 'slide-up' ? { duration: 1.2, ease: [0.76, 0, 0.24, 1] } : {}}
        >
          {/* Subtle light sweep */}
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
      )}
    </AnimatePresence>
  );
};

export default IntroOverlay;
