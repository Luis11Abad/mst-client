<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'
import { useUI } from '@/composables/useUI'
import { DropDownDirections } from '@/types/ui'

import DropDown from '@/components/ui/DropDown.vue'
import { Icon } from '@iconify/vue/dist/iconify.js'

const { logout, user } = useAuth()
const { drawerExpanded } = useUI()
</script>
<template>
    <DropDown v-if="user" id="user-box" :direction="DropDownDirections.TopLeft">
        <template #trigger="{ open }">
            <button :class="open ? '!bg-primary/5' : ''">
                <div class="avatar">
                    <img v-if="user?.avatar" :src="user?.avatar" :alt="user?.name || 'Avatar'" />
                </div>
                <div v-if="drawerExpanded" class="info">
                    <h6 v-if="user?.name">{{ user?.name }}</h6>
                    <p v-if="user?.email">{{ user?.email }}</p>
                </div>
            </button>
        </template>
        <template #content>
            <div class="user-actions">
                <button @click="logout">
                    <Icon icon="solar:logout-3-broken" height="21" />{{ $t('logout') }}
                </button>
            </div>
        </template>
    </DropDown>
</template>
<style scoped>
#user-box {
    button {
        @apply flex items-center gap-x-3 p-2 rounded-md hover:bg-primary/5 overflow-hidden w-full;
        .avatar {
            @apply h-10 w-10 overflow-hidden bg-gray border rounded-full flex-none;
        }
        .info {
            @apply flex flex-col text-left flex-1 overflow-hidden;
            p {
                @apply text-gray text-xs -mt-0.5 text-ellipsis overflow-hidden;
            }
        }
    }
    .user-actions {
        @apply flex flex-col bg-white rounded-md border w-full min-w-48;
        button {
            @apply flex px-4 py-3;
            svg {
                @apply text-gray;
            }
        }
    }
}
</style>
