<script setup lang="ts">
import { onMounted, ref } from 'vue'

import VuePictureCropper from 'vue-picture-cropper'

defineProps<{
    img: string
}>()

const dialog = ref<HTMLDialogElement | null>(null)

onMounted(() => {
    dialog.value?.showModal()
})
</script>
<template>
    <Teleport to="body">
        <dialog ref="dialog">
            <VuePictureCropper
                :boxStyle="{
                    width: '100%',
                    height: '100%',
                    flex: '1',
                    backgroundColor: '#f8f8f8',
                    margin: 'auto',
                }"
                :img="img"
                :options="{
                    viewMode: 1,
                    dragMode: 'crop',
                    aspectRatio: 1 / 1,
                }"
            />
            <div class="footer">
                <button @click="dialog?.close()">{{ $t('discard') }}</button>
                <button @click="$emit('getResult')">{{ $t('save') }}</button>
            </div>
        </dialog>
    </Teleport>
</template>
<style scoped>
dialog {
    @apply flex flex-col w-full max-w-lg h-[500px] m-auto overflow-hidden bg-white rounded-md;
    .vue--picture-cropper__wrap {
        @apply flex-1;
    }
    .footer {
        @apply bg-white flex justify-between px-4 py-2.5 flex-none;
        button {
            @apply px-4 py-1.5 bg-primary text-white rounded-md;
            &:first-child {
                @apply text-dark border bg-white;
            }
        }
    }
}
</style>
