import { motion } from 'motion/react';

export default function ScaleSection() {
  return (
    <section className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Text */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="order-2 lg:order-1"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-purple/10 border border-brand-purple/30 mb-8"
          >
            <div className="relative flex items-center justify-center">
              <div className="absolute w-2 h-2 bg-brand-purple rounded-full animate-ping opacity-75" />
              <div className="relative w-1.5 h-1.5 bg-brand-purple rounded-full" />
            </div>
            <span className="text-brand-purple text-[8px] md:text-[10px] font-bold tracking-wider md:tracking-[0.2em] uppercase">
              <span className="hidden sm:inline">02. CUSTOM PROJECTS</span>
              <span className="sm:hidden">02. PROJECTS</span>
            </span>
          </motion.div>
          <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-[1.1]">
            Scale Without <br />
            <span className="text-gradient">
              <span className="hidden sm:inline">Hiring More People</span>
              <span className="sm:hidden">Hiring</span>
            </span>
          </h2>
          <p className="text-zinc-400 text-xl leading-relaxed mb-8 font-light">
            Unlock exponential growth by automating the repetitive tasks that drain your team's energy. Our custom-built AI architectures act as a force multiplier, allowing you to handle 10x the volume with your existing staff while maintaining perfect accuracy around the clock.
          </p>
        </motion.div>

        {/* Right Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          whileHover="hover"
          whileTap="hover"
          viewport={{ once: true, margin: "-50px" }}
          className="order-1 lg:order-2 relative cursor-pointer group"
        >
          <motion.div 
            variants={{
              initial: { scale: 1 },
              hover: { scale: 1.01 }
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="bg-[#0D0A14] p-6 md:p-12 rounded-[40px] md:rounded-[60px] border border-brand-purple/30 shadow-[0_0_60px_rgba(139,92,246,0.08)] group-hover:border-brand-purple/60 group-hover:shadow-[0_0_100px_rgba(139,92,246,0.3)] transition-all duration-500 aspect-[4/3] flex items-center justify-center will-change-transform"
          >
            <div className="w-full max-w-md bg-zinc-900/40 rounded-[24px] md:rounded-[32px] border border-white/5 p-6 md:p-10 relative overflow-visible backdrop-blur-sm">
              {/* UI Mockup Content */}
              <div className="flex items-start gap-4 md:gap-6 mb-6 md:mb-8">
                <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-zinc-800/60" />
                <div className="flex-1 space-y-3 md:space-y-4 pt-1 md:pt-2">
                  <div className="h-3 md:h-4 w-32 md:w-48 bg-zinc-800/60 rounded-full" />
                </div>
              </div>
              
              <div className="space-y-2 md:space-y-3 mb-6 md:mb-10 p-3 md:p-4 rounded-xl md:rounded-2xl border border-white/5 bg-white/[0.02]">
                <div className="h-2 w-full bg-zinc-800/40 rounded-full" />
                <div className="h-2 w-4/5 bg-zinc-800/40 rounded-full" />
              </div>

              <div className="h-24 md:h-40 w-full bg-zinc-800/10 rounded-xl md:rounded-2xl mb-6 md:mb-10 border border-white/5" />

              <div className="flex items-center gap-4 md:gap-8 text-[9px] md:text-[11px] font-bold uppercase tracking-widest text-zinc-600">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-brand-blue/40" />
                  1,240 Likes
                </div>
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-brand-green/40" />
                  48 Comments
                </div>
              </div>

              {/* Floating Notification - Positioned to match image */}
              <motion.div 
                initial={{ x: 20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 100, damping: 15 }}
                className="absolute top-[40%] md:top-[45%] -right-4 md:-right-16 bg-[#080808] border border-white/10 px-4 md:px-6 py-3 md:py-4 rounded-[14px] md:rounded-[18px] flex items-center gap-3 md:gap-4 shadow-[0_20px_60px_rgba(0,0,0,0.9)] z-30"
              >
                <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#10B981] shadow-[0_0_15px_rgba(16,185,129,0.8)]" />
                <span className="text-[10px] md:text-sm font-bold whitespace-nowrap text-white">New Lead Captured</span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
