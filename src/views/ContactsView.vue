<script setup lang="ts">
import { ref, watch } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { useContacts } from '@/composables/useContacts'

import TopBar from '@/components/layouts/main-layout/TopBar.vue'
import ContactList from '@/components/contacts/ContactList.vue'
import SearchBar from '@/components/ui/SearchBar.vue'

const { contacts, getContacts } = useContacts()
const { user } = useAuth()

const searchQuery = ref('')

watch(
    () => [user.value, searchQuery.value],
    () => {
        if (user.value) {
          getContacts(user.value.profile_id, searchQuery.value)  
        } 
    },
    { immediate: true },
)
</script>
<template>
    <section>
        <TopBar title="contacts" />
        <div id="contacts-container">
            <div class="header">
                <SearchBar @search="query => searchQuery = query"/>
                <button>{{ $t('add-new') }}</button>
            </div>
            <ContactList :list="contacts" />
        </div>
    </section>
</template>
<style>
#contacts-container {
     @apply flex flex-col w-full flex-1 p-8 pt-6 overflow-hidden;
     > div {
        @apply border bg-white;
     }
    .header {
        @apply flex-none h-14 border-b px-4 flex items-center rounded-t-md;
        button {
            @apply bg-primary text-white h-9 px-4 rounded ml-auto text-sm;
        }
    }
}
</style>