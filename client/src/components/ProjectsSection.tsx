import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, X, CheckCircle2 } from 'lucide-react';
import { SiGitlab } from 'react-icons/si';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import CoverflowCarousel, { CoverflowItem } from './CoverflowCarousel';

import taskTrackerImage from '@assets/Screenshot_2026-01-29_23.27.03_1769762225609.png';
import libraryImage from '@assets/Screenshot_2026-01-29_23.21.52_1769762002287.png';
import aiFaceImage from '@assets/Screenshot_2026-01-30_16.32.23_1769761975016.png';
import evacsImage from '@assets/Gemini_Generated_Image_j018yfj018yfj018_1769761709598.png';
import budwellImage from '@assets/Gemini_Generated_Image_b8akhob8akhob8ak_1769761724083.png';
import fluppyBirdImage from '@assets/Gemini_Generated_Image_p4dnkip4dnkip4dn_1770347828961.png';
import qrAttendanceImage from '@assets/ChatGPT_Image_Mar_28,_2026,_09_29_04_PM_1774704759357.png';
import lagunaTouristImage from '@assets/ChatGPT_Image_Mar_28,_2026,_09_31_59_PM_1774704734722.png';

const projects = [
  {
    id: 1,
    title: 'Fluppy Bird',
    description: 'A charming side-scrolling game featuring "Fluppy", a bird navigating through challenging obstacles with smooth physics-based movement and responsive controls.',
    image: fluppyBirdImage,
    tags: ['Game Development', 'Python', 'Pygame'],
    github: 'https://github.com/andrieVerdev/FLUPPYBIRD',
    live: 'https://github.com/andrieVerdev/FLUPPYBIRD',
    requirements: {
      'Game Mechanics': ['Physics-based movement', 'Collision detection', 'Score tracking system'],
      'Development': ['Pygame implementation', 'Asset management', 'Game state handling'],
    },
    techStack: ['Python', 'Pygame', 'Physics Engine', 'Game Loop'],
  },
  {
    id: 2,
    title: 'Study Buddy',
    description: 'A collaborative academic application connecting students for peer learning and study group management with interactive resource sharing and real-time collaboration.',
    image: budwellImage,
    tags: ['Web Development', 'Collaboration'],
    github: 'https://github.com/andrieVerdev/Budwell',
    live: 'https://github.com/andrieVerdev/Budwell',
    requirements: {
      'Collaboration': ['Real-time Peer-to-Peer Learning', 'Study Group Management', 'Academic Resource Sharing'],
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
    live: 'https://gitlab.com/veronqueandrei/Webtracker.git',
    requirements: {
      'Core': ['Flask Backend Architecture', 'RESTful API Integration', 'PostgreSQL Database Schema'],
      'Security': ['Password Hashing', 'Session Management', 'Query Optimization'],
    },
    techStack: ['Flask', 'PostgreSQL', 'Python', 'REST API', 'CI/CD'],
  },
  {
    id: 4,
    title: 'EVACS-SYSTEM',
    description: 'An IT Solutions Access Control System with real-time check-in/out tracking, visitor management, activity logging, and comprehensive employee data management.',
    image: evacsImage,
    tags: ['Web Development', 'PostgreSQL'],
    github: 'https://github.com/andrieVerdev/EVACS-SYSTEM',
    live: 'https://gitlab.com/veronqueandrei/EVACS-SYSTEM.git',
    requirements: {
      'Enterprise': ['Real-time Check-in/Check-out', 'Visitor Management System', 'Comprehensive Activity Logging'],
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
    live: 'https://gitlab.com/veronqueandrei/LIbrayManagement-System.git',
    requirements: {
      'Application Logic': ['Spring Security Auth', 'Hibernate ORM Mapping', 'Transactional Inventory Management'],
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
    live: 'https://github.com/andrieVerdev/Facial-AI.git',
    requirements: {
      'AI & ML': ['Convolutional Neural Networks (CNN)', 'MTCNN for Face Detection', 'Facenet for Embeddings'],
      'Implementation': ['Real-time Video Processing', 'Biometric Database Integration', 'GPU Acceleration Support'],
    },
    techStack: ['Python', 'TensorFlow', 'OpenCV', 'Deep Learning', 'Biometrics'],
  },
  {
    id: 7,
    title: 'QR Attendance System',
    description: 'A modern QR-code-based attendance tracking system enabling fast contactless check-ins with real-time scan decoding, attendance dashboard, and CSV export.',
    image: qrAttendanceImage,
    tags: ['Web Development', 'JavaScript'],
    github: 'https://github.com/andrieVerdev/QR-Attendance-System',
    live: 'https://github.com/andrieVerdev/QR-Attendance-System',
    requirements: {
      'Core Features': ['QR Code Generation per Student', 'Camera & Image-Upload Scanning', 'Real-time Attendance Logging'],
      'Data & Export': ['Attendance Dashboard', 'CSV Export for Records', 'Search & Filter by Date/Name'],
    },
    techStack: ['JavaScript', 'HTML5', 'CSS3', 'jsQR', 'Canvas API', 'LocalStorage'],
  },
  {
    id: 8,
    title: 'Laguna Tourist Spot Guide',
    description: 'An interactive web travel guide for Laguna, Philippines showcasing landmarks, natural wonders, and cultural sites with photo galleries and location maps.',
    image: lagunaTouristImage,
    tags: ['Web Development', 'JavaScript'],
    github: 'https://github.com/andrieVerdev/Laguna-Tourist-Spot',
    live: 'https://github.com/andrieVerdev/Laguna-Tourist-Spot',
    requirements: {
      'Content': ['Interactive Tourist Spot Listings', 'Photo Gallery per Destination', 'Location & Map Integration'],
      'User Experience': ['Mobile-Responsive Layout', 'Category Filter by Attraction Type', 'Travel Tips & Local Info'],
    },
    techStack: ['HTML5', 'CSS3', 'JavaScript', 'Google Maps API', 'Responsive Design'],
  },
];

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const carouselItems: CoverflowItem[] = projects.map((p) => ({
    image: p.image,
    title: p.title,
    subtitle: p.tags.join(' · '),
    badge: p.tags[0],
  }));

  const handleSelect = (index: number) => {
    setSelectedProject(index);
  };

  const project = selectedProject !== null ? projects[selectedProject] : null;

  return (
    <section id="projects" className="relative py-20 md:py-32 bg-card/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-center mb-4">
          Projects
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Drag or tap to explore — click the center card to view details
        </p>

        <CoverflowCarousel
          items={carouselItems}
          onSelect={handleSelect}
          cardWidth={300}
          cardHeight={400}
          autoPlayInterval={4000}
        />
      </div>

      {/* Project Detail Dialog */}
      <Dialog open={selectedProject !== null} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {project && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-heading pr-8">{project.title}</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div className="rounded-xl overflow-hidden border border-border aspect-video">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                </div>

                <p className="text-muted-foreground leading-relaxed">{project.description}</p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <Badge key={i} variant="secondary" className="bg-primary/10 border border-primary/20 text-primary text-xs uppercase tracking-wider">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((t, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-xs text-muted-foreground font-semibold uppercase tracking-tight">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                  {Object.entries(project.requirements).map(([cat, items], i) => (
                    <div key={i} className="space-y-3">
                      <h4 className="text-xs uppercase tracking-widest text-primary font-black flex items-center gap-2">
                        <span className="w-5 h-5 rounded bg-primary/10 border border-primary/20 flex items-center justify-center text-[10px]">0{i+1}</span>
                        {cat}
                      </h4>
                      <ul className="space-y-2">
                        {items.map((item, j) => (
                          <li key={j} className="flex items-start gap-3 text-sm text-muted-foreground">
                            <CheckCircle2 className="h-4 w-4 text-primary/60 mt-0.5 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
                  <Button variant="outline" className="rounded-xl flex-1" asChild>
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" /> Source Code
                    </a>
                  </Button>
                  <Button className="rounded-xl flex-1 bg-primary text-primary-foreground" asChild>
                    <a href={project.live} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" /> View Project
                    </a>
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
