import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Brain, Code, Users, MessageCircle, Lock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import RippleEffect from '@/components/RippleEffect';
import profileImage from '@/assets/profile.jpg';
import { useAccessToken } from '@/hooks/useAccessToken';

const AboutPage = () => {
  const [isBlackTheme, setIsBlackTheme] = useState(false);
  const { hasAccess, checking } = useAccessToken();

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

  const interests = [
    {
      icon: <Brain className="h-10 w-10 text-primary" />,
      title: 'Machine Learning',
      description: 'Fascinated by the possibilities of machine learning in solving real-world problems.'
    },
    {
      icon: <Code className="h-10 w-10 text-primary" />,
      title: 'Programming',
      description: 'Enjoy coding and developing solutions that make a difference.'
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: 'Collaboration',
      description: 'Believe in the power of teamwork and knowledge sharing among peers.'
    },
    {
      icon: <MessageCircle className="h-10 w-10 text-primary" />,
      title: 'Communication',
      description: 'Value clear communication in both technical and non-technical contexts.'
    }
  ];

  return (
    <div className={cn('min-h-screen', isBlackTheme && 'black')}>
      <RippleEffect />
      <Navbar isBlackTheme={isBlackTheme} onThemeToggle={toggleTheme} />
      
      <main className="pt-24 pb-16">
        <section className="py-12">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div 
              className="max-w-4xl mx-auto text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">About Me</h1>
              <p className="text-xl text-foreground/80">
                A deeper look into who I am and what drives me.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
              <motion.div 
                className="order-2 md:order-1"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="text-3xl font-bold mb-6">My Story</h2>
                <div className="space-y-4 text-foreground/80">
                  <p>
                    I'm Akinepelli Saiteja, an aspiring Machine Learning professional with a passion for technology and innovation. My journey in computer science began during my early education and has evolved into a focused pursuit of expertise in Machine Learning and data analysis.
                  </p>
                  <p>
                    Currently pursuing my Masters in Computer Applications at Vaageswari College of Engineering, I am dedicated to building a strong foundation in both theoretical knowledge and practical applications of Machine Learning technologies.
                  </p>
                  <p>
                    Beyond academics, I value the importance of collaboration and knowledge sharing. I find joy in helping my colleagues navigate technical challenges and believe that the best innovations come from diverse perspectives working together.
                  </p>
                  <p>
                    My goal is to contribute to the field of Machine Learning by developing solutions that address real-world problems and make a positive impact on society.
                  </p>
                </div>
              </motion.div>
              
              <motion.div 
                className="order-1 md:order-2"
                initial={{ opacity: 0, scale: 0.85, rotateY: -15 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="rounded-2xl overflow-hidden shadow-xl relative">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent opacity-70 z-10"></div>
                  <motion.img 
                    src={profileImage} 
                    alt="Saiteja Akinepelli"
                    className="w-full object-cover aspect-[4/5]"
                    initial={{ scale: 1.15, filter: 'blur(8px)' }}
                    animate={{ scale: 1, filter: 'blur(0px)' }}
                    transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
                  />
                </div>
              </motion.div>
            </div>
            
            <motion.div 
              className="max-w-4xl mx-auto text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-6">My Interests & Values</h2>
              <p className="text-lg text-foreground/80 mb-12">
                These are the areas that fuel my passion and the values that guide my approach to work and life.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
              {interests.map((interest, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="h-full bg-background/50 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="rounded-full bg-primary/20 p-4 mb-4">
                      {interest.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-foreground">{interest.title}</h3>
                    <p className="text-foreground/80">{interest.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              className="max-w-3xl mx-auto text-center py-12 px-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <blockquote className="text-2xl italic font-medium text-foreground/90">
                "The greatest value of education is not knowing many facts, but training the mind to think."
              </blockquote>
              <p className="mt-4 text-foreground/70">- Albert Einstein</p>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutPage;
