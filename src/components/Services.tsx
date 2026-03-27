import { motion } from 'motion/react';
import { Globe, Zap, Cpu } from 'lucide-react';

const services = [
  {
    title: 'Custom Web Development',
    description: "High-performance, conversion-optimized websites tailored to your brand's unique needs.",
    icon: Globe,
    color: 'text-brand-purple',
    bg: 'bg-brand-purple/10',
  },
  {
    title: 'AI Systems Architecture',
    description: 'Intelligent automation and AI-driven workflows that scale your operations without adding headcount.',
    icon: Cpu,
    color: 'text-brand-blue',
    bg: 'bg-brand-blue/10',
  },
  {
    title: 'Lead Generation Engines',
    description: 'Data-backed systems designed to capture, nurture, and convert high-quality leads consistently.',
    icon: Zap,
    color: 'text-brand-green',
    bg: 'bg-brand-green/10',
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-zinc-950/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Our <span className="text-brand-purple">Services</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-zinc-400 max-w-2xl mx-auto text-lg"
          >
            We provide the technical foundation and intelligent systems your business needs to grow in the digital age.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="glass p-6 md:p-8 rounded-[24px] md:rounded-[32px] hover:border-white/20 transition-all group cursor-pointer will-change-transform"
            >
              <div className={`${service.bg} w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform`}>
                <service.icon className={`w-5 h-5 md:w-6 md:h-6 ${service.color}`} />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">{service.title}</h3>
              <p className="text-sm md:text-zinc-400 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
