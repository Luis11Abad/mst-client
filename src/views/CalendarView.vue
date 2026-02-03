<script setup lang="ts">
import { useCalendar } from '@/composables/useCalendar'
import { CalendarView } from '@/types/calendar'

import TopBar from '@/components/layouts/main-layout/TopBar.vue'
import CalendarTopBar from '@/components/calendar/TopBar.vue'
import MonthlyView from '@/components/calendar/MonthlyView.vue'
import WeeklyView from '@/components/calendar/WeeklyView.vue'
import WeekDays from '@/components/calendar/WeekDays.vue'
import AddEventModal from '@/components/calendar/AddEventModal.vue'

const { currentDate, view } = useCalendar()
</script>
<template>
    <section>
        <TopBar title="calendar" />
        <div class="p-8 flex-1 overflow-hidden">
            <div id="calendar">
                <CalendarTopBar />
                <WeekDays :current-date="currentDate" :view="view" />
                <MonthlyView v-if="view === CalendarView.Monthly" :currentDate="currentDate" />
                <WeeklyView v-else :currentDate="currentDate" />
            </div>
        </div>
    </section>
    <AddEventModal />
</template>
<style>
#calendar {
    @apply flex flex-col bg-white rounded-lg shadow h-full;
}
</style>
