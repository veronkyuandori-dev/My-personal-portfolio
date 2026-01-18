import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, CheckCircle2 } from 'lucide-react';
import { SiGitlab } from 'react-icons/si';
import AnimationWrapper from './AnimationWrapper';
import webtrackerImage from '@assets/Screenshot 2025-10-29 01.25.41_1761673713445.png';
import buddydashImage from '@assets/Screenshot 2025-10-29 01.24.11_1761673731499.png';
import libraryImage from '@assets/Screenshot 2025-10-29 01.20.09_1761673748927.png';
import aiFaceImage from '@assets/Screenshot 2025-10-29 01.16.19_1761673779384.png';

const projects = [
  {
    id: 1,
    title: 'TaskTracker',
    description: 'A robust task management system featuring categorized tracking, real-time status updates, and interactive data visualization for productivity monitoring.',
    image: webtrackerImage,
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
    description: 'Emergency Evacuation Coordination System utilizing IoT integration and real-time mapping for efficient disaster response and civilian safety management.',
    image: buddydashImage,
    tags: ['React.js', 'Node.js', 'Socket.io', 'Leaflet'],
    github: 'https://github.com/andrieVerdev/EVACS-SYSTEM',
    gitlab: 'https://gitlab.com/veronqueandrei/EVACS-SYSTEM.git',
    requirements: {
      'System Core': ['Real-time WebSocket Communication', 'Dynamic Map Integration', 'Incident Reporting Engine'],
      'Infrastructure': ['Node.js Microservices', 'GeoJSON Data Handling', 'Scalable Cloud Hosting'],
      'Interface': ['Responsive Dashboard UI', 'Mobile-Friendly Alerts', 'Admin Control Panel'],
      'Compliance': ['Data Privacy Protocols', 'Standardized Emergency Codes'],
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
                    <div className="relative aspect-video overflow-hidden rounded-lg">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                    </div>
                    <div>
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
