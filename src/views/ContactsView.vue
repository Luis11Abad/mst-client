<script setup lang="ts">
import { watch } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { useContacts } from '@/composables/useContacts'

import TopBar from '@/components/layouts/main-layout/TopBar.vue'
import ContactList from '@/components/contacts/ContactList.vue'

const { contacts, getContacts } = useContacts()
const { user } = useAuth()

watch(
    () => user.value,
    () => {
        if (user.value) getContacts(user.value.profile_id)
    },
    { immediate: true },
)
</script>
<template>
    <section>
        <TopBar title="contacts" />
        <div class="p-9 flex-1 w-full">
            <ContactList :list="contacts" />
        </div>
    </section>
</template>
