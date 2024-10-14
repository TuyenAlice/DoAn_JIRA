import { useRoutes } from "react-router-dom";
import { LoginTemplate } from "../layout/LoginTemplate";
import ProjectPage from "../pages/ProjectPage";
import SignupPage from "../pages/SignupPage";
import KanbanPage from "../pages/KanbanDashBoard";

export const RouterConfig = () => {
  const routes = useRoutes([
    {
      element: <LoginTemplate />,
      path: "/login",
    },
    {
      element: <SignupPage />,
      path: "/signup",
    },
    {
      element: <ProjectPage />,
      path: "/project",
    },
    // {
    //     element: <KanbanPage />,
    //     path: "/dashboard"
    // },
  ]);
  return routes;
};

export default RouterConfig;
