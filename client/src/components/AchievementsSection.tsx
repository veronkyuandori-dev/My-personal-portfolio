import { Award, Code2, Layers3, Trophy } from 'lucide-react';

const achievements = [
  {
    value: '8+',
    label: 'Projects shipped',
    detail: 'Academic, freelance, IoT, and AI-powered applications',
    icon: Code2,
  },
  {
    value: '16+',
    label: 'Certifications',
    detail: 'Cloud, AI/ML, DevOps, networking, and software development',
    icon: Award,
  },
  {
    value: '20+',
    label: 'Technologies',
    detail: 'Modern tools across frontend, backend, cloud, and hardware',
    icon: Layers3,
  },
  {
    value: '13',
    label: 'GitHub repositories',
    detail: 'Public work showing consistent building and experimentation',
    icon: Trophy,
  },
];

const highlights = [
  'Microsoft Azure certified',
  'IoT and real-time monitoring systems',
  'AI-powered web applications',
  'Arduino and Raspberry Pi integration',
];

export default function AchievementsSection() {
  return (
    <section id="achievements" className="relative py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="mb-10 md:mb-12">
          <p className="font-mono text-xs text-primary uppercase tracking-[0.3em] mb-3">04 / ACHIEVEMENTS</p>
          <h2 className="font-heading font-black text-4xl md:text-5xl lg:text-6xl text-foreground tracking-tight">
            Built with purpose.
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl">
            A quick look at the work, credentials, and technologies behind my journey as a Software Developer.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {achievements.map(({ value, label, detail, icon: Icon }) => (
            <div
              key={label}
              className="group relative overflow-hidden rounded-2xl border border-primary/20 bg-card/60 p-5 md:p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:bg-primary/5"
            >
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/10 blur-2xl transition-opacity group-hover:opacity-100" />
              <Icon className="relative mb-6 h-5 w-5 text-primary/80" />
              <p className="relative text-3xl md:text-4xl font-black tracking-tighter text-foreground">{value}</p>
              <p className="relative mt-1 text-xs md:text-sm font-bold uppercase tracking-wide text-primary">{label}</p>
              <p className="relative mt-3 text-xs leading-relaxed text-muted-foreground">{detail}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-2xl border border-border/60 bg-background/40 p-5 md:p-6">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-primary">Highlights</span>
            <span className="hidden h-4 w-px bg-border sm:block" />
            {highlights.map((highlight) => (
              <span key={highlight} className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-medium text-muted-foreground">
                {highlight}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}