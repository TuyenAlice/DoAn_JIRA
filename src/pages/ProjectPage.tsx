
import { useEffect, useState } from 'react';
import { List, Button } from 'antd';
import { getAllProject } from '../services/project-service';
import Project from '../interfaces/ProjectInterface';

const ProjectPage = () => {
    const [projects, setProjects] = useState<Project[]>();

    const onLoad = async () => {
        await getAllProject().then((response) => {
            console.log(response.message);
            setProjects(response.data);
        });
    };

    useEffect(() => {
        if (!projects) {
            onLoad();
        }
    }, [projects]);

    return (
        <div>
            <h1>Projects</h1>
            <Button type="primary">Add Project</Button>
            <List
                dataSource={projects}
                renderItem={(project: Project) => <List.Item>{project.projectName}</List.Item>}
            />
        </div>
    );
};

export default ProjectPage;
