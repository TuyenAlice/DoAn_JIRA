import ProjectCategory from "./ProjectCategoryInterface";
import Task from "./TaskInterface";
import User from "./UserInterface";

interface Project {
    tasks: Array<Task>,
    members: Array<User>,
    creator: User,
    id: number,
    projectName: string,
    description: string,
    projectCategory: ProjectCategory,
    alias: string
}

export default Project;