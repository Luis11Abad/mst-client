<script setup lang="ts">
import { computed } from 'vue'
import { startOfWeek } from '@/utils/calendar'
import { CalendarView } from '@/types/calendar'
import { Icon } from '@iconify/vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const props = defineProps<{
    view: CalendarView
    currentDate: Date
}>()

const emit = defineEmits<{
    (e: 'update:view', value: CalendarView): void
    (e: 'update:currentDate', value: Date): void
}>()

const prev = () => {
    if (props.view === CalendarView.Monthly) {
        emit(
            'update:currentDate',
            new Date(props.currentDate.getFullYear(), props.currentDate.getMonth() - 1, 1),
        )
    } else {
        emit('update:currentDate', new Date(props.currentDate.getTime() - 7 * 24 * 60 * 60 * 1000))
    }
}

const next = () => {
    if (props.view === CalendarView.Monthly) {
        emit(
            'update:currentDate',
            new Date(props.currentDate.getFullYear(), props.currentDate.getMonth() + 1, 1),
        )
    } else {
        emit('update:currentDate', new Date(props.currentDate.getTime() + 7 * 24 * 60 * 60 * 1000))
    }
}

const monthName = computed(() => {
    return props.currentDate.toLocaleDateString(locale.value === 'es' ? 'es-ES' : 'en-US', {
        month: 'long',
        year: 'numeric',
    })
})

const weekRange = computed(() => {
    const start = startOfWeek(props.currentDate)
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
                @click="$emit('update:view', CalendarView.Weekly)"
                :class="['view-toggle weekly', { active: view === CalendarView.Weekly }]"
            >
                {{ $t('weekly') }}
            </button>
            <button
                @click="$emit('update:view', CalendarView.Monthly)"
                :class="['view-toggle monthly', { active: view === CalendarView.Monthly }]"
            >
                {{ $t('monthly') }}
            </button>
            <button></button>
        </div>
    </div>
    <div></div>
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
}
</style>
