<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useCalendar } from '@/composables/useCalendar'
import { ModalType } from '@/types/ui'
import {
    EventType,
    type CreateEventRequest,
    type SelectableEventParticipant,
} from '@/types/calendar'

import AvatarComponent from '../ui/AvatarComponent.vue'
import Modal from '../ui/ModalComponent.vue'
import TextArea from '../ui/TextArea.vue'
import DatePicker from '../ui/DatePicker.vue'
import TimePicker from '../ui/TimePicker.vue'
import InputError from '../ui/InputError.vue'
import SearchInput from '../ui/SearchInput.vue'
import SelectInput from '../ui/SelectInput.vue'

const { t } = useI18n()
const { createEvent, getEventContacts } = useCalendar()

const form = ref<CreateEventRequest>({
    date: new Date(),
    startTime: '08:00',
    endTime: '09:00',
    description: '',
    participants: [],
    type: EventType.Meet,
})

const options = new Map<string, string>([
    [EventType.Meet, t(EventType.Meet)],
    [EventType.Show, t(EventType.Show)],
    [EventType.Contract, t(EventType.Contract)],
    [EventType.Delivery, t(EventType.Delivery)],
])

const buttonDisabled = computed(
    () => form.value.description.length === 0 || form.value.participants.length === 0,
)

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
            <SelectInput :label="$t('event-type')" :options="options" v-model="form.type" />
            <SearchInput
                @select="(p) => form.participants.push(p as SelectableEventParticipant)"
                :label="$t('participants')"
                :search-fn="getEventContacts"
            >
                <template #item="{ item }">
                    <div class="participant-item">
                        <AvatarComponent v-if="item.avatar" :name="item.name" :src="item.avatar" />
                        <div class="flex flex-col">
                            <h6>{{ item.name }}</h6>
                            <p>{{ item.email }}</p>
                        </div>
                    </div>
                </template>
            </SearchInput>
            <div class="flex">
                <div
                    v-for="(p, idx) in form.participants"
                    :key="idx"
                    class="flex items-center gap-x-2 bg-gray-100 px-2 py-1 rounded"
                >
                    <span>{{ p.name }}</span>
                    <button
                        @click="form.participants.splice(idx, 1)"
                        class="text-gray hover:text-gray-600"
                    >
                        <Icon icon="material-symbols:close" height="16" />
                    </button>
                </div>
            </div>
            <TextArea v-model="form.description" :label="$t('description')" />
        </div>
        <div class="footer">
            <button @click="() => createEvent(form)" :disabled="buttonDisabled">
                {{ $t('add') }}
            </button>
        </div>
        <!-- TO DO - Scroll to current time in Calendar Week View -->
    </Modal>
</template>
<style scoped>
#add-event-modal {
    .form {
        @apply flex flex-1 px-6 flex-col gap-y-4;
        .participant-item {
            @apply flex items-center gap-x-3 cursor-pointer px-3 py-1.5 hover:bg-primary/5;
            p {
                @apply text-sm text-gray -mt-1;
            }
        }
    }
    .footer {
        @apply flex justify-end border-t py-3 px-6;
        button {
            @apply h-9 px-4 bg-primary text-white;
        }
    }
}
</style>
