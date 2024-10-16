import {
  ProjectCategory,
  ProjectList,
  ProjectDetail,
  ProjectDetailDto,
} from "../interfaces/ProjectInterface";
import apiClient from "./api-client";
import { TaskDetail } from "../interfaces/TaskInterface";

// getAllProject
export const getAllProject = async () => {
  const response = await apiClient.get("/Project/getAllProject");
  return {
    message: response.data.message as string,
    data: response.data.content as ProjectList[],
  };
};

// getProjectCategory
export const getProjectCategory = async () => {
  const response = await apiClient.get("/ProjectCategory");
  const arrProjectCat: ProjectCategory[] = Array.from(
    response.data.content
  ).map((i: any) => ({
    id: i.id,
    name: i.projectCategoryName,
  }));
  return { message: "", data: arrProjectCat as ProjectCategory[] };
};

// getProjectDetail
export const getProjectDetail = async (id: number) => {
  const response = await apiClient.get(`/Project/getProjectDetail?id=${id}`);
  return {
    message: response.data.message as string,
    data: response.data.content as ProjectDetail,
  };
};

//createProjectAuthorize
export const createProjectAuthorize = async (data: ProjectDetailDto) => {
  const response = await apiClient.post(`/Project/createProjectAuthorize`, {
    projectName: data.projectName,
    alias: data.alias,
    description: data.description,
    categoryId: data.categoryId,
  });
  return {
    message: response.data.message as string,
    data: response.data.content as ProjectDetailDto,
  };
};

//updateProject
export const updateProject = async (data: ProjectDetailDto) => {
  const response = await apiClient.put(
    `/Project/updateProject?projectId=${data.id}`,
    {
      id: data.id,
      projectName: data.projectName,
      creator: data.creator,
      description: data.description,
      categoryId: data.categoryId,
    }
  );
  return {
    message: response.data.message as string,
    data: response.data.content,
  };
};

//deleteProject
export const deleteProject = async (id: number) => {
  const response = await apiClient.delete(
    `/Project/deleteProject?projectId=${id}`
  );
  return {
    message: response.data.message as string,
    data: response.data.content[0] as number,
  };
};

// updateTaskStatus
export const updateTaskStatus = async (task: TaskDetail) => {
  const response = await apiClient.put('/Project/updateStatus', {
    taskId: task.taskId,
    statusId: task.statusId
  });
  return { message: response.data.message as string, data: response.data.content };
}