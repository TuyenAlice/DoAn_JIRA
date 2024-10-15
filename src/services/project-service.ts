import {
  ProjectCategory,
  ProjectList,
  ProjectDetail,
  ProjectDetailDto,
} from "../interfaces/ProjectInterface";
import apiClient from "./api-client";
import User from "../interfaces/UserInterface";

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

// API call to assign user to a project
export const addUserToProject = async (
  projectId: number,
  userId: string
): Promise<User> => {
  try {
    const token = localStorage.getItem("TOKEN");

    if (!token) {
      throw new Error("Authorization token not found");
    }

    const response = await apiClient.post(`/Project/assignUserProject`, {
      projectId,
      userId,
    });

    return response.data.content as User;
  } catch (error: any) {
    if (error.response) {
      console.error("API error:", error.response.data);
      throw new Error(
        error.response.data.message || "Failed to add user to project"
      );
    } else if (error.request) {
      console.error("Network error:", error.request);
      throw new Error("Network error occurred. Please try again later.");
    } else {
      console.error("Error:", error.message);
      throw new Error("An unknown error occurred.");
    }
  }
};
//GetUser
// GetUser function to fetch a user by ID
export const GetUser = async () => {
  try {
    const response = await apiClient.get(`Project/assignUserProject`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("TOKEN"), // Use correct token retrieval
      },
    });

    // Ensure the API returns a structure that matches this
    const { message, content } = response.data;

    return {
      message: message as string,
      data: content as User[], // Assuming User is your type/interface for user data
    };
  } catch (error) {
    console.error("Failed to fetch users:", error);
    throw error; // Rethrow the error to handle it in the calling function
  }
};
