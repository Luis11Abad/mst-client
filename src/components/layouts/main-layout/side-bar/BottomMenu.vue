<script setup lang="ts">
import { useUI } from '@/composables/useUI'

import { Icon } from '@iconify/vue/dist/iconify.js'
import DropDown from '@/components/ui/DropDown.vue'

const { drawerExpanded } = useUI()
</script>
<template>
    <div id="bottom-menu">
        <DropDown :class="drawerExpanded ? 'w-full' : ''">
            <template #trigger>
                <button :class="['bottom-item', { collapsed: !drawerExpanded }]">
                    <Icon height="22" icon="solar:bell-broken" />
                    <span v-if="drawerExpanded">{{ $t('notifications') }}</span>
                </button>
            </template>
        </DropDown>
        <router-link
            to="/settings"
            :class="[
                'bottom-item',
                {
                    active: $route.name === 'settings',
                    collapsed: !drawerExpanded,
                },
            ]"
        >
            <Icon height="22" icon="solar:settings-broken" />
            <span v-if="drawerExpanded">{{ $t('settings') }}</span>
        </router-link>
    </div>
</template>
<style scoped>
#bottom-menu {
    @apply flex flex-col items-center w-full gap-y-3 pb-8;
    .bottom-item {
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
