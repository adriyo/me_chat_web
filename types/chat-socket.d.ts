import { type User } from "~/types/user";

export interface ChatSocketState {
  connected: boolean;
  isConnecting: boolean;
  user: User;
  messages: ChatMessage[];
  joinedUsers: User[];
}
