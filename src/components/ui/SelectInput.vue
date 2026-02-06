<script setup lang="ts">
import { computed, ref } from 'vue';
import DropDown from './DropDown.vue';

const props = defineProps<{
    options: Map<string, string>
    label: string
}>()

const model = defineModel<string>({ default: '' })

const dropdown = ref<InstanceType<typeof DropDown> | null>(null)

const selectedLabel = computed(() => {
    const selectedValue = props.options.get(model.value)
    return selectedValue || ''
})

function selectOption(value: string) {
    model.value = value
    if(!dropdown.value) return 
    dropdown.value.closeDropdown()
}
</script>
<template>
    <div class="select-input">
        <label>{{ label }}</label>
        <DropDown ref="dropdown">
            <template #trigger="{ open }">
                <div class="select-trigger">
                    {{ selectedLabel }}
                </div>
            </template>
            <template #content>
                <div class="select-content">
                    <div v-for="value in options" @click="() => selectOption(value[0])">{{ value[1] }}</div>
                </div>
            </template>
        </DropDown>
    </div>
</template>
<style scoped>
.select-input {
    @apply z-20;
    .select-trigger {
        @apply h-10 border flex items-center px-3 rounded mt-2;
    }
    .select-content {
        @apply bg-white rounded shadow py-1 z-20;
        div {
            @apply px-3 py-1 cursor-pointer hover:bg-primary/5;
        }
    }
}
</style>