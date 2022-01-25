<script setup>
import { computed, onUpdated, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import TriviaButtonItem from './TriviaButtonItem.vue';

const router = useRouter();
const store = useStore();
const current = ref(localStorage.getItem("current"))
const questions = computed(() => store.state.questions);
const yourAnswers = computed(() => store.state.answers);

const getAnswers = (question) => {
    let array = [];
    question.incorrect_answers.forEach(answer => {
        array.push(answer);
    });
    array.push(question.correct_answer);
    array.sort(() => Math.random() - 0.5);

    return array;
};
const handleClick = (q, a, array) => {
    const answer = {
        question: q.question,
        allAnswers: array,
        answer: a,
        correct_answer: q.correct_answer
    };
    yourAnswers.value.push(answer);
    current.value++;
    localStorage.setItem("current", current.value)
    localStorage.setItem("answers", JSON.stringify(yourAnswers.value))
};

onUpdated(() => {
    if (current.value >= questions.value.length) {
        router.push("/results");
        store.commit("setAnswers", yourAnswers.value);
    }
});

</script>

<template>
<div class="container">
    <div class="triviaContainer" v-for="question, index in questions" :key="index">
        <div class="questionContainer" v-if="index == current && question.question !== undefined" >
            <div class="question" v-html="question.question"></div>
            <div class="answers">
                <TriviaButtonItem v-if="question !== undefined" @handleClick="handleClick" :question="question" :answers="getAnswers(question)" />
            </div>
        </div>
    </div>
</div>
</template>

<style scoped>
.container {
    margin: 10%;
}
.triviaContainer {
    font-size: 35px;
    text-shadow: 0px 3px 3px black;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    font-weight: bold;
    min-width: 600px;
    height: auto;
}
.questionContainer {
    box-shadow: 10px 10px 10px 10px rgba(0, 0, 0, 0.2);
    color: white;
    background-color: darkslategrey;
    display: flex;
    flex-direction: column;
    border-width: 2px;
    border-style: solid;
    width: 100%;
    border-radius: 25%;
    margin: auto;
    text-align: center;
}
.question {
    margin: 10% 10% 5% 10%;
}
.answers {
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: space-evenly;
    flex-wrap: wrap;
    margin: 0% 5% 5% 5%;
    height: 100%;
    
}
</style>
