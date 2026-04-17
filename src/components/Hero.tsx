import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import SplitText from './SplitText';

const Hero = () => {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full inline-block mb-2">
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
            An aspiring Full Stack Developer and Machine Learning enthusiast with a strong interest in building practical, data-driven software solutions. Experienced in developing full-stack web applications and implementing machine learning projects using modern development tools and Python-based technologies. Interested in contributing to scalable applications while continuously improving skills in software development, system design, and data-driven technologies.
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
              <a href="https://drive.google.com/file/d/1oLwn1GiXvy0uzpJzH79dZwFNo8MjWwTD/view?usp=drivesdk" target="_blank" rel="noopener noreferrer">View Resume</a>
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