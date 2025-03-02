<template>
    <div class="flex-1 overflow-y-auto p-4 bg-white dark:bg-gray-800 messages-container">
        <div v-for="message in messages" :key="message.id" class="mb-4">
            <div class="flex flex-col" :class="message.uuid === currentUserId ? 'items-end' : 'items-start'">
                <span class="text-xs text-gray-700 dark:text-white mb-1">{{ message.uuid === currentUserId ? "You" :
                    message.nickname }} {{ }}</span>
                <div :class="[
                    'rounded-lg p-2 max-w-[70%] text-xs inline-block',
                    message.uuid === currentUserId ?
                        'bg-green-500 text-white' :
                        'bg-gray-100 text-gray-800'
                ]">
                    <p class="break-words">{{ message.message }}</p>
                    <span class="text-xs opacity-75 block mt-1">
                        {{ formatTimestamp(message.timestamp) }}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const prop = defineProps({
    messages: {
        type: Array,
        required: true,
        default: () => []
    },
    currentUserId: {
        type: String,
        required: true
    }
})

const formatTimestamp = (ts) => {
    return new Date(ts).toLocaleString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    })
}
</script>