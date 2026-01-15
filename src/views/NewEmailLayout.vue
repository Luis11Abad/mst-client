<script setup lang="ts">
import { useUI } from '@/composables/useUI'
import { onMounted, onUnmounted } from 'vue'

const { drawerExpanded, blockDrawerExpand } = useUI()

const prevExpandState = drawerExpanded.value

onMounted(() => {
    blockDrawerExpand.value = true
    drawerExpanded.value = false
})
onUnmounted(() => {
    blockDrawerExpand.value = false
    drawerExpanded.value = prevExpandState
})
</script>
<template>
    <p>NEW EMAIL</p>
</template>
