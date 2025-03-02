<script setup>
const colorMode = useColorMode()

const toggleColorMode = () => {
    colorMode.preference = colorMode.value === 'light' ? 'dark' : 'light'
}
</script>

<template>
    <button @click="toggleColorMode"
        class="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
        <span v-if="colorMode.value === 'light'">
            🌙
        </span>
        <span v-else>
            ☀️
        </span>
    </button>
</template> 