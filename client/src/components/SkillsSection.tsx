import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Code2, Database, Wrench, Coffee } from 'lucide-react';
import { SiDart, SiHtml5, SiCplusplus, SiPython, SiFigma, SiPostgresql, SiMongodb } from 'react-icons/si';
import AnimationWrapper from './AnimationWrapper';

const skillCategories = [
  {
    title: 'Programming Languages',
    icon: Code2,
    skills: [
      { name: 'Dart', Icon: SiDart, color: '#0175C2' },
      { name: 'HTML5', Icon: SiHtml5, color: '#E34F26' },
      { name: 'C++', Icon: SiCplusplus, color: '#00599C' },
      { name: 'Python', Icon: SiPython, color: '#3776AB' },
      { name: 'Java', Icon: Coffee, color: '#007396' },
    ],
  },
  {
    title: 'Design & Development Tools',
    icon: Wrench,
    skills: [
      { name: 'Figma', Icon: SiFigma, color: '#F24E1E' },
    ],
  },
  {
    title: 'Databases',
    icon: Database,
    skills: [
      { name: 'PostgreSQL', Icon: SiPostgresql, color: '#4169E1' },
      { name: 'MongoDB', Icon: SiMongodb, color: '#47A248' },
    ],
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="relative py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-center mb-4">
          Skills
        </h2>
        <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
          Technical expertise and proficiencies
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <AnimationWrapper 
              key={categoryIndex}
              type="scale-up"
              delay={categoryIndex * 150}
              duration={600}
            >
              <Card
                className="hover-elevate transition-all duration-300 border border-primary/20 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/30 bg-background/50 backdrop-blur-sm"
                data-testid={`skill-category-${category.title.toLowerCase().replace(/\s+/g, '-')}`}
              >
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-lg md:text-xl">
                  <div className="p-2.5 rounded-md bg-primary/15 hover:bg-primary/20 transition-colors">
                    <category.icon className="h-5 w-5 text-primary" />
                  </div>
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className="flex items-center gap-4 p-4 rounded-lg bg-muted/40 hover:bg-muted/60 transition-all duration-250 hover:scale-105 cursor-default"
                    data-testid={`skill-${skill.name.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <div className="flex-shrink-0">
                      <skill.Icon className="h-7 w-7 transition-transform duration-250" style={{ color: skill.color }} />
                    </div>
                    <span className="text-sm md:text-base font-medium flex-1">{skill.name}</span>
                  </div>
                ))}
              </CardContent>
              </Card>
            </AnimationWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
