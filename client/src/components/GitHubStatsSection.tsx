import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Github, Code } from 'lucide-react';
import AnimationWrapper from '@/components/AnimationWrapper';

interface GitHubUser {
  name: string;
  avatar_url: string;
  public_repos: number;
  html_url: string;
  bio: string;
}

interface GitHubRepo {
  name: string;
  html_url: string;
  description: string;
  stargazers_count: number;
  language: string;
}

export default function GitHubStatsSection() {
  const [userData, setUserData] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const GITHUB_USERNAME = 'andrieVerdev';

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setLoading(true);
        
        // Fetch user data
        const userResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
        if (!userResponse.ok) throw new Error('Failed to fetch user data');
        const user = await userResponse.json();
        setUserData(user);

        // Fetch repos
        const reposResponse = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=pushed&order=desc`
        );
        if (!reposResponse.ok) throw new Error('Failed to fetch repos');
        const reposData = await reposResponse.json();
        
        // Calculate top languages from real data
        const langMap: Record<string, number> = {};
        reposData.forEach((repo: any) => {
          if (repo.language) {
            langMap[repo.language] = (langMap[repo.language] || 0) + 1;
          }
        });

        const sortedLangs = Object.entries(langMap)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5);
        
        setRepos(reposData);
        setTopLanguagesFromData(sortedLangs);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch GitHub data');
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  const [topLanguagesFromData, setTopLanguagesFromData] = useState<[string, number][]>([]);

  return (
    <section id="github" className="py-20 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <AnimationWrapper type="fade" duration={800}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 bg-gradient-to-r from-primary via-chart-2 to-chart-3 bg-clip-text text-transparent">
              GitHub Stats
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Real-time overview of my development activity and contributions
            </p>
          </div>
        </AnimationWrapper>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin p-4 rounded-full bg-primary/10 border border-primary/20 shadow-lg shadow-primary/20">
              <Github className="w-12 h-12 text-primary" />
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-20 text-destructive bg-destructive/5 rounded-2xl border border-destructive/20 max-w-lg mx-auto">
            <p className="font-bold">Unable to load GitHub stats. Please try again later.</p>
          </div>
        ) : userData ? (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              {/* Main Profile Card */}
              <AnimationWrapper type="slide" direction="up" delay={200} duration={700}>
                <Card className="lg:col-span-1 border border-primary/20 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/40 bg-background/50 backdrop-blur-sm hover-elevate active-elevate-2 transition-all duration-500 overflow-visible group">
                  <CardHeader>
                    <div className="flex flex-col items-center gap-6">
                      <div className="relative">
                        <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-110 animate-pulse" />
                        <img
                          src={userData.avatar_url}
                          alt={userData.name}
                          className="w-32 h-32 rounded-full border-4 border-primary/40 shadow-xl group-hover:scale-105 transition-transform duration-500 relative z-10"
                        />
                      </div>
                      <div className="text-center">
                        <CardTitle className="text-2xl font-heading font-extrabold text-foreground tracking-tight">{userData.name || 'Developer'}</CardTitle>
                        <p className="text-sm font-bold text-primary mt-1 tracking-wider uppercase opacity-80">@{GITHUB_USERNAME}</p>
                        {userData.bio && <p className="text-sm text-muted-foreground mt-4 leading-relaxed font-medium">{userData.bio}</p>}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <Button
                      className="w-full gap-3 rounded-full font-extrabold hover-elevate active-elevate-2 shadow-lg shadow-primary/20 py-6"
                      onClick={() => window.open(userData.html_url, '_blank')}
                      data-testid="button-visit-github"
                    >
                      <Github className="w-5 h-5" />
                      Visit GitHub Profile
                    </Button>
                  </CardContent>
                </Card>
              </AnimationWrapper>

              {/* Stats Grid */}
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Repositories */}
                <AnimationWrapper type="slide" direction="up" delay={400} duration={700}>
                  <Card className="h-full border border-primary/20 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/40 bg-background/50 backdrop-blur-sm hover-elevate active-elevate-2 transition-all duration-500 overflow-visible group">
                    <CardContent className="pt-10 pb-10 flex flex-col items-center justify-center text-center">
                      <div className="p-5 rounded-2xl bg-primary/10 border border-primary/20 mb-6 group-hover:scale-110 transition-transform shadow-inner">
                        <Code className="w-10 h-10 text-primary" />
                      </div>
                      <p className="text-base font-bold text-muted-foreground uppercase tracking-widest mb-2">Public Repositories</p>
                      <p className="text-6xl font-extrabold text-primary tracking-tighter">{userData.public_repos}</p>
                    </CardContent>
                  </Card>
                </AnimationWrapper>

                {/* Languages */}
                <AnimationWrapper type="slide" direction="up" delay={600} duration={700}>
                  <Card className="h-full border border-primary/20 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/40 bg-background/50 backdrop-blur-sm hover-elevate active-elevate-2 transition-all duration-500 overflow-visible group">
                    <CardContent className="pt-8 pb-8">
                      <p className="text-base font-bold text-muted-foreground uppercase tracking-widest mb-6 text-center">Top Technologies</p>
                      <div className="flex flex-wrap justify-center gap-3">
                        {topLanguagesFromData.length > 0 ? (
                          topLanguagesFromData.map(([lang, count]) => (
                            <div
                              key={lang}
                              className="px-4 py-2 text-sm font-extrabold rounded-xl bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 hover:border-primary/40 transition-all cursor-default"
                            >
                              {lang} <span className="text-primary/60 ml-1">[{count}]</span>
                            </div>
                          ))
                        ) : (
                          <span className="text-sm text-muted-foreground">No technology data available</span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </AnimationWrapper>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </section>
  );
}
