<script lang="ts" setup>
defineProps<{
    title: string
    subtitle: string
    ctaLabel: string
}>()

const emits = defineEmits(['submit'])

const landingUrl = import.meta.env.VITE_LANDING_URL ?? ''
const contactUsUrl = import.meta.env.VITE_CONTACT_US_URL ?? ''
</script>
<template>
    <header class="fixed w-full max-w-6xl left-1/2 -translate-1/2 top-12 flex justify-between items-center">
        <a :href="landingUrl"><img src="@/assets/images/logo.png" alt="logo" class="h-10" /></a>
        <p class="text-gray text-sm">{{$t('want-an-account')}} <a :href="contactUsUrl" class="text-primary">{{$t('contact-us')}}</a></p>
    </header>
    <main class="flex flex-col items-center justify-center w-screen h-screen bg-whitesmoke">
        <h2 class="text-4xl font-medium mb-3">{{ title }}</h2>
        <h4 class="mb-6 text-xl text-gray font-semibold">{{subtitle}}</h4>
        <form @submit.prevent="emits('submit')" class="w-full max-w-lg flex flex-col p-6 gap-y-4 bg-white rounded-md border border-lightgray">
            <slot/>
            <button class="bg-primary w-full h-11 text-white rounded-md">{{ctaLabel}}</button>
        </form>
        <p class="text-gray mt-6 text-sm">@ {{ new Date().getFullYear() }} Merkurius Sales Tools</p>
    </main>
</template>



<style lang="scss" scoped>

</style>