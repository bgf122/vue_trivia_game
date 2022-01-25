<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const router = useRouter();
const store = useStore();
const results = computed(() => store.state.answers);
if (results === []) {
    results = localStorage.getItem("answers");
}

const handleNewGame = () => {
    localStorage.setItem("user", {})
    localStorage.setItem("answers", [])
    localStorage.setItem("triviaData", [])
    localStorage.setItem("current", 0)
    localStorage.setItem("questions", [])
    store.commit("setAnswers", []);
    router.push("/");
};

const handleReplay = () => {
    localStorage.setItem("answers", [])
    localStorage.setItem("current", 0)
    localStorage.setItem("questions", [])
    store.commit("setAnswers", []);
    router.push("/trivia");
}
</script>

<template>
    <div class="container">
        <div class="questionContainer" v-if="results !== undefined" v-for="result in results">
            <div class="question" v-html="result.question"></div>
            <div class="answers">
                <div class="answerContainer" v-for="answer in result.allAnswers">
                    <div v-if="answer === result.correct_answer" class="correct">
                        <span v-html="answer"></span>
                    </div>
                    <div
                        v-else-if="answer !== result.correct_answer && answer === result.answer"
                        class="wrong"
                    >
                        <span v-html="answer"></span>
                    </div>
                    <div class="none" v-else>
                        <span v-html="answer"></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="questionContainer">
            <div class="question"></div>
            <div class="answers">
                <div @click="handleReplay()" class="answerContainer">
                    <span class="none">Replay with new Questions</span>
                </div>
                <div @click="handleNewGame()" class="answerContainer">
                    <span class="none">New Game</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    text-shadow: 0px 3px 3px black;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 1%;
    min-width: 100%;
    max-height: 60%;
    justify-content: space-evenly;
}
.questionContainer {
    box-shadow: 10px 10px 10px 10px rgba(0, 0, 0, 0.2);
    background-color: darkslategrey;
    display: flex;
    flex-direction: column;
    border-width: 2px;
    border-style: solid;
    border-color: black;
    width: 25%;
    border-radius: 25%;
    padding: 1%;
    margin: 1%;
    text-align: center;
}
.question {
    color: white;
    margin: 4% 0% 1% 0%;
}
.answers {
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: space-evenly;
    flex-wrap: wrap;
    margin: 2%;
    height: 100%;
}
.answerContainer {
    box-shadow: 10px 10px 10px 10px rgba(0, 0, 0, 0.2);
    display: flex;
    border-width: 2px;
    border-style: solid;
    border-radius: 25%;
    text-align: center;
    width: 40%;
    margin: 1%;
    overflow: hidden;
}
.correct {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    background-color: green;
}
.wrong {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    background-color: red;
}
.none {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
}
span {
    padding: 2%;
    color: white;
}
</style>