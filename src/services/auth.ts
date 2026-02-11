import { supabase } from '@/lib/supabase'
import type { CompleteProfileRequest, LoginForm, User } from '@/types/auth'
import { Layout } from '@/types/ui'
import type { Session } from '@supabase/supabase-js'

export class AuthService {
    async checkSession(layout: Layout) {
        const { data, error: sessionError } = await supabase.auth.getSession()

        if (sessionError) throw new Error(sessionError.message)
        if (!data.session && layout === Layout.Main) throw new Error('session-not-found')

        return data.session
    }

    async completeProfile(user: User | null, form: CompleteProfileRequest) {
        if (!user) throw new Error('user-not-found')

        const body = new FormData()
        body.append('file', form.avatar)
        body.append('name', form.name)
        body.append('phone', form.phone)
        body.append('password', form.password)

        const { data, error } = await supabase.functions.invoke('complete-profile', {
            body,
        })

        if (error) throw new Error(error.message)

        if (!data) throw new Error('complete-profile-generic-error')

        return {
            ...user,
            name: data.name,
            phone: data.phone,
            avatar: data.avatar,
            is_completed: data.is_completed,
        }
    }

    async getProfile(session: Session | null) {
        try {
            if (!session) throw new Error('session-not-found')
            const userData = session.user

            const { data: profile, error: profileError } = await supabase
                .from('profiles')
                .select('*, companies (id, name, lang, is_active, slug)')
                .eq('id', userData.id)
                .single()

            if (!profile) throw new Error(profileError?.message || 'profile-not-found')

            return {
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
            throw err
        }
    }

    async login(form: LoginForm) {
        const { data, error: loginError } = await supabase.auth.signInWithPassword(form)

        if (loginError) throw new Error(loginError.message)

        return data.session
    }
}
