<script setup lang="ts">
import { computed } from 'vue'
import { useCalendar } from '@/composables/useCalendar'
import { daysInMonth, isToday } from '@/utils/calendar'
import type { EventItem as EventItemType } from '@/types/calendar'
import EventItem from './EventItem.vue'

defineProps<{
    events: EventItemType[]
}>()

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
                <div class="event-list">
                    <template v-for="event in events" :key="event.id">
                        <EventItem
                            v-if="new Date(event.date).getDate() === day.date.getDate()"
                            :event="event"
                            :previous="day.date < new Date()"
                        />
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
#monthly-view {
    @apply flex-1 overflow-hidden;
    .grid {
        @apply grid grid-cols-7 h-full overflow-auto;
        .day {
            @apply h-full flex flex-col p-2 border-l border-t overflow-hidden;
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
                @apply flex flex-col mt-1 flex-1 aspect-3/2 gap-y-1 overflow-y-auto scrollbar scrollbar-w-0;
            }
        }
    }
}
</style>
