import { CATEGORIES_URL, TOKEN_URL, USER_DB_BASE_URL } from ".";

export async function apiGetCategories() {
    try {
        const response = await fetch(CATEGORIES_URL);

        if (!response.ok) {
            throw new Error("Could not fetch categories");
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

export async function apiGetUser(username) {
    try {
        const response = await fetch(`${USER_DB_BASE_URL}?username=${username}`);

        if (!response.ok) {
            throw new Error("Could not fetch user");
        }

        const json = await response.json();
        return [null, json];
    }
    catch (error) {
        return [error.message, null];
    }
}

export async function apiCreateUser(username, highScore) {
    const parameters = {
        method: 'POST',
        headers: {
            'X-API-Key': import.meta.env.API_KEY, //apiKey,//import.meta.env.local.VITE_API_KEY,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            highScore: highScore
        })
    };
    try {
        const response = await fetch(USER_DB_BASE_URL, parameters);

        if (!response.ok) {
            throw new Error("Could not fetch user");
        }

        const json = await response.json();

        return [null, json];
    }
    catch (error) {
        return [error.message, null];
    }
}

export async function apiUpdateUser(userData) {
    const parameters = {
        method: 'PATCH',
        headers: {
            'X-API-Key': import.meta.env.API_KEY,//apiKey,//import.meta.env.local.VITE_API_KEY,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            highScore: userData.highScore
        })
    }
    try {
        const response = await fetch(`${USER_DB_BASE_URL}/${userData.id}`, parameters);

        if (!response.ok) {
            throw new Error("Could not fetch user");
        }

        const json = await response.json();
        return [null, json];
    }
    catch (error) {
        return [error.message, null];
    }
}