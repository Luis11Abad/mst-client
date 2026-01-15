<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useAuth } from '@/composables/useAuth'

import PasswordForm from './complete-profile/PasswordForm.vue'
import ContactForm from './complete-profile/ContactForm.vue'
import AvatarForm from './complete-profile/AvatarForm.vue'
import CompleteSteppers from './complete-profile/CompleteSteppers.vue'

const { completeProfile } = useAuth()

const currentStep = ref<number>(0)
const dialog = ref<HTMLDialogElement | null>(null)
const name = ref<string>('')
const password = ref<string>('')
const phone = ref<string>('')

const steps = [
    {
        key: 'password',
        component: PasswordForm,
    },
    {
        key: 'contact-data',
        component: ContactForm,
    },
    {
        key: 'avatar',
        component: AvatarForm,
    },
]

onMounted(() => {
    if (dialog.value) dialog.value.showModal()
})

function triggerCompleteProfile(avatarFile: File) {
    if (!avatarFile) return
    completeProfile(name.value, phone.value, password.value, avatarFile)
}

function setPassword(value: string) {
    password.value = value
    currentStep.value = 1
}
function setContactData(data: { name: string; phone: string }) {
    name.value = data.name
    phone.value = data.phone
    currentStep.value = 2
}
</script>

<template>
    <dialog ref="dialog" id="complete-form">
        <img src="@/assets/images/logo.png" width="175" />
        <h2>{{ $t('welcome-form-title') }}</h2>
        <h6>{{ $t('welcome-form-description') }}</h6>
        <CompleteSteppers :current-step="currentStep" :steps="steps.map((item) => item.key)" />
        <div id="form">
            <template v-for="(step, index) in steps" :key="step.key">
                <template v-if="index === currentStep">
                    <component
                        :is="step.component"
                        v-if="index === currentStep"
                        :name="name"
                        :password="password"
                        :phone="phone"
                        @go-back="() => (currentStep = currentStep - 1)"
                        @set-avatar="triggerCompleteProfile"
                        @set-contact-data="setContactData"
                        @set-password="setPassword"
                    />
                </template>
            </template>
        </div>
    </dialog>
</template>
<style scoped>
dialog {
    @apply m-auto rounded-md w-full max-w-2xl overflow-visible bg-white p-6 border text-center;
    &::backdrop {
        @apply bg-whitesmoke;
    }
    img {
        @apply mx-auto mb-12;
    }
    h2 {
        @apply text-2xl font-semibold;
    }
    h6 {
        @apply mt-2 text-lg text-gray font-medium;
    }
    #form {
        @apply text-left;
    }
}
</style>
