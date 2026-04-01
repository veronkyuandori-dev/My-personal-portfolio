import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertMessageSchema } from "@shared/schema";
import { Resend } from "resend";
import { registerChatRoutes } from "./replit_integrations/chat";
import { registerImageRoutes } from "./replit_integrations/image";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function registerRoutes(app: Express): Promise<Server> {
  registerChatRoutes(app);
  registerImageRoutes(app);

  app.get("/api/blogs", async (_req, res) => {
    try {
      const blogs = await storage.getBlogs();
      res.json(blogs);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blogs" });
    }
  });

  app.get("/api/blogs/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const blog = await storage.getBlog(id);
      if (!blog) return res.status(404).json({ error: "Blog not found" });
      res.json(blog);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blog" });
    }
  });
  app.post("/api/contact", async (req, res) => {
    try {
      const data = insertMessageSchema.parse(req.body);
      const message = await storage.createMessage(data);

      if (resend) {
        try {
          await resend.emails.send({
            from: "Portfolio Contact <onboarding@resend.dev>",
            to: "veronqueandrei@gmail.com",
            subject: `[${data.category}] New Project Inquiry: ${data.subject}`,
            html: `
              <h3>New Project Inquiry from Portfolio</h3>
              <p><strong>Name:</strong> ${data.name}</p>
              <p><strong>Email:</strong> ${data.email}</p>
              <p><strong>Category:</strong> ${data.category}</p>
              <p><strong>Subject:</strong> ${data.subject}</p>
              <p><strong>File Reference:</strong> ${data.fileUrl || 'No file link provided'}</p>
              <p><strong>Message:</strong></p>
              <p style="white-space: pre-wrap;">${data.message}</p>
            `,
          });
        } catch (emailError) {
          console.error("Failed to send email via Resend:", emailError);
        }
      }

      res.json(message);
    } catch (error) {
      res.status(400).json({ error: "Invalid form data" });
    }
  });

  // GitHub Stats — proxied through backend so token stays secret
  app.get("/api/github-stats", async (_req, res) => {
    const token = process.env.GITHUB_TOKEN;
    if (!token) {
      return res.status(503).json({ error: "GITHUB_TOKEN not configured" });
    }

    const query = `
      query($login: String!) {
        user(login: $login) {
          name
          avatarUrl
          bio
          followers { totalCount }
          following { totalCount }
          repositories(privacy: PUBLIC) { totalCount }
          contributionsCollection {
            totalCommitContributions
            totalPullRequestContributions
            totalIssueContributions
            restrictedContributionsCount
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  contributionCount
                  date
                }
              }
            }
          }
        }
      }
    `;

    try {
      const response = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          Authorization: `bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query, variables: { login: "andrieVerdev" } }),
      });

      const json = await response.json() as any;
      if (json.errors) {
        return res.status(400).json({ error: json.errors[0]?.message ?? "GraphQL error" });
      }

      const user = json.data?.user;
      const col = user?.contributionsCollection;
      const calendar = col?.contributionCalendar;

      // Calculate current streak from calendar days
      const days = (calendar?.weeks ?? [])
        .flatMap((w: any) => w.contributionDays)
        .sort((a: any, b: any) => b.date.localeCompare(a.date));

      let streak = 0;
      for (const day of days) {
        if (day.contributionCount > 0) streak++;
        else break;
      }

      res.json({
        name: user?.name,
        avatarUrl: user?.avatarUrl,
        bio: user?.bio,
        followers: user?.followers?.totalCount ?? 0,
        following: user?.following?.totalCount ?? 0,
        publicRepos: user?.repositories?.totalCount ?? 0,
        totalContributions: calendar?.totalContributions ?? 0,
        totalCommits: col?.totalCommitContributions ?? 0,
        totalPRs: col?.totalPullRequestContributions ?? 0,
        totalIssues: col?.totalIssueContributions ?? 0,
        streak,
        weeks: calendar?.weeks ?? [],
      });
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch GitHub data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
