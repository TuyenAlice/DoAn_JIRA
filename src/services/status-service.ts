import { TaskStatus } from "../interfaces/TaskInterface";
import apiClient from "./api-client";

// getAllStatus
export const getAllStatus = async () => {
    const response = await apiClient.get('/Status/getAll');
    return { message: response.data.message as string, data: response.data.content as Array<TaskStatus> };
}