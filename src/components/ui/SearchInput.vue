<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { ref, watch, onUnmounted, type Component } from 'vue'
import { useUI } from '@/composables/useUI'
import { AlertType } from '@/types/ui'

import TextInput from './TextInput.vue'
import { Icon } from '@iconify/vue/dist/iconify.js';

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
const inputFocused = ref(false)
const loading = ref(false)
let timer: ReturnType<typeof setTimeout> | null = null

watch(model, (val) => {
    results.value = []

    if (timer) {
        clearTimeout(timer)
        timer = null
    }

    if (val.length < MIN_CHARS) return
    loading.value = true

    timer = setTimeout(async () => {
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
    inputFocused.value = false
    model.value = ''
}

function focusResults() {
    inputFocused.value = true
}
</script>

<template>
    <div class="search-input" v-click-outside="() => inputFocused = false">
        <Icon v-if="loading" class="loading" icon="line-md:loading-twotone-loop" height="24"/>
        <TextInput @on-focus="focusResults" :label="props.label" icon="solar:magnifer-outline" v-model="model" />
        <div class="results" v-if="inputFocused && !loading && model.length > MIN_CHARS">
            <ul v-if="results.length">
                <li
                    v-for="(item, idx) in results"
                    :key="idx"
                    @click.stop="select(item)"
                >
                    <slot name="item" :item="item as any" :index="idx"></slot>
                </li>
            </ul>
            <div v-else>
                <div class="empty-list">{{ $t('no-results') }}</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.search-input {
    @apply flex flex-col relative;
    .loading {
        @apply absolute right-3 top-9 text-primary;
    }
    .results {
        @apply absolute w-full top-full bg-white rounded shadow max-h-60 overflow-auto;
        .empty-list {
            @apply py-2 text-sm text-gray-500 shadow text-center rounded;
        }
    }
}
</style>
