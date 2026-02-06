import { supabase } from '@/lib/supabase'
import { ApiLoadingState } from '@/types/api'
import type { Tables } from '@/types/db'
import { ref } from 'vue'

const contacts = ref<Tables<'contacts'>[]>([])
const loading = ref<ApiLoadingState>(ApiLoadingState.None)

export function useContacts() {
    async function getContacts(profileId: string, searchQuery: string) {
        try {
            loading.value = ApiLoadingState.Loading
            const { data, error } = await supabase
                .from('contacts')
                .select('*')
                .eq('profile_id', profileId)
                .or(
                    `name.ilike.%${searchQuery}%,email.ilike.%${searchQuery}%,phone.ilike.%${searchQuery}%`,
                )

            if (error) throw new Error(error?.message || 'Contacts not found')

            contacts.value = data
        } catch (error) {
            console.error('Error fetching contacts:', error)
        } finally {
            loading.value = ApiLoadingState.None
        }
    }

    return {
        contacts,
        getContacts,
        loading,
    }
}
