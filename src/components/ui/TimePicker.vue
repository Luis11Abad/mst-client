<script setup lang="ts">
import { ref, watch } from 'vue'
import { DropDownDirections } from '@/types/ui'

import { Icon } from '@iconify/vue/dist/iconify.js'
import DropDown from './DropDown.vue'

defineProps<{
    label: string
}>()

const model = defineModel<string>({ default: '08:00' })

const hour = ref(model.value ? parseInt(model.value.split(':')[0]) : 8)
const minute = ref(model.value ? parseInt(model.value.split(':')[1]) : 0)

watch([hour, minute], () => {
    model.value = `${String(hour.value).padStart(2, '0')}:${String(minute.value).padStart(2, '0')}`
})
const hourOptions = Array.from({ length: 24 }, (_, i) => i + 1)
const minuteOptions = Array.from({ length: 12 }, (_, i) => i * 5)
</script>
<template>
    <div class="w-full flex flex-col">
        <label>{{ label }}</label>
        <div class="time-picker">
            <input type="time" v-model="model" />
            <DropDown :direction="DropDownDirections.BottomLeft">
                <template #trigger>
                    <button>
                        <Icon icon="material-symbols:keyboard-arrow-down-rounded" height="21" />
                    </button>
                </template>
                <template #content>
                    <div class="options">
                        <div>
                            <button
                                v-for="hh in hourOptions"
                                :class="{ active: hour == hh - 1 }"
                                :key="hh"
                                @click="hour = hh - 1"
                            >
                                {{ String(hh - 1).padStart(2, '0') }}
                            </button>
                        </div>
                        <div>
                            <button
                                v-for="mm in minuteOptions"
                                :class="{ active: minute == mm }"
                                :key="mm"
                                @click="minute = mm"
                            >
                                {{ String(mm).padStart(2, '0') }}
                            </button>
                        </div>
                    </div>
                </template>
            </DropDown>
        </div>
    </div>
</template>

<style scoped>
.time-picker {
    @apply flex border rounded;
    input {
        @apply border-0 px-2.5 text-center rounded-none;
    }
    button {
        @apply h-10 flex items-center justify-center border-l px-1 text-gray bg-whitesmoke/25;
    }
    .options {
        @apply flex border w-32 rounded absolute right-0 bg-white z-20;
        div {
            @apply flex flex-col flex-1 h-52 overflow-auto scrollbar scrollbar-w-0;
            button {
                @apply px-4 py-2.5 bg-white text-center hover:bg-primary/5 cursor-pointer;
                &.active {
                    @apply bg-primary/5 text-primary;
                }
            }
        }
    }
}
</style>
