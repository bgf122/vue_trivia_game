export async function apiGetCategories() {
    try {
        const response = await (fetch("https://opentdb.com/api_category.php"));

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