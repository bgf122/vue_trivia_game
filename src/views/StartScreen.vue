<script setup>

// TODO
// Call API request

import { reactive, ref } from "vue";
const username = ref("");
const questions = ref(0);
const difficulty = ref("");
const category = ref("");

const difficultiesList = reactive([
    "Any Difficulty", "Easy", "Medium", "Hard"
]);
const categoriesList = reactive([
    "Any Category", "sports", "science", "history"
    // TODO 
    // Populate from API
]);

const onSubmitClick = event => {
    console.log("Clicked submit");
    // TODO
    // Save to store
}
</script>

<template>
    <main>
        <h1>Start Page</h1>
        <form @submit.prevent="onSubmit">
            <fieldset>
                <label for="username">Username</label>
                <input type="text" id="username" v-model="username" />
            </fieldset>

            <fieldset>
                <label for="questions">Number of questions</label>
                <input type="number" id="questions" v-model="questions" />
            </fieldset>

            <fieldset>
                <select>
                    <option value>Choose difficulty</option>
                    <option v-for="item in difficultiesList" :key="item">{{ item }}</option>
                </select>
            </fieldset>

            <fieldset>
                <select>
                    <option value>Choose category</option>
                    <option v-for="item in categoriesList" :key="item">{{ item }}</option>
                </select>
            </fieldset>

            <button @click="onSubmitClick">Start</button>
        </form>
    </main>
</template>

<style scoped>
</style>
