import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar } from 'lucide-react';

export default function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-xs px-4"
        >
          <a
            href="#contact"
            className="w-full bg-white text-black py-3 md:py-4 rounded-2xl font-bold text-sm md:text-base shadow-2xl shadow-brand-purple/20 flex items-center justify-center gap-3 hover:scale-105 transition-transform will-change-transform"
          >
            <Calendar className="w-5 h-5" />
            Book Free Call
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
