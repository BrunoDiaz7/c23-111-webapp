// import { recipesResponseData } from "@/types/recipes";
// import { get } from "node:http";
import { privateInstance, publicInstance } from "../axios";

export const getRatesById = async (id: string) => {
  try {
    const response = await publicInstance.get(`/rates/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

type RateData = {
  rating: number;
  comment: string;
  reviewer: string;
  recipe: string;
};

export const addRateById = async (id: string, data: RateData) => {
  try {
    const response = await privateInstance.post(`/rates/`, {
      ...data,
      recipe: id,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
