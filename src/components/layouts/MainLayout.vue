<script lang="ts" setup>
import { onMounted, watch } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { AuthLoadingState } from '@/types/auth'
import { Layout } from '@/types/ui'

import CompleteProfile from './main-layout/CompleteProfile.vue'
import SideBar from './main-layout/SideBar.vue'
import MainLoader from './main-layout/MainLoader.vue'

const { checkSession, getProfile, loading, session, user } = useAuth()

onMounted(() => {
    checkSession(Layout.Main)
})

watch(
    () => session.value,
    () => {
        if (session.value) getProfile()
    },
    { immediate: true },
)
</script>
<template>
    <MainLoader v-if="loading === AuthLoadingState.Session" />
    <template v-else>
        <SideBar />
        <main>
            <slot />
            <CompleteProfile v-if="user && !user.is_completed" />
        </main>
    </template>
</template>
<style>
main {
    @apply w-full h-full relative;
    #loader {
        @apply text-primary absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2;
    }
}
</style>
