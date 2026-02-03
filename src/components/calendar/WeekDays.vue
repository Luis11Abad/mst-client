<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { daysInWeek, isToday } from '@/utils/calendar'
import { CalendarView } from '@/types/calendar'
import { useCalendar } from '@/composables/useCalendar'

const { currentDate, view } = useCalendar()

const { t } = useI18n()

const dayNames = [t('mon'), t('tue'), t('wed'), t('thu'), t('fri'), t('sat'), t('sun')]
const weekDays = computed(() => daysInWeek(currentDate.value))
</script>
<template>
    <div :class="['weekdays', { 'weekly-view': view == CalendarView.Weekly }]">
        <div v-if="view == CalendarView.Weekly"></div>
        <div v-for="(day, index) in dayNames" :key="day" class="weekday">
            <span v-if="view == CalendarView.Weekly" :class="{ today: isToday(weekDays[index]) }">
                {{ day }} {{ weekDays[index].getDate() }}
            </span>
            <template v-else>{{ day }}</template>
        </div>
        <div v-if="view == CalendarView.Weekly"></div>
    </div>
</template>
<style scoped>
.weekdays {
    @apply grid grid-cols-7 gap-1 pb-2;
    &.weekly-view {
        @apply grid-cols-[100px_repeat(7,_1fr)_8px] border-b;
    }
    .weekday {
        @apply text-center font-medium text-gray-600;
        span {
            @apply px-2 py-1;
            &.today {
                @apply text-primary bg-primary/5 rounded;
            }
        }
    }
}
</style>
