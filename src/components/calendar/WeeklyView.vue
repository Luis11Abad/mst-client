<script setup lang="ts">
import { daysInWeek } from '@/utils/calendar'

const props = defineProps<{
    currentDate: Date
}>()
</script>
<template>
    <div class="weekly-view">
        <div class="days-grid">
            <div
                v-for="day in daysInWeek(props.currentDate)"
                :key="day.toISOString()"
                class="day"
            ></div>
        </div>
    </div>
</template>

<style scoped>
.weekly-view {
    @apply flex-1;
    .days-grid {
        @apply grid grid-cols-7 h-full;
        .day {
            @apply h-full flex items-center justify-center border-l border-t;
            &.today {
                @apply bg-primary text-white;
            }
        }
    }
}
</style>
