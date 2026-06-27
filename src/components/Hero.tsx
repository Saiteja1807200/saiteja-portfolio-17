import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import SplitText from './SplitText';
import Aurora from './Aurora';
import resumePdf from '@/assets/Saiteja_Akinepelli_FullStack_Developer.pdf.asset.json';

const Hero = () => {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Aurora colorStops={["#5227FF", "#7cff67", "#5227FF"]} amplitude={1.0} blend={0.5} speed={1.0} />
      </div>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="px-3 py-1 text-sm font-medium bg-background/80 text-foreground backdrop-blur-sm border border-border/50 rounded-full inline-block mb-2">
              Full Stack Developer & ML Enthusiast
            </span>
          </motion.div>
          
          <motion.h1 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Hi, I'm{' '}
            <span className="text-gradient font-bold drop-shadow-lg">
              Saiteja Akinepelli
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-foreground/80 text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            I build full stack web apps and explore machine learning on the side. Most of my work lives at the intersection of clean React frontends, solid Python backends and ML models that actually solve a problem. I like shipping things that feel fast, look good and hold up in the real world.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 pt-6 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button size="lg" asChild>
              <Link to="/contact">Get In Touch</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href={resumePdf.url} target="_blank" rel="noopener noreferrer">View Resume</a>
            </Button>
          </motion.div>
        </div>
        
        <div className="flex justify-center mt-16">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={scrollToAbout}
            className="rounded-full h-12 w-12 animate-bounce"
          >
            <ChevronDown />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;