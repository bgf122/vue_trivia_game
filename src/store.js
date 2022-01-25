import { createStore } from "vuex";
import { apiGetUser, apiCreateUser } from "./api/form";
import { apiGetTriviaQuestions } from "./api/trivia";

const initStateUser = (state) => {
    const storedState = localStorage.getItem(state);
    if (!storedState) {
        return { 
            username: "",
            id: undefined,
            highscore: undefined
        };
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
        user: initStateUser("user"),
        questions: initStateObj("questions"),
        triviaData: initStateObj("triviaData"),
        answers: initStateObj("answers"),
        current: initStateInt("current")
    },
    mutations: {
        setUser: (state, userData) => {
            state.user = {
                username: userData.username,
                id: userData.id,
                highScore: userData.highScore
            };
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

        async verifyUser({ commit, state }) {
            const [error, user] = await apiGetUser(state.user.username);
            if (error !== null) {
                return error;
            }
            
            if (user.length === 1) {
                commit("setUser", user[0]);
                localStorage.setItem("user",JSON.stringify(user[0]));
            }
            else {
                const [error2, newUser] = await apiCreateUser(state.user.username, state.user.highScore);

                if (error2 !== null) {
                    return error2;
                }
                commit("setUser", newUser);
                localStorage.setItem("user",JSON.stringify(newUser));
            } 
            return null;
        }
    }
});
