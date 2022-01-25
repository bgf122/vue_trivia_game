import { createRouter, createWebHistory } from "vue-router";
import Start from "./views/Start.vue"
import Trivia from "./views/Trivia.vue"
import Results from "./views/Results.vue"

const authGuard = (to, from, next) => {
    if (!localStorage.getItem("user"))
        next("/");
    else
        next();
}

const routes = [
    {
        path: "/",
        component: Start
    },
    {
        path: "/trivia",
        component: Trivia,
        beforeEnter: authGuard
    },
    {
        path: "/results",
        component: Results,
        beforeEnter: authGuard
    }
]

export default createRouter({
    history: createWebHistory(),
    routes
})