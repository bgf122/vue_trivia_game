export async function apiGetCategories() {
    try {
        const response = await fetch("https://opentdb.com/api_category.php");

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
        const response = await fetch("https://opentdb.com/api_token.php?command=request");

        if (!response.ok) {
            throw new Error("Could not fetch token");
        }

        const { responseCode, responseMessage, token } = await response.json();

        return [null, token];
    }
    catch (error) {
        return [error.message, null];
    }
}