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
    const data = JSON.stringify(recipe);
    try {
        const response = await privateInstance.post('/recipes', data);
        return response.data.result;
    } catch(error) {
        throw error
    }
}

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