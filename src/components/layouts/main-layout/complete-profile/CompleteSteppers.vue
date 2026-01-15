<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
defineProps<{
    currentStep: number
    steps: string[]
}>()
</script>
<template>
    <div id="steps-indicator">
        <div class="bar">
            <div
                v-for="part in Array.from({ length: steps.length - 1 }, (_, i) => i)"
                :class="{ completed: part < currentStep }"
                :key="part"
            ></div>
        </div>
        <div
            class="indicators"
            v-for="(step, index) in steps"
            :key="step"
            :class="{ active: index === currentStep, completed: index < currentStep }"
        >
            <span>{{ $t(step) }}</span>
            <div></div>
        </div>
    </div>
</template>
<style scoped>
#steps-indicator {
    @apply flex w-full justify-between gap-x-6 my-12 relative;
    .indicators {
        @apply flex flex-col items-center gap-y-3 z-10 text-gray;
        > div {
            @apply h-4 w-4 rounded-full bg-white border-2 border-lightgray;
        }
        &.active {
            @apply text-primary;
            > div {
                @apply border-primary;
            }
        }
        &.completed {
            > div {
                @apply bg-primary border-primary;
            }
        }
    }
    .bar {
        @apply flex absolute translate-y-px bottom-2 left-10 right-10 h-0.5 bg-lightgray;
        div {
            @apply flex-1;
            &.completed {
                @apply bg-primary;
            }
        }
    }
}
</style>
