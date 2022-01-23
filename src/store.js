import { createStore } from "vuex";

export default createStore({
    state: {
        username: "",
        amount: 10,
        category: 10,
        difficulty: "easy",
    },
    mutations: {
        setUsername: (state, username) => {
            state.username = username;
        },
        setAmount: (state, amount) => {
            state.amount = amount;
        },
        setCategory: (state, category) => {
            state.category = category;
        },
        setDifficulty: (state, difficulty) => {
            state.difficulty = difficulty;
        },
    },
    actions: {
        
    }
})