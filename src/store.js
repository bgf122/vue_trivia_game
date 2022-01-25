import { createStore } from "vuex";
import { apiGetUser, apiCreateteUser } from "./api/form";
import { apiGetTriviaQuestions } from "./api/trivia";

const initState = (state) => {
    const storedState = localStorage.getItem(state);
    if (!storedState) {
        return "";
    }
    return storedState;
}

const initStateObj = (state) => {
    const storedData = localStorage.getItem(state);
    if (!storedData) {
        return [];
    }
    return JSON.parse(storedData);
}

const initStateInt = (state) => {
    const storedState = localStorage.getItem(state);
    if (!storedState) {
        return 0;
    }
    return storedState;
}

export default createStore({
    state: {
        username: initState("username"),
        questions: initStateObj("questions"),
        triviaData: initStateObj("triviaData"),
        answers: initStateObj("answers"),
        current: initStateInt("current")
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
                amount: triviaData.amount,
                category: triviaData.category,
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
        },

        async verifyUser({ state }) {
            const [error, user] = await apiGetUser(state.username);

            if (error !== null) {
                return error;
            }

            if (user.length !== 1) {
                const [error2,] = await apiCreateteUser(state.username, 0);

                if (error2 !== null) {
                    return error2;
                }
            return null;
            }
        }

    }

});
