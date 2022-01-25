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
    }

    const [tokenError, token] = await apiGetTriviaToken();
    triviaToken.value = token;
});

const user = ref({});
const questions = ref(1);
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
    const data = {
        amount: questions.value, 
        category: category.value, 
        difficulty: difficulty.value,
        token: triviaToken.value
    };
    const user = {
        username: username.value,
        id: 0,
        highScore: 0
    };

    if (data.amount < 1) {
        data.amount = 1;
    }
    if (data.category === 0) {
        data.category = "";
    }
    if (username.value === "") {
        console.log("Enter username");
        // TODO add html element to display this.
    }
    else {
        store.commit("setUser", user);
        store.commit("setTriviaData", data);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("triviaData", JSON.stringify(data));
        localStorage.setItem("current", 0)
        emit("quizStarted");
    }
}
</script>

<template>
<div class="container">
    <form>
        <div class="formContainer">
            <div>Username</div>
            <fieldset>
                <input type="text" id="username" v-model="user.username" placeholder=""/>
            </fieldset>
            <div>Number of questions</div>
            <fieldset>
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
            <div class="button" @click="onStartClick">Start Quiz</div>
        </div>
    </form>
</div>
</template>
<style scoped>
.container { 
    display: flex;
    justify-content: center;
    margin-top: 10%;
}
.formContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-shadow: 10px 10px 10px 10px rgba(0, 0, 0, 0.2);
    background-color: darkslategrey;
    border-width: 2px;
    border-style: solid;
    border-color: black;
    border-radius: 25%;
    margin: 1%;
    text-align: center;
    min-width: 600px;
    min-height: 350px;
}
fieldset {
    display: flex;
    border: 0;
    justify-content: center;
}
input {
    display: flex;
    border-radius: 25%;
    height: 30px;
    text-align: center;
    width: 150px;
}
select {
    min-width: 150px;
    display: flex;
    border-radius: 25%;
    height: 30px;
    text-align: center;
}
div {
    color: white;
    text-align: center;
    text-shadow: 0px 3px 3px black;
}
.button {
    margin-top: 2%;
    font-size: large;
    font-weight: bold;
    cursor: pointer;
}
</style>