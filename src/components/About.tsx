
import React from 'react';
import { motion } from 'framer-motion';
import { Brain, BookOpen, Users, MessageSquare } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import profileImage from '@/assets/saiteja-profile.png';

const About = () => {
  const features = [
    {
      icon: <Brain className="h-10 w-10 text-primary" />,
      title: 'Machine Learning',
      description: 'Building and evaluating ML models for various applications',
      items: ['Supervised Learning', 'Data Analysis', 'Model Evaluation', 'Feature Engineering']
    },
    {
      icon: <BookOpen className="h-10 w-10 text-primary" />,
      title: 'Quality Management',
      description: 'Ensuring high standards in product and service quality',
      items: ['Quality Control', 'Process Improvement', 'Product Quality', 'Quality Standards']
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: 'Teamwork',
      description: 'Collaborative approach to problem-solving and project execution',
      items: ['Collaboration', 'Knowledge Sharing', 'Peer Support', 'Team Projects']
    },
    {
      icon: <MessageSquare className="h-10 w-10 text-primary" />,
      title: 'Communication',
      description: 'Clear and effective communication in technical and non-technical contexts',
      items: ['Technical Writing', 'Presentations', 'Documentation', 'Cross-team Communication']
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
            I'm an aspiring Machine Learning professional with a passion for data science and innovative technology solutions. With a strong academic background in Computer Science, I'm constantly seeking to expand my knowledge and skills.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold">My Journey</h3>
            <p className="text-foreground/80">
              My passion for technology began during my early education, and I've been on a continuous learning path ever since. Currently pursuing my Masters in Computer Applications at Vaageswari College of Engineering, I'm focusing on developing expertise in Machine Learning and data analysis.
            </p>
            <p className="text-foreground/80">
              I believe in the power of technology to transform lives and businesses. With my skills in Python, SQL, and quality management, I aim to contribute to innovative solutions that make a difference.
            </p>
            <p className="text-foreground/80">
              Beyond technical skills, I value helping others and sharing knowledge. I enjoy supporting colleagues in their learning journey and believe that collaborative environments foster the best innovations.
            </p>
          </motion.div>
          
          <motion.div 
            className="glass-card rounded-2xl overflow-hidden shadow-xl"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <img 
              src={profileImage} 
              alt="Saiteja Akinepelli"
              className="w-full h-96 object-cover object-center"
            />
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
