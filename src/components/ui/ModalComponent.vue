<script setup lang="ts">
import { computed } from 'vue'
import { useUI } from '@/composables/useUI'
import { ModalType } from '@/types/ui'
import { Icon } from '@iconify/vue/dist/iconify.js'

const props = defineProps<{
    id: string
    type?: ModalType
    static?: boolean
    title?: string
}>()

const { modals, closeModal } = useUI()

const isSideModal = props.type === ModalType.Side
const isOpen = computed(() => modals.value.includes(props.id))

function close(fromOverlay: boolean) {
    if (fromOverlay && props.static) return
    closeModal(props.id)
}
</script>

<template>
    <Teleport to="body">
        <Transition name="modal">
            <div v-if="isOpen" :id="id" class="modal" @click="close(true)">
                <div :class="['content', { side: isSideModal }]" @click.stop>
                    <div class="header">
                        <h2 v-if="props.title">{{ props.title }}</h2>
                        <button @click="close(false)" class="close-btn">
                            <Icon icon="material-symbols:close-rounded" />
                        </button>
                    </div>
                    <slot></slot>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped>
.modal {
    @apply bg-dark/50 fixed inset-0 flex items-center justify-center z-40;
    .content {
        @apply flex flex-col bg-white rounded shadow w-full max-w-lg max-h-[90vh] overflow-auto relative;
        &.side {
            @apply w-100 h-full max-w-full max-h-full rounded-r-none fixed right-0 top-0;
        }
        .header {
            @apply flex justify-between items-center p-6;
            h2 {
                @apply text-xl font-semibold;
            }
            .close-btn {
                @apply w-7 h-8 flex items-center justify-center text-gray hover:bg-whitesmoke rounded;
                svg {
                    @apply w-6 h-6;
                }
            }
        }
    }
}

.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.3s;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}
</style>
