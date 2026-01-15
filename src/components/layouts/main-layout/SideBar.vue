<script setup lang="ts">
import { useUI } from '@/composables/useUI'

import { Icon } from '@iconify/vue/dist/iconify.js'
import NavMenu from './side-bar/NavMenu.vue'
import TogglerButton from './side-bar/TogglerButton.vue'
import UserBox from './side-bar/UserBox.vue'
import BottomMenu from './side-bar/BottomMenu.vue'

const { drawerExpanded } = useUI()

const storageUrl = `${import.meta.env.VITE_SUPABASE_URL}${import.meta.env.VITE_SUPABASE_MAIN_STORAGE}`
</script>
<template>
    <aside :class="{ collapsed: !drawerExpanded }">
        <div>
            <img
                class="h-9 mx-auto mt-4 mb-2 flex-none"
                :src="`${storageUrl}/${drawerExpanded ? 'logo' : 'imago'}.png`"
                alt="Logo Merkurius"
            />
            <router-link class="main-cta" to="/new-email">
                <Icon icon="solar:plain-outline" height="24" />
                <span v-if="drawerExpanded">{{ $t('new-email') }}</span>
            </router-link>
            <NavMenu />
            <BottomMenu />
            <UserBox />
        </div>
        <TogglerButton />
    </aside>
</template>
<style scoped>
aside {
    @apply h-full flex border-r bg-white relative z-20;
    > div {
        @apply flex flex-col items-center mx-auto py-3 px-3 w-72;
        .main-cta {
            @apply flex items-center justify-center w-full gap-x-2 bg-primary text-white h-12 rounded-md my-4 mx-auto;
        }
    }
    &.collapsed {
        > div {
            @apply w-16 px-1;
            .main-cta {
                @apply w-12;
            }
        }
    }
}
</style>
