import {
  SiDart, SiHtml5, SiCplusplus, SiPython, SiFigma, SiPostgresql, SiMongodb,
  SiJavascript, SiTypescript, SiReact, SiFlutter, SiNodedotjs, SiCss3,
  SiGit, SiGithub, SiArduino, SiFirebase, SiTailwindcss, SiNextdotjs,
  SiVite, SiMysql, SiLinux, SiRaspberrypi, SiDocker,
} from 'react-icons/si';

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

const row1 = [...techStack, ...techStack];
const row2 = [...techStack].reverse().concat([...techStack].reverse());
const row3 = [...techStack.slice(8), ...techStack.slice(0, 8), ...techStack.slice(8), ...techStack.slice(0, 8)];

export default function SkillsSection() {
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

        {/* 3-row infinite scrolling marquee */}
        <div className="overflow-hidden marquee-container space-y-3">
          {/* Row 1 — left */}
          <div className="flex">
            <div className="flex animate-marquee">
              {row1.map((t, i) => <TechPill key={`r1-${i}`} {...t} />)}
            </div>
          </div>
          {/* Row 2 — right */}
          <div className="flex">
            <div className="flex animate-marquee-reverse">
              {row2.map((t, i) => <TechPill key={`r2-${i}`} {...t} />)}
            </div>
          </div>
          {/* Row 3 — left (different offset) */}
          <div className="flex">
            <div className="flex animate-marquee" style={{ animationDuration: '34s' }}>
              {row3.map((t, i) => <TechPill key={`r3-${i}`} {...t} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
