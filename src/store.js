import { createStore } from "vuex";
import { apiGetTriviaQuestions } from "./api/trivia";

export default createStore({
    state: {
        username: "",
        questions: [],
        triviaData: {
            amount: 10,
            category: "",
            difficulty: "",
            token: undefined
        },
        answers: {}
    },
    mutations: {
        setUsername: (state, username) => {
            state.username = username;
        },
        setQuestions: (state, questions) => {
            state.questions = questions;
        },
        setTriviaData: (state, triviaData) => {
            state.triviaData = {
                amount : triviaData.amount,
                category : triviaData.category,
                difficulty: triviaData.difficulty,
                token: triviaData.token
            };
        },
        setAnswers: (state, answers) => {
            state.answers = answers;
        }
    },
    actions: {
        async getTriviaQuestions({ commit, state }) {
            const [error, questions] = await apiGetTriviaQuestions(state.triviaData);

            if (error !== null) {
                return error;
            }
            commit("setQuestions", questions);

            return null;
        }
    }
});
