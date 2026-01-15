<script setup lang="ts">
import { Icon } from '@iconify/vue'
</script>
<template>
    <div id="main-loading">
        <Icon icon="line-md:loading-twotone-loop" height="48" id="loader" />
    </div>
</template>
<style scoped>
#main-loading {
    @apply h-screen w-screen fixed flex items-center justify-center bg-whitesmoke text-primary;
}
</style>
