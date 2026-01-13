import axios from "axios";
import type { CartItemType, ProductInput } from "./types";

const API_URL = "http://localhost:3001/api/products";

export const getProducts = async (): Promise<CartItemType[]> => {
    const res = await axios.get(API_URL);
    return res.data;
};

export const addProduct = async (product: ProductInput) => {
    return await axios.post(API_URL, product);
};

export const deleteProduct = async (id: number) => {
    return await axios.delete(`${API_URL}/${id}`);
};