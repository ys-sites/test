import { useRef, useState, type MouseEvent, type ChangeEvent, type FormEvent } from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'motion/react';
import { Heart, ShoppingCart, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ContactSection() {
  const formRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    businessName: '',
    website: '',
    service: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const springX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const springY = useSpring(mouseY, { damping: 50, stiffness: 400 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!formRef.current) return;
    const rect = formRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      // Format payload for LeadConnector/GoHighLevel
      const payload = {
        name: formData.fullName,
        first_name: formData.fullName.split(' ')[0],
        last_name: formData.fullName.split(' ').slice(1).join(' '),
        email: formData.email,
        phone: formData.phone,
        companyName: formData.businessName,
        website: formData.website,
        service: formData.service,
        source: 'Website Contact Form'
      };

      const response = await fetch('https://services.leadconnectorhq.com/hooks/o7aUwpKbtkP4AOP0pEjC/webhook-trigger/aef47d41-27f9-466c-b11f-95946124ada5', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload),
      });

      if (response.status >= 400) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setStatus('success');
      setFormData({ fullName: '', email: '', phone: '', businessName: '', website: '', service: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const background = useMotionTemplate`radial-gradient(600px circle at ${springX}px ${springY}px, rgba(139, 92, 246, 0.25), transparent 80%)`;
  const secondaryBackground = useMotionTemplate`radial-gradient(400px circle at ${springX}px ${springY}px, rgba(96, 165, 250, 0.2), transparent 80%)`;

  return (
    <section id="contact" className="py-24 bg-black relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-brand-purple/20 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-brand-blue/20 blur-[120px] rounded-full -z-10" />
      
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
            Ready to scale your <br />
            <span className="text-gradient">vision?</span>
          </h2>
          <p className="text-zinc-400 text-lg leading-relaxed mb-12 max-w-md">
            Fill out the form for a free digital performance audit. We'll identify the friction points and provide a roadmap for exponential growth.
          </p>

          <div className="space-y-4">
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, x: 10 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              className="bg-zinc-900/50 p-6 rounded-[32px] flex items-center gap-6 border border-white/5 cursor-pointer group hover:bg-zinc-900/80 transition-colors will-change-transform"
            >
              <div className="w-14 h-14 rounded-2xl bg-red-500/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                <Heart className="w-7 h-7 text-red-500" />
              </div>
              <div>
                <h4 className="font-bold text-xl text-white mb-1">Low Retention</h4>
                <p className="text-zinc-500 leading-relaxed">Users leaving due to poor UX and slow performance.</p>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, x: 10 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              className="bg-zinc-900/50 p-6 rounded-[32px] flex items-center gap-6 border border-white/5 cursor-pointer group hover:bg-zinc-900/80 transition-colors will-change-transform"
            >
              <div className="w-14 h-14 rounded-2xl bg-orange-500/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                <ShoppingCart className="w-7 h-7 text-orange-500" />
              </div>
              <div>
                <h4 className="font-bold text-xl text-white mb-1">Abandoned Checkouts</h4>
                <p className="text-zinc-500 leading-relaxed">Technical friction causing users to drop off at the finish line.</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Form */}
        <motion.div
          ref={formRef}
          onMouseMove={handleMouseMove}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="relative glass p-10 rounded-[40px] border-white/10 group overflow-hidden"
        >
          {/* Animated Gradient Background */}
          <motion.div
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background }}
          />
          <motion.div
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75"
            style={{ background: secondaryBackground }}
          />

          <form className="relative z-10 space-y-8" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Full Name</label>
              <input 
                type="text" 
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                placeholder="John Doe" 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-brand-purple focus:shadow-[0_0_20px_rgba(139,92,246,0.1)] transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Business Email</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="john@company.com" 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-brand-purple focus:shadow-[0_0_20px_rgba(139,92,246,0.1)] transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Business Name</label>
              <input 
                type="text" 
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                required
                placeholder="Acme Corp" 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-brand-purple focus:shadow-[0_0_20px_rgba(139,92,246,0.1)] transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Website <span className="text-zinc-600 lowercase font-normal tracking-normal">(optional)</span></label>
              <input 
                type="url" 
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://example.com" 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-brand-purple focus:shadow-[0_0_20px_rgba(139,92,246,0.1)] transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Phone Number</label>
              <input 
                type="tel" 
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="+1 (555) 000-0000" 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-brand-purple focus:shadow-[0_0_20px_rgba(139,92,246,0.1)] transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                Select Service
              </label>
              <div className="relative">
                <select 
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-brand-purple focus:shadow-[0_0_20px_rgba(139,92,246,0.1)] transition-all appearance-none text-white cursor-pointer"
                >
                  <option value="" disabled className="bg-zinc-900 text-zinc-500">Select a service...</option>
                  <option value="Landing-Page" className="bg-zinc-900 text-white">Conversion-Optimized Landing Page</option>
                  <option value="Lead-Generation" className="bg-zinc-900 text-white">Strategic Lead Generation</option>
                  <option value="Custom-Request" className="bg-zinc-900 text-white">Custom Enterprise Solution</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-6 pointer-events-none">
                  <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>
            
            <button 
              type="submit"
              disabled={status === 'submitting' || status === 'success'}
              className={`w-full font-bold py-4 md:py-5 rounded-full text-base md:text-lg transition-all flex items-center justify-center gap-2 ${
                status === 'success' 
                  ? 'bg-green-500 text-white shadow-lg shadow-green-500/20' 
                  : status === 'error'
                  ? 'bg-red-500 text-white shadow-lg shadow-red-500/20'
                  : 'bg-[#ffb84d] hover:bg-[#ffa726] text-black shadow-xl shadow-orange-500/20 hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-[0.98]'
              } disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100`}
            >
              {status === 'submitting' ? (
                'Sending...'
              ) : status === 'success' ? (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  Request Sent!
                </>
              ) : status === 'error' ? (
                <>
                  <AlertCircle className="w-5 h-5" />
                  Error Sending
                </>
              ) : (
                <>
                  <span className="hidden sm:inline">Request Free Audit</span>
                  <span className="sm:hidden">Free Audit</span>
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
