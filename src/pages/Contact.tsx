
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import RippleEffect from '@/components/RippleEffect';

const ContactPage = () => {
  const [isBlackTheme, setIsBlackTheme] = useState(false);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleTheme = () => {
    setIsBlackTheme(!isBlackTheme);
    if (!isBlackTheme) {
      document.documentElement.classList.add('black');
    } else {
      document.documentElement.classList.remove('black');
    }
  };

  return (
    <div className="min-h-screen">
      <RippleEffect />
      <Navbar />
      
      <main className="pt-24 pb-16">
        <section className="py-12">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div 
              className="max-w-4xl mx-auto text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Get In Touch</h1>
              <p className="text-xl text-foreground/80">
                I'd love to hear from you! Feel free to reach out with any questions or opportunities.
              </p>
            </motion.div>
          </div>
          
          <Contact />
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ContactPage;
