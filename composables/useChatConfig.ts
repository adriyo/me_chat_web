import { type ChatConfig } from "~/types/chat-config";

export const useChatConfig = () => {
  const setChatConfig = (chatConfig: ChatConfig) => {
    localStorage.setItem("chatNickname", chatConfig.nickname);
    localStorage.setItem("chatRoomName", chatConfig.chatRoomName);
    localStorage.setItem("chatMode", chatConfig.chatMode);
  };

  const getChatConfig = (): ChatConfig => {
    const nickname = localStorage.getItem("chatNickname");
    const chatRoomName = localStorage.getItem("chatRoomName");
    const chatMode = localStorage.getItem("chatMode");
    return {
      nickname,
      chatRoomName,
      chatMode,
    };
  };

  const clear = () => {
    localStorage.removeItem("chatNickname");
    localStorage.removeItem("chatRoomName");
    localStorage.removeItem("chatMode");
  };

  const isConfigured = () => {
    const nickname = localStorage.getItem("chatNickname");
    const chatRoomName = localStorage.getItem("chatRoomName");
    const chatMode = localStorage.getItem("chatMode");
    return nickname && chatRoomName && chatMode;
  };

  return {
    setChatConfig,
    getChatConfig,
    clear,
    isConfigured,
  };
};
