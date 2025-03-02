import { type ChatConfig } from "~/types/chat-config";

export const useChatConfig = () => {
  const setChatConfig = (chatConfig: ChatConfig) => {
    localStorage.setItem("chatNickname", chatConfig.nickname);
    localStorage.setItem("chatRoomName", chatConfig.chatRoomName);
  };

  const getChatConfig = (): ChatConfig => {
    const nickname = localStorage.getItem("chatNickname");
    const chatRoomName = localStorage.getItem("chatRoomName");
    return {
      nickname,
      chatRoomName,
    };
  };

  const clear = () => {
    localStorage.removeItem("chatNickname");
    localStorage.removeItem("chatRoomName");
  };

  const isConfigured = () => {
    const nickname = localStorage.getItem("chatNickname");
    const chatRoomName = localStorage.getItem("chatRoomName");
    return nickname && chatRoomName;
  };

  return {
    setChatConfig,
    getChatConfig,
    clear,
    isConfigured,
  };
};
