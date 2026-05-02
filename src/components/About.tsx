
import React from 'react';
import { motion } from 'framer-motion';
import { Brain, BookOpen, Users, MessageSquare, Lock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import profileImage from '@/assets/profile.jpg';
import { useAccessToken } from '@/hooks/useAccessToken';
import RequestAccessDialog from '@/components/RequestAccessDialog';

const About = () => {
  const { hasAccess, checking } = useAccessToken();
  const features = [
    {
      icon: <Brain className="h-10 w-10 text-primary" />,
      title: 'Machine Learning',
      description: 'Building intelligent systems with data-driven approaches',
      items: ['Scikit-learn & XGBoost', 'Computer Vision (OpenCV)', 'NLP (NLTK)', 'Model Evaluation']
    },
    {
      icon: <BookOpen className="h-10 w-10 text-primary" />,
      title: 'Full Stack Development',
      description: 'End-to-end web application development with modern tools',
      items: ['React & TypeScript', 'PostgreSQL', 'REST APIs', 'Authentication & Auth Flows']
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: 'SDLC & Agile',
      description: 'Structured development from requirements to deployment',
      items: ['Requirement Analysis', 'Agile Sprints', 'Testing & QA', 'CI/CD & Deployment']
    },
    {
      icon: <MessageSquare className="h-10 w-10 text-primary" />,
      title: 'Communication',
      description: 'Clear and effective collaboration across teams',
      items: ['Technical Writing', 'Documentation', 'Cross-team Collaboration', 'Knowledge Sharing']
    }
  ];

  return (
    <section id="about" className="py-20">
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
          >
            About <span className="text-gradient">Me</span>
          </motion.h2>
          
          <motion.p 
            className="text-foreground/80 text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            I recently finished my Master of Computer Applications and spend most of my time building web apps and tinkering with ML projects. I care about software that feels good to use and code that other people can actually read.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 items-start">
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold">My Journey</h3>
            <p className="text-foreground/80">
              I did my MCA at Vaageswari College of Engineering, which is where I really got into both software development and machine learning. Along the way I built a few full stack projects in React and PostgreSQL, including a service marketplace app with role based logins, bookings, and email notifications.
            </p>
            <p className="text-foreground/80">
              On the ML side I&apos;ve worked with Python, OpenCV, Scikit-learn, and NLTK on things like a license plate recognition system and a model to flag fake recruitment posts. I&apos;m comfortable across the whole development cycle, from sketching out requirements to testing and shipping.
            </p>
            <p className="text-foreground/80">
              Right now I&apos;m looking for a Full Stack or Machine Learning role where I can keep building useful things and learn from a strong team.
            </p>
          </motion.div>
          
          <motion.div 
            className="glass-card rounded-2xl overflow-hidden shadow-xl relative"
            initial={{ opacity: 0, scale: 0.85, rotateY: 15 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.img 
              src={profileImage} 
              alt="Saiteja Akinepelli"
              className={cn(
                "block w-full object-contain transition-all duration-700",
                !hasAccess && "blur-xl scale-105"
              )}
              initial={{ scale: 1.15, filter: 'blur(8px)' }}
              whileInView={{ scale: hasAccess ? 1 : 1.05, filter: hasAccess ? 'blur(0px)' : 'blur(20px)' }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
            />
            {!hasAccess && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-background/30 backdrop-blur-sm">
                <div className="p-4 rounded-full bg-primary/10 mb-3">
                  <Lock className="h-10 w-10 text-primary/60" />
                </div>
                <p className="font-semibold text-foreground/80 mb-1">Portfolio Image</p>
                {checking ? (
                  <p className="text-sm text-muted-foreground">Verifying access...</p>
                ) : (
                  <RequestAccessDialog>
                    <Button size="sm" variant="outline" className="mt-1 gap-1.5">
                      Request Access
                    </Button>
                  </RequestAccessDialog>
                )}
              </div>
            )}
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-background/50 backdrop-blur-md border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:scale-105"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-3 text-foreground">{feature.title}</h3>
              <p className="text-foreground/70 text-sm mb-4">{feature.description}</p>
              <ul className="space-y-2">
                {feature.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    <span className="text-foreground/80">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
