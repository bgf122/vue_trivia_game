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
            store.commit("setQuestions", JSON.parse(localStorage.getItem("questions")))   
        }  
    } else {
        console.log("else")
        await store.dispatch("getTriviaQuestions");
    }
});

</script>

<template>
    <Trivia/>
</template>

<style scoped>
</style>
