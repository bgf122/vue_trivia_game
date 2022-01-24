<script setup>
import { useRoute, useRouter } from 'vue-router';
import StartForm from '../components/Start/StartForm.vue';

const router = useRouter();

const handleQuizStart = () => {
    router.push("/trivia");
}
</script>

<template>
    <main>
        <h1>Start Page</h1>
        <StartForm @quizStarted="handleQuizStart" />
    </main>
</template>

<style scoped>
</style>
