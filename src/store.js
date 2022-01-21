import { createStore } from "vuex";
import { apiGetTriviaQuestions } from "./api/trivia";

export default createStore({
    state: {
        questions: [],
        amount: undefined,
        category: undefined,
        difficulty: undefined
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
        }
    },
    actions: {
        async getTriviaQuestions({ commit, state}) {
            const [error, questions] = await apiGetTriviaQuestions((state.amount, state.category, state.difficulty));

            if (error !== null) {
                return error;
            }

            commit("setQuestions", questions);
            return null;
        }
    }
});