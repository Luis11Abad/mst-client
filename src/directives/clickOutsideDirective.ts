import type { Directive, DirectiveBinding } from 'vue'

interface ClickOutsideElement extends HTMLElement {
    __clickOutsideHandler__?: (event: Event) => void
}

export const vClickOutside: Directive<ClickOutsideElement, (event: Event) => void> = {
    mounted(el, binding: DirectiveBinding) {
        el.__clickOutsideHandler__ = (event: Event) => {
            if (!(el === event.target || el.contains(event.target as Node))) {
                binding.value(event)
            }
        }

        document.addEventListener('click', el.__clickOutsideHandler__, true)
    },
    unmounted(el) {
        if (el.__clickOutsideHandler__) {
            document.removeEventListener('click', el.__clickOutsideHandler__, true)
            delete el.__clickOutsideHandler__
        }
    },
}
