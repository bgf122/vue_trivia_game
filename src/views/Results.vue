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
    <div v-if="results !== undefined" v-for="result in results">
        <div v-html="result.question"></div>
        <div v-for="answer in getAnswers(result.incorrect_answers, result.correct_answer)">
            <span v-if="isCorrect(answer, result)" class="correct" v-html="answer"></span>
            <span v-else-if="answer !== result.correct_answer && answer === result.answer" class="wrong" v-html="answer"></span>
            <span v-else v-html="answer"></span>      
        </div>
    </div>
</template>

<style scoped>
.correct {
    color: green
}
.wrong {
    color: red
}
</style>
