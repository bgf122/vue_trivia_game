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
        router.push("/results");
        store.commit("setAnswers", yourAnswers.value);
    }
});

</script>

<template>
<div class="container">

</div>
    <div class="triviaContainer" v-for="question, index in questions">
        <div class="questionContainer" v-if="index === current && question !== undefined" >
            <div class="question" v-html="question.question"></div>
            <div class="answers">
                <div class="answerContainer" v-for="answer in getAnswers(question.incorrect_answers, question.correct_answer)">
                    <div class="answerButton" :key="answer" @click="handleClick(question, answer)" v-html="answer"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    margin: 15%;
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
    width: 50%;
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
.answerContainer {
    box-shadow: 10px 10px 10px 10px rgba(0, 0, 0, 0.2); 
    display: flex;
    border-width: 2px;
    border-style: solid;
    border-radius: 25%;
    width: 40%;
    font-weight: bold;
    margin: 1%;
    overflow: hidden; 
    justify-content: center;
    align-items: center;
    cursor: pointer;
}
span {
    padding: 2%;
}
.answerButton {
    margin: 3%
}
</style>
