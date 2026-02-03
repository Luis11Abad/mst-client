<script setup lang="ts">
import { Icon } from '@iconify/vue/dist/iconify.js';

</script>
<template>
    <div id="loader">
        <Icon class="text-primary" icon="line-md:loading-twotone-loop" height="32"/>
        <p>{{ $t('loading-data') }}</p>
    </div>
</template>
<style scoped>
#loader {
    @apply w-full h-full flex flex-col items-center justify-center bg-white/50;
    p {
        @apply text-sm text-gray mt-2.5;
    }
} 
</style>