import { createStore } from "vuex";
import { apiGetTriviaQuestions } from "./api/trivia";

const initUser = () => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
        return null;
    }
    return storedUser;
}

// const initState = (state) => {
//     const storedState = localStorage.getItem(state);
//     if (!storedState) {
//         return null;
//     }
//     return JSON.parse(storedState);
// }

const initData = () => {
    const storedData = localStorage.getItem("triviaData");
    if (!storedData) {
        return null;
    }
    return JSON.parse(storedData);
}

export default createStore({
    state: {
        username: initUser(),//initState("user"),
        questions: [],
        triviaData: initData(),//initState("triviaData"),
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
