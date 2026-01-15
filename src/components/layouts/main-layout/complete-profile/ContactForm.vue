<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { computed, ref } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { isEmptyOrNull } from '@/utils/validators'

import PhoneInput from '@/components/ui/PhoneInput.vue'

const props = defineProps<{
    name: string
    phone: string
}>()

const { user } = useAuth()

const name = ref(props.name)
const phone = ref(props.phone)
const phoneValid = ref(false)
const validatedPhone = ref('')

const formValid = computed(() => !isEmptyOrNull(name.value) && phoneValid.value)

function validatePhone(validateData: any) {
    const { valid, number } = validateData
    phoneValid.value = valid
    validatedPhone.value = valid ? number : ''
}
</script>
<template>
    <form @submit.prevent="$emit('setContactData', { name, phone: validatedPhone })">
        <p class="font-semibold mb-1">{{ $t('full-name') }}</p>
        <input type="text" v-model="name" />
        <p class="font-semibold mb-1">{{ $t('email') }}</p>
        <input type="text" readonly :value="user?.email" />
        <p class="font-semibold mb-1">{{ $t('phone') }}</p>
        <PhoneInput v-model="phone" @update:valid-status="validatePhone" />
        <div class="flex justify-between mt-6">
            <button @click="$emit('goBack')" type="button">{{ $t('back') }}</button>
            <button :disabled="!formValid">{{ $t('next') }}</button>
        </div>
    </form>
</template>
<style scoped>
form {
    @apply flex flex-col w-full;
    h2 {
        @apply text-lg font-semibold mb-2;
    }
    button {
        @apply px-4 py-2 mt-6 bg-primary text-white rounded-md;
        &:first-child {
            @apply text-dark border bg-white;
        }
    }
    input {
        @apply mb-6;
    }
}
</style>
