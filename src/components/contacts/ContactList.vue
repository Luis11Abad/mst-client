<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
defineProps<{
    list: Array<any>
}>()
</script>
<template>
    <div id="contact-list">
        <div class="header"></div>
        <div class="list">
            <div v-for="item in list" :key="item.id">
                <h6>{{ item.name }}</h6>
                <p>{{ item.email }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
#contact-list {
    @apply flex flex-col w-full h-full border rounded-md bg-white overflow-hidden;
    .header {
        @apply flex-none h-14 border-b px-4 flex items-center;
    }
    .list {
        @apply flex flex-col flex-1 overflow-y-auto;
        div {
            @apply px-4 py-2.5 border-b;
            h6 {
                @apply font-semibold;
            }
            p {
                @apply text-sm text-gray -mt-0.5;
            }
        }
    }
}
</style>
