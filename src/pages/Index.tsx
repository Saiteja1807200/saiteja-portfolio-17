
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import IntroOverlay from '@/components/IntroOverlay';
import { cn } from '@/lib/utils';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Education from '@/components/Education';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import RippleEffect from '@/components/RippleEffect';


const Index = () => {
  const location = useLocation();
  const [expandProject, setExpandProject] = useState<number | null>(null);
  const [isBlackTheme, setIsBlackTheme] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const state = location.state as { scrollTo?: string; expandProject?: number } | null;
    if (state?.scrollTo === 'projects') {
      setTimeout(() => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
    if (state?.expandProject) {
      setExpandProject(state.expandProject);
      // Clear state so it doesn't re-trigger
      window.history.replaceState({}, '');
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.state]);

  useEffect(() => {
    const handler = (e: Event) => {
      const id = (e as CustomEvent).detail;
      setExpandProject(id);
    };
    window.addEventListener('expandProject', handler);
    return () => window.removeEventListener('expandProject', handler);
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
    <div className={cn('min-h-screen', isBlackTheme && 'black')}>
      <RippleEffect />
      <Navbar isBlackTheme={isBlackTheme} onThemeToggle={toggleTheme} />
      <main>
        <Hero />
        <About />
        <Education />
        <Projects initialExpandedId={expandProject} onExpandedChange={setExpandProject} />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
