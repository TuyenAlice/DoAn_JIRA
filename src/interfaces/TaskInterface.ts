import { Assignee } from "./UserInterface"

export interface TaskStatus {
    statusId: string,
    statusName: string,
    alias: string,
    deleted: boolean
}

export interface TaskType {
    id: number,
    taskType: string,
}

export interface Task {
    lstTaskDeTail: Array<TaskDetail>,
    statusId: number,
    statusName: string,
    alias: string
}

export interface TaskDetail {
    priorityTask: TaskPriority,
    taskTypeDetail: TaskType,
    assigness: Array<Assignee>,
    lstComment: [],
    taskId: number,
    taskName: string,
    alias: string,
    description: string,
    statusId: string,
    originalEstimate: number,
    timeTrackingSpent: number,
    timeTrackingRemaining: number,
    typeId: number,
    priorityId: number,
    projectId: number
}

export interface TaskPriority {
    priorityId: number,
    priority: string
}