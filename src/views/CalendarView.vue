<script setup lang="ts">
import { ref } from 'vue'
import { CalendarView } from '@/types/calendar'

import TopBar from '@/components/layouts/main-layout/TopBar.vue'
import CalendarTopBar from '@/components/calendar/TopBar.vue'
import MonthlyView from '@/components/calendar/MonthlyView.vue'
import WeeklyView from '@/components/calendar/WeeklyView.vue'
import WeekDays from '@/components/calendar/WeekDays.vue'

const view = ref<CalendarView>(CalendarView.Weekly)
const currentDate = ref(new Date())

const toggleView = () => {
    view.value = view.value === CalendarView.Monthly ? CalendarView.Weekly : CalendarView.Monthly
}
</script>
<template>
    <section>
        <TopBar title="calendar" />
        <div class="p-8 flex-1">
            <div id="calendar">
                <CalendarTopBar
                    @update:current-date="(date) => (currentDate = date)"
                    @update:view="toggleView"
                    :currentDate="currentDate"
                    :view="view"
                />
                <WeekDays :current-date="currentDate" :view="view" />
                <MonthlyView v-if="view === CalendarView.Monthly" :currentDate="currentDate" />
                <WeeklyView v-else :currentDate="currentDate" />
            </div>
        </div>
    </section>
</template>
<style>
#calendar {
    @apply flex flex-col bg-white rounded-lg shadow h-full;
}
</style>
