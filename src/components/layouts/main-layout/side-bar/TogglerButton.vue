<script setup lang="ts">
import { useUI } from '@/composables/useUI'

import { Icon } from '@iconify/vue/dist/iconify.js'

const { blockDrawerExpand, drawerExpanded } = useUI()
</script>

<template>
    <button :disabled="blockDrawerExpand" @click="drawerExpanded = !drawerExpanded" id="toggler">
        <Icon
            :class="['transition-all', { 'rotate-180': drawerExpanded }]"
            height="22"
            icon="line-md:chevron-small-double-right"
        />
    </button>
</template>
<style scoped>
#toggler {
    @apply absolute top-1/2 -translate-y-1/2 -right-4 py-1 px-1 flex items-center justify-center border rounded-md bg-white;
    svg {
        @apply flex-none;
    }
    &:disabled {
        @apply cursor-text !bg-white;
        svg {
            @apply text-gray/35;
        }
    }
}
</style>
