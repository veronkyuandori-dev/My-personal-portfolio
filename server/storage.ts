import { type User, type InsertUser, type Message, type InsertMessage, type Conversation, type InsertConversation, type Message as ChatMessage, type InsertMessage as InsertChatMessage, conversations, messages as chatMessages, type Blog, type InsertBlog, blogs } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createMessage(message: InsertMessage): Promise<Message>;

  // Chat Storage
  getConversation(id: number): Promise<Conversation | undefined>;
  getAllConversations(): Promise<Conversation[]>;
  createConversation(title: string): Promise<Conversation>;
  deleteConversation(id: number): Promise<void>;
  getMessagesByConversation(conversationId: number): Promise<ChatMessage[]>;
  createChatMessage(conversationId: number, role: string, content: string): Promise<ChatMessage>;

  // Blog Storage
  getBlogs(): Promise<Blog[]>;
  getBlog(id: number): Promise<Blog | undefined>;
  createBlog(blog: InsertBlog): Promise<Blog>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private messages: Map<string, Message>;
  private conversations: Map<number, Conversation>;
  private chatMessages: Map<number, ChatMessage>;
  private blogs: Map<number, Blog>;
  private currentConversationId: number = 1;
  private currentChatMessageId: number = 1;
  private currentBlogId: number = 1;

  constructor() {
    this.users = new Map();
    this.messages = new Map();
    this.conversations = new Map();
    this.chatMessages = new Map();
    this.blogs = new Map();
    this.seedBlogs();
  }

  private seedBlogs() {
    const initialBlogs: InsertBlog[] = [
      {
        title: "Building Smart IoT Systems",
        excerpt: "Learn how we integrated sensors and cloud services for real-time monitoring.",
        content: "Detailed content about IoT integration...",
        category: "IoT & Robotics",
        date: "Jan 10, 2026",
        imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475",
      },
      {
        title: "Cybersecurity Best Practices for Web Apps",
        excerpt: "Protecting your applications from modern threats using advanced security patterns.",
        content: "Security is paramount in today's digital landscape...",
        category: "Security",
        date: "Jan 05, 2026",
        imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b",
      }
    ];
    initialBlogs.forEach(blog => this.createBlog(blog));
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const id = randomUUID();
    const message: Message = { ...insertMessage, id };
    this.messages.set(id, message);
    return message;
  }

  // Chat Implementation
  async getConversation(id: number): Promise<Conversation | undefined> {
    return this.conversations.get(id);
  }

  async getAllConversations(): Promise<Conversation[]> {
    return Array.from(this.conversations.values()).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async createConversation(title: string): Promise<Conversation> {
    const id = this.currentConversationId++;
    const conversation: Conversation = { id, title, createdAt: new Date() };
    this.conversations.set(id, conversation);
    return conversation;
  }

  async deleteConversation(id: number): Promise<void> {
    this.conversations.delete(id);
    const messageIdsToDelete = Array.from(this.chatMessages.values())
      .filter(m => m.conversationId === id)
      .map(m => m.id);
    messageIdsToDelete.forEach(mid => this.chatMessages.delete(mid));
  }

  async getMessagesByConversation(conversationId: number): Promise<ChatMessage[]> {
    return Array.from(this.chatMessages.values())
      .filter(m => m.conversationId === conversationId)
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }

  async createChatMessage(conversationId: number, role: string, content: string): Promise<ChatMessage> {
    const id = this.currentChatMessageId++;
    const message: ChatMessage = { id, conversationId, role, content, createdAt: new Date() };
    this.chatMessages.set(id, message);
    return message;
  }

  // Blog Implementation
  async getBlogs(): Promise<Blog[]> {
    return Array.from(this.blogs.values()).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  async getBlog(id: number): Promise<Blog | undefined> {
    return this.blogs.get(id);
  }

  async createBlog(insertBlog: InsertBlog): Promise<Blog> {
    const id = this.currentBlogId++;
    const blog: Blog = { ...insertBlog, id };
    this.blogs.set(id, blog);
    return blog;
  }
}

export const storage = new MemStorage();
