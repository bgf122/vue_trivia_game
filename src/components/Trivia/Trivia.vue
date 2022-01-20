<script setup>
import { reactive } from 'vue';
const url = "https://opentdb.com/api.php?amount=10&category=10&difficulty=easy";
const questions = [];
fetch(url)
    .then(response => response.json())
    .then(data => questions.push(data.results))
console.log(questions)
</script>

<template>
<p v-for="item in questions[0]" :key="item">{{ item.question }}</p>
</template>

<style scoped>
</style>
