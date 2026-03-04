import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Code2, Database, Wrench, Coffee } from 'lucide-react';
import { SiDart, SiHtml5, SiCplusplus, SiPython, SiFigma, SiPostgresql, SiMongodb } from 'react-icons/si';
import AnimationWrapper from './AnimationWrapper';

const skillCategories = [
  {
    title: 'Programming Languages',
    icon: Code2,
    skills: [
      { name: 'Dart', Icon: SiDart, color: '#0175C2', level: 85 },
      { name: 'HTML5', Icon: SiHtml5, color: '#E34F26', level: 90 },
      { name: 'C++', Icon: SiCplusplus, color: '#00599C', level: 80 },
      { name: 'Python', Icon: SiPython, color: '#3776AB', level: 85 },
      { name: 'Java', Icon: Coffee, color: '#007396', level: 75 },
    ],
  },
  {
    title: 'Design & Development Tools',
    icon: Wrench,
    skills: [
      { name: 'Figma', Icon: SiFigma, color: '#F24E1E', level: 80 },
    ],
  },
  {
    title: 'Databases',
    icon: Database,
    skills: [
      { name: 'PostgreSQL', Icon: SiPostgresql, color: '#4169E1', level: 85 },
      { name: 'MongoDB', Icon: SiMongodb, color: '#47A248', level: 70 },
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <AnimationWrapper 
              key={categoryIndex}
              type="scale-up"
              delay={categoryIndex * 150}
              duration={600}
            >
              <Card
                className="hover-elevate active-elevate-2 transition-all duration-300 border border-primary/20 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/30 bg-background/50 backdrop-blur-sm overflow-visible"
                data-testid={`skill-category-${category.title.toLowerCase().replace(/\s+/g, '-')}`}
              >
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl md:text-2xl font-heading font-bold">
                  <div className="p-3 rounded-xl bg-primary/15 border border-primary/20 shadow-inner">
                    <category.icon className="h-6 w-6 text-primary" />
                  </div>
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-6 px-6 pb-8">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className="space-y-2 group"
                    data-testid={`skill-${skill.name.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0 p-2 rounded-lg bg-background/50 shadow-sm border border-border/20 group-hover:border-primary/40 transition-colors">
                        <skill.Icon className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" style={{ color: skill.color }} />
                      </div>
                      <div className="flex-1 flex justify-between items-center">
                        <span className="text-base font-bold text-foreground/90 group-hover:text-primary transition-colors">{skill.name}</span>
                        <span className="text-xs font-mono text-primary/70">{skill.level}%</span>
                      </div>
                    </div>
                    <div className="h-2 w-full bg-primary/10 rounded-full overflow-hidden border border-primary/5">
                      <div 
                        className="h-full bg-primary transition-all duration-1000 ease-out rounded-full shadow-[0_0_8px_rgba(34,197,94,0.4)]"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
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
