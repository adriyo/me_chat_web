<template>
    <div class="border-t border-gray-200 p-4 bg-white dark:bg-gray-700">
        <div class="flex items-center gap-2">
            <input type="text" placeholder="Type a message..."
                class="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:border-green-500 dark:placeholder-gray-200 dark:text-white"
                v-model="newMessage" @keyup.enter="sendMessageHandler">
            <button class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                @click="sendMessageHandler">
                Send
            </button>
        </div>
    </div>
</template>

<script setup>
const newMessage = ref('');
const emit = defineEmits(['sendMessage']);

const sendMessageHandler = () => {
    emit('sendMessage', newMessage.value);
    newMessage.value = '';
}
</script>
