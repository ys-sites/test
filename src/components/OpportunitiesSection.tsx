import { motion } from 'motion/react';

export default function OpportunitiesSection() {
  return (
    <section className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Card */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-50px" }}
          className="bg-[#080912] p-6 md:p-10 rounded-[32px] md:rounded-[40px] border border-brand-blue/50 shadow-[0_0_50px_rgba(96,165,250,0.15)] group-hover:border-brand-blue/80 group-hover:shadow-[0_0_80px_rgba(96,165,250,0.35)] transition-all duration-500 relative overflow-hidden group cursor-pointer will-change-transform"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/20 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative z-10">
            <div className="flex justify-between items-center mb-6 md:mb-8 pb-4 md:pb-6 border-b border-white/5">
              <span className="text-zinc-400 font-medium text-sm md:text-lg">Monthly Value</span>
              <span className="text-brand-green font-bold text-lg md:text-2xl">$32,500</span>
            </div>
            
            <div className="space-y-4 md:space-y-6 mb-8 md:mb-12">
              {[
                { label: 'Lead Generation', value: '15 hrs' },
                { label: 'Client Communication', value: '12 hrs' },
                { label: 'Lead Qualification', value: '8 hrs' },
                { label: 'Social Media Posting', value: '6 hrs' },
              ].map((item) => (
                <div key={item.label} className="flex justify-between items-center text-[10px] md:text-sm">
                  <span className="text-zinc-500">{item.label}</span>
                  <span className="font-bold text-zinc-200">{item.value}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <motion.div 
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="bg-brand-blue/20 p-3 md:p-6 rounded-2xl md:rounded-3xl border border-brand-blue/40 transition-all group-hover:border-brand-blue/60 hover:bg-brand-blue/30"
              >
                <div className="text-xl md:text-3xl font-bold mb-0.5 md:mb-1 text-white">$390k+</div>
                <div className="text-[7px] md:text-[10px] text-zinc-500 uppercase tracking-wider md:tracking-[0.2em] font-bold leading-tight">
                  <span className="hidden sm:inline">Projected Annual Value</span>
                  <span className="sm:hidden">Annual Value</span>
                </div>
              </motion.div>
              <motion.div 
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="bg-brand-purple/10 p-3 md:p-6 rounded-2xl md:rounded-3xl border border-brand-purple/20 transition-all group-hover:border-brand-purple/50 hover:bg-brand-purple/20"
              >
                <div className="text-xl md:text-3xl font-bold mb-0.5 md:mb-1 text-white">13x</div>
                <div className="text-[7px] md:text-[10px] text-zinc-500 uppercase tracking-wider md:tracking-[0.2em] font-bold leading-tight">ROI Year 1</div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Right Text */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-blue/10 border border-brand-blue/30 mb-8"
          >
            <div className="relative flex items-center justify-center">
              <div className="absolute w-2 h-2 bg-brand-blue rounded-full animate-ping opacity-75" />
              <div className="relative w-1.5 h-1.5 bg-brand-blue rounded-full" />
            </div>
            <span className="text-brand-blue text-[8px] md:text-[10px] font-bold tracking-wider md:tracking-[0.2em] uppercase">01. AUDIT</span>
          </motion.div>
          <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-[1.1]">
            Find the <br />
            <span className="text-gradient">Biggest Opportunities</span>
          </h2>
          <p className="text-zinc-400 text-xl leading-relaxed mb-8 font-light">
            We identify your bottlenecks, uncover high-value opportunities, and quantify exactly how much time and money you're leaving on the table. You get a clear roadmap with project value and ROI projections so you can make informed decisions.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
