import React, { useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { ExternalLink, Github, ChevronRight, X, Layers, Eye, Cpu, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  features: string[];
  icon: React.ReactNode;
  github?: string;
  demo?: string;
  accentColor: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Home Hero',
    subtitle: 'Home Services Marketplace Platform',
    description:
      'Full-stack marketplace platform connecting customers with local service providers for household repair and maintenance services.',
    technologies: ['React', 'Supabase', 'PostgreSQL', 'Resend', 'Vercel'],
    features: [
      'Role-based authentication for customers, service providers, and admin dashboards',
      'Booking lifecycle system with status transitions (pending, accepted, in-progress, completed)',
      'Provider approval workflow and service management',
      'Automated email verification and booking notifications',
      'Mobile-responsive Progressive Web App',
    ],
    icon: <Layers className="h-6 w-6" />,
    github: '',
    demo: '',
    accentColor: 'from-blue-500 to-cyan-400',
  },
  {
    id: 2,
    title: 'Number Plate Recognition',
    subtitle: 'Computer Vision System',
    description:
      'Computer vision system that detects vehicle license plates from images or video streams and extracts the alphanumeric characters automatically.',
    technologies: ['Python', 'OpenCV', 'Tesseract OCR'],
    features: [
      'Image preprocessing using grayscale conversion, edge detection, and contour analysis',
      'Automatic license plate detection from vehicle images',
      'Character extraction using OCR',
      'Optimized detection pipeline for real-time processing',
    ],
    icon: <Eye className="h-6 w-6" />,
    github: '',
    demo: '',
    accentColor: 'from-violet-500 to-purple-400',
  },
  {
    id: 3,
    title: 'Recruitment Fraud Detection',
    subtitle: 'Machine Learning System',
    description:
      'Machine learning system designed to identify fraudulent job postings and suspicious recruitment activities on online job platforms.',
    technologies: ['Python', 'Pandas', 'Scikit-learn', 'NLTK', 'XGBoost'],
    features: [
      'Text preprocessing and feature extraction from job descriptions',
      'Fraud classification using Logistic Regression and XGBoost models',
      'Data preprocessing and model evaluation',
      'Improves reliability and security of recruitment platforms',
    ],
    icon: <ShieldCheck className="h-6 w-6" />,
    accentColor: 'from-emerald-500 to-teal-400',
  },
];

interface ProjectsProps {
  initialExpandedId?: number | null;
  onExpandedChange?: (id: number | null) => void;
}

const Projects = ({ initialExpandedId, onExpandedChange }: ProjectsProps) => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  React.useEffect(() => {
    if (initialExpandedId) {
      setExpandedId(initialExpandedId);
      onExpandedChange?.(null);
    }
  }, [initialExpandedId]);

  const selectedProject = projects.find((p) => p.id === expandedId);

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
          >
            Featured <span className="text-gradient">Projects</span>
          </motion.h2>
          <motion.p
            className="text-foreground/80 text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            A selection of projects showcasing my skills in full-stack development, computer vision, and machine learning.
          </motion.p>
        </div>

        <LayoutGroup>
          {/* Cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {projects.map((project, index) => {
              const lightColors: Record<number, string> = {
                0: 'hsl(210 100% 50%)',
                1: 'hsl(270 80% 60%)',
                2: 'hsl(160 80% 45%)',
              };
              return (
                <motion.div
                  key={project.id}
                  className="border-light-wrapper"
                  style={{
                    '--delay': `${index * 2}s`,
                    '--light-color': lightColors[index],
                  } as React.CSSProperties}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                >
                  <motion.div
                    onClick={() => setExpandedId(project.id)}
                    className="border-light-inner group relative cursor-pointer p-6 transition-colors duration-300 bg-background"
                    whileHover={{ y: -6 }}
                  >

                    <div className="flex items-center gap-3 mb-4 mt-2">
                      <div className={cn('p-2.5 rounded-xl bg-gradient-to-br text-white', project.accentColor)}>
                        {project.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground text-lg leading-tight">{project.title}</h3>
                        <p className="text-xs text-muted-foreground">{project.subtitle}</p>
                      </div>
                    </div>

                    <p className="text-foreground/70 text-sm mb-4 line-clamp-2">{project.description}</p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-[10px] px-2 py-0.5 bg-white/10 text-foreground/80 border-white/10">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 3 && (
                        <Badge variant="secondary" className="text-[10px] px-2 py-0.5 bg-white/10 text-foreground/80 border-white/10">
                          +{project.technologies.length - 3}
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center text-primary text-sm font-medium group-hover:gap-2 gap-1 transition-all">
                      View Details <ChevronRight className="h-4 w-4" />
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* Expanded overlay */}
          <AnimatePresence>
            {selectedProject && (
              <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                {/* Backdrop */}
                <motion.div
                  className="absolute inset-0 bg-background/80 backdrop-blur-md"
                  onClick={() => setExpandedId(null)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Expanded card */}
                <motion.div
                  className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl border border-white/10 bg-background p-6 md:p-8 shadow-2xl"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                >
                  {/* Close button */}
                  <button
                    onClick={() => setExpandedId(null)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-foreground/70 hover:text-foreground z-10"
                  >
                    <X className="h-4 w-4" />
                  </button>
                    <div className="flex items-center gap-4 mb-6 mt-2">
                      <div className={cn('p-3 rounded-xl bg-gradient-to-br text-white', selectedProject.accentColor)}>
                        {selectedProject.icon}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-foreground">{selectedProject.title}</h3>
                        <p className="text-sm text-muted-foreground">{selectedProject.subtitle}</p>
                      </div>
                    </div>

                    <p className="text-foreground/80 mb-6 leading-relaxed">{selectedProject.description}</p>

                    {/* Technologies */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-foreground/60 uppercase tracking-wider mb-3">Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary" className="px-3 py-1 bg-white/10 text-foreground/90 border-white/10">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mb-8">
                      <h4 className="text-sm font-semibold text-foreground/60 uppercase tracking-wider mb-3">Key Features</h4>
                      <ul className="space-y-2.5">
                        {selectedProject.features.map((feature, idx) => (
                          <motion.li
                            key={idx}
                            className="flex items-start gap-3 text-foreground/80 text-sm"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + idx * 0.05 }}
                          >
                            <div className={cn('mt-1.5 h-1.5 w-1.5 rounded-full bg-gradient-to-r flex-shrink-0', selectedProject.accentColor)} />
                            {feature}
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* Action buttons */}
                    {(selectedProject.github !== undefined || selectedProject.demo !== undefined) && (
                      <div className="flex flex-wrap gap-3">
                        {selectedProject.github !== undefined && (
                          <Button
                            asChild
                            className={cn(
                              'gap-2 rounded-xl bg-foreground text-background hover:bg-foreground/90 font-semibold px-6',
                            )}
                          >
                            <a href={selectedProject.github || '#'} target="_blank" rel="noopener noreferrer">
                              <Github className="h-4 w-4" />
                              GitHub Repository
                            </a>
                          </Button>
                        )}
                        {selectedProject.demo !== undefined && (
                          <Button
                            asChild
                            variant="outline"
                            className={cn(
                              'gap-2 rounded-xl border-primary/30 hover:bg-primary/10 hover:border-primary/50 font-semibold px-6',
                            )}
                          >
                            <a href={selectedProject.demo || '#'} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4" />
                              Live Demo
                            </a>
                          </Button>
                        )}
                      </div>
                    )}
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </LayoutGroup>
      </div>
    </section>
  );
};

export default Projects;
