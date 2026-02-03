<script setup lang="ts">
import { Icon } from '@iconify/vue';
</script>
<template>
    <div id="no-results">
        <Icon icon="solar:magnifer-broken" height="24"/>
        <p class="text-sm">{{ $t('no-contacts-placeholder') }}</p>
    </div>
</template>
<style scoped>
#no-results {
    @apply flex flex-col items-center justify-center flex-1 text-gray gap-y-2.5;
}
</style>