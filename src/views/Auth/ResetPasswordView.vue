<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { AuthLoadingState } from '@/types/auth'

const { loading, resetPassword } = useAuth()

const email = ref<string>('')
</script>
<template>
    <p class="font-semibold">{{ $t('email') }}</p>
    <input type="text" v-model="email" />
    <button @click="resetPassword(email)">
        <Icon v-if="loading === AuthLoadingState.Reset" icon="line-md:loading-twotone-loop" />
        <span v-else>{{ $t(`${$route.name as string}-cta`) }}</span>
    </button>
</template>
