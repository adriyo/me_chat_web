<template>
    <div class="min-h-screen flex flex-col">
        <div class="w-full px-4 py-3 flex justify-between items-center shadow-md">
            <div class="text-xl font-bold text-gray-800 dark:text-white">
                ChatApp
            </div>
            <ThemeToggle />
        </div>
        <div class="flex flex-col items-center justify-center flex-grow">
            <div class="text-center mb-12">
                <h1 class="text-4xl font-bold text-gray-800 dark:text-white mb-4">Welcome to ChatApp</h1>
                <p class="text-lg text-gray-600 max-w-2xl mx-auto">
                    Experience seamless conversations with our intuitive chat application. Connect with others instantly
                    and communicate effortlessly.
                </p>
            </div>
            <button @click="onActionStart"
                class="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition duration-300">
                Get Started
            </button>
            <div class="mt-16 grid grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div class="text-center p-6">
                    <h3 class="text-xl font-semibold text-gray-800 dark:text-white mb-2">Real-time Chat</h3>
                    <p class="text-gray-600">Instant messaging with real-time updates</p>
                </div>
                <div class="text-center p-6">
                    <h3 class="text-xl font-semibold text-gray-800 dark:text-white mb-2">User Friendly</h3>
                    <p class="text-gray-600">Clean and intuitive interface for everyone</p>
                </div>
                <div class="text-center p-6">
                    <h3 class="text-xl font-semibold text-gray-800 dark:text-white mb-2">Simple</h3>
                    <p class="text-gray-600">Enjoy instant access without the need to sign up</p>
                </div>
            </div>
        </div>
        <SetupModal :showModal="showModal" @onDiscard="showModal = false" />
    </div>
</template>

<script setup>
import { ref } from 'vue';

const showModal = ref(false);

const onActionStart = () => {
    showModal.value = !showModal.value;
}
</script>