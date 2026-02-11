import { AlertType, type Alert } from '@/types/ui'
import { isSlug } from '@/utils/validators'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const drawerExpanded = ref(false)
const blockDrawerExpand = ref(false)
const modals = ref<string[]>([])
const alert = ref<Alert | null>(null)

export function useUI() {
    const { t } = useI18n()

    function openModal(id: string) {
        modals.value = [...modals.value, id]
    }

    const closeModal = (id: string) => {
        modals.value = modals.value.filter((modalId) => modalId !== id)
    }

    function handleError(error: string) {
        const message = isSlug(error) ? t(error) : error
        setAlert(AlertType.Error, message)
    }

    function setAlert(type: AlertType, message: string) {
        alert.value = { type, message }
        setTimeout(() => {
            alert.value = null
        }, 5000)
    }

    return {
        alert,
        blockDrawerExpand,
        drawerExpanded,
        modals,
        closeModal,
        handleError,
        openModal,
        setAlert,
    }
}
