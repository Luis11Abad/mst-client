<script setup lang="ts">
import { onMounted, ref, useId, watch } from 'vue'
import { DropDownDirections } from '@/types/ui'

import { Icon } from '@iconify/vue/dist/iconify.js'
import DropDown from './DropDown.vue'

defineProps<{
    label: string
}>()

const model = defineModel<string>({ default: '08:00' })

const hour = ref(model.value ? parseInt(model.value.split(':')[0]) : 8)
const minute = ref(model.value ? parseInt(model.value.split(':')[1]) : 0)

const id = useId()

onMounted(() => {
    const options = document.querySelector(`#${id} .options`) as HTMLElement
    if (!options) return

    const observer = new MutationObserver(() => scrollToActive(true))
    observer.observe(options, { subtree: true, attributes: true, attributeFilter: ['class'] })

    const optionsParent = options.parentElement
    if (!optionsParent) return
    const visibilityObserver = new MutationObserver(() => {
        if (optionsParent.style.display !== 'none') {
            scrollToActive()
        }
    })
    visibilityObserver.observe(optionsParent, { attributes: true, attributeFilter: ['style'] })
})

watch([hour, minute], () => {
    model.value = `${String(hour.value).padStart(2, '0')}:${String(minute.value).padStart(2, '0')}`
})

const hourOptions = Array.from({ length: 24 }, (_, i) => i + 1)
const minuteOptions = Array.from({ length: 12 }, (_, i) => i * 5)

function scrollToActive(smooth?: boolean) {
    const behavior = smooth ? 'smooth' : 'auto'
    const activeHour = document.querySelector(`#${id} .options .hh-scroll button.active`)
    const activeMinute = document.querySelector(`#${id} .options .mm-scroll button.active`)
    if (activeHour) activeHour.scrollIntoView({ block: 'start', behavior })
    if (activeMinute) activeMinute.scrollIntoView({ block: 'start', behavior })
}
</script>
<template>
    <div class="w-full flex flex-col">
        <label>{{ label }}</label>
        <div :id="id" class="time-picker">
            <input type="time" v-model="model" />
            <DropDown :direction="DropDownDirections.BottomLeft">
                <template #trigger>
                    <button>
                        <Icon icon="material-symbols:keyboard-arrow-down-rounded" height="21" />
                    </button>
                </template>
                <template #content>
                    <div class="options">
                        <div class="hh-scroll">
                            <button
                                v-for="hh in hourOptions"
                                :class="{ active: hour == hh - 1 }"
                                :key="hh"
                                @click="hour = hh - 1"
                            >
                                {{ String(hh - 1).padStart(2, '0') }}
                            </button>
                        </div>
                        <div class="mm-scroll">
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
