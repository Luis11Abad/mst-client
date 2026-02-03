<script setup lang="ts">
import { computed, ref } from 'vue'
import { ModalType } from '@/types/ui'

import Modal from '../ui/ModalComponent.vue'
import TextArea from '../ui/TextArea.vue'
import DatePicker from '../ui/DatePicker.vue'
import TimePicker from '../ui/TimePicker.vue'
import InputError from '../ui/InputError.vue'

const form = ref({
    date: new Date(),
    startTime: '08:00',
    endTime: '09:00',
    description: '',
})

const startDate = computed(() => {
    const [hours, minutes] = form.value.startTime.split(':').map(Number)
    const date = new Date(form.value.date)
    date.setHours(hours, minutes, 0, 0)
    return date
})

const endDate = computed(() => {
    const [hours, minutes] = form.value.endTime.split(':').map(Number)
    const date = new Date(form.value.date)
    date.setHours(hours, minutes, 0, 0)
    return date
})
</script>
<template>
    <Modal id="add-event-modal" static :type="ModalType.Side" :title="$t('add-event')">
        <div class="form">
            <DatePicker v-model="form.date" :label="$t('date')" />
            <div class="flex justify-between gap-x-3">
                <TimePicker v-model="form.startTime" :label="$t('start-time')" />
                <TimePicker v-model="form.endTime" :label="$t('end-time')" />
            </div>
            <InputError
                v-if="startDate >= endDate"
                class="-mt-1"
                :message="$t('end-time-after-start-time')"
            />
            <TextArea v-model="form.description" :label="$t('description')" />
        </div>
        <!--
          TO DO - Scroll to selection in both hour and minute selectors in TimePicker
          TO DO - Scroll to current time in Calendar Week View
        -->
    </Modal>
</template>
<style scoped>
#add-event-modal .form {
    @apply flex flex-col gap-y-4;
}
</style>
