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
import fluppyBirdImage from '@assets/Gemini_Generated_Image_p4dnkip4dnkip4dn_1770347828961.png';
import qrAttendanceImage from '@assets/qr_attendance_cover.png';
import lagunaTouristImage from '@assets/laguna_tourist_cover.png';

const projects = [
  {
    id: 1,
    title: 'Fluppy Bird',
    description: 'A charming and addictive side-scrolling game featuring "Fluppy", a bird navigating through a series of challenging obstacles. Developed with a focus on smooth physics-based movement and responsive controls.',
    image: fluppyBirdImage,
    tags: ['Game Development', 'Python', 'Pygame'],
    github: 'https://github.com/andrieVerdev/FLUPPYBIRD',
    gitlab: 'https://github.com/andrieVerdev/FLUPPYBIRD',
    requirements: {
      'Game Mechanics': ['Physics-based movement', 'Collision detection', 'Score tracking system'],
      'Development': ['Pygame implementation', 'Asset management', 'Game state handling'],
    },
    techStack: ['Python', 'Pygame', 'Physics Engine', 'Game Loop'],
  },
  {
    id: 2,
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
    techStack: ['React', 'Firebase', 'Tailwind CSS', 'Real-time Sync'],
  },
  {
    id: 3,
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
    techStack: ['Flask', 'PostgreSQL', 'Python', 'REST API', 'CI/CD'],
  },
  {
    id: 4,
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
    techStack: ['PostgreSQL', 'Node.js', 'Express', 'Futuristic UI', 'Real-time'],
  },
  {
    id: 5,
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
    techStack: ['Java', 'Spring Boot', 'Hibernate', 'MySQL', 'Thymeleaf'],
  },
  {
    id: 6,
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
    techStack: ['Python', 'TensorFlow', 'OpenCV', 'Deep Learning', 'Biometrics'],
  },
  {
    id: 7,
    title: 'QR Attendance System',
    description: 'A modern QR-code-based attendance tracking system that enables fast and contactless check-ins. Features QR code generation per student, real-time scan decoding via camera or image upload, attendance dashboard, and CSV export for records management.',
    image: qrAttendanceImage,
    tags: ['Web Development', 'JavaScript'],
    github: 'https://github.com/andrieVerdev/QR-Attendance-System',
    gitlab: 'https://github.com/andrieVerdev/QR-Attendance-System',
    requirements: {
      'Core Features': ['QR Code Generation per Student', 'Camera & Image-Upload Scanning', 'Real-time Attendance Logging'],
      'Data & Export': ['Attendance Dashboard', 'CSV Export for Records', 'Search & Filter by Date/Name'],
    },
    techStack: ['JavaScript', 'HTML5', 'CSS3', 'jsQR', 'Canvas API', 'LocalStorage'],
  },
  {
    id: 8,
    title: 'Laguna Tourist Spot Guide',
    description: 'An interactive web-based travel guide for exploring tourist destinations in Laguna, Philippines. Showcases local landmarks, natural wonders, and cultural sites with rich photo galleries, location maps, and travel tips for visitors.',
    image: lagunaTouristImage,
    tags: ['Web Development', 'JavaScript'],
    github: 'https://github.com/andrieVerdev/Laguna-Tourist-Spot',
    gitlab: 'https://github.com/andrieVerdev/Laguna-Tourist-Spot',
    requirements: {
      'Content & Discovery': ['Interactive Tourist Spot Listings', 'Photo Gallery per Destination', 'Location & Map Integration'],
      'User Experience': ['Mobile-Responsive Layout', 'Category Filter by Attraction Type', 'Travel Tips & Local Info'],
    },
    techStack: ['HTML5', 'CSS3', 'JavaScript', 'Google Maps API', 'Responsive Design'],
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
                className="group relative overflow-hidden transition-all duration-500 border-0 bg-transparent hover:shadow-[0_20px_50px_rgba(34,197,94,0.15)] rounded-3xl"
                data-testid={`project-card-${project.id}`}
              >
                {/* Enhanced Glass Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-card/30 via-card/10 to-card/20 backdrop-blur-3xl border border-white/5 rounded-3xl -z-10 shadow-[inset_0_0_1px_1px_rgba(255,255,255,0.05)]" />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/15 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                  {/* Project Image Panel - Softened and Integrated */}
                  <div className="lg:col-span-5 relative group/img overflow-hidden bg-gradient-to-br from-black/40 to-black/60 border-r border-white/5">
                    <div className="absolute inset-0 bg-primary/5 group-hover/img:bg-transparent transition-colors duration-700" />
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full min-h-[350px] object-contain p-8 transition-all duration-1000 group-hover/img:scale-110 group-hover/img:rotate-1 filter drop-shadow-[0_10px_30px_rgba(34,197,94,0.4)]"
                    />
                    
                    {/* Integrated Indicator */}
                    <div className="absolute top-6 left-6 z-30 transform group-hover/img:scale-110 transition-transform duration-500">
                      <div className="p-3 bg-primary/10 backdrop-blur-2xl rounded-2xl border border-primary/30 shadow-[0_0_20px_rgba(34,197,94,0.3)] group-hover:border-primary/60">
                        <CheckCircle2 className="w-5 h-5 text-primary animate-pulse" />
                      </div>
                    </div>
                  </div>

                  {/* Project Info Panel - Stronger Hierarchy */}
                  <div className="lg:col-span-7 p-12 flex flex-col justify-between bg-gradient-to-br from-transparent via-black/5 to-black/20">
                    <div className="space-y-8">
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <span className="text-[11px] uppercase tracking-[0.5em] text-primary font-black opacity-60">Phase {project.id}</span>
                          <div className="h-[1px] w-16 bg-gradient-to-r from-primary/60 to-transparent" />
                        </div>
                        <h3 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black tracking-tight group-hover:text-primary transition-all duration-500 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] leading-tight">
                          {project.title}
                        </h3>
                      </div>

                      <p className="text-muted-foreground/90 text-lg md:text-xl leading-relaxed font-medium max-w-2xl border-l-2 border-primary/20 pl-6 italic">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-3">
                        {project.tags.map((tag, index) => (
                          <Badge 
                            key={index} 
                            variant="secondary" 
                            className="bg-primary/5 border border-primary/20 text-primary font-bold hover:bg-primary/20 hover:scale-105 transition-all rounded-xl px-4 py-1.5 text-xs uppercase tracking-wider"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Tech Stack Badges */}
                      {'techStack' in project && (
                        <div className="flex flex-wrap gap-2 pt-2">
                          {(project as any).techStack.map((tech: string, idx: number) => (
                            <span 
                              key={idx} 
                              className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] text-muted-foreground font-semibold uppercase tracking-tighter"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Requirements with Icons */}
                      <div className="pt-8 grid grid-cols-1 md:grid-cols-2 gap-10">
                        {Object.entries(project.requirements).slice(0, 2).map(([category, items], index) => (
                          <div key={index} className="space-y-5 group/req">
                            <h4 className="text-[12px] uppercase tracking-[0.2em] text-primary font-black flex items-center gap-3">
                              <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-primary/10 border border-primary/20 text-[10px]">0{index + 1}</span>
                              {category}
                            </h4>
                            <ul className="space-y-4">
                              {items.slice(0, 3).map((item: string, itemIndex: number) => (
                                <li key={itemIndex} className="text-sm text-muted-foreground/80 flex items-start gap-4 group/item hover:text-foreground transition-colors duration-300">
                                  <div className="mt-2.5 w-2 h-2 rounded-full border border-primary/40 group-hover/item:bg-primary group-hover/item:scale-125 transition-all duration-300" />
                                  <span className="font-medium">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Refined CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center gap-6 mt-12 pt-10 border-t border-white/10">
                      <Button
                        variant="outline"
                        className="h-14 w-full sm:w-auto px-8 rounded-2xl border-primary/30 bg-white/5 hover:bg-primary/10 hover:border-primary/60 transition-all duration-500 font-black text-sm uppercase tracking-widest group/btn"
                        asChild
                      >
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="h-5 w-5 mr-3 transition-transform group-hover/btn:-translate-y-1 group-hover/btn:scale-110" />
                          Source Code
                        </a>
                      </Button>
                      <Button
                        className="h-14 w-full sm:w-auto px-8 rounded-2xl bg-primary text-primary-foreground hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] transition-all duration-500 font-black text-sm uppercase tracking-widest group/btn"
                        asChild
                      >
                        <a href={project.gitlab} target="_blank" rel="noopener noreferrer">
                          <SiGitlab className="h-5 w-5 mr-3 transition-transform group-hover/btn:-translate-y-1 group-hover/btn:rotate-12" />
                          Live Demo
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
