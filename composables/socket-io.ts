import { reactive } from "vue";
import { io } from "socket.io-client";
import { type ChatSocketState } from "~/types/chat-socket";
import { type ChatMessage } from "~/types/chat-message";

export const useSocket = ({
  nickname,
  chatRoomName,
}: {
  nickname: string;
  chatRoomName: string;
}) => {
  const state = reactive<ChatSocketState>({
    isConnecting: true,
    connected: false,
    messages: [],
    joinedUsers: [],
    user: {
      id: "",
      nickname: "",
      chatRoom: "",
    },
  });

  const config = useRuntimeConfig();

  const URL = config.public.apiChatUrl as string;

  const socket = io(URL, {
    auth: {
      nickname: nickname,
      chatRoomName: chatRoomName,
    },
  });

  const connectionPromise = new Promise((resolve, reject) => {
    if (state.connected) {
      resolve(socket);
    } else {
      socket.on("connect", () => {
        state.isConnecting = false;
        state.connected = true;
        state.user = {
          id: socket.id!,
          nickname: nickname,
          chatRoom: chatRoomName,
        };
        resolve(socket);
      });

      socket.on("connect_error", (error: Error) => {
        reject(error);
      });
    }
  });

  socket.on("disconnect", () => {
    console.log("socket disconnect");
    state.connected = false;
    socket.close();
  });

  socket.on("chat", (data: ChatMessage) => {
    state.messages.push(data);
  });

  socket.on("room-users", (users: any[]) => {
    state.joinedUsers = users;
  });

  socket.on("chat-joined", (...user: any) => {
    if (!state.joinedUsers.find((u) => u.id === user[0].id)) {
      state.joinedUsers.push(user);
    }
  });

  socket.on("chat-left", (...data) => {
    const leftUserId = data[0];
    state.joinedUsers = state.joinedUsers.filter(
      (user) => user.id !== leftUserId
    );
  });

  const sendMessage = (message: string) => {
    if (socket) {
      socket.emit("chat", message);
    }
  };

  const disconnect = () => {
    if (socket) {
      socket.disconnect();
      state.connected = false;
    }
  };

  return {
    state,
    sendMessage,
    disconnect,
    waitForConnection: () => connectionPromise,
  };
};
