import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah',
    role: 'Owner, Local Boutique',
    content: 'YS marketing solutions helped us double our monthly foot traffic through their targeted lead generation strategies.',
    image: 'https://i.pravatar.cc/150?u=sarah',
  },
  {
    name: 'Michael',
    role: 'Founder, Tech Startup',
    content: 'The website they built for us is clean and professional. We saw an immediate uptick in inquiries after the launch.',
    image: 'https://i.pravatar.cc/150?u=michael',
  },
  {
    name: 'Sebastien',
    role: 'Founder, Nunest Painting',
    content: 'I love our website! In the first month, we got $10K in project revenue. All our leads come straight to our inbox and by SMS.',
    image: 'https://i.pravatar.cc/150?u=sebastien',
  },
];

export default function SocialProof() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="testimonials" className="py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="md:w-1/2"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
              What our <br />
              <span className="text-brand-purple">Clients</span> say
            </h2>
            <div className="flex gap-4">
              <button 
                onClick={prev}
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={next}
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="md:w-1/2 relative min-h-[400px] flex items-center"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="glass p-6 md:p-10 rounded-[32px] md:rounded-[40px] relative"
              >
                <Quote className="absolute top-6 right-6 md:top-8 md:right-8 w-8 h-8 md:w-12 md:h-12 text-brand-purple/20" />
                
                <div className="flex gap-1 mb-4 md:mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 md:w-5 md:h-5 fill-brand-purple text-brand-purple" />
                  ))}
                </div>

                <p className="text-lg md:text-2xl text-zinc-300 mb-6 md:mb-8 italic leading-relaxed">
                  "{testimonials[currentIndex].content}"
                </p>

                <div className="flex items-center gap-3 md:gap-4">
                  <img 
                    src={testimonials[currentIndex].image} 
                    alt={testimonials[currentIndex].name}
                    className="w-10 h-10 md:w-14 md:h-14 rounded-full border-2 border-brand-purple"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="font-bold text-base md:text-lg">{testimonials[currentIndex].name}</h4>
                    <p className="text-xs md:text-zinc-500">{testimonials[currentIndex].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
