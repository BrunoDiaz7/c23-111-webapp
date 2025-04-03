// import { recipesResponseData } from "@/types/recipes";
import { privateInstance, publicInstance } from "../axios";
import {createRecipe} from '@/types/recipes'


export const getAllRecipes = async () =>  {
    try {
        const response = await publicInstance.get('/recipes');
        return response;
    } catch (error) {
        throw error
    }
}

export const getRecipeById = async (id: string | undefined) => {
    try {
        const response = await publicInstance.get(`/recipes/${id}`)
        return response;
    } catch (error) {
        throw error;
    }
}
export const getRatesById = async (id: string | undefined) => {
    try {
        const response = await publicInstance.get(`/rates/${id}`)
        return response;
    } catch (error) {
        throw error;
    }
}

export const addRecipe = async (recipe: createRecipe) => {
    const formData = new FormData();
    
    formData.append("name", recipe.name);
    formData.append("description", recipe.description);
    formData.append("userId", recipe.userId);
    
    recipe.category.forEach(item => formData.append("category[]", item));
    recipe.ingredients.forEach(item => formData.append("ingredients[]", item));
    recipe.steps.forEach(item => formData.append("steps[]", item));

    if (recipe.file) {
        formData.append("file", recipe.file);
    }

    try {
        const response = await privateInstance.post('/recipes', formData, {
            headers: {
                "Content-Type": "multipart/form-data", // Opcional, Axios lo asigna automáticamente
            },
        });
        return response;
    } catch (error) {
        throw error;
    }
};


export const getRecipeByUserId = async (id: string) => {
    try {
        const response = await privateInstance.get(`/user/${id}`);
        return response;
    } catch(error) {
        throw error
    }
}

export const getRecipesByStatus = async () => {
    try {
        const response = await privateInstance.get('/recipes/pending');
        return response;
    } catch(error) {
        throw error;
    }
}