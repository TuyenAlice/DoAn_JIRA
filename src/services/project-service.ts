import { ProjectCategory, ProjectList, ProjectDetail } from "../interfaces/ProjectInterface";
import apiClient from "./api-client";

// getAllProject
export const getAllProject = async () => {
    const response = await apiClient.get('/Project/getAllProject');
    return { message: response.data.message as string, data: response.data.content as ProjectList[] };
}

// getProjectCategory
export const getProjectCategory = async () => {
    const response = await apiClient.get('/ProjectCategory');
    const arrProjectCat: ProjectCategory[] = Array.from(response.data.content).map((i: any) => ({
        id: i.id,
        name: i.projectCategoryName
    }));
    return { message: "", data: arrProjectCat as ProjectCategory[] };
}

// getProjectDetail
export const getProjectDetail = async (id: number) => {
    const response = await apiClient.get(`/Project/getProjectDetail?id=${id}`);
    return { message: response.data.message as string, data: response.data.content as ProjectDetail };
}