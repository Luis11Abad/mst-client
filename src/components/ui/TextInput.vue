<script setup lang="ts">
import { useId } from 'vue'

defineProps<{
    label: string
}>()

const model = defineModel<string>({ default: '' })

const id = useId()
</script>
<template>
    <div class="text-input">
        <label :for="id">{{ label }}</label>
        <input :id="id" v-model="model" type="text" />
    </div>
</template>
<style scoped>
.text-input {
    @apply flex flex-col;
}
</style>
