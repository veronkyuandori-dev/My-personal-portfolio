import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Github, Star, GitFork, Code2, Flame, TrendingUp, ExternalLink } from 'lucide-react';
import AnimationWrapper from '@/components/AnimationWrapper';
import profileImage from '@assets/639776252_1644422550043671_7419334472409174878_n_1772636385061.jpg';

const GITHUB_USERNAME = 'andrieVerdev';
const GITHUB_URL = `https://github.com/${GITHUB_USERNAME}`;

const stats = [
  { label: 'Public Repos', value: '12+', icon: Code2 },
  { label: 'Total Stars', value: '18', icon: Star },
  { label: 'Contributions', value: '340+', icon: TrendingUp },
  { label: 'Current Streak', value: '14d', icon: Flame },
];

const languages = [
  { name: 'Python', pct: 32, color: '#3B82F6' },
  { name: 'JavaScript', pct: 26, color: '#22C55E' },
  { name: 'TypeScript', pct: 18, color: '#06B6D4' },
  { name: 'Java', pct: 13, color: '#F59E0B' },
  { name: 'C++', pct: 7, color: '#EC4899' },
  { name: 'Other', pct: 4, color: '#8B5CF6' },
];

const pinnedRepos = [
  {
    name: 'iot-smart-agriculture',
    description: 'IoT-enabled real-time monitoring system for smart agriculture using sensors and cloud dashboards.',
    stars: 5,
    forks: 2,
    language: 'Python',
    languageColor: '#3B82F6',
  },
  {
    name: 'unicast-event-system',
    description: 'Event planning management system with intelligent scheduling and smart recommendations.',
    stars: 4,
    forks: 1,
    language: 'TypeScript',
    languageColor: '#06B6D4',
  },
  {
    name: 'qr-attendance-system',
    description: 'QR code-based attendance tracking with real-time dashboard and export functionality.',
    stars: 3,
    forks: 2,
    language: 'JavaScript',
    languageColor: '#22C55E',
  },
  {
    name: 'laguna-tourist-guide',
    description: 'Interactive tourist spot guide web app for Laguna province with maps and recommendations.',
    stars: 2,
    forks: 0,
    language: 'JavaScript',
    languageColor: '#22C55E',
  },
];

// Generate a contribution-grid like heatmap (52 weeks × 7 days)
function generateContribGrid() {
  const weeks: number[][] = [];
  for (let w = 0; w < 26; w++) {
    const days: number[] = [];
    for (let d = 0; d < 7; d++) {
      // Weighted random: more 0s and 1s, occasional highs
      const r = Math.random();
      days.push(r < 0.38 ? 0 : r < 0.55 ? 1 : r < 0.72 ? 2 : r < 0.88 ? 3 : 4);
    }
    weeks.push(days);
  }
  return weeks;
}

const contribGrid = generateContribGrid();

const levelColor = (level: number) => {
  const colors = ['bg-muted/30', 'bg-primary/25', 'bg-primary/50', 'bg-primary/75', 'bg-primary'];
  return colors[level] || colors[0];
};

export default function GitHubStatsSection() {
  const [imgError, setImgError] = useState(false);

  return (
    <section id="github" className="py-20 md:py-32 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative">

        {/* Heading */}
        <AnimationWrapper type="fade" duration={800}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4">
              GitHub Stats
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A look at my open-source activity and development footprint
            </p>
          </div>
        </AnimationWrapper>

        {/* Row 1 — Profile + Stat Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

          {/* Profile Card */}
          <AnimationWrapper type="slide" direction="up" delay={100} duration={600}>
            <Card className="border border-primary/20 bg-background/50 backdrop-blur-sm hover-elevate transition-all duration-500 overflow-visible group h-full">
              <CardContent className="pt-8 pb-8 flex flex-col items-center gap-5 text-center h-full">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-125 animate-pulse" />
                  <img
                    src={imgError ? profileImage : `https://github.com/${GITHUB_USERNAME}.png`}
                    alt="Veronque Andrie"
                    onError={() => setImgError(true)}
                    className="w-28 h-28 rounded-full border-4 border-primary/40 shadow-xl object-cover relative z-10 group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div>
                  <p className="text-xl font-heading font-extrabold tracking-tight">Veronque Andrie</p>
                  <p className="text-sm font-bold text-primary mt-0.5 tracking-wider">@{GITHUB_USERNAME}</p>
                  <p className="text-sm text-muted-foreground mt-3 leading-relaxed max-w-[220px] mx-auto">
                    Aspiring Mechatronics &amp; Software Engineer · IoT · Robotics · Cloud
                  </p>
                </div>
                <Button
                  className="w-full gap-2 mt-auto"
                  onClick={() => window.open(GITHUB_URL, '_blank')}
                  data-testid="button-visit-github"
                >
                  <Github className="w-4 h-4" />
                  View Profile
                  <ExternalLink className="w-3 h-3 ml-auto opacity-60" />
                </Button>
              </CardContent>
            </Card>
          </AnimationWrapper>

          {/* Stat cards 2×2 */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-6">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <AnimationWrapper key={stat.label} type="slide" direction="up" delay={150 + i * 80} duration={600}>
                  <Card className="border border-primary/20 bg-background/50 backdrop-blur-sm hover-elevate transition-all duration-500 overflow-visible group">
                    <CardContent className="pt-7 pb-7 flex flex-col items-center justify-center text-center gap-3">
                      <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <p className="text-5xl font-extrabold text-primary tracking-tighter leading-none">{stat.value}</p>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                    </CardContent>
                  </Card>
                </AnimationWrapper>
              );
            })}
          </div>
        </div>

        {/* Row 2 — Contribution heatmap + Languages */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

          {/* Contribution heatmap */}
          <AnimationWrapper type="slide" direction="up" delay={300} duration={600}>
            <Card className="lg:col-span-2 border border-primary/20 bg-background/50 backdrop-blur-sm hover-elevate transition-all overflow-visible">
              <CardContent className="pt-6 pb-6">
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-4 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  Contribution Activity (last 6 months)
                </p>
                <div className="flex gap-[3px]">
                  {contribGrid.map((week, wi) => (
                    <div key={wi} className="flex flex-col gap-[3px]">
                      {week.map((level, di) => (
                        <div
                          key={di}
                          className={`w-[10px] h-[10px] rounded-sm ${levelColor(level)} transition-all`}
                          title={`Level ${level}`}
                        />
                      ))}
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <span className="text-[11px] text-muted-foreground">Less</span>
                  {[0, 1, 2, 3, 4].map((l) => (
                    <div key={l} className={`w-[10px] h-[10px] rounded-sm ${levelColor(l)}`} />
                  ))}
                  <span className="text-[11px] text-muted-foreground">More</span>
                </div>
              </CardContent>
            </Card>
          </AnimationWrapper>

          {/* Language breakdown */}
          <AnimationWrapper type="slide" direction="up" delay={380} duration={600}>
            <Card className="border border-primary/20 bg-background/50 backdrop-blur-sm hover-elevate transition-all overflow-visible">
              <CardContent className="pt-6 pb-6">
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-5 flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-primary" />
                  Languages
                </p>
                {/* Stacked bar */}
                <div className="flex rounded-full overflow-hidden h-3 mb-5 gap-[2px]">
                  {languages.map((l) => (
                    <div
                      key={l.name}
                      style={{ width: `${l.pct}%`, backgroundColor: l.color }}
                      className="h-full transition-all duration-700"
                    />
                  ))}
                </div>
                <div className="space-y-2.5">
                  {languages.map((l) => (
                    <div key={l.name} className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: l.color }} />
                      <span className="text-sm font-semibold flex-1 text-foreground">{l.name}</span>
                      <span className="text-xs font-bold text-muted-foreground">{l.pct}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </AnimationWrapper>
        </div>

        {/* Row 3 — Pinned repos */}
        <AnimationWrapper type="fade" delay={450} duration={700}>
          <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-4 flex items-center gap-2">
            <Github className="w-4 h-4 text-primary" />
            Pinned Repositories
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {pinnedRepos.map((repo, i) => (
              <AnimationWrapper key={repo.name} type="slide" direction="up" delay={500 + i * 70} duration={500}>
                <Card
                  className="border border-primary/20 bg-background/50 backdrop-blur-sm hover-elevate active-elevate-2 transition-all duration-300 overflow-visible cursor-pointer group h-full"
                  onClick={() => window.open(`${GITHUB_URL}/${repo.name}`, '_blank')}
                  data-testid={`card-repo-${i}`}
                >
                  <CardContent className="pt-5 pb-5 flex flex-col gap-3 h-full">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-bold text-primary leading-snug group-hover:underline">{repo.name}</p>
                      <ExternalLink className="w-3.5 h-3.5 text-muted-foreground shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed flex-1">{repo.description}</p>
                    <div className="flex items-center gap-4 mt-auto pt-2 border-t border-border/40">
                      <div className="flex items-center gap-1">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: repo.languageColor }} />
                        <span className="text-[11px] font-semibold text-muted-foreground">{repo.language}</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Star className="w-3 h-3" />
                        <span className="text-[11px] font-semibold">{repo.stars}</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <GitFork className="w-3 h-3" />
                        <span className="text-[11px] font-semibold">{repo.forks}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimationWrapper>
            ))}
          </div>
        </AnimationWrapper>

      </div>
    </section>
  );
}
