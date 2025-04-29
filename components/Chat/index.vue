<template>
    <div class="h-screen flex">
        <ChatSidebar :user="user" :joinedUsers="joinedUsers" />
        <ChatMenuOverlay :isOpen="isMenuOpen" @close="isMenuOpen = false" />
        <div class="flex-1 flex flex-col">
            <ChatHeader @onClickMenu="toggleMenu" />
            <div v-if="isLoading"
                class="fixed top left-1/2 space-x-2 bg-gray-100 dark:bg-gray-700 px-4 py-2 mt-2 rounded-full">
                <div class="flex items-center">
                    <LoadingSpinner />
                    <span class="text-gray-700 dark:text-gray-200">Connecting...</span>
                </div>
            </div>
            <div v-if="connectionError" class="error-message p-4 bg-red-100 text-center">
                <span class="text-red-500">Connection error: {{ connectionError }}</span>
                <button @click="retry" class="ml-2 px-3 py-1 bg-red-500 text-white rounded">Retry</button>

            </div>
            <ChatMessages :currentUserId="uuid ?? ''" :messages="messages" />
            <ChatInput @sendMessage="sendMessageHandler" />
        </div>
    </div>
</template>

<script setup>
import { ref, nextTick, watch, onMounted } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'vue-router';

const isMenuOpen = ref(false);

const nickname = ref('');
const chatRoomName = ref('');
const chatMode = ref('');
const isLoading = ref(true)

const router = useRouter();
const uuid = uuidv4()

const connectionError = ref(null);

const user = ref({ id: '', nickname: '', chatRoom: '' });
const joinedUsers = ref([]);
const messages = ref([]);

let socketInstance;

function initSocket() {
    const { state, sendMessage, disconnect, waitForConnection } = useSocket({
        nickname: nickname.value,
        chatRoomName: chatRoomName.value,
        chatMode: chatMode.value,
    });

    const messages = ref(state.messages)

    const connectionPromise = Promise.race([
        waitForConnection().then(() => {
            isLoading.value = false;
            connectionError.value = null;

            watch(() => messages, () => {
                nextTick(() => {
                    const messagesContainer = document.querySelector('.messages-container');
                    if (messagesContainer) {
                        messagesContainer.scrollTop = messagesContainer.scrollHeight;
                    }
                });
            }, { deep: true })
        }).catch((error) => {
            connectionError.value = error;
            isLoading.value = false;
            throw error;
        }),
        new Promise((_, reject) => {
            setTimeout(() => {
                if (!state.connected) {
                    reject(new Error('Connection timed out!'));
                }
            })
        })
    ]).catch((error) => {
        connectionError.value = error;
        isLoading.value = false;
        return state;
    })
    return {
        state, messages, sendMessage, disconnect, connectionPromise
    }
}

onMounted(() => {
    const { getChatConfig, isConfigured } = useChatConfig()

    if (!isConfigured()) {
        socketInstance.disconnect();
        router.push('/');
        return;
    }

    const config = getChatConfig();
    nickname.value = config.nickname;
    chatRoomName.value = config.chatRoomName;
    chatMode.value = config.chatMode;

    socketInstance = initSocket();
    watch(() => socketInstance.state, (newState) => {
        user.value = newState.user;
        joinedUsers.value = newState.joinedUsers;
        messages.value = newState.messages;
    }, { deep: true })

    onBeforeRouteLeave((to, from, next) => {
        const result = confirm("Are you sure you want to leave the chat?");
        if (result) {
            socketInstance.disconnect()
            next()
        } else {
            next(false)
        }
    })
});

const sendMessageHandler = (newMessage) => {
    if (!newMessage.trim()) {
        return;
    }

    const payload = {
        uuid: uuid,
        nickname: nickname.value,
        message: newMessage,
        chatRoom: chatRoomName.value,
        chatClientId: socketInstance.state.user.id,
    }
    if (socketInstance) {
        socketInstance.sendMessage(payload);
    } 
};

const retry = () => {
    isLoading.value = true;
    connectionError.value = null;
    if (socketInstance.state.connected) {
        socketInstance.disconnect();
    }

    socketInstance = initSocket();
}

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
}

</script>
