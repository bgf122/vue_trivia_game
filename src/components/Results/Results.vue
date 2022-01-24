<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore()
const results = computed(() => store.state.answers);

const getAnswers = (incorrect, correct) => {
    let array = [];
    incorrect.forEach(answer => {
        array.push(answer);
    });
    array.push(correct);
    array.sort(() => Math.random() - 0.5);

    return array;
};

const isCorrect = (answer, data) => {
    if (answer === data.correct_answer) {
        return true
    }
    return false
}

</script>

<template>
    <div class="container">
        <div class="questionContainer" v-if="results !== undefined" v-for="result in results">
            <div class="question" v-html="result.question"></div>
            <div class="answers">
            <div class="answerContainer" v-for="answer in getAnswers(result.incorrect_answers, result.correct_answer)">
                <div v-if="isCorrect(answer, result)" class="correct" ><span v-html="answer"></span></div>
                <div v-else-if="answer !== result.correct_answer && answer === result.answer" class="wrong" ><span v-html="answer"></span></div>
                <div class="none" v-else ><span v-html="answer"></span></div>      
            </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    text-shadow: 0px 3px 3px black;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    font-size: large;
    font-weight: bold;
    padding: 3%;
    min-width: 100%;
}
.questionContainer {
    box-shadow: 10px 10px 10px 10px rgba(0, 0, 0, 0.2);
    color: white;
    background-color: darkslategrey;
    display: flex;
    flex-direction: column;
    border-width: 2px;
    border-style: solid;
    width: 25%;
    border-radius: 25%;
    padding: 2%;
    margin: 1%;
    text-align: center;
}
.question {
    margin: 3% 0% 5% 0%;
}
.answers {
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: space-evenly;
    flex-wrap: wrap;
    margin: 2%;
    height: 100%;
    
}
.answerContainer {
    box-shadow: 10px 10px 10px 10px rgba(0, 0, 0, 0.2); 
    display: flex;
    border-width: 2px;
    border-style: solid;
    border-radius: 25%;
    text-align: center;
    width: 40%;
    font-size: large;
    font-weight: bold;
    margin: 1%;
    overflow: hidden;   
}
.correct {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    background-color: green
}
.wrong {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    background-color: red
}
.none {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
}
span {
    padding: 2%;
}
</style>