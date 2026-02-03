<script setup lang="ts">
import { computed, useId, useTemplateRef } from 'vue'
import { useI18n } from 'vue-i18n'
import { es, enUS } from 'date-fns/locale'

import DatepickerComponent from 'vue3-datepicker'

defineProps<{
    label: string
}>()

const datepickerRef = useTemplateRef('datepicker')

const { locale } = useI18n()

const localesMapping = new Map<string, Locale>([
    ['en', enUS],
    ['es', es],
])

const dateLocale = computed(() => localesMapping.get(locale.value) || enUS)

const model = defineModel<Date>()

const id = useId()
</script>
<template>
    <div class="date-picker">
        <label :for="id">{{ label }}</label>
        <DatepickerComponent
            @closed="datepickerRef?.$el.querySelector('input')?.blur()"
            inputFormat="dd-MM-yyyy"
            :id="id"
            :locale="dateLocale"
            :lower-Limit="new Date()"
            ref="datepicker"
            v-model="model"
        />
    </div>
</template>
<style>
.date-picker {
    @apply flex flex-col;
    input {
        @apply !bg-white !pointer-events-auto;
    }
    label {
        @apply mb-2 text-sm text-gray;
    }
}
</style>
