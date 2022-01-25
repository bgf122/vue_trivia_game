<script setup>
defineProps({
    answers: {
        type: Array,
        required: true
    },
    question : {
        type: Object,
        required: true
    }
})

const emit = defineEmits([
    "handleClick"
]);

const handleAnswer = (question, answer, answers) => {
    emit("handleClick", question, answer, answers)
}


</script>

<template>
    <div class="answerContainer" v-for="answer in answers" @click="handleAnswer(question, answer, answers)">
        <div class="answerButton" :key="answer" v-html="answer"></div>
    </div>
</template>

<style scoped>

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
.answerButton {
    margin: 3%
}
</style>