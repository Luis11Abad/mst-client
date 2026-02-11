/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/lib/supabase'
import {
    AuthLoadingState,
    type CompleteProfileRequest,
    type LoginForm,
    type User,
} from '@/types/auth'
import { Layout } from '@/types/ui'
import type { Session } from '@supabase/supabase-js'
import { ServiceProvider } from '@/services'

const error = ref<string | null>(null)
const loading = ref<AuthLoadingState>(AuthLoadingState.None)
const session = ref<Session | null>(null)
const user = ref<User | null>(null)

export function useAuth() {
    const { push: navigate } = useRouter()
    const { auth } = ServiceProvider

    async function checkSession(layout: Layout) {
        if (session.value) return

        loading.value = AuthLoadingState.Session

        try {
            session.value = await auth.checkSession(layout)
            if (layout === Layout.Auth) navigate({ name: 'home' })
        } catch (err: Error | any) {
            session.value = null
            navigate({
                name: 'login',
                query: { error: err.message || 'check-session-generic-error' },
            })
        }
        loading.value = AuthLoadingState.None
    }

    async function getProfile() {
        loading.value = AuthLoadingState.Profile
        try {
            user.value = await auth.getProfile(session.value)
        } catch (err: Error | any) {
            navigate({
                name: 'login',
                query: { error: err.message || 'get-profile-generic-error' },
            })
        }
        loading.value = AuthLoadingState.None
    }

    async function completeProfile(form: CompleteProfileRequest) {
        error.value = null
        loading.value = AuthLoadingState.Complete
        try {
            user.value = await auth.completeProfile(user.value, form)
        } catch (err: Error | any) {
            error.value = err.message || 'complete-profile-generic-error'
        }
        loading.value = AuthLoadingState.None
    }

    async function login(form: LoginForm) {
        error.value = null
        loading.value = AuthLoadingState.Login
        try {
            session.value = await auth.login(form)
            if (session.value) navigate({ name: 'home' })
        } catch (err: Error | any) {
            error.value = err.message || 'An error ocurred while logging in'
        }
        loading.value = AuthLoadingState.None
    }

    async function logout() {
        error.value = null
        try {
            const { error: logoutError } = await supabase.auth.signOut()
            if (logoutError) throw new Error(logoutError.message)
            session.value = null
            user.value = null
        } catch (err: Error | any) {
            sessionStorage.clear()
            localStorage.clear()
            error.value = err.message || 'logout-generic-error'
        }
        navigate({ name: 'login' })
    }

    async function resetPassword(email: string) {
        error.value = null
        loading.value = AuthLoadingState.Reset

        try {
            const { error: resetError } = await supabase.auth.resetPasswordForEmail(email)

            if (resetError) throw new Error(resetError.message)

            navigate('/auth/reset-password?success=true')
        } catch (err) {
            error.value =
                err instanceof Error ? err.message : 'An error ocurred while resetting password'
        } finally {
            loading.value = AuthLoadingState.None
        }
    }

    return {
        checkSession,
        completeProfile,
        error,
        getProfile,
        loading,
        login,
        logout,
        resetPassword,
        session,
        user,
    }
}
