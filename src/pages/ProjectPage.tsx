
import { useEffect, useRef, useState } from 'react';
import { Button } from 'antd';
import { getAllProject, getProjectCategory } from '../services/project-service';
import { ProjectCategory, ProjectList } from '../interfaces/ProjectInterface';
import ProjectTable from '../components/ProjectTable';

const ProjectPage = () => {
    const [projects, setProjects] = useState<ProjectList[]>([]);
    const [projectCats, setProjectCats] = useState<ProjectCategory[]>();
    const hasLoaded = useRef(false);

    const onLoad = async () => {

        const promiseGetProjectCats = async (): Promise<any> => {
            const response = await getProjectCategory();
            return response;
        }

        const promiseGetAllProject = async (): Promise<any> => {
            const response = await getAllProject();
            return response;
        }

        Promise.all([promiseGetProjectCats(), promiseGetAllProject()]).then(([resProjectCats, resProjects]: any) => {
            setProjectCats(resProjectCats.data);
            setProjects(resProjects.data);
            console.log(resProjectCats.data, resProjects.data);
        });
    };

    const onDetail = (id: number) => {

    };

    const onEdit = (id: number) => {

    };

    const onDelete = (id: number) => {

    };

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
            <ProjectTable data={projects} onDetail={onDetail} onEdit={onEdit} onDelete={onDelete} />
        </div>
    );
};

export default ProjectPage;
