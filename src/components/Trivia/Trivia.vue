<script setup>
import { computed, onMounted, reactive, ref } from 'vue';
import { useStore } from 'vuex';
import TriviaQuestionItem from './TriviaQuestionItem.vue';
const store = useStore();
const curQ = ref(0)

onMounted(async () => {
    await store.dispatch("getTriviaQuestions");
});

const questions = computed(() => store.state.questions);

</script>

<template>
    <ul>
        <p v-for="question, index in questions" :key="question.question"><li v-if="index == curQ">{{question.question}}</li></p>
    </ul>
    <button @click="next">next</button>
</template>

<style scoped>
</style>
