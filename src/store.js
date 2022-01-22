import { createStore } from "vuex";
import { apiGetTriviaQuestions } from "./api/trivia";

export default createStore({
    state: {
        questions: [],
        amount: 10,
        category: 10,
        difficulty: "easy",
        answers: {}
    },
    mutations: {
        setQuestions: (state, questions) => {
            state.questions = questions;
        },
        setAmount: (state, amount) => {
            state.amount = amount;
        },
        setCategorys: (state, category) => {
            state.category = category;
        },
        setDifficulty: (state, difficulty) => {
            state.difficulty = difficulty;
        },
        setAnswers: (state, answers) => {
            state.answers = answers;
        }
    },
    actions: {
        async getTriviaQuestions({ commit, state }) {
            const [error, questions] = await apiGetTriviaQuestions(state.amount, state.category, state.difficulty);

            if (error !== null) {
                return error;
            }
            commit("setQuestions", questions);

            return null;
        }
    }
});