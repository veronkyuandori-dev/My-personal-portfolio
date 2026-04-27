import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Github, Code2, Flame, TrendingUp, ExternalLink, Users, BookOpen,
  GitPullRequest, CircleDot, Star, GitFork, GitCommit, MapPin, Calendar,
} from 'lucide-react';

const GITHUB_USERNAME = 'andrieVerdev';
const GITHUB_URL = `https://github.com/${GITHUB_USERNAME}`;

interface GHRepo {
  name: string;
  description: string | null;
  url: string;
  isPrivate: boolean;
  stars: number;
  forks: number;
  language: string | null;
  languageColor: string | null;
}

interface GHStats {
  name: string;
  avatarUrl: string;
  bio: string | null;
  followers: number;
  publicRepos: number;
  totalRepos: number;
  totalContributions: number;
  totalCommits: number;
  totalPRs: number;
  totalIssues: number;
  streak: number;
  weeks: Array<{ contributionDays: Array<{ contributionCount: number; date: string }> }>;
  repos: GHRepo[];
}

const langColor: Record<string, string> = {
  JavaScript: '#22C55E', TypeScript: '#06B6D4', Python: '#3B82F6',
  Java: '#F59E0B', 'C++': '#EC4899', HTML: '#F97316', CSS: '#8B5CF6', Other: '#6B7280',
};

const languages = [
  { name: 'TypeScript', pct: 38, color: '#06B6D4' },
  { name: 'JavaScript', pct: 22, color: '#22C55E' },
  { name: 'Python',     pct: 18, color: '#3B82F6' },
  { name: 'HTML',       pct: 10, color: '#F97316' },
  { name: 'Java',       pct:  6, color: '#F59E0B' },
  { name: 'CSS',        pct:  4, color: '#8B5CF6' },
  { name: 'Other',      pct:  2, color: '#6B7280' },
];

// Curated descriptions for repos (matched case-insensitively against repo name)
const repoDescriptions: Record<string, string> = {
  'my-portfolio':                  'Personal portfolio website built with React, TypeScript, Three.js and a cybersecurity-themed glassmorphism UI.',
  'qr-attendance':                 'QR code-based attendance system with real-time dashboard, role-based login, and CSV export.',
  'qr-attendanc':                  'Earlier prototype of the QR attendance system — HTML/JS proof-of-concept.',
  'schoolattendace':               'Modern school attendance management with student profiles, class scheduling, and reports.',
  'library-management-syste_lms':  'Full library management system: book CRUD, member registration, borrow/return tracking, fines.',
  'facial-ai':                     'Facial recognition AI prototype using TensorFlow.js for real-time identification.',
  'laguna-tourist-spot':           'Interactive tourist guide for Laguna province with maps, recommendations, and reviews.',
  'fluppybird':                    'Flappy Bird remake — pure HTML/CSS/JS browser game with custom assets.',
  'evacs-system':                  'Emergency evacuation system: routing, capacity management, and real-time alerts.',
  'tasktracker':                   'Productivity task tracker with Kanban board, due dates, and progress analytics.',
  'buddwell':                      'Wellness companion app — habit tracking, mood logging, and personalized insights.',
  'nextjs-ai-chatbot':             'AI chatbot built on Next.js with streaming responses and conversation history.',
  'evalue':                        'Course evaluation web app for students and faculty.',
};

const fallbackRepos: GHRepo[] = [
  { name: 'My-Portfolio',                description: repoDescriptions['my-portfolio'],                 url: GITHUB_URL, isPrivate: true, stars: 0, forks: 0, language: 'TypeScript', languageColor: '#06B6D4' },
  { name: 'qr-attendance',               description: repoDescriptions['qr-attendance'],                url: GITHUB_URL, isPrivate: true, stars: 0, forks: 0, language: 'JavaScript', languageColor: '#22C55E' },
  { name: 'schoolattendace',             description: repoDescriptions['schoolattendace'],              url: GITHUB_URL, isPrivate: true, stars: 0, forks: 0, language: 'TypeScript', languageColor: '#06B6D4' },
  { name: 'Library-Management-Syste_LMS',description: repoDescriptions['library-management-syste_lms'], url: GITHUB_URL, isPrivate: true, stars: 0, forks: 0, language: 'TypeScript', languageColor: '#06B6D4' },
];

const levelColor = ['bg-muted/30', 'bg-primary/25', 'bg-primary/50', 'bg-primary/75', 'bg-primary'];
const lvl = (n: number) => n === 0 ? 0 : n <= 2 ? 1 : n <= 5 ? 2 : n <= 9 ? 3 : 4;

const enrichDescriptions = (rs: GHRepo[]): GHRepo[] =>
  rs.map(r => ({
    ...r,
    description: r.description?.trim() || repoDescriptions[r.name.toLowerCase()] || null,
  }));

export default function GitHubStatsSection() {
  const [stats, setStats] = useState<GHStats | null>(null);
  const [repos, setRepos] = useState<GHRepo[]>(fallbackRepos);
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/github-stats')
      .then(r => r.ok ? r.json() : null)
      .then((data: GHStats | null) => {
        if (cancelled || !data || (data as any).error) return;
        setStats(data);
        if (Array.isArray(data.repos) && data.repos.length > 0) {
          setRepos(enrichDescriptions(data.repos));
        }
      })
      .catch(() => {})
      .finally(() => { if (!cancelled) setStatsLoading(false); });
    return () => { cancelled = true; };
  }, []);

  const weeks      = stats?.weeks ?? [];
  const repoCount  = stats?.totalRepos ?? stats?.publicRepos ?? repos.length;
  const totalCommitsAll = stats?.totalCommits ?? 0;

  return (
    <section id="github" className="py-20 md:py-32 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative">

        {/* ── Heading ── */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-4">
            <Github className="w-3.5 h-3.5" />
            Live Synced
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4">GitHub Stats</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Live data pulled directly from my GitHub account — including private repositories.
          </p>
        </div>

        {/* ── HERO PROFILE BANNER ── */}
        <Card className="border border-primary/30 bg-background/60 backdrop-blur-sm overflow-visible mb-6 group hover-elevate transition-all">
          <CardContent className="pt-8 pb-8 md:pt-10 md:pb-10">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              {/* Avatar */}
              <div className="relative shrink-0">
                <div className="absolute inset-0 bg-primary/30 blur-3xl rounded-full scale-125 animate-pulse" />
                <img
                  src={stats?.avatarUrl ?? `https://avatars.githubusercontent.com/u/174735721?v=4`}
                  alt="Andrie Veronque"
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-primary/50 shadow-2xl object-cover relative z-10 group-hover:scale-105 transition-transform duration-500"
                  data-testid="img-github-avatar"
                />
                <div className="absolute -bottom-1 -right-1 z-20 w-8 h-8 rounded-full bg-primary border-4 border-background flex items-center justify-center">
                  <Github className="w-3.5 h-3.5 text-primary-foreground" />
                </div>
              </div>

              {/* Profile info */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3 mb-1">
                  <h3 className="text-2xl md:text-3xl font-heading font-extrabold tracking-tight" data-testid="text-github-name">
                    {stats?.name ?? 'Andrie Veronque'}
                  </h3>
                  <a
                    href={GITHUB_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm md:text-base font-bold text-primary hover:underline"
                    data-testid="link-github-username"
                  >
                    @{GITHUB_USERNAME}
                  </a>
                </div>

                <p className="text-sm md:text-base text-muted-foreground mb-4 max-w-xl">
                  {stats?.bio ?? 'Aspiring Mechatronics & Software Engineer · IoT · Robotics · Cloud'}
                </p>

                {/* Quick badges */}
                <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground bg-muted/30 px-3 py-1.5 rounded-full border border-border/40">
                    <MapPin className="w-3.5 h-3.5 text-primary" /> Cabuyao, Laguna
                  </span>
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground bg-muted/30 px-3 py-1.5 rounded-full border border-border/40">
                    <Calendar className="w-3.5 h-3.5 text-primary" /> Active developer
                  </span>
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground bg-muted/30 px-3 py-1.5 rounded-full border border-border/40">
                    <BookOpen className="w-3.5 h-3.5 text-primary" /> {repoCount} repos
                  </span>
                </div>

                {/* Inline activity numbers */}
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 justify-center md:justify-start text-sm">
                  <div className="flex items-center gap-1.5">
                    <GitCommit className="w-4 h-4 text-primary" />
                    <span className="font-bold text-foreground" data-testid="text-total-commits">{totalCommitsAll}</span>
                    <span className="text-muted-foreground">commits</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <GitPullRequest className="w-4 h-4 text-primary" />
                    <span className="font-bold text-foreground">{stats?.totalPRs ?? 0}</span>
                    <span className="text-muted-foreground">PRs</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CircleDot className="w-4 h-4 text-primary" />
                    <span className="font-bold text-foreground">{stats?.totalIssues ?? 0}</span>
                    <span className="text-muted-foreground">issues</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-primary" />
                    <span className="font-bold text-foreground">{stats?.followers ?? 0}</span>
                    <span className="text-muted-foreground">followers</span>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="shrink-0">
                <Button
                  size="lg"
                  className="gap-2"
                  onClick={() => window.open(GITHUB_URL, '_blank')}
                  data-testid="button-visit-github"
                >
                  <Github className="w-4 h-4" />
                  View Profile
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ── 4 BIG STAT CARDS ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-6">
          {[
            { label: 'Total Repos',     value: stats ? String(repoCount)                 : '—', icon: BookOpen,    sub: 'public + private' },
            { label: 'Contributions',   value: stats ? String(stats.totalContributions)  : '—', icon: TrendingUp,  sub: 'past 12 months' },
            { label: 'Total Commits',   value: stats ? String(totalCommitsAll)           : '—', icon: GitCommit,   sub: 'this year' },
            { label: 'Current Streak',  value: stats ? `${stats.streak}d`                : '—', icon: Flame,       sub: 'days in a row' },
          ].map(({ label, value, icon: Icon, sub }) => (
            <Card key={label} className="border border-primary/20 bg-background/50 backdrop-blur-sm overflow-visible group hover-elevate transition-all duration-500">
              <CardContent className="pt-6 pb-6 flex flex-col items-center justify-center text-center gap-2">
                <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <p className={`text-3xl md:text-4xl font-extrabold text-primary tracking-tighter leading-none ${statsLoading ? 'animate-pulse opacity-30' : ''}`}>
                  {value}
                </p>
                <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">{label}</p>
                <p className="text-[10px] text-muted-foreground/70">{sub}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ── Heatmap + Languages ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

          {/* Contribution heatmap */}
          <Card className="lg:col-span-2 border border-primary/20 bg-background/50 backdrop-blur-sm overflow-visible hover-elevate transition-all">
            <CardContent className="pt-6 pb-6">
              <div className="flex items-center justify-between gap-2 mb-4 flex-wrap">
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  Contribution Calendar
                </p>
                {stats && (
                  <span className="text-xs font-bold text-primary">
                    {stats.totalContributions} contributions this year
                  </span>
                )}
              </div>
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
                Languages Used
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

        {/* ── Repositories ── */}
        <div>
          <div className="flex items-end justify-between gap-3 mb-5 flex-wrap">
            <div>
              <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                <Github className="w-4 h-4 text-primary" />
                All Repositories
              </p>
              <p className="text-xs text-muted-foreground/70 mt-1">
                {repoCount} total — public &amp; private synced from GitHub
              </p>
            </div>
            <a
              href={GITHUB_URL + '?tab=repositories'}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
              data-testid="link-all-repos"
            >
              View all on GitHub <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
            {repos.map((repo, i) => {
              const color = repo.languageColor ?? langColor[repo.language ?? ''] ?? langColor['Other'];
              const desc  = repo.description?.trim()
                || repoDescriptions[repo.name.toLowerCase()]
                || 'No description provided.';
              return (
                <Card
                  key={repo.name}
                  className="border border-primary/20 bg-background/60 backdrop-blur-sm hover-elevate active-elevate-2 transition-all cursor-pointer group overflow-visible flex flex-col"
                  onClick={() => window.open(repo.url, '_blank')}
                  data-testid={`card-repo-${i}`}
                >
                  <CardContent className="p-5 flex flex-col gap-3 flex-1">
                    {/* Header: name + privacy badge */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <BookOpen className="w-4 h-4 text-primary shrink-0" />
                        <p className="text-sm font-bold text-primary leading-snug group-hover:underline truncate" title={repo.name}>
                          {repo.name}
                        </p>
                      </div>
                      {repo.isPrivate ? (
                        <span className="text-[9px] font-bold text-muted-foreground/80 bg-muted/40 border border-border/40 px-1.5 py-0.5 rounded uppercase tracking-wider shrink-0">
                          Private
                        </span>
                      ) : (
                        <span className="text-[9px] font-bold text-primary bg-primary/10 border border-primary/30 px-1.5 py-0.5 rounded uppercase tracking-wider shrink-0">
                          Public
                        </span>
                      )}
                    </div>

                    {/* Description: fixed 2-line clamp for uniform height */}
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 min-h-[2.4rem] flex-1">
                      {desc}
                    </p>

                    {/* Footer: language + stars/forks */}
                    <div className="flex items-center gap-3 pt-2.5 border-t border-border/40">
                      {repo.language ? (
                        <div className="flex items-center gap-1.5 min-w-0">
                          <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
                          <span className="text-[11px] font-semibold text-muted-foreground truncate">{repo.language}</span>
                        </div>
                      ) : <div className="flex-1" />}
                      <div className="flex items-center gap-3 ml-auto shrink-0">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Star className="w-3 h-3" />
                          <span className="text-[11px] font-semibold">{repo.stars}</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <GitFork className="w-3 h-3" />
                          <span className="text-[11px] font-semibold">{repo.forks}</span>
                        </div>
                        <ExternalLink className="w-3 h-3 text-muted-foreground/60 group-hover:text-primary transition-colors" />
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
