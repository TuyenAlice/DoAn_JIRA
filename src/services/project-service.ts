import apiClient from "./api-client";

// getAllProject
export const getAllProject = async () => {
    const response = await apiClient.get('/Project/getAllProject');
    return response.data.content;
}