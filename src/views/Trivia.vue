<script setup>
import { onMounted } from 'vue';
import { useStore } from 'vuex';
import Trivia from '../components/Trivia/Trivia.vue';

const store = useStore();

onMounted(async () => {
    if (localStorage.getItem("questions") !== null) {
        if (parseInt(localStorage.getItem("current")) > localStorage.getItem("questions").length) {
            await store.dispatch("getTriviaQuestions");
        } else {   
            let questions = localStorage.getItem("questions")
            if (questions == "") await store.dispatch("getTriviaQuestions");
            else store.commit("setQuestions", JSON.parse(questions)) 
              
        }  
    } else {
        await store.dispatch("getTriviaQuestions");
    }
});

</script>

<template>
    <Trivia/>
</template>

<style scoped>
</style>
