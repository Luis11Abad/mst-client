<script setup lang="ts">
import type { EventItem } from '@/types/calendar'

defineProps<{
    event: EventItem
    previous: boolean
}>()
</script>
<template>
    <div :class="['event-item', { previous: previous }]">
        <h5>{{ event.description }}</h5>
        <p>{{ event.startTime }} - {{ event.endTime }}</p>
    </div>
</template>
<style scoped>
.event-item {
    @apply text-xs bg-primary/5 text-primary font-semibold px-2 py-1 rounded;
    &.previous {
        @apply opacity-65 pointer-events-none grayscale;
    }
    p {
        @apply font-normal;
    }
}
</style>
