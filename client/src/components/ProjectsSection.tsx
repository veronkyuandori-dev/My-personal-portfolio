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
    title: 'Webtracker',
    description: 'A comprehensive web tracking and analytics application for monitoring online activities and generating detailed reports.',
    image: webtrackerImage,
    tags: ['HTML5', 'Python', 'PostgreSQL'],
    github: 'https://github.com/bukosalad123/Webtracker.git',
    gitlab: 'https://gitlab.com/veronqueandrei/Webtracker.git',
    requirements: {
      'Complete Code': ['Kumpletong code ng app (frontend, backend, o pareho)', 'Maayos ang folder structure (hal. src/, lib/, assets/)'],
      'README.md': ['Pangalan ng app', 'Ano ang ginagawa ng app', 'Features list', 'Requirements (Node, Python version, etc.)', 'Paano i-install at patakbuhin'],
      'Configuration Files': ['package.json (Node.js)', 'requirements.txt (Python)', '.env.example (sample environment variables)'],
      '.gitignore': ['Compiled files', 'node_modules', 'Cache files', 'Secret files'],
      'Documentation': ['docs/ folder o markdown files', 'API documentation', 'Simple explanation ng flow ng app'],
      'License': ['MIT, Apache 2.0, o iba'],
      'Tests': ['Unit tests', 'Integration tests', 'Testing folder (hal. tests/)'],
    },
  },
  {
    id: 2,
    title: 'Buddydash',
    description: 'Educational platform connecting students with learning resources and collaborative study features.',
    image: buddydashImage,
    tags: ['Dart', 'Java', 'MongoDB'],
    github: 'https://github.com/bukosalad123/BuddyDash.git',
    gitlab: 'https://gitlab.com/veronqueandrei/BuddyDash.git',
    requirements: {
      'Complete Code': ['Kumpletong code ng app (frontend, backend, o pareho)', 'Maayos ang folder structure (hal. src/, lib/, assets/)'],
      'README.md': ['Pangalan ng app', 'Ano ang ginagawa ng app', 'Features list', 'Requirements (Node, Python version, etc.)', 'Paano i-install at patakbuhin'],
      'Configuration Files': ['pubspec.yaml (Flutter)', 'package.json (Node.js)', '.env.example (sample environment variables)'],
      '.gitignore': ['Compiled files', 'node_modules', 'Cache files', 'Secret files'],
      'Documentation': ['docs/ folder o markdown files', 'API documentation', 'Simple explanation ng flow ng app'],
      'License': ['MIT, Apache 2.0, o iba'],
      'Issues & Milestones': ['Issues – para sa bugs at tasks', 'Milestones – para sa project progress', 'Labels – para maayos ang tracking'],
    },
  },
  {
    id: 3,
    title: 'Library Management System',
    description: 'Complete library management solution for tracking books, managing inventory, and handling member records.',
    image: libraryImage,
    tags: ['Python', 'PostgreSQL', 'HTML5'],
    github: 'https://github.com/bukosalad123/LIbrayManagement-System.git',
    gitlab: 'https://gitlab.com/veronqueandrei/LIbrayManagement-System.git',
    requirements: {
      'Complete Code': ['Kumpletong code ng app (frontend, backend, o pareho)', 'Maayos ang folder structure (hal. src/, lib/, assets/)'],
      'README.md': ['Pangalan ng app', 'Ano ang ginagawa ng app', 'Features list', 'Requirements (Node, Python version, etc.)', 'Paano i-install at patakbuhin', 'Screenshots'],
      'Configuration Files': ['requirements.txt (Python)', 'package.json (Node.js)', '.env.example (sample environment variables)'],
      '.gitignore': ['Compiled files', 'node_modules', 'Cache files', 'Secret files'],
      'Documentation': ['docs/ folder o markdown files', 'API documentation', 'Simple explanation ng flow ng app'],
      'License': ['MIT, Apache 2.0, o iba'],
      'Tests': ['Unit tests', 'Integration tests', 'Testing folder (hal. tests/)'],
    },
  },
  {
    id: 4,
    title: 'AI Facial Recognition',
    description: 'Advanced facial recognition system using artificial intelligence for secure authentication and identification.',
    image: aiFaceImage,
    tags: ['Python', 'C++', 'MongoDB'],
    github: 'https://github.com/bukosalad123/facial-recognition.git',
    gitlab: 'https://github.com/bukosalad123/facial-recognition.git',
    requirements: {
      'Complete Code': ['Kumpletong code ng app (frontend, backend, o pareho)', 'Maayos ang folder structure (hal. src/, lib/, assets/)'],
      'README.md': ['Pangalan ng app', 'Ano ang ginagawa ng app', 'Features list', 'Requirements (Node, Python version, etc.)', 'Paano i-install at patakbuhin'],
      'Configuration Files': ['requirements.txt (Python)', '.env.example (sample environment variables)', 'package.json (Node.js)'],
      '.gitignore': ['Compiled files', 'node_modules', 'Cache files', 'Secret files'],
      'Documentation': ['docs/ folder o markdown files', 'API documentation', 'Simple explanation ng flow ng app'],
      'License': ['MIT, Apache 2.0, o iba'],
      'CI/CD': ['Automatic testing', 'Automatic build/deploy'],
      'Tests': ['Unit tests', 'Integration tests', 'Testing folder (hal. tests/)'],
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
