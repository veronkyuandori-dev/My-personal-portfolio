import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Code2, Database, Wrench, Coffee } from 'lucide-react';
import {
  SiDart, SiHtml5, SiCplusplus, SiPython, SiFigma, SiPostgresql, SiMongodb,
  SiJavascript, SiTypescript, SiReact, SiFlutter, SiNodedotjs, SiCss3,
  SiGit, SiGithub, SiArduino, SiFirebase, SiTailwindcss, SiNextdotjs,
  SiVite, SiMysql, SiLinux, SiRaspberrypi, SiDocker,
} from 'react-icons/si';
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

const techStack = [
  { name: 'JavaScript', Icon: SiJavascript, color: '#F7DF1E' },
  { name: 'TypeScript', Icon: SiTypescript, color: '#3178C6' },
  { name: 'React', Icon: SiReact, color: '#61DAFB' },
  { name: 'Flutter', Icon: SiFlutter, color: '#02569B' },
  { name: 'Node.js', Icon: SiNodedotjs, color: '#339933' },
  { name: 'Python', Icon: SiPython, color: '#3776AB' },
  { name: 'C++', Icon: SiCplusplus, color: '#00599C' },
  { name: 'HTML5', Icon: SiHtml5, color: '#E34F26' },
  { name: 'CSS3', Icon: SiCss3, color: '#1572B6' },
  { name: 'Tailwind', Icon: SiTailwindcss, color: '#06B6D4' },
  { name: 'Next.js', Icon: SiNextdotjs, color: '#FFFFFF' },
  { name: 'Vite', Icon: SiVite, color: '#646CFF' },
  { name: 'Git', Icon: SiGit, color: '#F05032' },
  { name: 'GitHub', Icon: SiGithub, color: '#FFFFFF' },
  { name: 'PostgreSQL', Icon: SiPostgresql, color: '#4169E1' },
  { name: 'MongoDB', Icon: SiMongodb, color: '#47A248' },
  { name: 'MySQL', Icon: SiMysql, color: '#4479A1' },
  { name: 'Firebase', Icon: SiFirebase, color: '#FFCA28' },
  { name: 'Docker', Icon: SiDocker, color: '#2496ED' },
  { name: 'Linux', Icon: SiLinux, color: '#FCC624' },
  { name: 'Arduino', Icon: SiArduino, color: '#00979D' },
  { name: 'Raspberry Pi', Icon: SiRaspberrypi, color: '#A22846' },
  { name: 'Dart', Icon: SiDart, color: '#0175C2' },
  { name: 'Figma', Icon: SiFigma, color: '#F24E1E' },
];

function TechPill({ name, Icon, color }: { name: string; Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>; color: string }) {
  return (
    <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-primary/15 bg-card/60 backdrop-blur-sm mx-2 shrink-0 select-none">
      <Icon className="w-5 h-5 shrink-0" style={{ color }} />
      <span className="font-mono text-xs font-semibold text-foreground/70 whitespace-nowrap">{name}</span>
    </div>
  );
}

export default function SkillsSection() {
  const doubled = [...techStack, ...techStack];

  return (
    <section id="skills" className="relative py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="mb-12 animate-section-rise">
          <p className="font-mono text-xs text-primary uppercase tracking-[0.3em] mb-3">04 / SKILLS</p>
          <h2 className="font-heading font-black text-4xl md:text-5xl lg:text-6xl text-foreground tracking-tight">
            Skills
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl">
            Technical expertise and proficiencies across software, hardware, and databases
          </p>
        </div>

        {/* ── Infinite scrolling tech stack strip ── */}
        <div className="mb-14 space-y-3 overflow-hidden marquee-container">
          {/* Row 1 — left to right */}
          <div className="flex">
            <div className="flex animate-marquee">
              {doubled.map((t, i) => (
                <TechPill key={`r1-${i}`} {...t} />
              ))}
            </div>
          </div>
          {/* Row 2 — right to left */}
          <div className="flex">
            <div className="flex animate-marquee-reverse">
              {[...doubled].reverse().map((t, i) => (
                <TechPill key={`r2-${i}`} {...t} />
              ))}
            </div>
          </div>
        </div>

        {/* ── Skill category cards ── */}
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
                      className="space-y-2 group stagger-item"
                      style={{ animationDelay: `${categoryIndex * 150 + skillIndex * 100 + 200}ms` }}
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
