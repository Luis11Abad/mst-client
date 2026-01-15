<script setup lang="ts">
import { Icon } from '@iconify/vue/dist/iconify.js'
import { computed, ref } from 'vue'

const props = defineProps<{
    password: string
}>()

const password = ref(props.password)
const confirmPassword = ref(props.password)

const passwordValidators = computed(() => [
    { label: 'at-least-8-characters', validator: password.value.length >= 8 },
    { label: 'number-or-special', validator: /[0-9!@#$%^&*(),.?":{}|<>]/.test(password.value) },
])

const identicalPasswords = computed(
    () => password.value.length > 0 && password.value === confirmPassword.value,
)

const formValid = computed(() => {
    return passwordValidators.value.every((item) => item.validator) && identicalPasswords.value
})
</script>
<template>
    <form @submit.prevent="$emit('setPassword', password)">
        <p class="font-semibold mb-1">{{ $t('password') }}</p>
        <input type="password" autocomplete="new-password" v-model="password" />
        <div class="validations">
            <div v-for="item in passwordValidators" :key="item.label">
                <Icon v-if="item.validator" class="text-green-500" icon="lucide:check" />
                <Icon v-else class="text-gray" icon="lucide:x" />
                <span :class="item.validator ? 'text-green-500' : 'text-gray'">{{
                    $t(item.label)
                }}</span>
            </div>
        </div>
        <p class="font-semibold mb-1">{{ $t('confirm-password') }}</p>
        <input type="password" autocomplete="new-password" v-model="confirmPassword" />
        <div class="validations">
            <div :class="identicalPasswords ? 'text-green-500' : 'text-gray'">
                <Icon :icon="identicalPasswords ? 'lucide:check' : 'lucide:x'" />
                <span>{{ $t('identical-passwords') }}</span>
            </div>
        </div>
        <button :disabled="!formValid">{{ $t('next') }}</button>
    </form>
</template>
<style scoped>
form {
    @apply flex flex-col w-full;
    h2 {
        @apply text-lg font-semibold mb-2;
    }
    .validations {
        @apply flex gap-x-3 mb-6 mt-2;
        div {
            @apply flex items-center gap-x-1 text-sm;
        }
    }
    button {
        @apply ml-auto px-4 py-2 mt-6 bg-primary text-white rounded-md;
    }
}
</style>
