import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Github, Code2, Flame, TrendingUp,
  ExternalLink, Users, BookOpen, GitPullRequest, CircleDot, Star, GitFork,
} from 'lucide-react';

const GITHUB_USERNAME = 'andrieVerdev';
const GITHUB_URL = `https://github.com/${GITHUB_USERNAME}`;

interface GHStats {
  name: string;
  avatarUrl: string;
  bio: string | null;
  followers: number;
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
  JavaScript: '#22C55E', TypeScript: '#06B6D4', Python: '#3B82F6',
  Java: '#F59E0B', 'C++': '#EC4899', HTML: '#F97316', CSS: '#8B5CF6', Other: '#6B7280',
};

const languages = [
  { name: 'Python',     pct: 30, color: '#3B82F6' },
  { name: 'JavaScript', pct: 27, color: '#22C55E' },
  { name: 'TypeScript', pct: 22, color: '#06B6D4' },
  { name: 'Java',       pct: 12, color: '#F59E0B' },
  { name: 'C++',        pct:  6, color: '#EC4899' },
  { name: 'Other',      pct:  3, color: '#6B7280' },
];

// Always-visible fallback repos shown before live data loads
const fallbackRepos: GHRepo[] = [
  { name: 'qr-attendance',        description: 'QR code-based attendance tracking with real-time dashboard and export.',           html_url: `${GITHUB_URL}/qr-attendance`,        stargazers_count: 0, forks_count: 0, language: 'JavaScript' },
  { name: 'schoolattendace',       description: 'School attendance management system with web interface.',                         html_url: `${GITHUB_URL}/schoolattendace`,       stargazers_count: 0, forks_count: 0, language: 'TypeScript' },
  { name: 'iot-smart-agriculture', description: 'IoT-enabled real-time environmental monitoring system (Undergraduate Thesis).',   html_url: GITHUB_URL,                            stargazers_count: 0, forks_count: 0, language: 'Python' },
  { name: 'unicast-event-system',  description: 'Event planning management with intelligent scheduling and smart recommendations.', html_url: GITHUB_URL,                            stargazers_count: 0, forks_count: 0, language: 'TypeScript' },
  { name: 'laguna-tourist-guide',  description: 'Interactive tourist spot guide for Laguna province with maps and recommendations.',html_url: GITHUB_URL,                            stargazers_count: 0, forks_count: 0, language: 'JavaScript' },
];

const privateNames = new Set(['iot-smart-agriculture', 'unicast-event-system', 'laguna-tourist-guide']);

const levelColor = ['bg-muted/30', 'bg-primary/25', 'bg-primary/50', 'bg-primary/75', 'bg-primary'];
const lvl = (n: number) => n === 0 ? 0 : n <= 2 ? 1 : n <= 5 ? 2 : n <= 9 ? 3 : 4;

export default function GitHubStatsSection() {
  const [stats, setStats] = useState<GHStats | null>(null);
  const [repos, setRepos] = useState<GHRepo[]>(fallbackRepos);   // start with fallback
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    // Fetch stats via our secure backend endpoint
    fetch('/api/github-stats')
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (!cancelled && data && !data.error) setStats(data); })
      .catch(() => {})
      .finally(() => { if (!cancelled) setStatsLoading(false); });

    // Try to enrich repo list with live data; fall back gracefully
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`)
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (!cancelled && Array.isArray(data) && data.length > 0) {
          // Merge: live public repos + private highlights (deduped)
          const publicNames = new Set<string>(data.map((r: GHRepo) => r.name));
          const extras = fallbackRepos.filter(p => privateNames.has(p.name) && !publicNames.has(p.name));
          setRepos([...data, ...extras]);
        }
      })
      .catch(() => {}); // keep fallbackRepos on error

    return () => { cancelled = true; };
  }, []);

  const weeks = stats?.weeks ?? [];

  return (
    <section id="github" className="py-20 md:py-32 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4">GitHub Stats</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Live data pulled directly from my GitHub account
          </p>
        </div>

        {/* ── Row 1: Profile + 4 stat cards ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

          {/* Profile Card */}
          <Card className="border border-primary/20 bg-background/50 backdrop-blur-sm overflow-visible group hover-elevate transition-all duration-500 h-full">
            <CardContent className="pt-8 pb-8 flex flex-col items-center gap-5 text-center h-full">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-125 animate-pulse" />
                <img
                  src={stats?.avatarUrl ?? `https://avatars.githubusercontent.com/u/174735721?v=4`}
                  alt="Andrie Veronque"
                  className="w-28 h-28 rounded-full border-4 border-primary/40 shadow-xl object-cover relative z-10 group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div>
                <p className="text-xl font-heading font-extrabold tracking-tight">
                  {stats?.name ?? 'Andrie Veronque'}
                </p>
                <p className="text-sm font-bold text-primary mt-0.5 tracking-wider">@{GITHUB_USERNAME}</p>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed max-w-[220px] mx-auto">
                  {stats?.bio ?? 'Aspiring Mechatronics & Software Engineer · IoT · Robotics · Cloud'}
                </p>
              </div>
              {stats && (
                <div className="flex gap-2 flex-wrap justify-center">
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground bg-muted/30 px-3 py-1.5 rounded-full border border-border/40">
                    <TrendingUp className="w-3.5 h-3.5 text-primary" />{stats.totalCommits} commits
                  </span>
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground bg-muted/30 px-3 py-1.5 rounded-full border border-border/40">
                    <GitPullRequest className="w-3.5 h-3.5 text-primary" />{stats.totalPRs} PRs
                  </span>
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground bg-muted/30 px-3 py-1.5 rounded-full border border-border/40">
                    <CircleDot className="w-3.5 h-3.5 text-primary" />{stats.totalIssues} issues
                  </span>
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

          {/* 4 stat cards */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-6">
            {[
              { label: 'Public Repos',   value: stats ? String(stats.publicRepos)       : '—', icon: BookOpen },
              { label: 'Followers',      value: stats ? String(stats.followers)          : '—', icon: Users },
              { label: 'Contributions',  value: stats ? String(stats.totalContributions) : '—', icon: TrendingUp },
              { label: 'Current Streak', value: stats ? `${stats.streak}d`              : '—', icon: Flame },
            ].map(({ label, value, icon: Icon }) => (
              <Card key={label} className="border border-primary/20 bg-background/50 backdrop-blur-sm overflow-visible group hover-elevate transition-all duration-500">
                <CardContent className="pt-7 pb-7 flex flex-col items-center justify-center text-center gap-3">
                  <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <p className={`text-5xl font-extrabold text-primary tracking-tighter leading-none ${statsLoading ? 'animate-pulse opacity-30' : ''}`}>
                    {value}
                  </p>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* ── Row 2: Heatmap + Languages ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

          {/* Contribution heatmap */}
          <Card className="lg:col-span-2 border border-primary/20 bg-background/50 backdrop-blur-sm overflow-visible hover-elevate transition-all">
            <CardContent className="pt-6 pb-6">
              <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                Contribution Calendar
                {stats && (
                  <span className="text-[11px] font-normal normal-case tracking-normal text-primary/60 ml-1">
                    · {stats.totalContributions} this year
                  </span>
                )}
              </p>
              {statsLoading ? (
                <div className="h-24 rounded-lg bg-muted/20 animate-pulse" />
              ) : weeks.length > 0 ? (
                <>
                  <div className="flex gap-[3px] overflow-x-auto pb-1">
                    {weeks.map((week, wi) => (
                      <div key={wi} className="flex flex-col gap-[3px]">
                        {week.contributionDays.map((day, di) => (
                          <div
                            key={di}
                            className={`w-[10px] h-[10px] rounded-sm ${levelColor[lvl(day.contributionCount)]}`}
                            title={`${day.date}: ${day.contributionCount}`}
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
                <p className="text-sm text-muted-foreground">Contribution data unavailable.</p>
              )}
            </CardContent>
          </Card>

          {/* Language breakdown */}
          <Card className="border border-primary/20 bg-background/50 backdrop-blur-sm overflow-visible hover-elevate transition-all">
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
        </div>

        {/* ── Row 3: Repositories ── */}
        <div>
          <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-4 flex items-center gap-2">
            <Github className="w-4 h-4 text-primary" />
            Repositories
            <span className="text-[10px] font-normal normal-case tracking-normal text-muted-foreground/60 ml-1">
              (public + featured private)
            </span>
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {repos.slice(0, 8).map((repo, i) => {
              const color     = langColor[repo.language ?? ''] ?? langColor['Other'];
              const isPrivate = privateNames.has(repo.name);
              return (
                <Card
                  key={repo.name}
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
                    <div className="flex items-center gap-3 mt-auto pt-2 border-t border-border/40">
                      {repo.language && (
                        <div className="flex items-center gap-1">
                          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
                          <span className="text-[11px] font-semibold text-muted-foreground">{repo.language}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1 text-muted-foreground ml-auto">
                        <Star className="w-3 h-3" /><span className="text-[11px] font-semibold">{repo.stargazers_count}</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <GitFork className="w-3 h-3" /><span className="text-[11px] font-semibold">{repo.forks_count}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
