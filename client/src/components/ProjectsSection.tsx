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
    description: 'A collaborative academic application designed to connect students for peer learning and study group management. Features interactive resource sharing, group scheduling, and real-time collaboration tools.',
    image: budwellImage,
    tags: ['Web Development', 'Collaboration'],
    github: 'https://github.com/andrieVerdev/Budwell',
    gitlab: 'https://github.com/andrieVerdev/Budwell',
    requirements: {
      'Collaboration Features': ['Real-time Peer-to-Peer Learning', 'Study Group Management', 'Academic Resource Sharing'],
      'User Experience': ['Interactive Group Scheduling', 'Mobile-Responsive Portal', 'Student Networking Tools'],
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
                className="group relative overflow-hidden transition-all duration-500 border-0 bg-transparent hover:shadow-2xl hover:shadow-primary/10 rounded-2xl"
                data-testid={`project-card-${project.id}`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-card/40 via-card/20 to-card/30 backdrop-blur-2xl border border-white/10 rounded-2xl -z-10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)]" />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                  {/* Project Image Panel */}
                  <div className="lg:col-span-5 relative group/img overflow-hidden bg-black/40 border-r border-white/5">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full min-h-[350px] object-contain p-6 transition-transform duration-1000 group-hover/img:scale-105 filter drop-shadow-[0_0_15px_rgba(34,197,94,0.3)]"
                    />
                    
                    <div className="absolute top-6 left-6 z-30">
                      <div className="p-2.5 bg-primary/20 backdrop-blur-xl rounded-xl border border-primary/40 shadow-lg shadow-primary/20">
                        <CheckCircle2 className="w-5 h-5 text-primary shadow-glow" />
                      </div>
                    </div>
                  </div>

                  {/* Project Info Panel */}
                  <div className="lg:col-span-7 p-10 flex flex-col justify-between bg-gradient-to-b from-transparent to-black/20">
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] uppercase tracking-[0.4em] text-primary font-bold opacity-80">Phase {project.id}</span>
                          <div className="h-[1px] w-12 bg-primary/40" />
                        </div>
                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-heading font-black tracking-tight group-hover:text-primary transition-colors duration-300 drop-shadow-sm">
                          {project.title}
                        </h3>
                      </div>

                      <p className="text-muted-foreground/95 text-base md:text-lg leading-relaxed font-medium max-w-2xl">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2.5">
                        {project.tags.map((tag, index) => (
                          <Badge 
                            key={index} 
                            variant="secondary" 
                            className="bg-primary/10 border-primary/30 text-primary font-semibold hover:bg-primary/20 transition-all rounded-lg px-3 py-1"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                        {Object.entries(project.requirements).slice(0, 2).map(([category, items], index) => (
                          <div key={index} className="space-y-4">
                            <h4 className="text-[11px] uppercase tracking-widest text-primary font-black flex items-center gap-2.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                              {category}
                            </h4>
                            <ul className="space-y-3">
                              {items.slice(0, 3).map((item: string, itemIndex: number) => (
                                <li key={itemIndex} className="text-sm text-muted-foreground/80 flex items-start gap-3 group/item">
                                  <div className="mt-2 w-1.5 h-[1px] bg-primary/50 group-hover/item:w-3 transition-all duration-300" />
                                  <span className="group-hover:text-muted-foreground transition-colors">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-5 mt-10 pt-8 border-t border-white/10">
                      <Button
                        variant="outline"
                        className="h-12 rounded-xl border-primary/30 bg-primary/5 hover:bg-primary/20 hover:border-primary/60 transition-all duration-500 flex-1 font-bold group/btn"
                        asChild
                      >
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="h-5 w-5 mr-2.5 transition-transform group-hover/btn:-translate-y-0.5" />
                          Repository
                        </a>
                      </Button>
                      <Button
                        className="h-12 rounded-xl bg-primary text-primary-foreground hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] transition-all duration-500 flex-1 font-bold group/btn"
                        asChild
                      >
                        <a href={project.gitlab} target="_blank" rel="noopener noreferrer">
                          <SiGitlab className="h-5 w-5 mr-2.5 transition-transform group-hover/btn:-translate-y-0.5" />
                          View Project
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
