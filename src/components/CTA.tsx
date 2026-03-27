import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export default function CTA() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto relative">
        <div className="absolute inset-0 bg-brand-purple/20 blur-[100px] -z-10" />
        
        <div className="glass p-12 md:p-20 rounded-[60px] text-center border-brand-purple/20">
          <h2 className="text-4xl md:text-6xl font-bold mb-8">Ready to scale your <br /><span className="text-gradient">Business?</span></h2>
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-12">
            Join hundreds of successful businesses that have transformed their marketing with our AI-driven strategies.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#contact"
              className="w-full sm:w-auto bg-white text-black px-10 py-5 rounded-full font-bold text-xl hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 group"
            >
              Book a Free Strategy Call
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
          
          <p className="mt-8 text-zinc-500 text-sm">
            No commitment required. 100% free consultation.
          </p>
        </div>
      </div>
    </section>
  );
}
