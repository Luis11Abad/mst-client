import { ref } from 'vue'
import { cropper } from 'vue-picture-cropper'
import { useAuth } from './useAuth'

export function useAvatarUpload() {
    const { user } = useAuth()

    const uploadInput = ref<HTMLInputElement | null>(null)
    const pic = ref<string>('')
    const avatarResult = ref('')
    const avatarFile = ref<File | null>(null)
    const showCropper = ref<boolean>(false)

    async function getResult() {
        if (!cropper) return
        const base64 = cropper.getDataURL()

        const file = await cropper.getFile({
            fileName: user.value?.id,
        })

        avatarFile.value = file

        avatarResult.value = base64
        showCropper.value = false
    }

    function selectFile(e: Event) {
        pic.value = ''
        avatarResult.value = ''
        avatarFile.value = null

        const { files } = e.target as HTMLInputElement
        if (!files || !files.length) return

        const file = files[0]
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            pic.value = String(reader.result)

            showCropper.value = true

            if (!uploadInput.value) return
            uploadInput.value.value = ''
        }
    }

    return {
        avatarFile,
        avatarResult,
        getResult,
        pic,
        selectFile,
        showCropper,
    }
}
