<template>
    <div class="fixed inset-0 bg-black/30 z-50 transition-opacity duration-300 flex justify-end"
        :class="{ 'opacity-0 pointer-events-none': !isOpen, 'opacity-100': isOpen }">
        <div class="bg-white dark:bg-gray-800 w-64 h-screen shadow-lg transform transition-transform duration-300 flex flex-col"
            :class="{ 'translate-x-full': !isOpen, 'translate-x-0': isOpen }">
            <div class="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">Menu</h3>
                <button @click="close"
                    class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none">
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <nav class="flex-1 overflow-y-auto p-4">
                <ul>
                    <li>
                        <a href="#"
                            class="px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 hover:text-gray-900 dark:hover:text-white">
                            <div class="flex items-center">
                                Theme
                                <ThemeToggle class="ml-auto" />
                            </div>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ChatMenuOverlay',
    props: {
        isOpen: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        close() {
            this.$emit('close');
        }
    }
}
</script>