<script lang="ts" setup>
import { useAuth } from '@/composables/useAuth';
import { onMounted } from 'vue';
import { Icon } from '@iconify/vue';

const { checkSession, loading } = useAuth()

onMounted(() => {
    checkSession()
})

</script>
<template>
    <main class="flex items-center justify-center w-screen h-screen bg-whitesmoke">
        <Icon v-if="loading" icon="line-md:loading-twotone-loop" height="48" class="text-primary"/>
        <slot v-else/>
    </main>
</template>
