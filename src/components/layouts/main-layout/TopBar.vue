<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'
import { DropDownDirections } from '@/types/ui'

import DropDown from '@/components/ui/DropDown.vue'
import { supabaseStorageUrl } from '@/lib/supabase'

defineProps<{
    title: string
}>()

const { user } = useAuth()
</script>
<template>
    <div id="top-bar">
        <h2>{{ $t(title) }}</h2>
        <DropDown :direction="DropDownDirections.BottomRight">
            <template #trigger>
                <button>
                    <img
                        :src="`${supabaseStorageUrl}/logos/${user?.company?.slug}/imago.png`"
                        alt="Company Logo"
                        class="w-6"
                    />
                    {{ user?.company.name }}
                </button>
            </template>
        </DropDown>
    </div>
</template>
<style>
#top-bar {
    @apply w-full h-16 flex items-center justify-between px-8 pt-6;
    h2 {
        @apply text-2xl font-semibold;
    }
    .drop-down {
        button {
            @apply flex items-center gap-x-2.5 bg-white px-4 py-2 rounded-md border;
        }
    }
}
</style>
