import { type User, type InsertUser, type Message, type InsertMessage, type Conversation, type InsertConversation, type Message as ChatMessage, type InsertMessage as InsertChatMessage, conversations, messages as chatMessages } from "@shared/schema";
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
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private messages: Map<string, Message>;
  private conversations: Map<number, Conversation>;
  private chatMessages: Map<number, ChatMessage>;
  private currentConversationId: number = 1;
  private currentChatMessageId: number = 1;

  constructor() {
    this.users = new Map();
    this.messages = new Map();
    this.conversations = new Map();
    this.chatMessages = new Map();
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
}

export const storage = new MemStorage();
