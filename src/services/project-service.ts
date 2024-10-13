import Project from "../interfaces/ProjectInterface";
import apiClient from "./api-client";

// getAllProject
export const getAllProject = async () => {
    const response = await apiClient.get('/Project/getAllProject');
    return { message: response.data.message as string, data: response.data.content as Project[] };
}