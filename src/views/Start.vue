<script setup>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import StartForm from '../components/Start/StartForm.vue';

const router = useRouter();
const store = useStore();

const handleQuizStart = async () => {
    await store.dispatch("verifyUser");
    router.push("/trivia");
}
</script>

<template>
    <StartForm @quizStarted="handleQuizStart" />
</template>

<style scoped>
</style>
