<script setup lang="ts">
import { computed, ref, onMounted, nextTick } from 'vue'
import { daysInWeek } from '@/utils/calendar'
import { useCalendar } from '@/composables/useCalendar'

const { currentDate } = useCalendar()

const gridRef = ref<HTMLElement | null>(null)
const timeBarTop = ref('0px')

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

onMounted(async () => {
    await nextTick()

    const now = new Date()
    const hour = now.getHours()
    const minute = now.getMinutes()
    const minutePart = minute >= 30 ? '30' : '00'
    const target = `${hour.toString().padStart(2, '0')}:${minutePart}`

    const idx = hours.value.findIndex((h) => h === target)
    console.log(idx)
    if (idx === -1) return

    const rowHeight = 50
    const headerOffset = 32
    const scrollTop = headerOffset + idx * rowHeight
    gridRef.value?.scrollTo({ top: scrollTop, behavior: 'smooth' })

    const totalMinutes = hour * 60 + minute
    const topPx = headerOffset + (totalMinutes * rowHeight) / 30
    timeBarTop.value = `${topPx}px`
})

function isPreviousDate(day: Date, hour: string) {
    day.setHours(Number(hour.split(':')[0]))
    day.setMinutes(Number(hour.split(':')[1]))

    return day < new Date()
}
</script>
<template>
    <div id="weekly-view">
        <div class="grid" ref="gridRef">
            <div class="time-bar" :style="{ top: timeBarTop }"></div>
            <div class="time-cell"></div>
            <div v-for="i in 7" :key="i" class="day-cell"></div>
            <template v-for="hour in hours" :key="hour">
                <div class="time-cell">
                    <span>{{ hour }}</span>
                </div>
                <div
                    v-for="day in weekDays"
                    :key="`${day.toISOString()}-${hour}`"
                    :class="['day-cell', { 'previous-date': isPreviousDate(day, hour) }]"
                ></div>
            </template>
        </div>
    </div>
</template>

<style scoped>
#weekly-view {
    @apply overflow-hidden;
    .grid {
        @apply relative flex-1 grid grid-cols-[88px_repeat(7,_1fr)] grid-rows-[32px_repeat(48,_50px)] h-full overflow-auto scrollbar scrollbar-w-2 scrollbar-track-whitesmoke/50 scrollbar-thumb-gray/50 scrollbar-thumb-rounded;
        .time-cell {
            @apply bg-whitesmoke/50 flex justify-center;
            span {
                @apply -translate-y-2.5 -top-px;
            }
        }
        .day-cell {
            @apply border-b border-l flex items-center justify-center text-sm;
            &.previous-date {
                @apply text-gray bg-whitesmoke/35;
            }
        }
        .time-bar {
            @apply absolute h-0.5 bg-primary left-22 right-0 z-10 -translate-y-px;
        }
        .day-cell {
            position: relative;
        }
    }
}
</style>
