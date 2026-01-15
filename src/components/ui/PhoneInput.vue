<script setup lang="ts">
import { VueTelInput } from 'vue-tel-input'
import '@/assets/vue-tel-input.css'

const modelValue = defineModel()

defineEmits(['update:validStatus'])

const inputOptions = {
    placecholder: '',
}
const dropdownOptions = {
    showDialCodeInList: true,
    showFlags: true,
    showSearchBox: true,
}
</script>

<template>
    <vue-tel-input
        :dropdownOptions="dropdownOptions"
        :inputOptions="inputOptions"
        v-model="modelValue"
        @validate="(value: string) => $emit('update:validStatus', value)"
    >
    </vue-tel-input>
</template>
