import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import paperAsset from '@/assets/USER-CENTRIC_MACHINE_LEARNING_FRAMEWORK_FOR_CYBER_SECURITY_OPERATIONS_CENTER.pdf.asset.json';

const publication = {
  title: 'User-Centric Machine Learning Framework for Cyber Security Operations Center',
  authors: ['Akinepelli Saiteja', 'Mrs. T. Mounika', 'Dr. P. Venkateshwarlu'],
  institution: 'Vaageswari College of Engineering (JNTUH), Karimnagar',
  type: 'Research Publication',
  abstract:
    'A machine-learning-driven SOC framework that reduces alert fatigue by automatically prioritizing security events, classifying genuine threats and visualizing incidents through a real-time monitoring dashboard.',
  pdfUrl: paperAsset.url,
};

const Publications = () => {
  return (
    <section id="publications" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
          >
            Research <span className="text-gradient">Publications</span>
          </motion.h2>
          <motion.p
            className="text-foreground/80 text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Academic work exploring how machine learning can make cybersecurity operations faster and more accurate.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="max-w-3xl mx-auto border border-primary/20 bg-background/50 backdrop-blur-sm">
            <CardContent className="p-6 md:p-8">
              <div className="flex items-start gap-4 mb-5">
                <div className={cn('p-3 rounded-xl bg-gradient-to-br from-amber-500 to-orange-400 text-white flex-shrink-0')}>
                  <FileText className="h-6 w-6" />
                </div>
                <div>
                  <span className="inline-block text-xs font-semibold uppercase tracking-wider text-primary mb-1.5">
                    {publication.type}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold leading-tight text-foreground">
                    {publication.title}
                  </h3>
                </div>
              </div>

              <p className="text-foreground/80 mb-5 leading-relaxed">
                {publication.abstract}
              </p>

              <div className="mb-6">
                <p className="text-sm text-muted-foreground mb-1">
                  <span className="font-medium text-foreground/70">Authors:</span>{' '}
                  {publication.authors.join(', ')}
                </p>
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground/70">Affiliation:</span>{' '}
                  {publication.institution}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button
                  asChild
                  className="gap-2 rounded-xl bg-foreground text-background hover:bg-foreground/90 font-semibold px-6"
                >
                  <a href={publication.pdfUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                    View Paper
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="gap-2 rounded-xl border-primary/30 hover:bg-primary/10 hover:border-primary/50 font-semibold px-6"
                >
                  <a href={publication.pdfUrl} download>
                    <Download className="h-4 w-4" />
                    Download PDF
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default Publications;
