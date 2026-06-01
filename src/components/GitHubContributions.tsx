import React from 'react';
import { motion } from 'framer-motion';
import { GitHubCalendar } from 'react-github-calendar';
import { Github } from 'lucide-react';

const GitHubContributions = () => {
  return (
    <section id="github" className="py-20 relative">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full inline-flex items-center gap-2 mb-4">
            <Github className="h-4 w-4" /> GitHub
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Contributions</h2>
          <p className="text-foreground/70">
            A snapshot of my open-source and personal coding activity over the past year.
          </p>
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto rounded-xl border border-border bg-card/50 backdrop-blur-sm p-6 md:p-8 overflow-x-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex justify-center min-w-fit">
            <GitHubCalendar
              username="Saiteja1807200"
              blockSize={12}
              blockMargin={4}
              fontSize={14}
              colorScheme="dark"
              theme={{
                dark: ['hsl(240, 6%, 18%)', '#1e6f3f', '#2ea04d', '#4ac26b', '#7cff67'],
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GitHubContributions;
