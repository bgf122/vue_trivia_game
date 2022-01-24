<script setup>
import { onMounted } from 'vue';
import { useStore } from 'vuex';
import Trivia from '../components/Trivia/Trivia.vue';

const store = useStore();

onMounted(async () => {
    await store.dispatch("getTriviaQuestions");
});

</script>

<template>
    <Trivia />
</template>

<style scoped>
</style>
