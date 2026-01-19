import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, CheckCircle2 } from 'lucide-react';
import { SiGitlab } from 'react-icons/si';
import AnimationWrapper from './AnimationWrapper';
import taskTrackerImage from '@assets/Screenshot_2026-01-19_18.18.42_1768818467330.png';
import libraryImage from '@assets/Screenshot_2026-01-19_17.32.03_1768815472032.png';
import aiFaceImage from '@assets/Screenshot_2026-01-19_18.27.08_1768818443570.png';
import evacsImage from '@assets/Screenshot_2026-01-19_18.12.39_1768818486570.png';

const projects = [
  {
    id: 1,
    title: 'TaskTracker',
    description: 'A robust task management system featuring categorized tracking, real-time status updates, and interactive data visualization for productivity monitoring.',
    image: taskTrackerImage,
    tags: ['Python', 'Flask', 'PostgreSQL', 'SQLAlchemy'],
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
    id: 2,
    title: 'EVACS-SYSTEM',
    description: 'A professional IT Solutions & Business Services Access Control System. Features real-time check-in/out tracking, visitor management, activity logging, and comprehensive employee data management with a premium futuristic UI.',
    image: evacsImage,
    tags: ['React.js', 'Node.js', 'PostgreSQL', 'Futuristic UI'],
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
    id: 3,
    title: 'Library Management System',
    description: 'A sophisticated digital library solution with automated inventory tracking, member portal, and intelligent search capabilities.',
    image: libraryImage,
    tags: ['Java', 'Spring Boot', 'MySQL', 'Hibernate'],
    github: 'https://github.com/andrieVerdev/LIbrayManagement-System.git',
    gitlab: 'https://gitlab.com/veronqueandrei/LIbrayManagement-System.git',
    requirements: {
      'Application Logic': ['Spring Security Auth', 'Hibernate ORM Mapping', 'Transactional Inventory Management'],
      'Frontend': ['Thymeleaf Templates', 'Interactive Search Filters', 'User Profile Management'],
      'Persistence': ['Relational Database Design', 'Automated Backup Scripts', 'Data Integrity Constraints'],
    },
  },
  {
    id: 4,
    title: 'Facial Recognition AI',
    description: 'State-of-the-art computer vision system implementing deep learning models for high-accuracy face detection and biometric authentication.',
    image: aiFaceImage,
    tags: ['Python', 'OpenCV', 'TensorFlow', 'PyTorch'],
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
  return (
    <section id="projects" className="relative py-20 md:py-32 bg-card/30">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-center mb-4">
          Projects
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Explore my recent projects and technical work
        </p>

        <div className="grid grid-cols-1 gap-8">
          {projects.map((project, projectIndex) => (
            <AnimationWrapper 
              key={project.id}
              type="fade"
              direction="up"
              delay={projectIndex * 150}
              duration={700}
            >
              <Card
                className="overflow-hidden hover-elevate transition-all duration-300 border border-primary/20 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/40 bg-background/50 backdrop-blur-sm"
                data-testid={`project-card-${project.id}`}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                  {/* Project Image & Info */}
                  <div className="md:col-span-1 space-y-4">
                    <div className="group relative aspect-video overflow-hidden rounded-xl border-2 border-primary/20 bg-muted/20">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 z-10 opacity-60 group-hover:opacity-30 transition-opacity duration-500" />
                      <div className="absolute inset-0 border-2 border-primary/40 z-20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 scale-105 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
                      />
                      <div className="absolute bottom-2 right-2 z-30 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <Badge variant="outline" className="bg-background/80 backdrop-blur-md border-primary/50 text-[10px] uppercase tracking-widest px-2 py-0">
                          Source View
                        </Badge>
                      </div>
                    </div>
                    <div className="pt-2">
                      <h3 className="text-xl md:text-2xl font-bold mb-2">{project.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs px-2.5 py-1">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="secondary"
                          className="rounded-full hover-elevate active-elevate-2 flex-1"
                          asChild
                          data-testid={`button-github-${project.id}`}
                        >
                          <a href={project.github} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4 mr-2" />
                            GitHub
                          </a>
                        </Button>
                        <Button
                          size="sm"
                          className="rounded-full hover-elevate active-elevate-2 flex-1"
                          asChild
                          data-testid={`button-gitlab-${project.id}`}
                        >
                          <a href={project.gitlab} target="_blank" rel="noopener noreferrer">
                            <SiGitlab className="h-4 w-4 mr-2" />
                            GitLab
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Requirements Checklist */}
                  <div className="md:col-span-2">
                    <h4 className="text-lg font-heading font-bold mb-4 text-primary">Source Code Includes:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(project.requirements).map(([category, items], index) => (
                        <div key={index} className="space-y-2">
                          <h5 className="text-sm font-semibold text-primary flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4" />
                            {category}
                          </h5>
                          <ul className="space-y-1 ml-6">
                            {items.map((item: string, itemIndex: number) => (
                              <li key={itemIndex} className="text-xs text-foreground flex items-start gap-2">
                                <span className="text-primary mt-0.5">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
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
