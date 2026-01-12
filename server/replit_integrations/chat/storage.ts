import { storage } from "../../storage";

export interface IChatStorage {
  getConversation(id: number): Promise<any>;
  getAllConversations(): Promise<any[]>;
  createConversation(title: string): Promise<any>;
  deleteConversation(id: number): Promise<void>;
  getMessagesByConversation(conversationId: number): Promise<any[]>;
  createMessage(conversationId: number, role: string, content: string): Promise<any>;
}

export const chatStorage: IChatStorage = {
  async getConversation(id: number) {
    return storage.getConversation(id);
  },

  async getAllConversations() {
    return storage.getAllConversations();
  },

  async createConversation(title: string) {
    return storage.createConversation(title);
  },

  async deleteConversation(id: number) {
    return storage.deleteConversation(id);
  },

  async getMessagesByConversation(conversationId: number) {
    return storage.getMessagesByConversation(conversationId);
  },

  async createMessage(conversationId: number, role: string, content: string) {
    return storage.createChatMessage(conversationId, role, content);
  },
};

