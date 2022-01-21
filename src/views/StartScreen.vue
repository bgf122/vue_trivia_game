<script setup>
import { reactive, ref } from "vue";
const username = ref("");
const questions = ref(0);
const difficulty = ref("");
const category = ref("");

const difficultiesList = reactive([
    "easy", "medium", "hard"
]);
const categoriesList = reactive([
    "sports", "science", "history"
]);

const onDifficultyChange = event => {
    console.log(event.target.value);
}
const onCategoryChange = event => {
    console.log(event.target.value);
}

const onSubmitClick = event => {
    console.log("Clicked submit");
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
        <select @change="onDifficultyChange">
            <option value="">Choose difficulty</option>
            <option v-for="item in difficultiesList" :key="item">
                {{ item }}
            </option>
        </select>
      </fieldset>

      <fieldset>
        <label for="questions">Number of questions</label>
        <input type="number" id="questions" v-model="questions" />
      </fieldset>

      <fieldset>
        <select @change="onCategoryChange">
            <option value="">Choose category</option>
            <option v-for="item in categoriesList" :key="item">
                {{ item }}
            </option>
        </select>
      </fieldset>

        <button @click="onSubmitClick">Submit</button>

    </form>
  </main>
</template>

<style scoped>
</style>
