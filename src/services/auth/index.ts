import { publicInstance } from "../axios";
import { logInCredentials, signUpCredentials } from "@/types/auth";

export const logIn = async (credentials: logInCredentials) => {
    try {
        const response = await publicInstance.post('/auth/login', credentials);
        return response;
    } catch (error) {
        throw error
    }
}

export const signUp = async (credentials: signUpCredentials) => {
    try {
        const response = await publicInstance.post('/auth/register', credentials);
        return response;
    } catch (error) {
        throw error
    }
}