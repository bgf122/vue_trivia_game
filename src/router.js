import { createRouter, createWebHistory } from "vue-router";
import Start from "./views/Start.vue"
import Trivia from "./views/Trivia.vue"
import Results from "./views/Results.vue"

const routes = [
    {
        path: "/",
        component: Start
    },
    {
        path: "/trivia",
        component: Trivia
    },
    {
        path: "/results",
        component: Results
    }
]

export default createRouter({
    history: createWebHistory(),
    routes
})