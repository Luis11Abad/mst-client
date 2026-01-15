<script setup lang="ts">
import { ref } from 'vue'
import { DropDownDirections, type DropDownDirections as DropDownDirectionsType } from '@/types/ui'

withDefaults(defineProps<{ direction?: DropDownDirectionsType }>(), {
    direction: DropDownDirections.BottomLeft,
})

const open = ref(false)

function closeDropdown() {
    open.value = false
}
</script>
<template>
    <div class="drop-down" v-click-outside="closeDropdown">
        <div @click="open = !open"><slot name="trigger" :open="open"></slot></div>
        <div v-show="open" :class="['box', direction]"><slot name="content"></slot></div>
    </div>
</template>
<style>
.drop-down {
    @apply relative;
    .box {
        @apply absolute w-full;
        &.bl {
            @apply left-0 -top-full;
        }
        &.br {
            @apply right-0 top-full;
        }
        &.tl {
            @apply left-0 bottom-full;
        }
        &.tr {
            @apply right-0 bottom-full;
        }
    }
}
</style>
