<script setup lang="ts">
defineProps<{
    message: string
}>()
</script>
<template>
    <div class="input-error">{{ message }}</div>
</template>
<style scoped>
.input-error {
    @apply py-1 px-2 text-red-500 bg-red-500/10 text-sm rounded;
}
</style>
