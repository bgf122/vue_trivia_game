<script setup>
import { onMounted } from 'vue';
import { useStore } from 'vuex';
import { reactive, ref } from "vue";
import { apiGetCategories } from "../../api/form";

const emit = defineEmits(["quizStarted"]);

const store = useStore();

onMounted(async () => {
    const [error, list] = await apiGetCategories();

    for (const item of list.trivia_categories) {
        categoriesList.push(item);
        // TODO Display possible error message?
    }
});

const username = ref("");
const questions = ref(0);
const difficulty = ref("");
const category = ref(0);

const difficultiesList = reactive([
    "Easy", "Medium", "Hard"
]);
let categoriesList = reactive([]);

const onDifficultyChange = event => {
    difficulty.value = event.target.value.toLowerCase();
}

const onCategoryChange = event => {
    category.value = event.target.value;
}

const onStartClick = event => {
    if (username.value === "") {
        console.log("Enter username");
    }
    else if (questions.value < 1) {
        console.log("Enter questions amount");
    }
    else if (difficulty.value === "") {
        console.log("Select difficulty");
    }
    else if (category.value === 0) {
        console.log("Select category")
    }
    else {
        store.commit("setUsername", username.value);
        store.commit("setAmount", questions.value);
        store.commit("setDifficulty", difficulty.value);
        store.commit("setCategory", category.value);
        emit("quizStarted");
    }
}
</script>

<template>
    <form>
        <fieldset>
            <label for="username">Username</label>
            <input type="text" id="username" v-model="username" />
        </fieldset>

        <fieldset>
            <label for="questions">Number of questions</label>
            <input type="number" min="1" id="questions" v-model="questions" />
        </fieldset>

        <fieldset>
            <select @change="onDifficultyChange">
                <option value>Choose difficulty</option>
                <option v-for="item in difficultiesList" :key="item">{{ item }}</option>
            </select>
        </fieldset>

        <fieldset>
            <select @change="onCategoryChange">
                <option value>Choose category</option>
                <option
                    v-for="item in categoriesList"
                    :value="item.id"
                    :key="item.id"
                >{{ item.name }}</option>
            </select>
        </fieldset>

        <button @click="onStartClick" type="button">Start Quiz</button>
    </form>
</template>