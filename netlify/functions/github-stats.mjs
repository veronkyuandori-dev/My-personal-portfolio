const GITHUB_USERNAME = 'andrieVerdev';

export const handler = async () => {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return {
      statusCode: 503,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'GITHUB_TOKEN not configured' }),
    };
  }

  const query = `
    query($login: String!) {
      user(login: $login) {
        name avatarUrl bio
        followers { totalCount }
        publicRepoCount: repositories(privacy: PUBLIC) { totalCount }
        totalRepoCount: repositories(ownerAffiliations: OWNER) { totalCount }
        repositories(first: 30, ownerAffiliations: OWNER, orderBy: {field: UPDATED_AT, direction: DESC}) {
          nodes {
            name description url isPrivate
            stargazerCount forkCount
            primaryLanguage { name color }
          }
        }
        contributionsCollection {
          totalCommitContributions
          totalPullRequestContributions
          totalIssueContributions
          restrictedContributionsCount
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays { contributionCount date }
            }
          }
        }
      }
    }
  `;

  try {
    const resp = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables: { login: GITHUB_USERNAME } }),
    });

    const json = await resp.json();
    if (json.errors) {
      return {
        statusCode: 502,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: json.errors[0]?.message }),
      };
    }

    const user = json.data?.user;
    const cc = user?.contributionsCollection;
    const totalCommits =
      (cc?.totalCommitContributions ?? 0) + (cc?.restrictedContributionsCount ?? 0);

    const data = {
      name: user?.name ?? GITHUB_USERNAME,
      avatarUrl: user?.avatarUrl ?? '',
      bio: user?.bio ?? null,
      followers: user?.followers?.totalCount ?? 0,
      publicRepos: user?.publicRepoCount?.totalCount ?? 0,
      totalRepos: user?.totalRepoCount?.totalCount ?? 0,
      totalContributions: cc?.contributionCalendar?.totalContributions ?? 0,
      totalCommits,
      totalPRs: cc?.totalPullRequestContributions ?? 0,
      totalIssues: cc?.totalIssueContributions ?? 0,
      streak: 0,
      weeks: cc?.contributionCalendar?.weeks ?? [],
      repos: (user?.repositories?.nodes ?? []).map((r) => ({
        name: r.name,
        description: r.description,
        url: r.url,
        isPrivate: r.isPrivate,
        stars: r.stargazerCount,
        forks: r.forkCount,
        language: r.primaryLanguage?.name ?? null,
        languageColor: r.primaryLanguage?.color ?? null,
      })),
    };

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: String(err) }),
    };
  }
};
