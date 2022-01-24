<script setup>
import { onMounted } from 'vue';
import { useStore } from 'vuex';
import { reactive, ref } from "vue";
import { apiGetCategories, apiGetTriviaToken } from "../../api/form";

const emit = defineEmits(["quizStarted"]);

const store = useStore();

// Get categories from API when component is mounted.
onMounted(async () => {
    const [listError, list] = await apiGetCategories();
    for (const item of list.trivia_categories) {
        categoriesList.push(item);
        // TODO Display possible error message?
    }

    const [tokenError, token] = await apiGetTriviaToken();
    triviaToken.value = token;
});

const username = ref("");
const questions = ref(0);
const difficulty = ref("");
const category = ref(0);
const triviaToken = ref("");

const difficultiesList = reactive([
    "Any Difficulty", "Easy", "Medium", "Hard"
]);

const categoriesList = reactive([{id: "",name: "Any Category"}]);

const onDifficultyChange = event => {
    if (event.target.value === "Any Difficulty")
        difficulty.value = "";
    else
        difficulty.value = event.target.value.toLowerCase();
}

const onCategoryChange = event => {
    if (event.target.value === "Any Category")
        category.value = "";
    else
        category.value = event.target.value;
}

// Save form values to store and emit start to view.
const onStartClick = event => {
    if (username.value === "") {
        console.log("Enter username");
        // TODO add html element to display this.
    }
    else if (questions.value < 1) {
        questions.value = 1;
    }
    else if (category.value === 0) {
        category.value = "";
    }
    else {
        store.commit("setUsername", username.value);
        store.commit("setTriviaData", {
            amount: questions.value, 
            category: category.value, 
            difficulty: difficulty.value,
            token: triviaToken.value
        });
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