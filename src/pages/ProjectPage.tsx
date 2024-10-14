import { useEffect, useRef, useState } from "react";
import { Button } from "antd";
import { getAllProject, getProjectCategory, getProjectDetail } from "../services/project-service";
import { ProjectCategory, ProjectDetail, ProjectList } from "../interfaces/ProjectInterface";
import JiaHeder from "../components/Header";
import ProjectTable from "../components/ProjectTable";
import ProjectDetai from "../components/ProjectDetail";

const ProjectPage = () => {
    const [projects, setProjects] = useState<ProjectList[]>([]);
    const [projectCats, setProjectCats] = useState<ProjectCategory[]>();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isCreateMode, setIsCreateMode] = useState<boolean>(false);
    const [selectedProject, setSelectedProject] = useState<ProjectDetail>();
    const hasLoaded = useRef(false);

    const onLoad = async () => {
        const promiseGetProjectCats = async (): Promise<any> => {
            const response = await getProjectCategory();
            return response;
        };

        const promiseGetAllProject = async (): Promise<any> => {
            const response = await getAllProject();
            return response;
        };

        Promise.all([promiseGetProjectCats(), promiseGetAllProject()]).then(
            ([resProjectCats, resProjects]: any) => {
                setProjectCats(resProjectCats.data);
                setProjects(resProjects.data);
                console.log(resProjectCats.data, resProjects.data);
            }
        );
    };

    const onDetail = async (id: number) => {
        await getProjectDetail(id).then((response) => {
            setSelectedProject(response.data);
            setIsModalOpen(true);
            setIsCreateMode(false);
        }).catch((error) => {
            alert(error.response.data.message);
        });
    };

    const onUpdate = (data: ProjectDetail) => {
        setIsModalOpen(false);
        setSelectedProject(undefined);
        console.log("updated", data);
    };

    const onDelete = (id: number) => { };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProject(undefined);
    }

    useEffect(() => {
        if (!hasLoaded.current) {
            onLoad();
            hasLoaded.current = true;
        }
    }, [projects, projectCats]);
    return (
        <div>
            <h1>Projects</h1>
            <Button type="primary">Add Project</Button>
            <ProjectTable
                data={projects}
                onDetail={onDetail}
                onEdit={onDetail}
                onDelete={onDelete}
            />
            <ProjectDetai
                data={selectedProject}
                categories={projectCats}
                isCreate={isCreateMode}
                isOpen={isModalOpen}
                onClose={closeModal}
                onSubmit={onUpdate} />
        </div>
    );
};

export default ProjectPage;
