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

        // Fetch repos with language data
        const reposResponse = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=pushed&order=desc`
        );
        if (!reposResponse.ok) throw new Error('Failed to fetch repos');
        const reposData = await reposResponse.json();
        
        // Get detailed language data for repos
        const reposWithLanguages = (reposData as any[]).map((repo: any) => ({
          name: repo.name,
          html_url: repo.html_url,
          description: repo.description,
          stargazers_count: repo.stargazers_count,
          language: repo.language,
        }));
        
        setRepos(reposWithLanguages);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch GitHub data');
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  // Calculate stats
  const languages = repos
    .filter(repo => repo.language)
    .reduce((acc: { [key: string]: number }, repo) => {
      acc[repo.language] = (acc[repo.language] || 0) + 1;
      return acc;
    }, {});
  const topLanguages = Object.entries(languages)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

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
            <div className="animate-spin">
              <Github className="w-12 h-12 text-primary" />
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-20 text-destructive">
            <p>Unable to load GitHub stats. Please try again later.</p>
          </div>
        ) : userData ? (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
              {/* Main Profile Card */}
              <AnimationWrapper type="slide" direction="up" delay={200} duration={700}>
                <Card className="lg:col-span-1 border border-primary/20 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/40 bg-background/50 backdrop-blur-sm hover-elevate transition-all duration-300">
                  <CardHeader>
                    <div className="flex flex-col items-center gap-4">
                      <img
                        src={userData.avatar_url}
                        alt={userData.name}
                        className="w-24 h-24 rounded-full border-2 border-primary/50"
                      />
                      <div className="text-center">
                        <CardTitle className="text-xl font-heading">{userData.name || 'Developer'}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">@{GITHUB_USERNAME}</p>
                        {userData.bio && <p className="text-xs text-foreground/70 mt-2">{userData.bio}</p>}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button
                      className="w-full gap-2 rounded-full"
                      onClick={() => window.open(userData.html_url, '_blank')}
                      data-testid="button-visit-github"
                    >
                      <Github className="w-4 h-4" />
                      Visit GitHub
                    </Button>
                  </CardContent>
                </Card>
              </AnimationWrapper>

              {/* Stats Grid */}
              <AnimationWrapper type="slide" direction="up" delay={400} duration={700}>
                <div className="lg:col-span-2 grid grid-cols-2 gap-4">
                  {/* Repositories */}
                  <Card className="border border-primary/20 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/40 bg-background/50 backdrop-blur-sm hover-elevate transition-all duration-300">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3">
                        <div className="p-3 rounded-lg bg-primary/15">
                          <Code className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Public Repos</p>
                          <p className="text-3xl font-bold text-primary">{userData.public_repos}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Languages */}
                  <Card className="border border-primary/20 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/40 bg-background/50 backdrop-blur-sm hover-elevate transition-all duration-300">
                    <CardContent className="pt-6">
                      <div>
                        <p className="text-sm text-muted-foreground mb-3">Top Languages</p>
                        <div className="flex flex-wrap gap-2">
                          {topLanguages.length > 0 ? (
                            topLanguages.map(([lang, count]) => (
                              <span
                                key={lang}
                                className="px-2.5 py-1 text-xs font-medium rounded-full bg-primary/20 text-primary border border-primary/40"
                              >
                                {lang} ({count})
                              </span>
                            ))
                          ) : (
                            <span className="text-xs text-muted-foreground">No language data</span>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </AnimationWrapper>
            </div>
          </>
        ) : null}
      </div>
    </section>
  );
}
