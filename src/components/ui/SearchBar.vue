<script setup lang="ts">
import { Icon } from '@iconify/vue';

const emits = defineEmits<{
    (e: 'search', query: string): void
}>()

let debounceTimer: ReturnType<typeof setTimeout>;

function handleSearch (event: Event) {
    clearTimeout(debounceTimer);
    const query = (event.target as HTMLInputElement).value;
    debounceTimer = setTimeout(() => {
        emits('search', query);
    }, 500);
}
</script>
<template>
    <div class="search-bar">
        <Icon icon="solar:magnifer-outline" height="16"/>
        <input @input="handleSearch" type="text" :placeholder="$t('search-placeholder')">
    </div>
</template>
<style scoped>
.search-bar {
    @apply relative;
    svg {
        @apply absolute top-2.5 left-3 -mt-px;
    }
    input {
        @apply pl-9 pr-3 h-9 text-sm;
    }
}
</style>