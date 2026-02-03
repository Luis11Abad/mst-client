<script setup lang="ts">
import { useContacts } from '@/composables/useContacts';
import type { Tables } from '@/types/db';
import { ApiLoadingState } from '@/types/api';

import NoResultsCombo from '../ui/NoResultsCombo.vue';
import Loader from '../ui/Loader.vue';

defineProps<{
    list: Tables<'contacts'>[]
}>()

const { loading } = useContacts()
</script>
<template>
    <div id="contact-list">
        <div v-for="item in list" class="item" :key="item.id">
            <h6>{{ item.name }}</h6>
            <p>{{ item.email }}</p>
        </div>
        <Loader v-if="loading === ApiLoadingState.Loading"/>
        <NoResultsCombo v-if="loading === ApiLoadingState.None && list.length === 0"/>
    </div>
</template>

<style scoped>
#contact-list {
    @apply flex flex-col flex-1 overflow-y-auto border-t-0 rounded-b-md relative;
    .item {
        @apply px-4 py-2.5 border-b;
        h6 {
            @apply font-semibold;
        }
        p {
            @apply text-sm text-gray -mt-0.5;
        }
    }
}
</style>
