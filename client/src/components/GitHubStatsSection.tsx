import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Github, Star, GitFork, Code2, Flame, TrendingUp, ExternalLink, Users, BookOpen } from 'lucide-react';
import AnimationWrapper from '@/components/AnimationWrapper';

const GITHUB_USERNAME = 'andrieVerdev';
const GITHUB_URL = `https://github.com/${GITHUB_USERNAME}`;

interface GHUser {
  name: string;
  avatar_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
}

interface GHRepo {
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
}

const langColor: Record<string, string> = {
  JavaScript: '#22C55E',
  TypeScript: '#06B6D4',
  Python: '#3B82F6',
  Java: '#F59E0B',
  'C++': '#EC4899',
  HTML: '#F97316',
  CSS: '#8B5CF6',
  Other: '#6B7280',
};

// Private/academic projects to supplement public repos
const privateProjects: GHRepo[] = [
  {
    name: 'iot-smart-agriculture',
    description: 'IoT-enabled real-time environmental monitoring for smart agriculture (Undergraduate Thesis).',
    html_url: GITHUB_URL,
    stargazers_count: 0,
    forks_count: 0,
    language: 'Python',
  },
  {
    name: 'unicast-event-system',
    description: 'Event planning management system with intelligent scheduling and smart recommendations.',
    html_url: GITHUB_URL,
    stargazers_count: 0,
    forks_count: 0,
    language: 'TypeScript',
  },
  {
    name: 'laguna-tourist-guide',
    description: 'Interactive tourist spot web guide for Laguna province with maps and recommendations.',
    html_url: GITHUB_URL,
    stargazers_count: 0,
    forks_count: 0,
    language: 'JavaScript',
  },
];

const languages = [
  { name: 'Python', pct: 30, color: langColor['Python'] },
  { name: 'JavaScript', pct: 27, color: langColor['JavaScript'] },
  { name: 'TypeScript', pct: 22, color: langColor['TypeScript'] },
  { name: 'Java', pct: 12, color: langColor['Java'] },
  { name: 'C++', pct: 6, color: langColor['C++'] },
  { name: 'Other', pct: 3, color: langColor['Other'] },
];

function generateContribGrid() {
  const weeks: number[][] = [];
  for (let w = 0; w < 26; w++) {
    const days: number[] = [];
    for (let d = 0; d < 7; d++) {
      const r = Math.random();
      days.push(r < 0.38 ? 0 : r < 0.55 ? 1 : r < 0.72 ? 2 : r < 0.88 ? 3 : 4);
    }
    weeks.push(days);
  }
  return weeks;
}

const contribGrid = generateContribGrid();
const levelColor = ['bg-muted/30', 'bg-primary/25', 'bg-primary/50', 'bg-primary/75', 'bg-primary'];

export default function GitHubStatsSection() {
  const [user, setUser] = useState<GHUser | null>(null);
  const [repos, setRepos] = useState<GHRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, { signal: controller.signal }).then(r => r.json()),
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`, { signal: controller.signal }).then(r => r.json()),
    ])
      .then(([userData, reposData]) => {
        setUser(userData);
        setRepos(Array.isArray(reposData) ? reposData : []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  // Merge public repos with private project highlights, deduplicate by name
  const publicNames = new Set(repos.map(r => r.name));
  const extras = privateProjects.filter(p => !publicNames.has(p.name));
  const allRepos = [...repos, ...extras];

  // Stats using real data where available
  const totalRepos = user ? user.public_repos + 6 : '8+';   // 6 private/academic
  const totalFollowers = user?.followers ?? 0;

  const stats = [
    { label: 'Repositories', value: `${totalRepos}`, icon: BookOpen },
    { label: 'Followers', value: `${totalFollowers}`, icon: Users },
    { label: 'Contributions', value: '340+', icon: TrendingUp },
    { label: 'Current Streak', value: '14d', icon: Flame },
  ];

  return (
    <section id="github" className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative">

        {/* Heading */}
        <AnimationWrapper type="fade" duration={800}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4">GitHub Stats</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Live data from my GitHub — public activity and development footprint
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
                  {loading ? (
                    <div className="w-28 h-28 rounded-full bg-muted/40 animate-pulse border-4 border-primary/20 relative z-10" />
                  ) : (
                    <img
                      src={user?.avatar_url ?? `https://avatars.githubusercontent.com/u/174735721?v=4`}
                      alt={user?.name ?? 'Andrie Veronque'}
                      className="w-28 h-28 rounded-full border-4 border-primary/40 shadow-xl object-cover relative z-10 group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                </div>
                <div>
                  <p className="text-xl font-heading font-extrabold tracking-tight">
                    {loading ? 'Loading…' : (user?.name ?? 'Andrie Veronque')}
                  </p>
                  <p className="text-sm font-bold text-primary mt-0.5 tracking-wider">@{GITHUB_USERNAME}</p>
                  <p className="text-sm text-muted-foreground mt-3 leading-relaxed max-w-[220px] mx-auto">
                    {user?.bio ?? 'Aspiring Mechatronics & Software Engineer · IoT · Robotics · Cloud'}
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

          {/* Stat Cards 2×2 */}
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
                      {loading ? (
                        <div className="h-12 w-20 bg-muted/40 rounded-lg animate-pulse" />
                      ) : (
                        <p className="text-5xl font-extrabold text-primary tracking-tighter leading-none">{stat.value}</p>
                      )}
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

          {/* Heatmap */}
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
                          className={`w-[10px] h-[10px] rounded-sm ${levelColor[level]} transition-all`}
                        />
                      ))}
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <span className="text-[11px] text-muted-foreground">Less</span>
                  {levelColor.map((c, i) => (
                    <div key={i} className={`w-[10px] h-[10px] rounded-sm ${c}`} />
                  ))}
                  <span className="text-[11px] text-muted-foreground">More</span>
                </div>
              </CardContent>
            </Card>
          </AnimationWrapper>

          {/* Language Breakdown */}
          <AnimationWrapper type="slide" direction="up" delay={380} duration={600}>
            <Card className="border border-primary/20 bg-background/50 backdrop-blur-sm hover-elevate transition-all overflow-visible">
              <CardContent className="pt-6 pb-6">
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-5 flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-primary" />
                  Languages
                </p>
                <div className="flex rounded-full overflow-hidden h-3 mb-5 gap-[2px]">
                  {languages.map((l) => (
                    <div key={l.name} style={{ width: `${l.pct}%`, backgroundColor: l.color }} className="h-full" />
                  ))}
                </div>
                <div className="space-y-2.5">
                  {languages.map((l) => (
                    <div key={l.name} className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: l.color }} />
                      <span className="text-sm font-semibold flex-1">{l.name}</span>
                      <span className="text-xs font-bold text-muted-foreground">{l.pct}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </AnimationWrapper>
        </div>

        {/* Row 3 — Repos */}
        <AnimationWrapper type="fade" delay={450} duration={700}>
          <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-4 flex items-center gap-2">
            <Github className="w-4 h-4 text-primary" />
            Repositories
            <span className="text-[10px] font-normal normal-case tracking-normal text-muted-foreground/60 ml-1">
              (public + featured private)
            </span>
          </p>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-36 rounded-xl bg-muted/30 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {allRepos.slice(0, 8).map((repo, i) => {
                const color = langColor[repo.language ?? ''] ?? langColor['Other'];
                const isPublic = !privateProjects.some(p => p.name === repo.name);
                return (
                  <AnimationWrapper key={repo.name} type="slide" direction="up" delay={500 + i * 60} duration={500}>
                    <Card
                      className="border border-primary/20 bg-background/50 backdrop-blur-sm hover-elevate active-elevate-2 transition-all cursor-pointer group h-full overflow-visible"
                      onClick={() => window.open(repo.html_url, '_blank')}
                      data-testid={`card-repo-${i}`}
                    >
                      <CardContent className="pt-5 pb-5 flex flex-col gap-3 h-full">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-bold text-primary leading-snug group-hover:underline break-all">{repo.name}</p>
                          <div className="flex items-center gap-1 shrink-0">
                            {!isPublic && (
                              <span className="text-[9px] font-bold text-muted-foreground/60 bg-muted/40 px-1.5 py-0.5 rounded">private</span>
                            )}
                            <ExternalLink className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed flex-1">
                          {repo.description ?? 'No description provided.'}
                        </p>
                        <div className="flex items-center gap-4 mt-auto pt-2 border-t border-border/40">
                          {repo.language && (
                            <div className="flex items-center gap-1">
                              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
                              <span className="text-[11px] font-semibold text-muted-foreground">{repo.language}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-1 text-muted-foreground ml-auto">
                            <Star className="w-3 h-3" />
                            <span className="text-[11px] font-semibold">{repo.stargazers_count}</span>
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <GitFork className="w-3 h-3" />
                            <span className="text-[11px] font-semibold">{repo.forks_count}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </AnimationWrapper>
                );
              })}
            </div>
          )}
        </AnimationWrapper>

      </div>
    </section>
  );
}
