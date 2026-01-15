<script lang="ts" setup>
import { reactive } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { AuthLoadingState, type LoginForm } from '@/types/auth'

import { Icon } from '@iconify/vue'

const { loading, login } = useAuth()

const form = reactive<LoginForm>({
    email: '',
    password: '',
})
</script>
<template>
    <p class="font-semibold">{{ $t('email') }}</p>
    <input type="text" v-model="form.email" />
    <div class="flex justify-between items-center">
        <p class="font-semibold">{{ $t('password') }}</p>
        <router-link class="ml-auto" to="/auth/reset-password">{{
            $t('forget-your-password')
        }}</router-link>
    </div>
    <input type="password" v-model="form.password" />
    <button @click="login(form)">
        <Icon v-if="loading === AuthLoadingState.Login" icon="line-md:loading-twotone-loop" />
        <span v-else>{{ $t(`${$route.name as string}-cta`) }}</span>
    </button>
</template>
