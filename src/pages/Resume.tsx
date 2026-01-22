
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { GraduationCap, Briefcase, Award, Download, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RippleEffect from '@/components/RippleEffect';

const ResumePage = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const education = [
    {
      degree: "Masters in Computer Applications",
      institution: "Vaageswari College of Engineering",
      period: "2023 - 2025",
      description: "Specializing in Computer Science with focus on Machine Learning",
      active: true
    },
    {
      degree: "Intermediate (MPC)",
      institution: "Sri Chaitanya Junior College",
      period: "Completed",
      description: "Studied Mathematics, Physics, and Chemistry",
      active: false
    },
    {
      degree: "Computer Science",
      institution: "Chaitanya Degree College",
      period: "Completed",
      description: "Completed undergraduate studies in Computer Science",
      active: false
    }
  ];

  const skills = {
    technical: [
      { name: 'Python', level: 90 },
      { name: 'SQL', level: 85 },
      { name: 'Machine Learning', level: 80 },
      { name: 'Data Analysis', level: 75 },
      { name: 'Computer Science Fundamentals', level: 90 },
    ],
    soft: [
      { name: 'Communication', level: 90 },
      { name: 'Problem Solving', level: 85 },
      { name: 'Teamwork', level: 95 },
      { name: 'Attention to Detail', level: 90 },
      { name: 'Customer Service', level: 85 },
    ]
  };

  const downloadResume = () => {
    window.open('https://drive.google.com/file/d/1oLwn1GiXvy0uzpJzH79dZwFNo8MjWwTD/view?usp=drivesdk', '_blank');
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
              <h1 className="text-4xl md:text-5xl font-bold mb-6">My Resume</h1>
              <p className="text-xl text-foreground/80 mb-8">
                An overview of my educational background, skills, and experience.
              </p>
              
              <Button size="lg" onClick={downloadResume} className="gap-2">
                <Download className="h-5 w-5" />
                Download Resume
              </Button>
            </motion.div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              <motion.div 
                className="lg:col-span-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="space-y-8">
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <GraduationCap className="h-6 w-6 text-primary" />
                      <h2 className="text-2xl font-bold">Education</h2>
                    </div>
                    
                    <div className="space-y-6">
                      {education.map((item, index) => (
                        <div key={index} className={`bg-background/50 backdrop-blur-md border border-white/10 rounded-2xl p-6 border-l-4 ${item.active ? 'border-l-primary' : 'border-l-secondary'} transition-all duration-300 hover:shadow-lg`}>
                          <div className="flex justify-between flex-wrap gap-2 mb-2">
                            <h3 className="text-xl font-bold text-foreground">{item.degree}</h3>
                            <span className="px-3 py-1 bg-primary/20 text-primary text-sm rounded-full font-medium">
                              {item.period}
                            </span>
                          </div>
                          <p className="text-primary font-medium mb-2">{item.institution}</p>
                          <p className="text-foreground/80">{item.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="space-y-8">
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <Award className="h-6 w-6 text-primary" />
                      <h2 className="text-2xl font-bold">Skills</h2>
                    </div>
                    
                    <Tabs defaultValue="technical" className="w-full">
                      <TabsList className="w-full mb-6">
                        <TabsTrigger value="technical" className="w-1/2">Technical</TabsTrigger>
                        <TabsTrigger value="soft" className="w-1/2">Soft Skills</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="technical" className="space-y-4">
                        {skills.technical.map((skill, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex justify-between">
                              <p className="font-medium">{skill.name}</p>
                              <p className="text-sm text-foreground/70">{skill.level}%</p>
                            </div>
                            <div className="progress-bar" style={{ '--progress-width': `${skill.level}%` } as React.CSSProperties}></div>
                          </div>
                        ))}
                      </TabsContent>
                      
                      <TabsContent value="soft" className="space-y-4">
                        {skills.soft.map((skill, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex justify-between">
                              <p className="font-medium">{skill.name}</p>
                              <p className="text-sm text-foreground/70">{skill.level}%</p>
                            </div>
                            <div className="progress-bar" style={{ '--progress-width': `${skill.level}%` } as React.CSSProperties}></div>
                          </div>
                        ))}
                      </TabsContent>
                    </Tabs>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <Briefcase className="h-6 w-6 text-primary" />
                      <h2 className="text-2xl font-bold">Experience</h2>
                    </div>
                    
                    <div className="bg-background/50 backdrop-blur-md border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg">
                      <p className="text-foreground/80 mb-4">
                        Currently focusing on academic growth and skill development in Machine Learning and Computer Science.
                      </p>
                      <h3 className="font-bold text-lg mb-3 text-foreground">Key Skills & Expertise:</h3>
                      <ul className="space-y-2">
                        {['Python', 'SQL', 'Quality Control', 'Customer Engagement', 'Communication', 'Quality Management'].map((skill, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-primary" />
                            <span className="text-foreground/80">{skill}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            
            <motion.div 
              className="max-w-3xl mx-auto bg-background/50 backdrop-blur-md border border-white/10 rounded-2xl p-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-4 text-center text-foreground">Professional Interests</h2>
              <p className="text-foreground/80 text-center mb-6">
                I am particularly interested in the following areas of Machine Learning and Computer Science:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="bg-background/30 border border-white/5 p-4 rounded-lg transition-all duration-300 hover:scale-105">
                  <p className="font-medium text-foreground/90">Data Analysis</p>
                </div>
                <div className="bg-background/30 border border-white/5 p-4 rounded-lg transition-all duration-300 hover:scale-105">
                  <p className="font-medium text-foreground/90">Neural Networks</p>
                </div>
                <div className="bg-background/30 border border-white/5 p-4 rounded-lg transition-all duration-300 hover:scale-105">
                  <p className="font-medium text-foreground/90">Predictive Modeling</p>
                </div>
                <div className="bg-background/30 border border-white/5 p-4 rounded-lg transition-all duration-300 hover:scale-105">
                  <p className="font-medium text-foreground/90">Natural Language Processing</p>
                </div>
                <div className="bg-background/30 border border-white/5 p-4 rounded-lg transition-all duration-300 hover:scale-105">
                  <p className="font-medium text-foreground/90">Computer Vision</p>
                </div>
                <div className="bg-background/30 border border-white/5 p-4 rounded-lg transition-all duration-300 hover:scale-105">
                  <p className="font-medium text-foreground/90">Data Visualization</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ResumePage;
