import { CATEGORIES_URL, TOKEN_URL } from ".";

export async function apiGetCategories() {
    try {
        const response = await fetch(CATEGORIES_URL);

        if(!response.ok) {
            throw new Error("Failed to fetch categories");
        }

        const categories = await response.json();
        
        return [null, categories];
    }
    catch (error) {
        return [error.message, null];
    }
}

export async function apiGetTriviaToken() {
    try {
        const response = await fetch(TOKEN_URL);

        if (!response.ok) {
            throw new Error("Could not fetch token");
        }

        const { token } = await response.json();

        return [null, token];
    }
    catch (error) {
        return [error.message, null];
    }
}