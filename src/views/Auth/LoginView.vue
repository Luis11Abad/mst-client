<script lang="ts" setup>
import { useAuth } from '@/composables/useAuth';
import AuthLayout from '@/layouts/AuthLayout.vue';
import { ref } from 'vue';

const { login } = useAuth()

const email = ref('')
const password = ref('')

</script>
<template>
    <AuthLayout @submit="login(email, password)" :cta-label="$t('sign-in')" :subtitle="$t('login-in-to-your-account')" :title="$t('welcome-back')">
        <p class="font-semibold">{{$t('email')}}</p>
        <input type="text" class="w-full h-11 px-3 -mt-2 mb-2 border border-lightgray rounded-md" v-model="email" />
        <div class="flex justify-between items-center">
            <p class="font-semibold">{{$t('password')}}</p>
            <router-link class="text-primary ml-auto hover:underline" to="/auth/password">{{ $t('forget-your-password') }}</router-link>
        </div>
        <input type="password" class="w-full h-11 px-3 -mt-2 mb-2 border border-lightgray rounded-md" v-model="password" />
    </AuthLayout>
</template>



<style lang="scss" scoped>

</style>