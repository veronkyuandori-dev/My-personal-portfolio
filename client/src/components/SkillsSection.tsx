import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Code2, Database, Wrench, Palette } from 'lucide-react';

// todo: remove mock functionality
const skillCategories = [
  {
    title: 'Frontend Development',
    icon: Code2,
    skills: [
      { name: 'React / Next.js', level: 90 },
      { name: 'TypeScript', level: 85 },
      { name: 'Tailwind CSS', level: 95 },
      { name: 'Vue.js', level: 75 },
    ],
  },
  {
    title: 'Backend Development',
    icon: Database,
    skills: [
      { name: 'Node.js / Express', level: 88 },
      { name: 'Python / Django', level: 80 },
      { name: 'PostgreSQL', level: 85 },
      { name: 'MongoDB', level: 82 },
    ],
  },
  {
    title: 'Tools & Technologies',
    icon: Wrench,
    skills: [
      { name: 'Git / GitHub', level: 92 },
      { name: 'Docker', level: 78 },
      { name: 'AWS', level: 75 },
      { name: 'CI/CD', level: 80 },
    ],
  },
  {
    title: 'Design & Creative',
    icon: Palette,
    skills: [
      { name: 'Figma', level: 85 },
      { name: 'UI/UX Design', level: 80 },
      { name: 'Responsive Design', level: 95 },
      { name: 'Accessibility', level: 88 },
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <Card
              key={categoryIndex}
              className="hover-elevate transition-all duration-300"
              data-testid={`skill-category-${category.title.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-3 rounded-md bg-primary/10">
                    <category.icon className="h-6 w-6 text-primary" />
                  </div>
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} data-testid={`skill-${skill.name.toLowerCase().replace(/\s+/g, '-')}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-chart-2 rounded-full transition-all duration-1000"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
