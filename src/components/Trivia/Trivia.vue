<script setup>
import { computed, onUpdated, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const router = useRouter();
const store = useStore();
const current = ref(0);
const questions = computed(() => store.state.questions);
const yourAnswers = ref([]);

const getAnswers = (incorrect, correct) => {
    let array = [];
    incorrect.forEach(answer => {
        array.push(answer);
    });
    array.push(correct);
    array.sort(() => Math.random() - 0.5);

    return array;
};
const handleClick = (q, a) => {
    const answer = {
        question: q.question,
        incorrect_answers: q.incorrect_answers,
        answer: a,
        correct_answer: q.correct_answer
    };
    yourAnswers.value.push(answer);
    current.value++;
};

onUpdated(() => {
    if (current.value >= questions.value.length) {
        router.push("/results")
        store.commit("setAnswers", yourAnswers.value)
    }
});

</script>

<template>
    <ul v-for="question, index in questions">
        <p v-if="index === current">
            <li
                v-if="question !== undefined"
                :incorrect="question.incorrect_answers"
                :correct="question.correct_answer"
                @clicked="handleClick"
            >
                {{ question.question }}
                <p
                    v-for="answer in getAnswers(question.incorrect_answers, question.correct_answer)"
                >
                    <button :key="answer" @click="handleClick(question, answer)">{{ answer }}</button>
                </p>
            </li>
        </p>
    </ul>
</template>

<style scoped>
</style>
