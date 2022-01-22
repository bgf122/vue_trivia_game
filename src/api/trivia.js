import { TRIVIA_BASE_URL } from "./";

export async function apiGetTriviaQuestions(amount=1, category="", difficulty="") {
    try {
        const response = await fetch(`${TRIVIA_BASE_URL}amount=${amount}&category=${category}&difficulty=${difficulty}`);
        
        if(!response.ok) {
            throw new Error("Could not fetch questions")
        }

        const { results } = await response.json()
        
        return [ null, results]

    } catch (error) {
        return [ error.message, [] ]
    }
    
}