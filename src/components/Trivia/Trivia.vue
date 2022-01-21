<script setup>import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore()

onMounted(async () => {
    await store.dispatch("getTriviaQuestions")
})

</script>

<template>

</template>

<style scoped>
</style>
