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

// get all user
export const getAllUsers = async (keyword: string) => {
    const response = await apiClient.get(`/Users/getUser?keyword=${keyword}`);
    const arrUser: User[] = Array.from(response.data.content).map((i: any) => ({
        id: i.userId,
        name: i.name,
        accessToken: "",
        avatar: i.avatar,
        email: i.email,
        phoneNumber: i.phoneNumber
    }));
    return { message: response.data.message as string, data: arrUser as User[] };
}