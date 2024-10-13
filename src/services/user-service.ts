import apiClient from "./api-client";
import Account from "../interfaces/AccountInterface"
import User from "../interfaces/UserInterface"

// signin
export const signin = async (data: Account) => {
    const response = await apiClient.post('/Users/signin', {
        "email": data.email,
        "password": data.password
    });
    return { message: response.data.message as string, data: response.data.content as User };
}

// signup
export const signup = async (data: Account) => {
    const response = await apiClient.post("/Users/signup", {
        "email": data.email,
        "password": data.password,
        "name": data.name,
        "phoneNumber": data.phoneNumber
    });
    return { message: response.data.message as string, data: response.data.content as Account };
}