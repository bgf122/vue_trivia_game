import { TRIVIA_BASE_URL } from "./";

export async function apiGetTriviaQuestions(triviaData = { amount : 1, category : "", difficulty : "", token: ""}) {
    try {
        const response = await fetch(`${TRIVIA_BASE_URL}amount=${triviaData.amount}&category=${triviaData.category}&difficulty=${triviaData.difficulty}&token=${triviaData.token}`);
        
        if(!response.ok) {
            throw new Error("Could not fetch questions")
        }

        const { results } = await response.json()

        localStorage.setItem("current", 0)
        localStorage.setItem("questions", JSON.stringify(results))

        return [null, results]

    } catch (error) {
        return [error.message, []]
    }
}