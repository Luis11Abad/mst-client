<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { daysInWeek, isToday } from '@/utils/calendar'
import { CalendarView } from '@/types/calendar'

defineProps<{
    currentDate: Date
    view: CalendarView
}>()

const { t } = useI18n()

const weekdays = [t('mon'), t('tue'), t('wed'), t('thu'), t('fri'), t('sat'), t('sun')]
const weekDays = ref(daysInWeek(new Date()))
</script>
<template>
    <div class="weekdays">
        <div v-for="(day, index) in weekdays" :key="day" class="weekday">
            <span v-if="view == CalendarView.Weekly" :class="{ today: isToday(weekDays[index]) }">
                {{ day }} {{ weekDays[index].getDate() }}
            </span>
            <template v-else>{{ day }}</template>
        </div>
    </div>
</template>
<style scoped>
.weekdays {
    @apply grid grid-cols-7 gap-1 mb-2;
    .weekday {
        @apply text-center font-medium text-gray-600;
        span {
            @apply px-2 py-1;
            &.today {
                @apply bg-primary text-white rounded;
            }
        }
    }
}
</style>
