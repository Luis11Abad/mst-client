<script setup lang="ts">
import { ref } from 'vue'
import { useUI } from '@/composables/useUI'

import { Icon } from '@iconify/vue/dist/iconify.js'

const { drawerExpanded } = useUI()

const items = ref([
    { icon: 'solar:graph-new-up-outline', label: 'dashboard', to: '/' },
    { icon: 'solar:users-group-rounded-outline', label: 'contacts', to: 'contacts' },
    { icon: 'solar:calendar-mark-outline', label: 'calendar', to: 'calendar' },
    { icon: 'solar:box-broken', label: 'inventory', to: 'inventory' },
    { icon: 'solar:ticket-sale-outline', label: 'promotions', to: 'promotions' },
])
</script>
<template>
    <div id="nav-menu">
        <router-link
            v-for="(item, index) in items"
            :key="index"
            :to="item.to"
            :class="[
                'nav-item',
                {
                    active: $route.name === item.to || ($route.name === 'home' && item.to === '/'),
                    collapsed: !drawerExpanded,
                },
            ]"
        >
            <Icon height="22" :icon="item.icon" />
            <span v-if="drawerExpanded">{{ $t(item.label) }}</span>
        </router-link>
    </div>
</template>
<style scoped>
#nav-menu {
    @apply flex flex-col items-center flex-1 w-full gap-y-3;
    .nav-item {
        @apply flex items-center justify-start gap-x-3 px-4 h-10 w-full text-gray;
        &.active,
        &:hover {
            @apply bg-primary/5 rounded-md text-primary;
        }
        &.collapsed {
            @apply justify-center gap-x-0 px-0 w-10;
        }
    }
}
</style>
