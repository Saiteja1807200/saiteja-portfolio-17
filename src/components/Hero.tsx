import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SplitText from './SplitText';
import Aurora from './Aurora';
import profileImage from '@/assets/saiteja-profile.jpg';

const Hero = () => {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 opacity-70">
        <Aurora 
          colorStops={["#5227FF", "#7cff67", "#5227FF"]}
          amplitude={2.0}
          blend={0.8}
          speed={1.8}
        />
      </div>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Hero Profile Image Container */}
        <motion.div 
          className="flex justify-center mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="hero-image-container w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-primary/30 shadow-xl">
            <img 
              src={profileImage} 
              alt="Saiteja Akinepelli"
              className="w-full h-full object-contain bg-background"
            />
          </div>
        </motion.div>

        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full inline-block mb-2">
              Machine Learning Enthusiast
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
            An aspiring Machine Learning student passionate about solving complex problems with data-driven solutions. Currently pursuing my Masters in Computer Applications at Vaageswari College of Engineering.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 pt-6 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button size="lg" asChild>
              <a href="/contact">Get In Touch</a>
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