<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue'
import { useUI } from '@/composables/useUI'
import { AlertType } from '@/types/ui'

import TextInput from './TextInput.vue'

const props = defineProps<{
    label: string
    searchFn: (query: string) => Promise<unknown[]> | unknown[]
}>()

const model = defineModel<string>({ default: '' })
const emit = defineEmits<{
    (e: 'select', item: unknown): void
}>()

const MIN_CHARS = 3
const DEBOUNCE_MS = 300

const { setAlert } = useUI()

const results = ref<unknown[]>([])
const loading = ref(false)

let timer: ReturnType<typeof setTimeout> | null = null

watch(model, (val) => {
    results.value = []

    if (timer) {
        clearTimeout(timer)
        timer = null
    }

    if (val.length < MIN_CHARS) return

    timer = setTimeout(async () => {
        loading.value = true
        try {
            const res = await props.searchFn(val)
            results.value = Array.isArray(res) ? res : []
        } catch (e: unknown) {
            const message = (e as any)?.message || 'There was an error performing the search.'
            setAlert(AlertType.Error, message)
        } finally {
            loading.value = false
        }
    }, DEBOUNCE_MS)
})

onUnmounted(() => {
    if (timer) clearTimeout(timer)
})

function select(item: unknown) {
    emit('select', item)
}

function defaultLabel(item: unknown) {
    if (item === null || item === undefined) return ''
    if (typeof item === 'string' || typeof item === 'number') return String(item)
    if (typeof item === 'object') {
        const it = item as Record<string, unknown>
        if (typeof it['label'] === 'string') return it['label'] as string
        if (typeof it['name'] === 'string') return it['name'] as string
        try {
            return JSON.stringify(item)
        } catch {
            return String(item)
        }
    }
    return String(item)
}
</script>

<template>
    <div class="search-input">
        <TextInput :label="props.label" v-model="model" />
        <div class="results" v-if="!loading && model.length > MIN_CHARS">
            <ul v-if="results.length" class="bg-white border rounded shadow max-h-60 overflow-auto">
                <li
                    v-for="(item, idx) in results"
                    :key="idx"
                    class="p-2 hover:bg-gray-100 cursor-pointer"
                    @click="select(item)"
                >
                    <slot name="item" :item="item" :index="idx" :select="select">
                        <div>{{ defaultLabel(item) }}</div>
                    </slot>
                </li>
            </ul>
            <div v-else>
                <div class="py-2 text-sm text-gray-500">{{ $t('no-results') }}</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.search-input {
    @apply flex flex-col relative;
}
</style>
