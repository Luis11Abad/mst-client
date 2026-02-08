<script setup lang="ts">
import { AlertType } from '@/types/ui'
import { Icon } from '@iconify/vue/dist/iconify.js'

defineProps<{
    type: AlertType
    message: string
}>()

const iconNames = new Map([
    [AlertType.Error, 'solar:danger-circle-bold'],
    [AlertType.Info, 'solar:info-circle-bold'],
    [AlertType.Success, 'solar:check-circle-bold'],
    [AlertType.Warning, 'solar:danger-triangle-bold'],
])
</script>
<template>
    <div :class="['alert', type]">
        <Icon :icon="iconNames.get(type) as string" height="22" />
        {{ message }}
    </div>
</template>
<style scoped>
.alert {
    @apply absolute top-4 right-4 flex items-center gap-x-3 py-3 px-4 rounded min-w-72 text-white z-50;
    &.error {
        @apply bg-red-500;
    }
    &.info {
        @apply bg-primary;
    }
    &.success {
        @apply bg-green-600;
    }
    &.warning {
        @apply bg-amber-500;
    }
    svg {
        @apply flex-none;
    }
}
</style>
