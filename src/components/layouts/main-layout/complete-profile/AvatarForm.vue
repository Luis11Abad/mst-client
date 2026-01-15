<script setup lang="ts">
import { computed, ref } from 'vue'
import { useAvatarUpload } from '@/composables/useAvatarUpload'
import { isEmptyOrNull } from '@/utils/validators'

import { Icon } from '@iconify/vue/dist/iconify.js'
import AvatarCropper from '@/components/ui/AvatarCropper.vue'
import { useAuth } from '@/composables/useAuth'
import { AuthLoadingState } from '@/types/auth'

const uploadInput = ref<HTMLInputElement | null>(null)

const { loading } = useAuth()
const { avatarFile, avatarResult, getResult, pic, selectFile, showCropper } = useAvatarUpload()

const isLoading = computed(() => loading.value === AuthLoadingState.Complete)

function triggerFileSelect() {
    if (!uploadInput.value) return
    uploadInput.value.click()
}
</script>
<template>
    <form @submit.prevent="$emit('setAvatar', avatarFile)">
        <button @click="triggerFileSelect" class="select-picture">
            <img
                v-if="!isEmptyOrNull(avatarResult)"
                class="w-full h-full"
                :src="avatarResult"
                alt="Avatar"
            />
            <template v-else>
                <Icon height="32" icon="solar:camera-add-linear" />
                <span class="text-sm">{{ $t('select-file') }}</span>
            </template>
        </button>
        <input
            ref="uploadInput"
            type="file"
            hidden
            accept="image/jpg, image/jpeg, image/png, image/gif"
            @change="selectFile"
        />
        <div class="flex w-full justify-between mt-6">
            <button @click="$emit('goBack')" type="button">{{ $t('back') }}</button>
            <button :disabled="!avatarFile">
                <Icon
                    v-if="isLoading"
                    icon="line-md:loading-twotone-loop"
                    height="18"
                    class="text-white"
                />
                <span v-else>{{ $t('save-and-continue') }}</span>
            </button>
        </div>
    </form>
    <AvatarCropper v-if="showCropper" @get-result="getResult" :img="pic" />
</template>
<style scoped>
form {
    @apply flex flex-col items-center;
    button:not(.select-picture) {
        @apply px-4 py-2 mt-6 bg-primary text-white rounded-md;
        &:first-child {
            @apply text-dark border bg-white;
        }
    }
    .select-picture {
        @apply flex flex-col gap-y-2 items-center justify-center w-44 h-44 rounded-lg border bg-whitesmoke text-gray relative mx-auto mt-6 mb-12;
    }
}
</style>
