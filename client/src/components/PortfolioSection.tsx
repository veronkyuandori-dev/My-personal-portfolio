import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';
import webAppImage from '@assets/generated_images/Web_application_project_mockup_cee38b23.png';
import mobileAppImage from '@assets/generated_images/Mobile_app_project_mockup_a09a7bdc.png';
import landingPageImage from '@assets/generated_images/Landing_page_project_mockup_b8ca1d1f.png';

// todo: remove mock functionality
const projects = [
  {
    id: 1,
    title: 'Task Management Dashboard',
    description: 'A comprehensive task management application with real-time collaboration features, drag-and-drop interface, and advanced analytics.',
    image: webAppImage,
    tags: ['React', 'TypeScript', 'Node.js', 'MongoDB'],
    category: 'Web Dev',
    github: '#',
    demo: '#',
  },
  {
    id: 2,
    title: 'E-Commerce Mobile App',
    description: 'Modern mobile shopping experience with seamless checkout, personalized recommendations, and integrated payment gateway.',
    image: mobileAppImage,
    tags: ['React Native', 'Firebase', 'Redux'],
    category: 'Mobile',
    github: '#',
    demo: '#',
  },
  {
    id: 3,
    title: 'SaaS Landing Page',
    description: 'High-converting landing page with modern animations, responsive design, and optimized for SEO and performance.',
    image: landingPageImage,
    tags: ['Next.js', 'Tailwind CSS', 'Framer Motion'],
    category: 'Design',
    github: '#',
    demo: '#',
  },
  {
    id: 4,
    title: 'Analytics Platform',
    description: 'Real-time data visualization platform with customizable dashboards and automated reporting capabilities.',
    image: webAppImage,
    tags: ['Vue.js', 'D3.js', 'PostgreSQL'],
    category: 'Web Dev',
    github: '#',
    demo: '#',
  },
  {
    id: 5,
    title: 'Fitness Tracking App',
    description: 'Mobile application for tracking workouts, nutrition, and progress with AI-powered insights and recommendations.',
    image: mobileAppImage,
    tags: ['Flutter', 'Python', 'TensorFlow'],
    category: 'Mobile',
    github: '#',
    demo: '#',
  },
  {
    id: 6,
    title: 'Portfolio Template',
    description: 'Modern, customizable portfolio template for developers and designers with dark mode and smooth animations.',
    image: landingPageImage,
    tags: ['React', 'GSAP', 'Three.js'],
    category: 'Design',
    github: '#',
    demo: '#',
  },
];

const categories = ['All', 'Web Dev', 'Mobile', 'Design'];

export default function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="portfolio" className="relative py-20 md:py-32 bg-card/30">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-center mb-4">
          Portfolio
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Explore my recent projects and creative work
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? 'default' : 'outline'}
              onClick={() => setActiveCategory(category)}
              className="rounded-full hover-elevate active-elevate-2"
              data-testid={`filter-${category.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
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
