<template>
    <div class="hidden md:block w-64 bg-gray-100 dark:bg-gray-900 border-r border-gray-200">
        <div class="p-4 flex flex-row items-center">
            <h2 class="text-xl font-semibold text-gray-800 dark:text-white">Chats</h2>
            <ThemeToggle class="ml-auto" />
        </div>
        <div class="border-t border-gray-200 dark:border-gray-700"></div>
        <div class="p-4 dark:text-white">
            Room: {{ user.chatRoom }}
        </div>
        <div class="border-t border-gray-200 dark:border-gray-700"></div>
        <div class="p-4">
            <span class="text-gray-800 dark:text-white">Joined User: ({{ joinedUsers.length }})</span>
            <ul class="space-y-2">
                <li v-for="joinedUser in joinedUsers" :key="joinedUser.id" class="flex items-center">
                    <span class="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    <span class="text-gray-800 dark:text-white">
                        {{ joinedUser.id === user.id ? `You (${user.nickname})` : joinedUser.nickname }}
                    </span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script setup>
const prop = defineProps({
    joinedUsers: {
        type: Array,
        required: true,
        default: () => []
    },
    user: {
        type: Object,
        required: true,
        default: {}
    }
})
</script>