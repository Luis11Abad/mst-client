/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from '@/lib/supabase'
import { ContactLoadingState } from '@/types/contact'
import { ref } from 'vue'

const contacts = ref<Array<any>>([])
const loading = ref<ContactLoadingState>(ContactLoadingState.None)

export function useContacts() {
    async function getContacts(profileId: string) {
        try {
            const { data, error } = await supabase
                .from('contacts')
                .select('*')
                .eq('profile_id', profileId)

            if (error) throw new Error(error?.message || 'Contacts not found')

            contacts.value = data
        } catch (error) {
            console.error('Error fetching contacts:', error)
        }
    }

    return {
        contacts,
        getContacts,
        loading,
    }
}
