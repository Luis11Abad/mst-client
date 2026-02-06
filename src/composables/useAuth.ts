import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/lib/supabase'
import { AuthLoadingState, type LoginForm, type User } from '@/types/auth'
import { Layout } from '@/types/ui'
import type { Session } from '@supabase/supabase-js'
import { useI18n } from 'vue-i18n'

const error = ref<string | null>(null)
const loading = ref<AuthLoadingState>(AuthLoadingState.None)
const session = ref<Session | null>(null)
const user = ref<User | null>(null)

export function useAuth() {
    const { push: navigate } = useRouter()
    const { t } = useI18n()

    async function checkSession(layout: Layout) {
        if (session.value) return

        loading.value = AuthLoadingState.Session
        error.value = null

        try {
            const { data, error: sessionError } = await supabase.auth.getSession()

            const authenticated = sessionError == null && data.session != null

            if (!authenticated && layout === Layout.Main) throw new Error('Session not found')

            session.value = data.session

            if (authenticated && layout === Layout.Auth) {
                navigate({ name: 'home' })
            }
        } catch (err) {
            session.value = null
            error.value =
                err instanceof Error ? err.message : 'An error ocurred while checking session'
            navigate({ name: 'login', query: { error: error.value } })
        } finally {
            loading.value = AuthLoadingState.None
        }
    }

    async function getProfile() {
        loading.value = AuthLoadingState.Profile

        const userData = session.value?.user
        if (!userData) throw new Error('User not found')

        try {
            const { data, error: profileError } = await supabase
                .from('profiles')
                .select('*, companies (id, name, lang, is_active, slug)')
                .eq('id', userData.id)
                .limit(1)

            const profile = data?.[0]

            if (!profile) throw new Error(profileError?.message || 'Profile not found')

            user.value = {
                id: userData.id,
                profile_id: profile.id,
                email: userData.email as string,
                company: {
                    id: profile.companies.id,
                    name: profile.companies.name,
                    lang: profile.companies.lang,
                    is_active: true,
                    slug: profile.companies.slug,
                },
                name: profile.name,
                phone: profile.phone,
                avatar: profile.avatar,
                is_completed: profile.is_completed,
                is_active: profile.is_active,
            }
        } catch (err) {
            error.value =
                err instanceof Error
                    ? err.message
                    : 'An error ocurred while completing the user profile'
            navigate({ name: 'login', query: { error: error.value } })
        } finally {
            loading.value = AuthLoadingState.None
        }
    }

    async function completeProfile(name: string, phone: string, password: string, avatar: File) {
        error.value = null
        loading.value = AuthLoadingState.Complete

        if (!user.value?.id) throw new Error('User not found')

        const body = new FormData()
        body.append('file', avatar)
        body.append('name', name)
        body.append('phone', phone)
        body.append('password', password)

        try {
            const { data, error } = await supabase.functions.invoke('complete-profile', {
                body,
            })

            if (error) throw new Error(error.message)

            if (!data || !data[0]) throw new Error(t('complete-profile-generic-error'))

            user.value = {
                ...user.value,
                name: data[0].name,
                phone: data[0].phone,
                avatar: data[0].avatar,
                is_completed: data[0].is_completed,
            }
        } catch (err) {
            error.value =
                err instanceof Error ? err.message : 'An error ocurred while completing profile'
        } finally {
            loading.value = AuthLoadingState.None
        }
    }

    async function login(form: LoginForm) {
        error.value = null
        loading.value = AuthLoadingState.Login

        try {
            const { data, error: loginError } = await supabase.auth.signInWithPassword(form)

            if (loginError) throw new Error(loginError.message)

            if (data.session) {
                session.value = data.session
                navigate({ name: 'home' })
            }
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'An error ocurred while logging in'
        } finally {
            loading.value = AuthLoadingState.None
        }
    }

    async function logout() {
        error.value = null
        try {
            const { error: logoutError } = await supabase.auth.signOut()

            if (logoutError) throw new Error(logoutError.message)

            session.value = null
            user.value = null
        } catch (err) {
            sessionStorage.clear()
            localStorage.clear()
            error.value = err instanceof Error ? err.message : 'An error ocurred while logging out'
        } finally {
            navigate({ name: 'login' })
        }
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
