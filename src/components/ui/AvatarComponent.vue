<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    src?: string
    name: string
}>()

const initials = computed(() => {
    if (props.name.length === 0) return ''
    const parts = props.name.trim().split(' ')
    if (parts.length === 1) return parts[0][0].toUpperCase()
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
})
</script>
<template>
    <div class="avatar">
        <img v-if="src" :src="src" :alt="name">
        <span v-else>{{ initials }}</span>
    </div>
</template>
<style scoped>
.avatar {
    @apply w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-semibold text-white overflow-hidden;
    img {
        @apply w-full h-full object-cover;
    }
}
</style>