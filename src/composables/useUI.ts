import type { Alert, AlertType } from '@/types/ui'
import { ref } from 'vue'

const drawerExpanded = ref(false)
const blockDrawerExpand = ref(false)
const modals = ref<string[]>([])
const alert = ref<Alert | null>(null)

export function useUI() {
    const openModal = (id: string) => {
        modals.value = [...modals.value, id]
    }

    const closeModal = (id: string) => {
        modals.value = modals.value.filter((modalId) => modalId !== id)
    }

    const setAlert = (type: AlertType, message: string) => {
        alert.value = { type, message }
        setTimeout(() => {
            alert.value = null
        }, 5000)
    }

    return {
        drawerExpanded,
        blockDrawerExpand,
        modals,
        openModal,
        closeModal,
        setAlert,
    }
}
