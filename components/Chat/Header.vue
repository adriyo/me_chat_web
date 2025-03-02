<template>
    <div
        class="flex md:hidden flex-row justify-between items-center border-b border-gray-200 p-4 bg-white dark:bg-gray-700">
        <div>
            <h1 class="text-xl font-semibold text-gray-800 dark:text-white">ChatApp</h1>
        </div>
        <div>
            <div class="border border-gray-200 rounded-xs p-1" @click="$emit('onClickMenu')">
                <Icon name="uil:subject" class="flex p-3 justify-center items-center text-gray-800 dark:text-white" />
            </div>
        </div>
    </div>
</template>

<script setup>
const emit = defineEmits(['onClickMenu']);
</script>