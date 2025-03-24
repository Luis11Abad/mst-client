import { ref } from "vue";
import { useRouter } from "vue-router";
import { supabase } from "@/lib/supabase";


enum LoadingState {
    None,
    Session,
    Login
}
export function useAuth() {
    const router = useRouter()

    const loading = ref<LoadingState>(LoadingState.Session)

    async function checkSession() {
        const { data, error } = await supabase.auth.getSession()

        if (error || !data.session) {
            router.push({ name: 'login' })
        }

        loading.value = LoadingState.None
    }

    async function login(email: string, password: string) {
        loading.value = LoadingState.Login

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        })

        loading.value = LoadingState.None

        console.log(data, error)
    }

    return { checkSession, loading, login }
}