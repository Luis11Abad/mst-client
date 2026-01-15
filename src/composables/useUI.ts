import { ref } from 'vue'

const drawerExpanded = ref(false)
const blockDrawerExpand = ref(false)

export function useUI() {
    return {
        drawerExpanded,
        blockDrawerExpand,
    }
}
