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

  const httpServer = createServer(app);
  return httpServer;
}
