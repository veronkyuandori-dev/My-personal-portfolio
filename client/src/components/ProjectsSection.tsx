import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, CheckCircle2 } from 'lucide-react';
import { SiGitlab } from 'react-icons/si';
import AnimationWrapper from './AnimationWrapper';
import taskTrackerImage from '@assets/Screenshot_2026-01-29_23.27.03_1769762225609.png';
import libraryImage from '@assets/Screenshot_2026-01-29_23.21.52_1769762002287.png';
import aiFaceImage from '@assets/Screenshot_2026-01-30_16.32.23_1769761975016.png';
import evacsImage from '@assets/Gemini_Generated_Image_j018yfj018yfj018_1769761709598.png';
import budwellImage from '@assets/Gemini_Generated_Image_b8akhob8akhob8ak_1769761724083.png';

const projects = [
  {
    id: 1,
    title: 'Study Buddy',
    description: 'A cutting-edge Smart Garden monitoring system designed for precision plant care. Features real-time environmental data tracking, automated alerts, and intelligent growth analytics.',
    image: budwellImage,
    tags: ['Web Development', 'IoT'],
    github: 'https://github.com/andrieVerdev/Budwell',
    gitlab: 'https://github.com/andrieVerdev/Budwell',
    requirements: {
      'IoT Integration': ['Real-time Sensor Data Monitoring', 'Automated Plant Care Logic', 'Smart Environmental Tracking'],
      'Dashboard & Analytics': ['Growth Performance Tracking', 'Moisture & Light Analytics', 'Mobile-Responsive Interface'],
    },
  },
  {
    id: 2,
    title: 'TaskTracker',
    description: 'A robust task management system featuring categorized tracking, real-time status updates, and interactive data visualization for productivity monitoring.',
    image: taskTrackerImage,
    tags: ['Web Development', 'Python'],
    github: 'https://github.com/andrieVerdev/TaskTracker',
    gitlab: 'https://gitlab.com/veronqueandrei/Webtracker.git',
    requirements: {
      'Core Implementation': ['Flask Backend Architecture', 'RESTful API Integration', 'PostgreSQL Database Schema'],
      'Documentation & Setup': ['Comprehensive README.md', 'Environment Configuration (.env)', 'Requirement Specifications'],
      'Security & Optimization': ['Password Hashing', 'Session Management', 'Query Optimization'],
      'Development Tools': ['CI/CD Workflow Scripts', 'Unit Testing Suite', 'Migration Management'],
    },
  },
  {
    id: 3,
    title: 'EVACS-SYSTEM',
    description: 'A professional IT Solutions & Business Services Access Control System. Features real-time check-in/out tracking, visitor management, activity logging, and comprehensive employee data management with a premium futuristic UI.',
    image: evacsImage,
    tags: ['Web Development', 'PostgreSQL'],
    github: 'https://github.com/andrieVerdev/EVACS-SYSTEM',
    gitlab: 'https://gitlab.com/veronqueandrei/EVACS-SYSTEM.git',
    requirements: {
      'Enterprise Features': ['Real-time Check-in/Check-out', 'Visitor Management System', 'Comprehensive Activity Logging'],
      'Data Management': ['Employee Database', 'Encrypted Data Storage', 'Administrative Control Panel'],
      'UI/UX Design': ['Premium Futuristic Interface', 'Dark/Light Mode Support', 'Interactive Dashboards'],
      'Infrastructure': ['Secure API Architecture', 'Real-time Event Handling', 'Audit Trail Generation'],
    },
  },
  {
    id: 4,
    title: 'Library Management System',
    description: 'A sophisticated digital library solution with automated inventory tracking, member portal, and intelligent search capabilities.',
    image: libraryImage,
    tags: ['Software Development', 'Java'],
    github: 'https://github.com/andrieVerdev/LIbrayManagement-System.git',
    gitlab: 'https://gitlab.com/veronqueandrei/LIbrayManagement-System.git',
    requirements: {
      'Application Logic': ['Spring Security Auth', 'Hibernate ORM Mapping', 'Transactional Inventory Management'],
      'Frontend': ['Thymeleaf Templates', 'Interactive Search Filters', 'User Profile Management'],
      'Persistence': ['Relational Database Design', 'Automated Backup Scripts', 'Data Integrity Constraints'],
    },
  },
  {
    id: 5,
    title: 'Facial Recognition AI',
    description: 'State-of-the-art computer vision system implementing deep learning models for high-accuracy face detection and biometric authentication.',
    image: aiFaceImage,
    tags: ['Artificial Intelligence', 'Python'],
    github: 'https://github.com/andrieVerdev/Facial-AI',
    gitlab: 'https://github.com/andrieVerdev/Facial-AI.git',
    requirements: {
      'AI & ML Models': ['Convolutional Neural Networks (CNN)', 'MTCNN for Face Detection', 'Facenet for Embeddings'],
      'Implementation': ['Real-time Video Processing', 'Biometric Database Integration', 'GPU Acceleration Support'],
      'Validation': ['Accuracy Benchmarking', 'Anti-Spoofing Protocols', 'Performance Optimization'],
    },
  },
];

export default function ProjectsSection() {
  const [filter, setFilter] = useState('All');

  const categories = useMemo(() => {
    const allTags = projects.flatMap(p => p.tags);
    return ['All', ...Array.from(new Set(allTags))];
  }, []);

  const filteredProjects = useMemo(() => {
    if (filter === 'All') return projects;
    return projects.filter(p => p.tags.includes(filter));
  }, [filter]);

  return (
    <section id="projects" className="relative py-20 md:py-32 bg-card/30">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-center mb-4">
          Projects
        </h2>
        <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
          Explore my recent projects and technical work
        </p>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={filter === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(cat)}
              className={`rounded-full transition-all duration-300 ${
                filter === cat 
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                  : "hover:border-primary/50 hover:bg-primary/5"
              }`}
              data-testid={`filter-button-${cat.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {cat}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8">
          {filteredProjects.map((project, projectIndex) => (
            <AnimationWrapper 
              key={`${project.id}-${filter}`}
              type="fade"
              direction="up"
              delay={projectIndex * 150}
              duration={700}
            >
              <Card
                className="group relative overflow-hidden transition-all duration-500 border-0 bg-transparent hover:shadow-2xl hover:shadow-primary/20"
                data-testid={`project-card-${project.id}`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-card/80 via-card/40 to-card/60 backdrop-blur-xl border border-primary/20 rounded-2xl -z-10" />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                  {/* Project Image Panel */}
                  <div className="lg:col-span-6 relative group/img overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full min-h-[400px] object-contain bg-background/20 p-4 transition-transform duration-1000 group-hover/img:scale-105"
                    />
                    
                    <div className="absolute top-4 left-4 z-30">
                      <div className="p-2 bg-primary/20 backdrop-blur-md rounded-lg border border-primary/30">
                        <CheckCircle2 className="w-5 h-5 text-primary shadow-glow" />
                      </div>
                    </div>
                  </div>

                  {/* Project Info Panel */}
                  <div className="lg:col-span-6 p-8 flex flex-col justify-between">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] uppercase tracking-[0.3em] text-primary/70 font-bold">Project {project.id}</span>
                          <div className="h-[1px] w-8 bg-primary/30" />
                        </div>
                        <h3 className="text-3xl md:text-4xl font-heading font-extrabold tracking-tight group-hover:text-primary transition-colors duration-300">
                          {project.title}
                        </h3>
                      </div>

                      <p className="text-muted-foreground/90 text-sm md:text-base leading-relaxed font-medium">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, index) => (
                          <Badge 
                            key={index} 
                            variant="outline" 
                            className="bg-primary/5 border-primary/20 text-primary/80 hover:bg-primary/10 transition-colors"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {Object.entries(project.requirements).slice(0, 2).map(([category, items], index) => (
                          <div key={index} className="space-y-3">
                            <h4 className="text-xs uppercase tracking-widest text-primary/60 font-bold flex items-center gap-2">
                              <div className="w-1 h-1 rounded-full bg-primary" />
                              {category}
                            </h4>
                            <ul className="space-y-2">
                              {items.slice(0, 3).map((item: string, itemIndex: number) => (
                                <li key={itemIndex} className="text-xs text-muted-foreground flex items-center gap-2">
                                  <div className="w-1 h-[1px] bg-primary/30" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mt-8 pt-6 border-t border-primary/10">
                      <Button
                        variant="outline"
                        className="rounded-xl border-primary/20 bg-primary/5 hover:bg-primary hover:text-primary-foreground transition-all duration-300 flex-1"
                        asChild
                      >
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4 mr-2" />
                          Source Code
                        </a>
                      </Button>
                      <Button
                        className="rounded-xl bg-primary text-primary-foreground hover-elevate transition-all duration-300 flex-1"
                        asChild
                      >
                        <a href={project.gitlab} target="_blank" rel="noopener noreferrer">
                          <SiGitlab className="h-4 w-4 mr-2" />
                          Documentation
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </AnimationWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
