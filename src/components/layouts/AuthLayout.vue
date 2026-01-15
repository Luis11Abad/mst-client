<script lang="ts" setup>
import { onMounted, watch } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { Layout } from '@/types/ui'

import { Icon } from '@iconify/vue'
import { useRoute } from 'vue-router'

const { checkSession, error } = useAuth()

const landingUrl = import.meta.env.VITE_LANDING_URL ?? ''
const requestDemoUrl = import.meta.env.VITE_REQUEST_DEMO_URL ?? ''

const route = useRoute()

onMounted(() => {
    checkSession(Layout.Auth)
})

watch(
    () => route.name,
    () => {
        if (error.value) error.value = ''
    },
)
</script>
<template>
    <header
        class="fixed w-full max-w-6xl left-1/2 -translate-1/2 top-12 flex justify-between items-center"
    >
        <a :href="landingUrl"><img src="@/assets/images/logo.png" alt="logo" class="h-10" /></a>
        <a :href="requestDemoUrl" class="bg-secondary px-3 py-2 text-white rounded-md">{{
            $t('request-demo')
        }}</a>
    </header>
    <main id="auth-layout">
        <h2>{{ $t(`${$route.name as string}-title`) }}</h2>
        <h4>{{ $t(`${$route.name as string}-subtitle`) }}</h4>
        <form @submit.prevent>
            <slot />
            <div v-if="error" class="error">
                <Icon icon="material-symbols:error-rounded" width="21" />
                {{ error }}
            </div>
        </form>
        <router-link v-if="$route.name !== 'login'" to="/auth/login">{{
            $t('back-to-login')
        }}</router-link>
        <p>© {{ new Date().getFullYear() }} Merkurius Sales Tools</p>
    </main>
</template>
<style>
#auth-layout {
    @apply flex flex-col items-center justify-center w-screen h-screen bg-whitesmoke;
    h2 {
        @apply text-4xl font-medium mb-3;
    }
    h4 {
        @apply mb-6 text-xl text-gray font-semibold;
    }
    form {
        @apply w-full max-w-lg flex flex-col p-6 gap-y-4 bg-white rounded-md border;
        input {
            @apply w-full h-11 px-3 -mt-2 mb-2 border rounded-md;
        }
        button {
            @apply bg-primary w-full h-11 text-white rounded-md;
        }
        p {
            @apply !mt-0;
        }
        svg {
            @apply h-7 text-white mx-auto;
        }
        .error {
            @apply flex justify-center items-center gap-x-2 text-red-500 bg-red-50 rounded-md p-2;
            svg {
                @apply text-red-500 mx-0;
            }
        }
    }
    a {
        @apply text-primary mt-3 hover:underline;
    }
    p {
        @apply text-gray mt-6 text-sm;
    }
}
</style>
