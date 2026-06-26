import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertMessageSchema } from "@shared/schema";
import { Resend } from "resend";
import { registerChatRoutes } from "./replit_integrations/chat";
import { registerImageRoutes } from "./replit_integrations/image";
import { GoogleGenerativeAI } from "@google/generative-ai";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const gemini = process.env.GEMINI_API_KEY
  ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  : null;

const VERONQUE_CONTEXT = `Ikaw si V-AI, ang AI assistant ni Veronque Andrie (andrieVerdev). 
Sumasagot ka tungkol sa portfolio ni Veronque. Maging helpful, friendly, at concise. 
Sumasagot ka sa Filipino/Tagalog kung mag-Tagalog ang user, English kung English sila.

Tungkol kay Veronque Andrie:
- BS Information Technology student sa University of Cabuyao, Laguna, Philippines
- Available para sa freelance work
- Email: veronqueandrei@gmail.com
- GitHub: github.com/andrieVerdev
- Handle: andrieVerdev

Mga Skills:
- Frontend: React, TypeScript, HTML/CSS, Tailwind CSS
- Backend: Node.js, Express, Python
- Cloud: Microsoft Azure (AZ-900 certified), AWS, Google Cloud
- Tools: Git, GitHub, Docker, VS Code
- Interests: IoT, Computer Vision, Robotics, Full-stack development, Cybersecurity

Mga Projects:
- QR Attendance System — real-time dashboard, role-based login
- Library Management System — book CRUD, borrow/return tracking
- School Attendance System — student profiles, class scheduling
- Facial Recognition AI — TensorFlow.js, real-time identification
- Laguna Tourist Guide — interactive maps at reviews
- Flappy Bird Clone — pure HTML/CSS/JS browser game

Mga Certifications (16+):
- Microsoft Certified: Azure Fundamentals (AZ-900) — May 2025
- AWS: Fundamentals of Machine Learning and AI — March 2026
- AWS: Domain 1 Review, Cloud Practitioner (CLF-C02) — Nov 2025
- Microsoft: Plan and Prepare to Develop AI Solutions on Azure — Sept 2025
- Microsoft: Introduction to Site Reliability Engineering (SRE) — Oct 2025
- Microsoft: Discover Data Analysis — Sept 2025
- Google Cloud: Managing Change when Moving to Google Cloud
- Google Cloud: MLOps for Generative AI — Nov 2025
- Google Cloud: Introduction to Responsible AI — Nov 2025
- AI Ready ASEAN: Hour of Code Training — ASEAN Foundation & Google.org
- AI Ready ASEAN: Hour of Code Campaign — June 2025
- WVSU: Beyond the Black Box — Explainable AI in Game Dev — Oct 2025
- WVSU: A Beginner's Journey into Blockchain and Cryptocurrency — Nov 2025
- WVSU: Digital Twins — Nov 2025
- Cisco: AI at Work: Analyze Customer Reviews — Sept 2025
- Cisco: C++ Essentials 1 — Sept 2025
- GitHub: Trigger GitHub Actions with Feature-Based Development — Dec 2025

Kung hindi mo alam ang sagot, sabihin mo lang at i-refer sa contact form o email.
Huwag gumawa ng impormasyon na wala sa context na ito.`;

export async function registerRoutes(app: Express): Promise<Server> {
  registerChatRoutes(app);
  registerImageRoutes(app);

  // Gemini-powered V-AI chat endpoint
  app.post("/api/chat", async (req, res) => {
    if (!gemini) {
      return res.status(503).json({ error: "GEMINI_API_KEY not configured" });
    }
    try {
      const { message, history = [] } = req.body as {
        message: string;
        history: { role: string; parts: { text: string }[] }[];
      };

      const model = gemini.getGenerativeModel({
        model: "gemini-2.5-flash",
        systemInstruction: VERONQUE_CONTEXT,
      });

      const chat = model.startChat({ history });
      const result = await chat.sendMessage(message);
      const text = result.response.text();

      res.json({ reply: text });
    } catch (err: any) {
      console.error("Gemini error:", err?.message ?? err);
      res.status(500).json({ error: "Failed to get AI response" });
    }
  });

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
          publicRepoCount: repositories(privacy: PUBLIC) { totalCount }
          totalRepoCount: repositories(ownerAffiliations: OWNER) { totalCount }
          repositories(first: 30, ownerAffiliations: OWNER, orderBy: {field: UPDATED_AT, direction: DESC}) {
            nodes {
              name
              description
              url
              isPrivate
              stargazerCount
              forkCount
              primaryLanguage { name color }
              updatedAt
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

      const repoNodes = user?.repositories?.nodes ?? [];
      const repos = repoNodes.map((r: any) => ({
        name: r.name,
        description: r.description,
        url: r.url,
        isPrivate: r.isPrivate,
        stars: r.stargazerCount ?? 0,
        forks: r.forkCount ?? 0,
        language: r.primaryLanguage?.name ?? null,
        languageColor: r.primaryLanguage?.color ?? null,
        updatedAt: r.updatedAt,
      }));

      res.json({
        name: user?.name,
        avatarUrl: user?.avatarUrl,
        bio: user?.bio,
        followers: user?.followers?.totalCount ?? 0,
        following: user?.following?.totalCount ?? 0,
        publicRepos: user?.publicRepoCount?.totalCount ?? 0,
        totalRepos: user?.totalRepoCount?.totalCount ?? 0,
        totalContributions: calendar?.totalContributions ?? 0,
        totalCommits: col?.totalCommitContributions ?? 0,
        totalPRs: col?.totalPullRequestContributions ?? 0,
        totalIssues: col?.totalIssueContributions ?? 0,
        streak,
        weeks: calendar?.weeks ?? [],
        repos,
      });
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch GitHub data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
