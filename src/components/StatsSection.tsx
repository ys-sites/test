import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, useInView, animate } from 'motion/react';

interface CounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}

function Counter({ value, suffix = '', prefix = '', decimals = 0 }: CounterProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  
  const motionValue = useMotionValue(0);

  const displayValue = useTransform(motionValue, (latest) => {
    return prefix + latest.toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }) + suffix;
  });
  
  useEffect(() => {
    if (inView) {
      const controls = animate(motionValue, value, {
        duration: 2.5, // Slower, more gradual increment
        ease: "easeOut",
      });
      return controls.stop;
    }
  }, [inView, value, motionValue]);

  return <motion.span ref={ref}>{displayValue}</motion.span>;
}

export default function StatsSection() {
  const stats = [
    { label: 'LEADS GENERATED', value: 10, suffix: 'k+', prefix: '' },
    { label: 'CLIENT REVENUE', value: 5, suffix: 'M+', prefix: '$' },
    { label: 'CONVERSION LIFT', value: 35, suffix: '%', prefix: '' },
    { label: 'ACTIVE CLIENTS', value: 25, suffix: '+', prefix: '' },
  ];

  return (
    <section className="py-20 bg-black border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="space-y-1 md:space-y-2">
              <div className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tighter">
                <Counter 
                  value={stat.value} 
                  suffix={stat.suffix} 
                  prefix={stat.prefix} 
                />
              </div>
              <div className="text-[10px] md:text-sm font-bold text-zinc-500 tracking-widest uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
