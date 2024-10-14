import Task from "./TaskInterface";

export interface ProjectCategory {
    id: number,
    name: string
}

export interface ProjectDetail {
    tasks: Array<Task>,
    members: Array<ProjectMember>,
    creator: ProjectCreator,
    id: number,
    projectName: string,
    description: string,
    projectCategory: ProjectCategory,
    alias: string
}

export interface ProjectDetailDto {
    id: number,
    creator: number,
    projectName: string | "",
    description: string | "",
    categoryId: number,
    alias: string,
    deleted?: boolean
}

export interface ProjectList {
    members: Array<ProjectMember>,
    creator: ProjectCreator,
    id: number,
    projectName: string,
    description: string,
    categoryId: number,
    categoryName: string,
    alias: string,
    deleted: boolean
}

export interface ProjectMember {
    userId: number,
    name: string,
    avatar: string
}

export interface ProjectCreator {
    id: number,
    name: string
}