import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';
import { SiGitlab } from 'react-icons/si';
import AnimationWrapper from './AnimationWrapper';
import webtrackerImage from '@assets/Screenshot 2025-10-29 01.25.41_1761673713445.png';
import buddydashImage from '@assets/Screenshot 2025-10-29 01.24.11_1761673731499.png';
import libraryImage from '@assets/Screenshot 2025-10-29 01.20.09_1761673748927.png';
import aiFaceImage from '@assets/Screenshot 2025-10-29 01.16.19_1761673779384.png';

const projects = [
  {
    id: 1,
    title: 'Webtracker',
    description: 'A comprehensive web tracking and analytics application for monitoring online activities and generating detailed reports.',
    image: webtrackerImage,
    tags: ['HTML5', 'Python', 'PostgreSQL'],
    github: 'https://github.com/bukosalad123/Webtracker.git',
    gitlab: 'https://gitlab.com/veronqueandrei/Webtracker.git',
  },
  {
    id: 2,
    title: 'Buddydash',
    description: 'Educational platform connecting students with learning resources and collaborative study features.',
    image: buddydashImage,
    tags: ['Dart', 'Java', 'MongoDB'],
    github: 'https://github.com/bukosalad123/BuddyDash.git',
    gitlab: 'https://gitlab.com/veronqueandrei/BuddyDash.git',
  },
  {
    id: 3,
    title: 'Library Management System',
    description: 'Complete library management solution for tracking books, managing inventory, and handling member records.',
    image: libraryImage,
    tags: ['Python', 'PostgreSQL', 'HTML5'],
    github: 'https://github.com/bukosalad123/LIbrayManagement-System.git',
    gitlab: 'https://gitlab.com/veronqueandrei/LIbrayManagement-System.git',
  },
  {
    id: 4,
    title: 'AI Facial Recognition',
    description: 'Advanced facial recognition system using artificial intelligence for secure authentication and identification.',
    image: aiFaceImage,
    tags: ['Python', 'C++', 'MongoDB'],
    github: 'https://github.com/bukosalad123/facial-recognition.git',
    gitlab: 'https://github.com/bukosalad123/facial-recognition.git',
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, projectIndex) => (
            <AnimationWrapper 
              key={project.id}
              type="fade"
              direction="up"
              delay={projectIndex * 150}
              duration={700}
            >
              <Card
                className="group overflow-hidden hover-elevate transition-all duration-300 border border-primary/20 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/40 bg-background/50 backdrop-blur-sm"
                data-testid={`project-card-${project.id}`}
              >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6 gap-3">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="rounded-full hover-elevate active-elevate-2"
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
                    className="rounded-full hover-elevate active-elevate-2"
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

              <CardContent className="p-6">
                <h3 className="text-xl md:text-2xl font-bold mb-3">{project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs px-2.5 py-1">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              </Card>
            </AnimationWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
