import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Github, Star, GitFork, Code2, Flame, TrendingUp,
  ExternalLink, Users, BookOpen, GitPullRequest, CircleDot,
} from 'lucide-react';
import AnimationWrapper from '@/components/AnimationWrapper';

const GITHUB_USERNAME = 'andrieVerdev';
const GITHUB_URL = `https://github.com/${GITHUB_USERNAME}`;

interface GHStats {
  name: string;
  avatarUrl: string;
  bio: string | null;
  followers: number;
  following: number;
  publicRepos: number;
  totalContributions: number;
  totalCommits: number;
  totalPRs: number;
  totalIssues: number;
  streak: number;
  weeks: Array<{ contributionDays: Array<{ contributionCount: number; date: string }> }>;
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

const languages = [
  { name: 'Python',     pct: 30, color: langColor['Python'] },
  { name: 'JavaScript', pct: 27, color: langColor['JavaScript'] },
  { name: 'TypeScript', pct: 22, color: langColor['TypeScript'] },
  { name: 'Java',       pct: 12, color: langColor['Java'] },
  { name: 'C++',        pct:  6, color: langColor['C++'] },
  { name: 'Other',      pct:  3, color: langColor['Other'] },
];

const privateProjects: GHRepo[] = [
  { name: 'iot-smart-agriculture', description: 'IoT-enabled real-time environmental monitoring for smart agriculture (Undergraduate Thesis).', html_url: GITHUB_URL, stargazers_count: 0, forks_count: 0, language: 'Python' },
  { name: 'unicast-event-system',  description: 'Event planning management system with intelligent scheduling and smart recommendations.',    html_url: GITHUB_URL, stargazers_count: 0, forks_count: 0, language: 'TypeScript' },
  { name: 'laguna-tourist-guide',  description: 'Interactive tourist spot web guide for Laguna province with maps and recommendations.',       html_url: GITHUB_URL, stargazers_count: 0, forks_count: 0, language: 'JavaScript' },
];

const levelColor = ['bg-muted/30', 'bg-primary/25', 'bg-primary/50', 'bg-primary/75', 'bg-primary'];
const contribLevel = (n: number) => n === 0 ? 0 : n <= 2 ? 1 : n <= 5 ? 2 : n <= 9 ? 3 : 4;

export default function GitHubStatsSection() {
  const [stats, setStats] = useState<GHStats | null>(null);
  const [repos, setRepos] = useState<GHRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [noToken, setNoToken] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    // Fetch real stats from our backend (uses GITHUB_TOKEN securely)
    fetch('/api/github-stats', { signal: controller.signal })
      .then(r => {
        if (r.status === 503) { setNoToken(true); return null; }
        return r.json();
      })
      .then(data => { if (data && !data.error) setStats(data); })
      .catch(() => {});

    // Fetch public repos (no token needed)
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`, { signal: controller.signal })
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setRepos(data); })
      .catch(() => {})
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  const publicNames = new Set(repos.map(r => r.name));
  const extras = privateProjects.filter(p => !publicNames.has(p.name));
  const allRepos = [...repos, ...extras];

  const statCards = stats ? [
    { label: 'Public Repos',   value: String(stats.publicRepos),        icon: BookOpen },
    { label: 'Followers',      value: String(stats.followers),           icon: Users },
    { label: 'Contributions',  value: `${stats.totalContributions}`,     icon: TrendingUp },
    { label: 'Current Streak', value: `${stats.streak}d`,               icon: Flame },
  ] : [
    { label: 'Public Repos',   value: '—', icon: BookOpen },
    { label: 'Followers',      value: '—', icon: Users },
    { label: 'Contributions',  value: '—', icon: TrendingUp },
    { label: 'Current Streak', value: '—', icon: Flame },
  ];

  // Use real weeks from GraphQL, fall back to empty
  const weeks = stats?.weeks ?? [];

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
              Live data pulled directly from my GitHub account
            </p>
            {noToken && (
              <p className="mt-3 text-sm text-yellow-500/80 font-medium">
                GitHub token not yet configured — showing public data only
              </p>
            )}
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
                      src={stats?.avatarUrl ?? `https://avatars.githubusercontent.com/u/174735721?v=4`}
                      alt={stats?.name ?? 'Andrie Veronque'}
                      className="w-28 h-28 rounded-full border-4 border-primary/40 shadow-xl object-cover relative z-10 group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                </div>
                <div>
                  <p className="text-xl font-heading font-extrabold tracking-tight">
                    {loading ? 'Loading…' : (stats?.name ?? 'Andrie Veronque')}
                  </p>
                  <p className="text-sm font-bold text-primary mt-0.5 tracking-wider">@{GITHUB_USERNAME}</p>
                  <p className="text-sm text-muted-foreground mt-3 leading-relaxed max-w-[220px] mx-auto">
                    {stats?.bio ?? 'Aspiring Mechatronics & Software Engineer · IoT · Robotics · Cloud'}
                  </p>
                </div>
                {/* Mini commit/PR/issue badges */}
                {stats && (
                  <div className="flex gap-3 flex-wrap justify-center">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground bg-muted/30 px-3 py-1.5 rounded-full border border-border/40">
                      <TrendingUp className="w-3.5 h-3.5 text-primary" />{stats.totalCommits} commits
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground bg-muted/30 px-3 py-1.5 rounded-full border border-border/40">
                      <GitPullRequest className="w-3.5 h-3.5 text-primary" />{stats.totalPRs} PRs
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground bg-muted/30 px-3 py-1.5 rounded-full border border-border/40">
                      <CircleDot className="w-3.5 h-3.5 text-primary" />{stats.totalIssues} issues
                    </div>
                  </div>
                )}
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
            {statCards.map((stat, i) => {
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

          {/* Real contribution heatmap */}
          <AnimationWrapper type="slide" direction="up" delay={300} duration={600}>
            <Card className="lg:col-span-2 border border-primary/20 bg-background/50 backdrop-blur-sm hover-elevate transition-all overflow-visible">
              <CardContent className="pt-6 pb-6">
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-4 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  Contribution Calendar
                  {stats && <span className="text-[11px] font-normal normal-case tracking-normal text-primary/60 ml-1">· {stats.totalContributions} this year</span>}
                </p>
                {loading ? (
                  <div className="h-24 bg-muted/20 rounded-lg animate-pulse" />
                ) : weeks.length > 0 ? (
                  <>
                    <div className="flex gap-[3px] overflow-x-auto pb-1">
                      {weeks.map((week, wi) => (
                        <div key={wi} className="flex flex-col gap-[3px]">
                          {week.contributionDays.map((day, di) => (
                            <div
                              key={di}
                              className={`w-[10px] h-[10px] rounded-sm ${levelColor[contribLevel(day.contributionCount)]} transition-all`}
                              title={`${day.date}: ${day.contributionCount} contributions`}
                            />
                          ))}
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      <span className="text-[11px] text-muted-foreground">Less</span>
                      {levelColor.map((c, i) => <div key={i} className={`w-[10px] h-[10px] rounded-sm ${c}`} />)}
                      <span className="text-[11px] text-muted-foreground">More</span>
                    </div>
                  </>
                ) : (
                  <p className="text-sm text-muted-foreground italic">Add your GitHub token to see the real contribution calendar.</p>
                )}
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
                  {languages.map(l => (
                    <div key={l.name} style={{ width: `${l.pct}%`, backgroundColor: l.color }} className="h-full" />
                  ))}
                </div>
                <div className="space-y-2.5">
                  {languages.map(l => (
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
              {[...Array(4)].map((_, i) => <div key={i} className="h-36 rounded-xl bg-muted/30 animate-pulse" />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {allRepos.slice(0, 8).map((repo, i) => {
                const color = langColor[repo.language ?? ''] ?? langColor['Other'];
                const isPrivate = privateProjects.some(p => p.name === repo.name);
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
                            {isPrivate && (
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
