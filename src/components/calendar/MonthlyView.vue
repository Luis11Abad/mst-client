<script setup lang="ts">
import { computed } from 'vue'
import { useCalendar } from '@/composables/useCalendar'
import { daysInMonth, isToday } from '@/utils/calendar'

const { currentDate } = useCalendar()

const monthDays = computed(() => daysInMonth(currentDate.value))
</script>
<template>
    <div id="monthly-view">
        <div class="grid">
            <div
                v-for="day in monthDays"
                :key="day.date.toISOString()"
                :class="[
                    'day',
                    {
                        'different-month': !day.isCurrentMonth,
                        'previous-date': day.date < new Date(),
                    },
                ]"
            >
                <span :class="{ today: isToday(day.date) }">{{ day.date.getDate() }}</span>
                <div class="event-list"></div>
            </div>
        </div>
    </div>
</template>
<style scoped>
#monthly-view {
    @apply flex-1;
    .grid {
        @apply grid grid-cols-7 h-full;
        .day {
            @apply h-full flex flex-col p-2 border-l border-t;
            &.different-month,
            &.previous-date {
                @apply text-gray;
            }
            &.different-month {
                @apply bg-whitesmoke/35;
            }
            span {
                @apply h-7 w-7 flex items-center justify-center rounded-full;
                &.today {
                    @apply text-primary bg-primary/5;
                }
            }
            .event-list {
                @apply mt-2 flex-1 overflow-y-auto;
            }
        }
    }
}
</style>
