import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';
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
    github: '#',
    demo: '#',
  },
  {
    id: 2,
    title: 'Buddydash',
    description: 'Educational platform connecting students with learning resources and collaborative study features.',
    image: buddydashImage,
    tags: ['Dart', 'Java', 'MongoDB'],
    github: '#',
    demo: '#',
  },
  {
    id: 3,
    title: 'Library Management System',
    description: 'Complete library management solution for tracking books, managing inventory, and handling member records.',
    image: libraryImage,
    tags: ['Python', 'PostgreSQL', 'HTML5'],
    github: '#',
    demo: '#',
  },
  {
    id: 4,
    title: 'AI Facial Recognition',
    description: 'Advanced facial recognition system using artificial intelligence for secure authentication and identification.',
    image: aiFaceImage,
    tags: ['Python', 'C++', 'MongoDB'],
    github: '#',
    demo: '#',
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
          {projects.map((project) => (
            <Card
              key={project.id}
              className="group overflow-hidden hover-elevate transition-all duration-300"
              data-testid={`project-card-${project.id}`}
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4 gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="rounded-full"
                    data-testid={`button-github-${project.id}`}
                  >
                    <Github className="h-4 w-4 mr-2" />
                    Code
                  </Button>
                  <Button
                    size="sm"
                    className="rounded-full"
                    data-testid={`button-demo-${project.id}`}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Demo
                  </Button>
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
