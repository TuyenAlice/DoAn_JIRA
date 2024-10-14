import { useEffect, useRef, useState } from "react";
import { Button, Layout, Typography, Card } from "antd";
import {
  createProjectAuthorize,
  deleteProject,
  getAllProject,
  getProjectCategory,
  getProjectDetail,
  updateProject,
} from "../services/project-service";
import {
  ProjectCategory,
  ProjectDetail,
  ProjectDetailDto,
  ProjectList,
} from "../interfaces/ProjectInterface";
import JiraHeader from "../components/Header"; // Sửa lỗi đánh máy ở tên
import ProjectTable from "../components/ProjectTable";
import ProjectDetai from "../components/ProjectDetail";
import MenuBar from "../components/MenuBar";
import { getAllUsers } from "../services/user-service";
import User from "../interfaces/UserInterface";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const ProjectPage = () => {
  const [projects, setProjects] = useState<ProjectList[]>([]);
  const [projectCats, setProjectCats] = useState<ProjectCategory[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isCreateMode, setIsCreateMode] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<ProjectDetail>();
  const hasLoaded = useRef(false);
  const logonUser: User = JSON.parse(localStorage.getItem("user") || "{}");

  const onLoad = async () => {
    const promiseGetProjectCats = async (): Promise<any> => {
      const response = await getProjectCategory();
      return response;
    };

    const promiseGetAllProject = async (): Promise<any> => {
      const response = await getAllProject();
      return response;
    };

    const promiseGetAllUser = async (): Promise<any> => {
      const response = await getAllUsers("");
      return response;
    };

    Promise.all([
      promiseGetProjectCats(),
      promiseGetAllProject(),
      promiseGetAllUser(),
    ]).then(([resProjectCats, resProjects, resUsers]) => {
      setProjectCats(resProjectCats.data);
      setProjects(resProjects.data);
      setUsers(resUsers.data);
    });
  };

  const onDetail = async (id: number) => {
    await getProjectDetail(id)
      .then((response) => {
        setSelectedProject(response.data);
        setIsModalOpen(true);
        setIsCreateMode(false);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  const onCreate = () => {
    setIsModalOpen(true);
    setIsCreateMode(true);
  };

  const onUpdate = async (data: ProjectDetailDto) => {
    setIsModalOpen(false);
    setSelectedProject(undefined);
    if (isCreateMode) {
      data.creator = logonUser.id;
      await createProjectAuthorize(data)
        .then((response) => {
          setIsCreateMode(false);
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    } else {
      await updateProject(data)
        .then((response) => {
          setIsCreateMode(false);
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    }
    onLoad();
  };

  const onDelete = async (id: number) => {
    await deleteProject(id)
      .then((response) => {
        onLoad();
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(undefined);
  };

  useEffect(() => {
    if (!hasLoaded.current) {
      onLoad();
      hasLoaded.current = true;
    }
  }, [projects, projectCats]);
  return (
    <Layout className="min-h-screen bg-gray-100">
      {/* Header */}
      <Header className="bg-blue-900 text-white">
        <div className="container mx-auto">
          <JiraHeader />
        </div>
      </Header>

      {/* Layout for Sidebar and Content */}
      <Layout>
        {/* Sidebar Menu */}
        <Sider width={256} className="bg-blue-900 text-white">
          <MenuBar />
        </Sider>

        {/* Main Content */}
        <Layout className="p-4">
          <Content className="bg-white rounded-lg shadow-lg">
            <Card className="p-4">
              {/* Title and Button */}
              <div className="flex items-center justify-between mb-4">
                <Title level={2} className="text-gray-800">
                  Dự Án
                </Title>
                <Button
                  type="primary"
                  className="bg-blue-600 text-white"
                  onClick={onCreate}
                >
                  Thêm Dự Án
                </Button>
              </div>
            </Card>

            {/* Project Table */}
            <ProjectTable
              data={projects}
              onDetail={onDetail}
              onEdit={onDetail}
              onDelete={onDelete}
            />
            <ProjectDetai
              data={selectedProject}
              categories={projectCats}
              users={users}
              isCreate={isCreateMode}
              isOpen={isModalOpen}
              onClose={closeModal}
              onSubmit={onUpdate}
            />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default ProjectPage;
