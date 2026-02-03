<script setup lang="ts">
import { computed } from 'vue'
import { daysInWeek } from '@/utils/calendar'
import { useCalendar } from '@/composables/useCalendar'

const { currentDate } = useCalendar()

const weekDays = computed(() => daysInWeek(currentDate.value))
const hours = computed(() => {
    const hoursArray: string[] = []
    for (let hour = 0; hour < 24; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
            hoursArray.push(
                `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`,
            )
        }
    }
    return hoursArray
})
</script>
<template>
    <div id="weekly-view">
        <div class="grid">
            <template v-for="hour in hours" :key="hour">
                <div class="time-cell">{{ hour }}</div>
                <div v-for="day in weekDays" :key="`${day.toISOString()}-${hour}`" class="day-cell">
                    <!-- Eventos aquí -->
                </div>
            </template>
        </div>
    </div>
</template>

<style scoped>
#weekly-view {
    @apply overflow-hidden;
    .grid {
        @apply flex-1 grid grid-cols-[100px_repeat(7,_1fr)] grid-rows-[50px_repeat(48,_50px)] h-full overflow-auto scrollbar scrollbar-w-2 scrollbar-track-whitesmoke/50 scrollbar-thumb-gray/50 scrollbar-thumb-rounded;
        .time-cell,
        .day-cell {
            @apply border-b border-l flex items-center justify-center text-sm;
        }
        .time-cell {
            @apply bg-whitesmoke/50;
        }
        .day-cell {
            position: relative;
        }
    }
}
</style>
