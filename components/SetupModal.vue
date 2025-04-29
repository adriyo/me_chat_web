<template>
    <div v-if="showModal" class="fixed inset-0 bg-gray-950/50 flex items-center justify-center z-50">
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 w-96">
            <h2 class="text-xl font-bold text-gray-800 dark:text-white mb-4">Setup</h2>
            <div class="mb-4">
                <label for="nickname" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Input your nickname
                </label>
                <input type="text" id="nickname" v-model="nicknameInput"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Enter your nickname" required />
            </div>
            <div class="mb-4">
                <label for="chatRoomNameInput" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Input chat room name
                </label>
                <input type="text" id="chatRoomNameInput" v-model="chatRoomNameInput"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Enter chatroom name" required />
            </div>
            <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Chat Mode
                </label>
                <div class="flex space-x-4">
                    <label class="inline-flex items-center">
                        <input type="radio" id="single" name="chatMode" v-model="chatModeInput" value="single"
                            class="form-radio text-green-500 focus:ring-green-500 dark:bg-gray-700" />
                        <span class="ml-2 text-gray-700 dark:text-gray-300">Single</span>
                    </label>
                    <label class="inline-flex items-center">
                        <input type="radio" id="multiple" name="chatMode" v-model="chatModeInput" value="multiple"
                            class="form-radio text-green-500 focus:ring-green-500 dark:bg-gray-700" />
                        <span class="ml-2 text-gray-700 dark:text-gray-300">Multiple</span>
                    </label>
                </div>
            </div>
            <div class="flex justify-end space-x-3">
                <button @click="$emit('onDiscard')"
                    class="px-4 py-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white">
                    Cancel
                </button>
                <button @click="onSubmitConfig"
                    class="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center space-x-2"
                    :disabled="!nicknameInput.trim() || !chatRoomNameInput.trim()">
                    Save & Continue
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
const { setChatConfig } = useChatConfig();
const router = useRouter();
const showModal = defineModel('showModal');
const props = defineProps({
    showModal: {
        type: Boolean,
        required: true
    },
});

const emit = defineEmits(['onDiscard']);

const nicknameInput = ref('');
const chatRoomNameInput = ref('');
const chatModeInput = ref('single');

const onSubmitConfig = () => {
    const nickname = nicknameInput.value.trim();
    const chatRoomName = chatRoomNameInput.value.trim();
    if (!nickname || !chatRoomName) {
        return;
    }
    const chatMode = chatModeInput.value;
    setChatConfig({ nickname: nickname, chatRoomName: chatRoomName, chatMode: chatMode });
    nicknameInput.value = '';
    chatRoomNameInput.value = '';

    router.push({ path: '/chat' });
};

</script>