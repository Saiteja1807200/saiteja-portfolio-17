import React from 'react';
import { motion } from 'framer-motion';
import { Check, Code, Server, Brain, Eye, MessageCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Skills = () => {
  
  const technicalSkills = [
    { name: '⚛️ React / TypeScript', level: 85 },
    { name: '🐍 Python', level: 90 },
    { name: '🗄️ PostgreSQL / SQL', level: 85 },
    { name: '🤖 Machine Learning (Scikit-learn)', level: 80 },
    { name: '🔗 REST APIs & Backend Services', level: 80 },
    { name: '👁️ Computer Vision (OpenCV)', level: 75 },
  ];
  
  const softSkills = [
    { name: '🗣️ Communication', level: 90 },
    { name: '🧩 Problem Solving', level: 85 },
    { name: '🤝 Teamwork', level: 95 },
    { name: '🔍 Attention to Detail', level: 90 },
    { name: '🔄 Adaptability', level: 85 },
  ];
  
  const specializations = [
    {
      icon: <Code className="h-10 w-10 text-primary mb-4" />,
      title: '🖥️ Frontend Development',
      description: 'Building responsive, modern user interfaces with component-driven architecture',
      items: ['React', 'TypeScript', 'Tailwind CSS', 'Responsive Design']
    },
    {
      icon: <Server className="h-10 w-10 text-primary mb-4" />,
      title: '⚙️ Backend & Databases',
      description: 'Designing robust server-side logic and scalable database solutions',
      items: ['PostgreSQL', 'REST APIs', 'Authentication', 'Supabase']
    },
    {
      icon: <Brain className="h-10 w-10 text-primary mb-4" />,
      title: '🤖 Machine Learning',
      description: 'Building and evaluating ML models for real-world applications',
      items: ['Scikit-learn', 'XGBoost', 'Model Evaluation', 'Exploratory Data Analysis']
    },
    {
      icon: <Eye className="h-10 w-10 text-primary mb-4" />,
      title: '👁️ Computer Vision & NLP',
      description: 'Extracting insights from images and text using Python-based tools',
      items: ['OpenCV', 'Image Processing', 'Text Analysis']
    },
    {
      icon: <MessageCircle className="h-10 w-10 text-primary mb-4" />,
      title: '📢 Communication',
      description: 'Clear and effective collaboration across technical and non-technical teams',
      items: ['Technical Writing', 'Documentation', 'Cross-team Collaboration', 'Knowledge Sharing']
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
          >
            My <span className="text-gradient">Skills</span>
          </motion.h2>
          
          <motion.p 
            className="text-foreground/80 text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Technical expertise spanning full-stack web development and machine learning, built through hands-on projects and academic training.
          </motion.p>
        </div>
        
        <Tabs defaultValue="technical" className="max-w-4xl mx-auto mb-16">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-secondary/70 p-1">
              <TabsTrigger value="technical" className="text-sm sm:text-base px-4 sm:px-8 py-2.5">
                🛠️ Technical Skills
              </TabsTrigger>
              <TabsTrigger value="soft" className="text-sm sm:text-base px-4 sm:px-8 py-2.5">
                💡 Soft Skills
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="technical" className="space-y-8 mt-6">
            {technicalSkills.map((skill, index) => (
              <motion.div 
                key={skill.name}
                className="space-y-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-foreground">{skill.name}</h3>
                  <span className="text-sm text-foreground/70">{skill.level}%</span>
                </div>
                <div className="progress-bar" style={{ '--progress-width': `${skill.level}%` } as React.CSSProperties}></div>
              </motion.div>
            ))}
          </TabsContent>
          
          <TabsContent value="soft" className="space-y-8 mt-6">
            {softSkills.map((skill, index) => (
              <motion.div 
                key={skill.name}
                className="space-y-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-foreground">{skill.name}</h3>
                  <span className="text-sm text-foreground/70">{skill.level}%</span>
                </div>
                <div className="progress-bar" style={{ '--progress-width': `${skill.level}%` } as React.CSSProperties}></div>
              </motion.div>
            ))}
          </TabsContent>
        </Tabs>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {specializations.map((spec, index) => (
            <motion.div 
              key={index}
              className="p-8 rounded-xl border border-primary/20 transition-all duration-300 hover:shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {spec.icon}
              <h3 className="text-xl font-bold mb-3">{spec.title}</h3>
              <p className="text-foreground/70 mb-6">{spec.description}</p>
              <ul className="space-y-2">
                {spec.items.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span>{item}</span>
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

export default Skills;