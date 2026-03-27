/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatsSection from './components/StatsSection';
import Services from './components/Services';
import SocialProof from './components/SocialProof';
import OpportunitiesSection from './components/OpportunitiesSection';
import ScaleSection from './components/ScaleSection';
import ScannerSection from './components/ScannerSection';
import ContactSection from './components/ContactSection';
import StickyCTA from './components/StickyCTA';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen selection:bg-brand-purple/30 selection:text-brand-purple">
      <Navbar />
      <main>
        <Hero />
        
        <StatsSection />

        <OpportunitiesSection />
        <ScaleSection />
        <Services />
        <SocialProof />
        <ScannerSection />
        <ContactSection />
      </main>

      <Footer />

      <StickyCTA />
    </div>
  );
}

