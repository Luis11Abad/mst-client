<script setup lang="ts">
import { useId } from 'vue'

defineProps<{
    label: string
}>()

const model = defineModel<string>({ default: '' })

const id = useId()
</script>
<template>
    <div class="text-area">
        <label :for="id">{{ label }}</label>
        <textarea :id="id" v-model="model" />
    </div>
</template>
<style scoped>
.text-area {
    @apply flex flex-col;
}
</style>
