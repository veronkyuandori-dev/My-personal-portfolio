import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, CheckCircle2, ArrowUpRight } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

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
    tags: ['Python', 'Pygame', 'Game Dev'],
    github: 'https://github.com/andrieVerdev/FLUPPYBIRD',
    live: 'https://github.com/andrieVerdev/FLUPPYBIRD',
    color: 'from-emerald-500/20 to-transparent',
    requirements: {
      'Game Mechanics': ['Physics-based movement', 'Collision detection', 'Score tracking system'],
      'Development': ['Pygame implementation', 'Asset management', 'Game state handling'],
    },
    techStack: ['Python', 'Pygame', 'Physics Engine', 'Game Loop'],
  },
  {
    id: 2,
    title: 'Study Buddy',
    description: 'A collaborative academic application connecting students for peer learning and study group management with interactive resource sharing.',
    image: budwellImage,
    tags: ['React', 'Firebase', 'Collaboration'],
    github: 'https://github.com/andrieVerdev/Budwell',
    live: 'https://github.com/andrieVerdev/Budwell',
    color: 'from-blue-500/20 to-transparent',
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
    tags: ['Flask', 'PostgreSQL', 'Python'],
    github: 'https://github.com/andrieVerdev/TaskTracker',
    live: 'https://gitlab.com/veronqueandrei/Webtracker.git',
    color: 'from-violet-500/20 to-transparent',
    requirements: {
      'Core': ['Flask Backend Architecture', 'RESTful API Integration', 'PostgreSQL Database Schema'],
      'Security': ['Password Hashing', 'Session Management', 'Query Optimization'],
    },
    techStack: ['Flask', 'PostgreSQL', 'Python', 'REST API', 'CI/CD'],
  },
  {
    id: 4,
    title: 'EVACS System',
    description: 'IT Solutions Access Control System with real-time check-in/out tracking, visitor management, activity logging, and comprehensive employee data management.',
    image: evacsImage,
    tags: ['Node.js', 'PostgreSQL', 'Express'],
    github: 'https://github.com/andrieVerdev/EVACS-SYSTEM',
    live: 'https://gitlab.com/veronqueandrei/EVACS-SYSTEM.git',
    color: 'from-orange-500/20 to-transparent',
    requirements: {
      'Enterprise': ['Real-time Check-in/Check-out', 'Visitor Management System', 'Comprehensive Activity Logging'],
      'Infrastructure': ['Secure API Architecture', 'Real-time Event Handling', 'Audit Trail Generation'],
    },
    techStack: ['PostgreSQL', 'Node.js', 'Express', 'Futuristic UI', 'Real-time'],
  },
  {
    id: 5,
    title: 'Library Management',
    description: 'A sophisticated digital library solution with automated inventory tracking, member portal, and intelligent search capabilities.',
    image: libraryImage,
    tags: ['Java', 'Spring Boot', 'MySQL'],
    github: 'https://github.com/andrieVerdev/LIbrayManagement-System.git',
    live: 'https://gitlab.com/veronqueandrei/LIbrayManagement-System.git',
    color: 'from-cyan-500/20 to-transparent',
    requirements: {
      'Application Logic': ['Spring Security Auth', 'Hibernate ORM Mapping', 'Transactional Inventory Management'],
      'Persistence': ['Relational Database Design', 'Automated Backup Scripts', 'Data Integrity Constraints'],
    },
    techStack: ['Java', 'Spring Boot', 'Hibernate', 'MySQL', 'Thymeleaf'],
  },
  {
    id: 6,
    title: 'Facial Recognition AI',
    description: 'State-of-the-art computer vision system implementing deep learning for high-accuracy face detection and biometric authentication.',
    image: aiFaceImage,
    tags: ['Python', 'TensorFlow', 'OpenCV'],
    github: 'https://github.com/andrieVerdev/Facial-AI',
    live: 'https://github.com/andrieVerdev/Facial-AI.git',
    color: 'from-rose-500/20 to-transparent',
    requirements: {
      'AI & ML': ['Convolutional Neural Networks (CNN)', 'MTCNN for Face Detection', 'Facenet for Embeddings'],
      'Implementation': ['Real-time Video Processing', 'Biometric Database Integration', 'GPU Acceleration Support'],
    },
    techStack: ['Python', 'TensorFlow', 'OpenCV', 'Deep Learning', 'Biometrics'],
  },
  {
    id: 7,
    title: 'QR Attendance',
    description: 'Modern QR-code-based attendance tracking system enabling fast contactless check-ins with real-time scan decoding, dashboard, and CSV export.',
    image: qrAttendanceImage,
    tags: ['JavaScript', 'HTML5', 'jsQR'],
    github: 'https://github.com/andrieVerdev/QR-Attendance-System',
    live: 'https://github.com/andrieVerdev/QR-Attendance-System',
    color: 'from-yellow-500/20 to-transparent',
    requirements: {
      'Core Features': ['QR Code Generation per Student', 'Camera & Image-Upload Scanning', 'Real-time Attendance Logging'],
      'Data & Export': ['Attendance Dashboard', 'CSV Export for Records', 'Search & Filter by Date/Name'],
    },
    techStack: ['JavaScript', 'HTML5', 'CSS3', 'jsQR', 'Canvas API', 'LocalStorage'],
  },
  {
    id: 8,
    title: 'Laguna Tourist Guide',
    description: 'Interactive web travel guide for Laguna, Philippines showcasing landmarks, natural wonders, and cultural sites with photo galleries and maps.',
    image: lagunaTouristImage,
    tags: ['HTML5', 'CSS3', 'Google Maps'],
    github: 'https://github.com/andrieVerdev/Laguna-Tourist-Spot',
    live: 'https://github.com/andrieVerdev/Laguna-Tourist-Spot',
    color: 'from-teal-500/20 to-transparent',
    requirements: {
      'Content': ['Interactive Tourist Spot Listings', 'Photo Gallery per Destination', 'Location & Map Integration'],
      'User Experience': ['Mobile-Responsive Layout', 'Category Filter by Attraction Type', 'Travel Tips & Local Info'],
    },
    techStack: ['HTML5', 'CSS3', 'JavaScript', 'Google Maps API', 'Responsive Design'],
  },
];

export default function ProjectsSection() {
  const [selected, setSelected] = useState<number | null>(null);
  const project = selected !== null ? projects[selected] : null;

  return (
    <section id="projects" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Section header */}
        <div className="mb-16 animate-section-rise">
          <p className="font-mono text-xs text-primary uppercase tracking-[0.3em] mb-3">02 / WORK</p>
          <h2 className="font-heading font-black text-4xl md:text-5xl lg:text-6xl text-foreground tracking-tight">
            Projects
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl">
            A selection of academic and personal projects spanning web, AI, and systems engineering.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {projects.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setSelected(i)}
              className={`group relative text-left rounded-xl border border-border/50 bg-card overflow-hidden hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-0.5 ${i === 0 || i === 5 ? 'sm:col-span-2' : ''}`}
              data-testid={`card-project-${p.id}`}
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className={`absolute inset-0 bg-gradient-to-b ${p.color} opacity-60`} />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                {/* Arrow icon */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/60 backdrop-blur-sm border border-border/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-4 h-4 text-primary" />
                </div>
              </div>

              {/* Content */}
              <div className="p-4 space-y-2">
                <h3 className="font-heading font-bold text-base text-foreground group-hover:text-primary transition-colors leading-tight">
                  {p.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{p.description}</p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {p.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide text-primary/80 bg-primary/8 border border-primary/15">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Detail dialog */}
      <Dialog open={selected !== null} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl">
          {project && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl font-heading font-black pr-8">{project.title}</DialogTitle>
              </DialogHeader>
              <div className="space-y-5">
                <div className="rounded-lg overflow-hidden border border-border aspect-video">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <Badge key={i} variant="secondary" className="text-xs uppercase tracking-wider text-primary bg-primary/10 border border-primary/20">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((t, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-muted/50 border border-border/50 text-[10px] font-mono text-muted-foreground uppercase tracking-tight">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                  {Object.entries(project.requirements).map(([cat, items], i) => (
                    <div key={i} className="space-y-2">
                      <h4 className="text-xs uppercase tracking-widest text-primary font-black flex items-center gap-2">
                        <span className="w-4 h-4 rounded bg-primary/10 border border-primary/20 flex items-center justify-center text-[9px]">0{i + 1}</span>
                        {cat}
                      </h4>
                      <ul className="space-y-1.5">
                        {items.map((item, j) => (
                          <li key={j} className="flex items-start gap-2 text-xs text-muted-foreground">
                            <CheckCircle2 className="h-3.5 w-3.5 text-primary/60 mt-0.5 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3 pt-4 border-t border-border">
                  <Button variant="outline" className="rounded-lg flex-1 text-sm" asChild>
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" /> Source
                    </a>
                  </Button>
                  <Button className="rounded-lg flex-1 text-sm" asChild>
                    <a href={project.live} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" /> View
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
