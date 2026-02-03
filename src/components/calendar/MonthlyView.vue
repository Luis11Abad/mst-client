<script setup lang="ts">
import { computed } from 'vue'
import { isToday } from '@/utils/calendar'

const props = defineProps<{
    currentDate: Date
}>()

const daysInMonth = computed(() => {
    const year = props.currentDate.getFullYear()
    const month = props.currentDate.getMonth()

    const firstDayDate = new Date(year, month, 1)
    const startOffset = firstDayDate.getDay() === 0 ? 6 : firstDayDate.getDay() - 1

    const lastDate = new Date(year, month + 1, 0).getDate()
    const days = []

    const prevMonthLastDate = new Date(year, month, 0).getDate()
    for (let i = startOffset; i > 0; i--) {
        days.push({
            date: new Date(year, month - 1, prevMonthLastDate - i + 1),
            isCurrentMonth: false,
        })
    }

    for (let i = 1; i <= lastDate; i++) {
        days.push({
            date: new Date(year, month, i),
            isCurrentMonth: true,
        })
    }

    const totalSlots = days.length > 35 ? 42 : 35
    const remaining = totalSlots - days.length

    for (let i = 1; i <= remaining; i++) {
        days.push({
            date: new Date(year, month + 1, i),
            isCurrentMonth: false,
        })
    }

    return days
})
</script>
<template>
    <div class="monthly-view">
        <div class="days-grid">
            <div
                v-for="day in daysInMonth"
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
.monthly-view {
    @apply flex-1;
    .days-grid {
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
                    @apply bg-primary text-white;
                }
            }
            .event-list {
                @apply mt-2 flex-1 overflow-y-auto;
            }
        }
    }
}
</style>
