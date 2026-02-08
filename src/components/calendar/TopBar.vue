<script setup lang="ts">
import { computed } from 'vue'
import { startOfWeek } from '@/utils/calendar'
import { CalendarView } from '@/types/calendar'
import { Icon } from '@iconify/vue'
import { useI18n } from 'vue-i18n'
import { useUI } from '@/composables/useUI'
import { useCalendar } from '@/composables/useCalendar'

const { locale } = useI18n()
const { openModal } = useUI()
const { changeView, currentDate, next, prev, view } = useCalendar()

const monthName = computed(() => {
    return currentDate.value.toLocaleDateString(locale.value === 'es' ? 'es-ES' : 'en-US', {
        month: 'long',
        year: 'numeric',
    })
})

const weekRange = computed(() => {
    const start = startOfWeek(currentDate.value)
    const end = new Date(start.getTime() + 6 * 24 * 60 * 60 * 1000)
    const loc = locale.value === 'es' ? 'es-ES' : 'en-US'
    return `${start.toLocaleDateString(loc, { day: 'numeric', month: 'short' })} - ${end.toLocaleDateString(loc, { day: 'numeric', month: 'short', year: 'numeric' })}`
})
</script>
<template>
    <div id="top-bar">
        <h2>{{ view === CalendarView.Monthly ? monthName : weekRange }}</h2>
        <div class="controls">
            <button @click="prev" class="period-nav">
                <Icon icon="solar:alt-arrow-left-line-duotone" height="18" />
            </button>
            <button @click="next" class="period-nav ml-2 mr-4">
                <Icon icon="solar:alt-arrow-right-line-duotone" height="18" />
            </button>
            <button
                @click="changeView(CalendarView.Weekly)"
                :class="['view-toggle weekly', { active: view === CalendarView.Weekly }]"
            >
                {{ $t('weekly') }}
            </button>
            <button
                @click="changeView(CalendarView.Monthly)"
                :class="['view-toggle monthly', { active: view === CalendarView.Monthly }]"
            >
                {{ $t('monthly') }}
            </button>
            <button class="add-btn" @click="openModal('add-event-modal')">
                <Icon icon="material-symbols:add-2-rounded" height="18" /> {{ $t('add') }}
            </button>
        </div>
    </div>
</template>
<style scoped>
#top-bar {
    @apply flex justify-between items-center py-5 px-6 mb-4;
    h2 {
        @apply text-xl font-semibold;
    }
    .controls {
        @apply flex;
    }
    .period-nav {
        @apply py-2 px-3 border rounded hover:bg-primary/5;
    }
    .view-toggle {
        @apply px-4 py-2 border hover:bg-whitesmoke/25;
        &.monthly {
            @apply rounded-r border-l-0;
        }
        &.weekly {
            @apply rounded-l border-r-0;
        }
        &.active {
            @apply bg-primary/5 text-primary;
        }
    }
    .add-btn {
        @apply ml-6 flex items-center gap-2 bg-primary text-white px-4 py-2 rounded hover:bg-primary/90;
    }
}
</style>
