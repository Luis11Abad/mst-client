<script setup lang="ts">
import { Icon } from '@iconify/vue/dist/iconify.js';
import { ref, useId } from 'vue'

defineProps<{
    icon?: string
    label: string
}>()

defineEmits<{
    (e: 'onFocus'): void
}>()

const model = defineModel<string>({ default: '' })


const id = useId()
</script>
<template>
    <div :class="['text-input', { 'with-icon': icon }]">
        <label :for="id">{{ label }}</label>
        <Icon v-if="icon" :icon="icon" height="18"/>
        <input @focus="$emit('onFocus')" :id="id" v-model="model" type="text" />
    </div>
</template>
<style scoped>
.text-input {
    @apply flex flex-col;
    &.with-icon {
        input {
            @apply pl-10;
        }
        svg {
            @apply absolute left-3 top-10 text-gray -translate-y-px;
        }
    }
}
</style>
